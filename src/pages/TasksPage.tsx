import { useState } from "react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { useAuth } from "../context/AuthContext";
import { fetchTasks, createTaskRequest, updateTaskRequest, deleteTaskRequest } from "../api/taskApi";
import { Task, TaskFilters as TaskFiltersType, TaskInput } from "../types/task";
import { TaskFilters } from "../components/tasks/TaskFilters";
import { TaskList } from "../components/tasks/TaskList";
import { TaskFormModal } from "../components/tasks/TaskFormModal";
import { Button } from "../components/ui/Button";
import { Spinner } from "../components/ui/Spinner";
import { ErrorBanner } from "../components/ui/ErrorBanner";

export function TasksPage() {
  const { user, logout } = useAuth();
  const queryClient = useQueryClient();
  const [filters, setFilters] = useState<TaskFiltersType>({});
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [editingTask, setEditingTask] = useState<Task | null>(null);

  const tasksQuery = useQuery({
    queryKey: ["tasks", filters],
    queryFn: () => fetchTasks(filters),
  });

  const createMutation = useMutation({
    mutationFn: createTaskRequest,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["tasks"] });
      setIsFormOpen(false);
    },
  });

  const updateMutation = useMutation({
    mutationFn: ({ id, input }: { id: string; input: Partial<TaskInput> }) => updateTaskRequest(id, input),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["tasks"] });
      setIsFormOpen(false);
      setEditingTask(null);
    },
  });

  const deleteMutation = useMutation({
    mutationFn: deleteTaskRequest,
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ["tasks"] }),
  });

  function openCreateForm() {
    setEditingTask(null);
    setIsFormOpen(true);
  }

  function openEditForm(task: Task) {
    setEditingTask(task);
    setIsFormOpen(true);
  }

  async function handleSubmit(input: TaskInput) {
    if (editingTask) {
      await updateMutation.mutateAsync({ id: editingTask._id, input });
    } else {
      await createMutation.mutateAsync(input);
    }
  }

  function handleDelete(task: Task) {
    if (window.confirm(`Delete "${task.title}"? This cannot be undone.`)) {
      deleteMutation.mutate(task._id);
    }
  }

  const hasActiveFilters = Boolean(filters.search || filters.status || filters.priority);

  return (
    <div className="min-h-screen bg-slate-50">
      <header className="border-b border-slate-200 bg-white">
        <div className="mx-auto flex max-w-6xl items-center justify-between px-4 py-4">
          <h1 className="text-lg font-semibold text-slate-900">Task Manager</h1>
          <div className="flex items-center gap-3 text-sm text-slate-600">
            <span>{user?.name}</span>
            <Button variant="secondary" onClick={logout}>
              Log out
            </Button>
          </div>
        </div>
      </header>

      <main className="mx-auto max-w-6xl px-4 py-6">
        <div className="mb-6 flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
          <TaskFilters filters={filters} onChange={setFilters} />
          <Button onClick={openCreateForm} className="shrink-0">
            + New task
          </Button>
        </div>

        {tasksQuery.isLoading && (
          <div className="flex justify-center py-16">
            <Spinner />
          </div>
        )}

        {tasksQuery.isError && (
          <ErrorBanner
            message="Failed to load tasks. Please check your connection and try again."
            onRetry={() => tasksQuery.refetch()}
          />
        )}

        {tasksQuery.isSuccess && (
          <TaskList
            tasks={tasksQuery.data}
            onEdit={openEditForm}
            onDelete={handleDelete}
            onCreate={openCreateForm}
            hasActiveFilters={hasActiveFilters}
          />
        )}
      </main>

      <TaskFormModal
        isOpen={isFormOpen}
        onClose={() => {
          setIsFormOpen(false);
          setEditingTask(null);
        }}
        onSubmit={handleSubmit}
        initialTask={editingTask}
        isSubmitting={createMutation.isPending || updateMutation.isPending}
      />
    </div>
  );
}

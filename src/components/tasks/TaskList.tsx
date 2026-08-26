import { Task } from "../../types/task";
import { TaskCard } from "./TaskCard";
import { EmptyState } from "../ui/EmptyState";
import { Button } from "../ui/Button";

interface TaskListProps {
  tasks: Task[];
  onEdit: (task: Task) => void;
  onDelete: (task: Task) => void;
  onCreate: () => void;
  hasActiveFilters: boolean;
}

export function TaskList({ tasks, onEdit, onDelete, onCreate, hasActiveFilters }: TaskListProps) {
  if (tasks.length === 0) {
    return (
      <EmptyState
        title={hasActiveFilters ? "No tasks match your filters" : "No tasks yet"}
        description={
          hasActiveFilters
            ? "Try clearing the search or filters."
            : "Create your first task to get started."
        }
        action={
          !hasActiveFilters && (
            <Button onClick={onCreate} className="mt-2">
              + New task
            </Button>
          )
        }
      />
    );
  }

  return (
    <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
      {tasks.map((task) => (
        <TaskCard key={task._id} task={task} onEdit={onEdit} onDelete={onDelete} />
      ))}
    </div>
  );
}

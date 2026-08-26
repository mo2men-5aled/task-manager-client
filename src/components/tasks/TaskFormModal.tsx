import { useEffect } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { Task, TaskInput } from "../../types/task";
import { Modal } from "../ui/Modal";
import { Input } from "../ui/Input";
import { Select } from "../ui/Select";
import { Button } from "../ui/Button";

const taskFormSchema = z.object({
  title: z.string().trim().min(1, "Title is required").max(200),
  description: z.string().trim().max(2000).optional(),
  status: z.enum(["todo", "in_progress", "done"]),
  priority: z.enum(["low", "medium", "high"]),
  dueDate: z.string().optional(),
});

type TaskFormValues = z.infer<typeof taskFormSchema>;

interface TaskFormModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (input: TaskInput) => Promise<void>;
  initialTask?: Task | null;
  isSubmitting: boolean;
}

export function TaskFormModal({ isOpen, onClose, onSubmit, initialTask, isSubmitting }: TaskFormModalProps) {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<TaskFormValues>({
    resolver: zodResolver(taskFormSchema),
    defaultValues: { title: "", description: "", status: "todo", priority: "medium", dueDate: "" },
  });

  useEffect(() => {
    if (isOpen) {
      reset({
        title: initialTask?.title ?? "",
        description: initialTask?.description ?? "",
        status: initialTask?.status ?? "todo",
        priority: initialTask?.priority ?? "medium",
        dueDate: initialTask?.dueDate ? initialTask.dueDate.slice(0, 10) : "",
      });
    }
  }, [isOpen, initialTask, reset]);

  async function submit(values: TaskFormValues) {
    await onSubmit({
      title: values.title,
      description: values.description,
      status: values.status,
      priority: values.priority,
      dueDate: values.dueDate || undefined,
    });
  }

  return (
    <Modal isOpen={isOpen} onClose={onClose} title={initialTask ? "Edit Task" : "New Task"}>
      <form onSubmit={handleSubmit(submit)} className="flex flex-col gap-4">
        <Input id="title" label="Title" error={errors.title?.message} {...register("title")} />
        <div className="flex flex-col gap-1">
          <label htmlFor="description" className="text-sm font-medium text-slate-700">
            Description
          </label>
          <textarea
            id="description"
            rows={3}
            className="rounded-md border border-slate-300 px-3 py-2 text-sm outline-none focus:ring-2 focus:ring-slate-400"
            {...register("description")}
          />
        </div>
        <div className="grid grid-cols-2 gap-4">
          <Select id="status" label="Status" {...register("status")}>
            <option value="todo">To Do</option>
            <option value="in_progress">In Progress</option>
            <option value="done">Done</option>
          </Select>
          <Select id="priority" label="Priority" {...register("priority")}>
            <option value="low">Low</option>
            <option value="medium">Medium</option>
            <option value="high">High</option>
          </Select>
        </div>
        <Input id="dueDate" label="Due date" type="date" {...register("dueDate")} />
        <div className="mt-2 flex justify-end gap-2">
          <Button type="button" variant="secondary" onClick={onClose}>
            Cancel
          </Button>
          <Button type="submit" isLoading={isSubmitting}>
            {initialTask ? "Save changes" : "Create task"}
          </Button>
        </div>
      </form>
    </Modal>
  );
}

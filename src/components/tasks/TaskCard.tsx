import { Task } from "../../types/task";
import { Button } from "../ui/Button";

const statusLabels: Record<Task["status"], string> = {
  todo: "To Do",
  in_progress: "In Progress",
  done: "Done",
};

const statusColors: Record<Task["status"], string> = {
  todo: "bg-slate-100 text-slate-700",
  in_progress: "bg-amber-100 text-amber-800",
  done: "bg-emerald-100 text-emerald-800",
};

const priorityColors: Record<Task["priority"], string> = {
  low: "bg-slate-100 text-slate-600",
  medium: "bg-blue-100 text-blue-700",
  high: "bg-red-100 text-red-700",
};

interface TaskCardProps {
  task: Task;
  onEdit: (task: Task) => void;
  onDelete: (task: Task) => void;
}

export function TaskCard({ task, onEdit, onDelete }: TaskCardProps) {
  return (
    <div className="flex flex-col gap-3 rounded-lg border border-slate-200 bg-white p-4 shadow-sm">
      <div className="flex items-start justify-between gap-2">
        <h3 className="font-medium text-slate-900">{task.title}</h3>
        <div className="flex gap-2">
          <Button variant="secondary" className="px-2 py-1 text-xs" onClick={() => onEdit(task)}>
            Edit
          </Button>
          <Button variant="danger" className="px-2 py-1 text-xs" onClick={() => onDelete(task)}>
            Delete
          </Button>
        </div>
      </div>
      {task.description && <p className="text-sm text-slate-600">{task.description}</p>}
      <div className="flex flex-wrap items-center gap-2 text-xs">
        <span className={`rounded-full px-2 py-1 font-medium ${statusColors[task.status]}`}>
          {statusLabels[task.status]}
        </span>
        <span className={`rounded-full px-2 py-1 font-medium capitalize ${priorityColors[task.priority]}`}>
          {task.priority} priority
        </span>
        {task.dueDate && (
          <span className="text-slate-500">Due {new Date(task.dueDate).toLocaleDateString()}</span>
        )}
      </div>
    </div>
  );
}

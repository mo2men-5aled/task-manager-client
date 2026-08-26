import { useState, useEffect } from "react";
import { TaskFilters as TaskFiltersType } from "../../types/task";
import { Input } from "../ui/Input";
import { Select } from "../ui/Select";

interface TaskFiltersProps {
  filters: TaskFiltersType;
  onChange: (filters: TaskFiltersType) => void;
}

export function TaskFilters({ filters, onChange }: TaskFiltersProps) {
  const [search, setSearch] = useState(filters.search ?? "");

  useEffect(() => {
    const timeout = setTimeout(() => {
      onChange({ ...filters, search: search || undefined });
      // eslint-disable-next-line react-hooks/exhaustive-deps
    }, 300);
    return () => clearTimeout(timeout);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [search]);

  return (
    <div className="flex flex-col gap-3 sm:flex-row sm:items-end">
      <div className="flex-1">
        <Input
          id="search"
          label="Search by title"
          placeholder="Search tasks..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
      </div>
      <Select
        id="status-filter"
        label="Status"
        value={filters.status ?? ""}
        onChange={(e) =>
          onChange({ ...filters, status: (e.target.value || undefined) as TaskFiltersType["status"] })
        }
      >
        <option value="">All</option>
        <option value="todo">To Do</option>
        <option value="in_progress">In Progress</option>
        <option value="done">Done</option>
      </Select>
      <Select
        id="priority-filter"
        label="Priority"
        value={filters.priority ?? ""}
        onChange={(e) =>
          onChange({ ...filters, priority: (e.target.value || undefined) as TaskFiltersType["priority"] })
        }
      >
        <option value="">All</option>
        <option value="low">Low</option>
        <option value="medium">Medium</option>
        <option value="high">High</option>
      </Select>
    </div>
  );
}

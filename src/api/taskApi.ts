import { httpClient } from "./httpClient";
import { Task, TaskFilters, TaskInput } from "../types/task";

export async function fetchTasks(filters: TaskFilters) {
  const params: Record<string, string> = {};
  if (filters.search) params.search = filters.search;
  if (filters.status) params.status = filters.status;
  if (filters.priority) params.priority = filters.priority;

  const res = await httpClient.get<{ tasks: Task[] }>("/tasks", { params });
  return res.data.tasks;
}

export async function createTaskRequest(input: TaskInput) {
  const res = await httpClient.post<{ task: Task }>("/tasks", input);
  return res.data.task;
}

export async function updateTaskRequest(id: string, input: Partial<TaskInput>) {
  const res = await httpClient.patch<{ task: Task }>(`/tasks/${id}`, input);
  return res.data.task;
}

export async function deleteTaskRequest(id: string) {
  await httpClient.delete(`/tasks/${id}`);
}

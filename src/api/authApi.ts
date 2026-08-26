import { httpClient } from "./httpClient";
import { AuthResponse, User } from "../types/auth";

export async function registerRequest(input: { name: string; email: string; password: string }) {
  const res = await httpClient.post<AuthResponse>("/auth/register", input);
  return res.data;
}

export async function loginRequest(input: { email: string; password: string }) {
  const res = await httpClient.post<AuthResponse>("/auth/login", input);
  return res.data;
}

export async function meRequest() {
  const res = await httpClient.get<{ user: User }>("/auth/me");
  return res.data.user;
}

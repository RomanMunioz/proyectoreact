import api from "../config/api";

export interface LoginCredentials {
  username: string;
  password: string;
}

export interface User {
  id: number;
  username: string;
  email: string;
  role: "ADMIN" | "USER";
  createdAt: string;
  lastLogin?: string;
}

export interface AuthResponse {
  user: User;
  token: string;
}

export const authService = {
  async login(credentials: LoginCredentials): Promise<AuthResponse> {
    if (
      (credentials.username === "admin" && credentials.password === "admin") ||
      (credentials.username === "user" && credentials.password === "user")
    ) {
      return {
        user: {
          id: 1,
          username: credentials.username,
          email: `${credentials.username}@test.com`,
          role: credentials.username === "admin" ? "ADMIN" : "USER",
          createdAt: new Date().toISOString(),
        },
        token: "fake-jwt-token",
      };
    }

    throw new Error("Credenciales inválidas");
  },
};

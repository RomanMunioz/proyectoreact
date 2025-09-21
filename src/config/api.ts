import axios from "axios";

const api = axios.create({
  baseURL: "http://localhost:9090",
});
export default api;

export interface User {
  id: number;
  username: string;
  email: string;
  role: "ADMIN" | "USER";
  createdAt: string;
  lastLogin?: string;
}

export interface CreateUserRequest {
  username: string;
  email: string;
  password: string;
  role: "ADMIN" | "USER";
}

export interface UpdateUserRequest {
  username?: string;
  email?: string;
  password?: string;
  role?: "ADMIN" | "USER";
}

export interface Product {
  id: number;
  name: string;
  description: string;
  quantity: number;
  price: number;
  category: string;
  minStock: number;
  createdAt: string;
  updatedAt: string;
}

export interface CreateProductRequest {
  name: string;
  description: string;
  quantity: number;
  price: number;
  category: string;
  minStock: number;
}

export interface UpdateProductRequest {
  name?: string;
  description?: string;
  quantity?: number;
  price?: number;
  category?: string;
  minStock?: number;
}

export const userService = {
  async getAllUsers(): Promise<User[]> {
    const response = await api.get("/users");
    return response.data;
  },

  async getUserById(id: number): Promise<User> {
    const response = await api.get(`/users/${id}`);
    return response.data;
  },

  async createUser(userData: CreateUserRequest): Promise<User> {
    const response = await api.post("/users", userData);
    return response.data;
  },

  async updateUser(id: number, userData: UpdateUserRequest): Promise<User> {
    const response = await api.put(`/users/${id}`, userData);
    return response.data;
  },

  async deleteUser(id: number): Promise<void> {
    await api.delete(`/users/${id}`);
  },

  async searchUsers(query: string): Promise<User[]> {
    const response = await api.get(
      `/users/search?q=${encodeURIComponent(query)}`
    );
    return response.data;
  },
};
export const productService = {
  async getAllProducts(): Promise<Product[]> {
    const response = await api.get("/products");
    return response.data;
  },

  // Nombres de métodos corregidos y tipos de retorno
  async getProductById(id: number): Promise<Product> {
    const response = await api.get(`/products/${id}`);
    return response.data;
  },

  async createProduct(productData: CreateProductRequest): Promise<Product> {
    const response = await api.post("/products", productData);
    return response.data;
  },

  async updateProduct(
    id: number,
    productData: UpdateProductRequest
  ): Promise<Product> {
    const response = await api.put(`/products/${id}`, productData);
    return response.data;
  },

  async deleteProduct(id: number): Promise<void> {
    await api.delete(`/products/${id}`);
  },

  async searchProduct(query: string): Promise<Product[]> {
    // Tipo de retorno corregido
    const response = await api.get(
      `/products/search?q=${encodeURIComponent(query)}`
    );
    return response.data;
  },
};

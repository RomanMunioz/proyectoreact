import axios from "axios";

// ✅ Configuración del API con debugging
const api = axios.create({
  baseURL: "https://nodebackend-mysql-api.onrender.com",
  timeout: 10000, // 10 segundos de timeout
});

// ✅ Interceptor para debugging
api.interceptors.request.use(
  (config) => {
    console.log(`Making request to: ${config.baseURL}${config.url}`);
    return config;
  },
  (error) => {
    console.error("Request error:", error);
    return Promise.reject(error);
  }
);

api.interceptors.response.use(
  (response) => {
    console.log(`Response from ${response.config.url}:`, response.status);
    return response;
  },
  (error) => {
    console.error("Response error:", {
      url: error.config?.url,
      status: error.response?.status,
      message: error.message,
    });
    return Promise.reject(error);
  }
);

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
  id: string; // ✅ Cambiado a string para coincidir con el backend
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
    try {
      const response = await api.get("/users");
      return response.data;
    } catch (error) {
      console.error("Error getting users:", error);
      throw error;
    }
  },

  async getUserById(id: number): Promise<User> {
    try {
      const response = await api.get(`/users/${id}`);
      return response.data;
    } catch (error) {
      console.error(`Error getting user ${id}:`, error);
      throw error;
    }
  },

  async createUser(userData: CreateUserRequest): Promise<User> {
    try {
      const response = await api.post("/users", userData);
      return response.data;
    } catch (error) {
      console.error("Error creating user:", error);
      throw error;
    }
  },

  async updateUser(id: number, userData: UpdateUserRequest): Promise<User> {
    try {
      const response = await api.put(`/users/${id}`, userData);
      return response.data;
    } catch (error) {
      console.error(`Error updating user ${id}:`, error);
      throw error;
    }
  },

  async deleteUser(id: number): Promise<void> {
    try {
      await api.delete(`/users/${id}`);
    } catch (error) {
      console.error(`Error deleting user ${id}:`, error);
      throw error;
    }
  },

  async searchUsers(query: string): Promise<User[]> {
    try {
      const response = await api.get(
        `/users/search?q=${encodeURIComponent(query)}`
      );
      return response.data;
    } catch (error) {
      console.error("Error searching users:", error);
      throw error;
    }
  },
};

export const productService = {
  async getAllProducts(): Promise<Product[]> {
    try {
      console.log("Getting all products...");
      const response = await api.get("/products");
      console.log("Products received:", response.data);
      return response.data;
    } catch (error) {
      console.error("Error getting products:", error);
      throw error;
    }
  },

  async getProductById(id: string): Promise<Product> {
    // ✅ Cambiado a string
    try {
      const response = await api.get(`/products/${id}`);
      return response.data;
    } catch (error) {
      console.error(`Error getting product ${id}:`, error);
      throw error;
    }
  },

  async createProduct(productData: CreateProductRequest): Promise<Product> {
    try {
      const response = await api.post("/products", productData);
      return response.data;
    } catch (error) {
      console.error("Error creating product:", error);
      throw error;
    }
  },

  async updateProduct(
    id: string,
    productData: UpdateProductRequest
  ): Promise<Product> {
    // ✅ Cambiado a string
    try {
      const response = await api.put(`/products/${id}`, productData);
      return response.data;
    } catch (error) {
      console.error(`Error updating product ${id}:`, error);
      throw error;
    }
  },

  async deleteProduct(id: string): Promise<void> {
    // ✅ Cambiado a string
    try {
      await api.delete(`/products/${id}`);
    } catch (error) {
      console.error(`Error deleting product ${id}:`, error);
      throw error;
    }
  },

  async searchProduct(query: string): Promise<Product[]> {
    try {
      const response = await api.get(
        `/products/search?q=${encodeURIComponent(query)}`
      );
      return response.data;
    } catch (error) {
      console.error("Error searching products:", error);
      throw error;
    }
  },

  // ✅ Nueva función para obtener categorías
  async getCategories(): Promise<string[]> {
    try {
      console.log("Getting categories...");
      const response = await api.get("/products/categories");
      console.log("Categories received:", response.data);
      return response.data;
    } catch (error) {
      console.error("Error getting categories:", error);
      throw error;
    }
  },
};

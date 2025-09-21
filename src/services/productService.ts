import api from "../config/api";

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

export interface StockMovement {
  id: number;
  productId: number;
  productName: string;
  type: "ENTRADA" | "SALIDA";
  quantity: number;
  date: string;
  userId: number;
  username: string;
  reason?: string;
}

export interface StockMovementRequest {
  productId: number;
  type: "ENTRADA" | "SALIDA";
  quantity: number;
  reason?: string;
}

export const productService = {
  async getAllProducts(): Promise<Product[]> {
    const response = await api.get("/products");
    return response.data;
  },

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

  async searchProducts(query: string): Promise<Product[]> {
    const response = await api.get(
      `/products/search?q=${encodeURIComponent(query)}`
    );
    return response.data;
  },

  async getProductsByCategory(category: string): Promise<Product[]> {
    const response = await api.get(
      `/products/category/${encodeURIComponent(category)}`
    );
    return response.data;
  },

  async getLowStockProducts(): Promise<Product[]> {
    const response = await api.get("/products/low-stock");
    return response.data;
  },

  async getCategories(): Promise<string[]> {
    const response = await api.get("/products/categories");
    return response.data;
  },

  // Stock movements
  async createStockMovement(
    movementData: StockMovementRequest
  ): Promise<StockMovement> {
    const response = await api.post("/stock-movements", movementData);
    return response.data;
  },

  async getStockMovements(limit?: number): Promise<StockMovement[]> {
    const response = await api.get(
      `/stock-movements${limit ? `?limit=${limit}` : ""}`
    );
    return response.data;
  },

  async getStockMovementsByProduct(
    productId: number
  ): Promise<StockMovement[]> {
    const response = await api.get(`/stock-movements/product/${productId}`);
    return response.data;
  },
};

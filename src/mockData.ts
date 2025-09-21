// src/mockData.ts
import { Product } from "./services/productService"; // Ajusta la ruta si es necesario

export const mockProducts: Product[] = [
  {
    id: 1,
    name: "Laptop Pro X",
    description: "High-performance laptop for professionals.",
    quantity: 50,
    price: 1200.5,
    category: "Electronics",
    minStock: 10,
    createdAt: "2023-01-15T10:00:00Z",
    updatedAt: "2024-09-10T14:30:00Z",
  },
  {
    id: 2,
    name: "Mechanical Keyboard",
    description: "Durable keyboard with tactile switches.",
    quantity: 150,
    price: 75.99,
    category: "Accessories",
    minStock: 25,
    createdAt: "2023-02-20T11:00:00Z",
    updatedAt: "2024-08-05T09:15:00Z",
  },
  {
    id: 3,
    name: "Wireless Mouse",
    description: "Ergonomic wireless mouse with long battery life.",
    quantity: 200,
    price: 25.0,
    category: "Accessories",
    minStock: 30,
    createdAt: "2023-03-10T13:00:00Z",
    updatedAt: "2024-09-01T11:00:00Z",
  },
  {
    id: 4,
    name: "4K Monitor",
    description: "27-inch 4K UHD monitor for stunning visuals.",
    quantity: 30,
    price: 350.0,
    category: "Electronics",
    minStock: 5,
    createdAt: "2023-04-05T09:00:00Z",
    updatedAt: "2024-07-20T16:00:00Z",
  },
  {
    id: 5,
    name: "USB-C Hub",
    description: "Multi-port USB-C hub for expanded connectivity.",
    quantity: 100,
    price: 40.0,
    category: "Accessories",
    minStock: 15,
    createdAt: "2023-05-12T10:30:00Z",
    updatedAt: "2024-09-15T10:00:00Z",
  },
];

// Puedes simular también otras llamadas a la API
export const mockCategories: string[] = [
  "Electronics",
  "Accessories",
  "Office",
  "Home",
];

export const mockProductService = {
  getAllProducts: () => {
    return new Promise<Product[]>((resolve) => {
      setTimeout(() => {
        // Simula latencia de red
        resolve(mockProducts);
      }, 500);
    });
  },
  getProductById: (id: number) => {
    return new Promise<Product>((resolve, reject) => {
      setTimeout(() => {
        const product = mockProducts.find((p) => p.id === id);
        if (product) {
          resolve(product);
        } else {
          reject({ status: 404, message: "Product not found" });
        }
      }, 300);
    });
  },
  createProduct: (productData: any) => {
    // Usamos 'any' para simplificar el mock
    return new Promise<Product>((resolve) => {
      setTimeout(() => {
        const newProduct: Product = {
          id: mockProducts.length + 1,
          ...productData,
          createdAt: new Date().toISOString(),
          updatedAt: new Date().toISOString(),
        };
        mockProducts.push(newProduct);
        resolve(newProduct);
      }, 400);
    });
  },
  updateProduct: (id: number, productData: any) => {
    return new Promise<Product>((resolve, reject) => {
      setTimeout(() => {
        const index = mockProducts.findIndex((p) => p.id === id);
        if (index !== -1) {
          mockProducts[index] = {
            ...mockProducts[index],
            ...productData,
            updatedAt: new Date().toISOString(),
          };
          resolve(mockProducts[index]);
        } else {
          reject({ status: 404, message: "Product not found" });
        }
      }, 400);
    });
  },
  deleteProduct: (id: number) => {
    return new Promise<void>((resolve, reject) => {
      setTimeout(() => {
        const initialLength = mockProducts.length;
        const filteredProducts = mockProducts.filter((p) => p.id !== id);
        if (filteredProducts.length < initialLength) {
          // Limpia la referencia al array original si usas push
          mockProducts.length = 0;
          mockProducts.push(...filteredProducts);
          resolve();
        } else {
          reject({ status: 404, message: "Product not found" });
        }
      }, 300);
    });
  },
  searchProducts: (query: string) => {
    return new Promise<Product[]>((resolve) => {
      setTimeout(() => {
        const lowerQuery = query.toLowerCase();
        const results = mockProducts.filter(
          (p) =>
            p.name.toLowerCase().includes(lowerQuery) ||
            p.description.toLowerCase().includes(lowerQuery)
        );
        resolve(results);
      }, 400);
    });
  },
  getCategories: () => {
    return new Promise<string[]>((resolve) => {
      setTimeout(() => {
        resolve(mockCategories);
      }, 300);
    });
  },
  getProductsByCategory: (category: string) => {
    return new Promise<Product[]>((resolve) => {
      setTimeout(() => {
        const results = mockProducts.filter((p) => p.category === category);
        resolve(results);
      }, 400);
    });
  },
};

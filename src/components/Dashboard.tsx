import React, { useState, useEffect } from 'react';
import { Package, Users, TrendingUp, AlertTriangle, Plus, Minus } from 'lucide-react';
import { useAuth } from '../contexts/AuthContext';

interface Product {
  id: number;
  name: string;
  description: string;
  quantity: number;
  price: number;
  category: string;
  minStock: number;
}

interface StockMovement {
  id: number;
  productId: number;
  productName: string;
  type: 'entrada' | 'salida';
  quantity: number;
  date: string;
  user: string;
}

export default function Dashboard() {
  const { user } = useAuth();
  const [products, setProducts] = useState<Product[]>([]);
  const [movements, setMovements] = useState<StockMovement[]>([]);
  const [selectedProduct, setSelectedProduct] = useState<number | null>(null);
  const [movementType, setMovementType] = useState<'entrada' | 'salida'>('entrada');
  const [movementQuantity, setMovementQuantity] = useState('');
  const [showMovementModal, setShowMovementModal] = useState(false);

  useEffect(() => {
    // Mock data - replace with actual API calls
    setProducts([
      {
        id: 1,
        name: 'Laptop Dell XPS 13',
        description: 'Laptop ultrabook de alta gama',
        quantity: 15,
        price: 1299.99,
        category: 'Electrónicos',
        minStock: 5
      },
      {
        id: 2,
        name: 'Mouse Logitech MX Master',
        description: 'Mouse inalámbrico ergonómico',
        quantity: 3,
        price: 99.99,
        category: 'Accesorios',
        minStock: 10
      },
      {
        id: 3,
        name: 'Monitor Samsung 27"',
        description: 'Monitor 4K para profesionales',
        quantity: 8,
        price: 399.99,
        category: 'Monitores',
        minStock: 5
      },
      {
        id: 4,
        name: 'Teclado Mecánico',
        description: 'Teclado mecánico RGB',
        quantity: 25,
        price: 149.99,
        category: 'Accesorios',
        minStock: 15
      }
    ]);

    setMovements([
      {
        id: 1,
        productId: 1,
        productName: 'Laptop Dell XPS 13',
        type: 'entrada',
        quantity: 10,
        date: new Date().toISOString(),
        user: 'admin'
      },
      {
        id: 2,
        productId: 2,
        productName: 'Mouse Logitech MX Master',
        type: 'salida',
        quantity: 7,
        date: new Date(Date.now() - 86400000).toISOString(),
        user: 'user'
      }
    ]);
  }, []);

  const lowStockProducts = products.filter(p => p.quantity <= p.minStock);
  const totalProducts = products.length;
  const totalValue = products.reduce((sum, p) => sum + (p.quantity * p.price), 0);

  const handleMovement = () => {
    if (!selectedProduct || !movementQuantity) return;

    const product = products.find(p => p.id === selectedProduct);
    if (!product) return;

    const quantity = parseInt(movementQuantity);
    if (movementType === 'salida' && quantity > product.quantity) {
      alert('No hay suficiente stock disponible');
      return;
    }

    // Update product quantity
    setProducts(prev => prev.map(p => 
      p.id === selectedProduct 
        ? { ...p, quantity: movementType === 'entrada' ? p.quantity + quantity : p.quantity - quantity }
        : p
    ));

    // Add movement record
    const newMovement: StockMovement = {
      id: movements.length + 1,
      productId: selectedProduct,
      productName: product.name,
      type: movementType,
      quantity,
      date: new Date().toISOString(),
      user: user?.username || 'unknown'
    };

    setMovements(prev => [newMovement, ...prev]);
    
    // Reset form
    setSelectedProduct(null);
    setMovementQuantity('');
    setShowMovementModal(false);
  };

  return (
    <div className="space-y-8">
      <div className="flex justify-between items-center">
        <h1 className="text-3xl font-bold text-gray-900">Dashboard</h1>
        <button
          onClick={() => setShowMovementModal(true)}
          className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors flex items-center gap-2"
        >
          <TrendingUp className="h-5 w-5" />
          Registrar Movimiento
        </button>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
          <div className="flex items-center">
            <div className="p-2 bg-blue-100 rounded-lg">
              <Package className="h-6 w-6 text-blue-600" />
            </div>
            <div className="ml-4">
              <p className="text-sm font-medium text-gray-600">Total Productos</p>
              <p className="text-2xl font-bold text-gray-900">{totalProducts}</p>
            </div>
          </div>
        </div>

        <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
          <div className="flex items-center">
            <div className="p-2 bg-green-100 rounded-lg">
              <TrendingUp className="h-6 w-6 text-green-600" />
            </div>
            <div className="ml-4">
              <p className="text-sm font-medium text-gray-600">Valor Total</p>
              <p className="text-2xl font-bold text-gray-900">${totalValue.toLocaleString()}</p>
            </div>
          </div>
        </div>

        <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
          <div className="flex items-center">
            <div className="p-2 bg-yellow-100 rounded-lg">
              <AlertTriangle className="h-6 w-6 text-yellow-600" />
            </div>
            <div className="ml-4">
              <p className="text-sm font-medium text-gray-600">Stock Bajo</p>
              <p className="text-2xl font-bold text-gray-900">{lowStockProducts.length}</p>
            </div>
          </div>
        </div>

        <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
          <div className="flex items-center">
            <div className="p-2 bg-purple-100 rounded-lg">
              <Users className="h-6 w-6 text-purple-600" />
            </div>
            <div className="ml-4">
              <p className="text-sm font-medium text-gray-600">Movimientos Hoy</p>
              <p className="text-2xl font-bold text-gray-900">{movements.filter(m => 
                new Date(m.date).toDateString() === new Date().toDateString()
              ).length}</p>
            </div>
          </div>
        </div>
      </div>

      {/* Low Stock Alert */}
      {lowStockProducts.length > 0 && (
        <div className="bg-yellow-50 border border-yellow-200 rounded-xl p-6">
          <div className="flex items-center mb-4">
            <AlertTriangle className="h-6 w-6 text-yellow-600 mr-2" />
            <h3 className="text-lg font-semibold text-yellow-800">Productos con Stock Bajo</h3>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {lowStockProducts.map(product => (
              <div key={product.id} className="bg-white p-4 rounded-lg border border-yellow-200">
                <h4 className="font-medium text-gray-900">{product.name}</h4>
                <p className="text-sm text-gray-600">Stock actual: {product.quantity}</p>
                <p className="text-sm text-gray-600">Stock mínimo: {product.minStock}</p>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Recent Movements */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-100">
        <div className="p-6 border-b border-gray-200">
          <h3 className="text-lg font-semibold text-gray-900">Movimientos Recientes</h3>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Producto
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Tipo
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Cantidad
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Usuario
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Fecha
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {movements.slice(0, 10).map(movement => (
                <tr key={movement.id}>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                    {movement.productName}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                      movement.type === 'entrada' 
                        ? 'bg-green-100 text-green-800' 
                        : 'bg-red-100 text-red-800'
                    }`}>
                      {movement.type === 'entrada' ? (
                        <Plus className="h-3 w-3 mr-1" />
                      ) : (
                        <Minus className="h-3 w-3 mr-1" />
                      )}
                      {movement.type}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                    {movement.quantity}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                    {movement.user}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    {new Date(movement.date).toLocaleString()}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Movement Modal */}
      {showMovementModal && (
        <div className="fixed inset-0 bg-gray-600 bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-xl p-6 w-full max-w-md mx-4">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Registrar Movimiento de Stock</h3>
            
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Producto</label>
                <select
                  value={selectedProduct || ''}
                  onChange={(e) => setSelectedProduct(Number(e.target.value))}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                >
                  <option value="">Seleccionar producto</option>
                  {products.map(product => (
                    <option key={product.id} value={product.id}>
                      {product.name} (Stock: {product.quantity})
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Tipo de Movimiento</label>
                <div className="flex space-x-4">
                  <label className="flex items-center">
                    <input
                      type="radio"
                      value="entrada"
                      checked={movementType === 'entrada'}
                      onChange={(e) => setMovementType(e.target.value as 'entrada' | 'salida')}
                      className="mr-2"
                    />
                    <span className="text-green-600">Entrada</span>
                  </label>
                  <label className="flex items-center">
                    <input
                      type="radio"
                      value="salida"
                      checked={movementType === 'salida'}
                      onChange={(e) => setMovementType(e.target.value as 'entrada' | 'salida')}
                      className="mr-2"
                    />
                    <span className="text-red-600">Salida</span>
                  </label>
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Cantidad</label>
                <input
                  type="number"
                  min="1"
                  value={movementQuantity}
                  onChange={(e) => setMovementQuantity(e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  placeholder="Ingresa la cantidad"
                />
              </div>
            </div>

            <div className="flex justify-end space-x-3 mt-6">
              <button
                onClick={() => setShowMovementModal(false)}
                className="px-4 py-2 text-gray-700 bg-gray-100 rounded-lg hover:bg-gray-200 transition-colors"
              >
                Cancelar
              </button>
              <button
                onClick={handleMovement}
                disabled={!selectedProduct || !movementQuantity}
                className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
              >
                Registrar
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
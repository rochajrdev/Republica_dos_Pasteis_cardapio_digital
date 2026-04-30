'use client';

import { useState } from 'react';
import { Product } from '@/data/menu-data';
import { useCart } from '@/hooks/use-cart';

interface ProductCardProps {
  product: Product;
  category: string;
}

export function ProductCard({ product, category }: ProductCardProps) {
  const [quantity, setQuantity] = useState(1);
  const addItem = useCart((state) => state.addItem);

  const handleIncrease = () => setQuantity((prev) => Math.min(prev + 1, 20));
  const handleDecrease = () => setQuantity((prev) => Math.max(prev - 1, 1));

  const handleAdd = () => {
    addItem(product, quantity);
    setQuantity(1);
  };

  const getCategoryClasses = () => {
    if (category === 'bebidas') return 'bg-gradient-to-br from-white to-blue-50 dark:from-gray-800 dark:to-blue-900/10 hover:rotate-1';
    if (category === 'doces') return 'bg-gradient-to-br from-white to-pink-50 dark:from-gray-800 dark:to-pink-900/10';
    if (category === 'especiais') return 'bg-gradient-to-br from-white to-orange-50 dark:from-gray-800 dark:to-orange-900/10';
    return '';
  };

  return (
    <div className={`flex gap-3 menu-item p-3 rounded-lg animate-fade-in bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 shadow-md hover:shadow-lg transition-all hover:-translate-y-1 ${getCategoryClasses()}`}>
      <img 
        src={product.image} 
        alt={product.name} 
        className="w-28 h-28 rounded-md hover:scale-110 duration-300 object-cover shadow-sm"
        loading="lazy"
      />
      <div className="w-full flex flex-col justify-between">
        <div>
          <h3 className="font-bold text-lg text-gray-900 dark:text-gray-100">{product.name}</h3>
          <p className="text-sm text-gray-600 dark:text-gray-400 mt-1">{product.description}</p>
        </div>
        
        <div className="flex items-center gap-2 justify-between mt-3">
          <p className="font-bold text-lg text-gray-900 dark:text-gray-100">
            R$ {product.price.toFixed(2)}
          </p>
          <div className="flex items-center gap-2">
            <div className="flex items-center bg-gray-100 dark:bg-gray-700 rounded" role="group">
              <button 
                onClick={handleDecrease}
                className="px-2 py-1 text-orange-600 dark:text-orange-400 quantity-btn hover:bg-gray-200 dark:hover:bg-gray-600 rounded-l focus:outline-none" 
              >
                <i className="fas fa-minus"></i>
              </button>
              <span className="quantity-display px-3 font-medium">{quantity}</span>
              <button 
                onClick={handleIncrease}
                className="px-2 py-1 text-orange-600 dark:text-orange-400 quantity-btn hover:bg-gray-200 dark:hover:bg-gray-600 rounded-r focus:outline-none" 
              >
                <i className="fas fa-plus"></i>
              </button>
            </div>
            <button 
              onClick={handleAdd}
              className="bg-orange-600 hover:bg-orange-700 focus:ring-2 focus:ring-orange-500 px-5 py-2 rounded add-to-cart-btn text-white transition-colors shadow-sm hover:shadow-md"
            >
              <i className="fa fa-cart-plus text-lg"></i>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

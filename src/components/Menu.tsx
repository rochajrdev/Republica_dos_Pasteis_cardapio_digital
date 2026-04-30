'use client';

import { useState } from 'react';
import { MENU_DATA } from '@/data/menu-data';
import { ProductCard } from './ProductCard';

export function Menu() {
  const [activeCategory, setActiveCategory] = useState('pasteis');

  const specials = (MENU_DATA.pasteis || []).map(p => ({
    ...p,
    id: `cap-${p.id}`,
    name: `Caprichado - ${p.name}`,
    price: p.price + 2.00,
    description: `${p.description} (Dobro de recheio)`
  }));

  const categories = [
    { id: 'pasteis', label: 'Pastéis', icon: 'fa-utensils', colorClass: 'bg-orange-600' },
    { id: 'especiais', label: 'Caprichado', icon: 'fa-star text-yellow-500', colorClass: 'bg-orange-600' },
    { id: 'doces', label: 'Doces', icon: 'fa-cookie text-pink-500', colorClass: 'bg-pink-500' },
    { id: 'cuscuz', label: 'Cuscuz', icon: 'fa-bowl-rice text-amber-700', colorClass: 'bg-amber-700' },
    { id: 'bebidas', label: 'Bebidas', icon: 'fa-glass-cheers text-blue-500', colorClass: 'bg-blue-500' },
  ];

  const getProducts = (id: string) => {
    if (id === 'especiais') return specials;
    return (MENU_DATA as any)[id] || [];
  };

  return (
    <>
      {/* CATEGORY TABS */}
      <div className="sticky top-0 z-40 bg-white dark:bg-zinc-900 shadow-md border-b border-gray-200 dark:border-gray-800">
        <div className="mx-auto max-w-7xl px-2 py-3 overflow-x-auto no-scrollbar">
          <nav className="flex justify-center gap-3 md:gap-4" role="tablist">
            {categories.map((cat) => (
              <button
                key={cat.id}
                onClick={() => setActiveCategory(cat.id)}
                className={`px-5 py-2.5 rounded-full font-semibold transition-all flex items-center gap-2 whitespace-nowrap ${
                  activeCategory === cat.id 
                    ? 'bg-orange-600 text-white shadow-md active-tab' 
                    : 'bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-300 hover:bg-gray-200'
                }`}
                role="tab"
                aria-selected={activeCategory === cat.id}
              >
                <i className={`fas ${cat.icon}`}></i>
                {cat.label}
              </button>
            ))}
          </nav>
        </div>
      </div>

      {/* MAIN MENU CONTENT */}
      <main id="menu-sections" className="mx-auto max-w-7xl px-4 mt-8 pb-32">
        {categories.map((cat) => (
          <section 
            key={cat.id} 
            id={`section-${cat.id}`} 
            className={`tab-content animate-fade-in ${activeCategory === cat.id ? '' : 'hidden'}`}
          >
            {cat.id === 'especiais' ? (
              <div className="mb-4 bg-orange-600 p-4 rounded-xl text-white shadow-lg">
                <h2 className="text-2xl font-bold text-center">Pastel Caprichado</h2>
                <p className="text-center text-orange-100 text-sm">
                  (Mesmo tamanho, com o dobro de recheio - Adicional de R$ 2,00)
                </p>
              </div>
            ) : (
              <div className="mb-6 flex items-center gap-3">
                <div className={`h-8 w-1.5 ${cat.colorClass} rounded-full`}></div>
                <h2 className="text-2xl font-bold dark:text-white">
                  {cat.id === 'pasteis' ? 'Pastéis Salgados' : 
                   cat.id === 'doces' ? 'Pastéis Doces' : 
                   cat.id === 'cuscuz' ? 'Cuscuz Recheado' : cat.label}
                </h2>
              </div>
            )}
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 lg:gap-8">
              {getProducts(cat.id).map((product: any) => (
                <ProductCard key={product.id} product={product} category={cat.id} />
              ))}
            </div>
          </section>
        ))}
      </main>
    </>
  );
}

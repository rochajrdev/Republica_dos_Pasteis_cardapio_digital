'use client';

import { useEffect, useState } from 'react';
import { ThemeToggle } from './ThemeToggle';

export function Header() {
  const [isOpen, setIsOpen] = useState(false);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    const checkOpen = () => {
      const now = new Date();
      const day = now.getDay();
      const hours = now.getHours();
      
      // Aberto Terça(2) a Domingo(0). Fechado Segunda(1)
      const openDays = [0, 2, 3, 4, 5, 6];
      const isDayOpen = openDays.includes(day);
      const isTimeOpen = hours >= 16 && hours < 22;
      
      setIsOpen(isDayOpen && isTimeOpen);
    };

    checkOpen();
    const interval = setInterval(checkOpen, 60000);
    return () => clearInterval(interval);
  }, []);

  return (
    <header className="w-full h-[420px] bg-zinc-900 dark:bg-zinc-800 bg-home bg-cover bg-center relative">
      <nav className="absolute top-0 left-0 right-0 flex justify-end p-4 z-10">
        <ThemeToggle />
      </nav>

      <div className="w-full h-full flex flex-col justify-center items-center animate-fade-in bg-black/40">
        <img 
          src="/assets/avatar.png" 
          alt="Logo República dos Pastéis"
          className="w-32 h-32 rounded-full shadow-lg border-4 border-orange-500 hover:scale-110 duration-300" 
        />
        <h1 className="text-4xl mt-4 mb-2 font-bold text-white text-shadow text-center">
          República dos Pastéis
        </h1>

        <div className="flex flex-col items-center text-white/90 space-y-1 text-center px-4">
          <a className="hover:text-orange-300 transition-colors flex items-center gap-2"
            href="https://maps.app.goo.gl/EBC9Kow62HcokxGn6" target="_blank" rel="noopener">
            <i className="fas fa-map-marker-alt text-orange-500"></i>
            <span>Av. Doutor José Thomas D'Avila Nabuco, 579</span>
          </a>
          <a className="hover:text-orange-300 transition-colors flex items-center gap-2" href="tel:+5579981575934">
            <i className="fas fa-phone text-orange-500"></i>
            <span>(79) 9 8157-5934</span>
          </a>
        </div>

        <div 
          className={`${(mounted && isOpen) ? 'bg-green-600 border-green-500' : 'bg-red-600 border-red-500'} px-4 py-1.5 rounded-full mt-5 shadow-lg border transition-colors duration-500`}
          suppressHydrationWarning
        >
          <span className="text-white font-medium flex items-center gap-2 text-sm">
            <i className="fas fa-clock"></i>
            <span>Terça à Domingo - 16:00 às 22:00</span>
          </span>
        </div>
      </div>
    </header>
  );
}

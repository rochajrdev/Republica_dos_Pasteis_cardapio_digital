'use client';

import { useState, useEffect } from 'react';
import { useCart } from '@/hooks/use-cart';

export function CartModal() {
  const { items, removeItem, updateQuantity, clearCart, getTotalItems, getTotalPrice } = useCart();
  const [open, setOpen] = useState(false);
  const [step, setStep] = useState(1);
  const [isDelivery, setIsDelivery] = useState(true);
  const [address, setAddress] = useState('');
  const [paymentMethod, setPaymentMethod] = useState('');
  const [isOpenNow, setIsOpenNow] = useState(true);

  useEffect(() => {
    const checkOpen = () => {
      const now = new Date();
      const day = now.getDay();
      const hours = now.getHours();
      const openDays = [0, 2, 3, 4, 5, 6];
      const isDayOpen = openDays.includes(day);
      const isTimeOpen = hours >= 16 && hours < 22;
      setIsOpenNow(isDayOpen && isTimeOpen);
    };
    checkOpen();
  }, [open]);

  const totalItems = getTotalItems();
  const totalPrice = getTotalPrice();

  const handleNext = () => setStep(prev => prev + 1);
  const handlePrev = () => setStep(prev => prev - 1);

  const handleCheckout = () => {
    if (!isOpenNow) {
      alert('Estamos fechados no momento. Atendimento: Ter-Dom, 16:00–22:00.');
      return;
    }
    if (isDelivery && !address.trim()) {
      alert('Por favor, informe seu endereço para entrega.');
      return;
    }
    if (!paymentMethod) {
      alert('Por favor, selecione uma forma de pagamento.');
      return;
    }

    const itemsList = items.map(item => 
      `*${item.name}* \nQuantidade: ${item.quantity}\nPreço: R$${item.price.toFixed(2)}\n`
    ).join('\n');

    const message = encodeURIComponent(
      `🔔 *NOVO PEDIDO - República dos Pastéis* 🔔\n\n` +
      `📝 *ITENS DO PEDIDO:*\n${itemsList}\n` +
      `💰 *TOTAL: R$ ${totalPrice.toFixed(2)}*\n\n` +
      `🛵 *MÉTODO DE RECEBIMENTO:* ${isDelivery ? 'Entrega em casa' : 'Retirada no balcão'}\n` +
      (isDelivery ? `📍 *ENDEREÇO:* ${address}\n` : '') +
      `💳 *FORMA DE PAGAMENTO:* ${paymentMethod}\n\n` +
      `🚀 *Aguardando confirmação...*`
    );

    window.open(`https://wa.me/5579998495574?text=${message}`, '_blank');
    clearCart();
    setOpen(false);
    setStep(1);
  };

  if (totalItems === 0 && !open) return null;

  return (
    <>
      {/* BOTÃO FLUTUANTE DO CARRINHO */}
      {!open && (
        <button 
          id="fixed-cart-btn"
          onClick={() => setOpen(true)}
          className="fixed bottom-6 right-6 z-50 bg-orange-600 text-white p-4 rounded-full shadow-2xl hover:scale-110 active:scale-95 transition-all group"
        >
          <div className="relative">
            <i className="fas fa-shopping-basket text-2xl"></i>
            <span id="fixed-cart-count"
              className="absolute -top-2 -right-2 bg-green-500 text-[10px] font-bold h-5 w-5 rounded-full flex items-center justify-center border-2 border-white dark:border-zinc-900">
              {totalItems}
            </span>
          </div>
          <span
            className="absolute right-full mr-3 bg-zinc-800 text-white text-xs py-1 px-3 rounded-lg opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none whitespace-nowrap shadow-xl">
            Ver meu pedido
          </span>
        </button>
      )}

      {/* MODAL DO CARRINHO */}
      <div 
        id="cart-modal"
        className={`fixed inset-0 bg-black/60 z-50 flex flex-col items-center justify-end md:justify-center backdrop-blur-sm p-0 md:p-4 transition-all duration-300 ${open ? 'flex' : 'hidden'}`}
      >
        <div className="bg-white dark:bg-zinc-800 w-full max-w-lg rounded-t-3xl md:rounded-3xl overflow-hidden flex flex-col shadow-2xl animate-slide-up h-[90vh] md:h-auto md:max-h-[85vh]">
          
          {/* Modal Header */}
          <div className="p-4 border-b dark:border-zinc-700 flex items-center justify-between">
            <h3 className="text-xl font-bold flex items-center gap-2 dark:text-white">
              <i className="fas fa-shopping-cart text-orange-500"></i>
              <span>{step === 1 ? 'Carrinho' : step === 2 ? 'Recebimento' : step === 3 ? 'Endereço' : 'Pagamento'}</span>
            </h3>
            <button onClick={() => setOpen(false)} className="p-2 hover:bg-gray-100 dark:hover:bg-zinc-700 rounded-full text-gray-500">
              <i className="fas fa-times text-xl"></i>
            </button>
          </div>

          {/* Steps Indicator */}
          <div className="px-6 py-4 border-b dark:border-zinc-700 bg-gray-50 dark:bg-zinc-800/50">
            <div className="flex justify-between items-center relative">
              {[1, 2, 3, 4].map(s => (
                <div key={s} className={`checkout-step ${step === s ? 'active' : s < step ? 'completed' : ''}`} data-step={s}>
                  <div className="step-circle">{s}</div>
                  <span className="text-[10px] md:text-xs font-semibold mt-1">
                    {s === 1 ? 'Carrinho' : s === 2 ? 'Entrega' : s === 3 ? 'Endereço' : 'Pagar'}
                  </span>
                </div>
              ))}
            </div>
          </div>

          {/* Content Area */}
          <div className="flex-1 overflow-hidden relative">
            {/* Step 1: Items */}
            <div className={`checkout-step-content p-6 flex flex-col h-full ${step === 1 ? 'active' : 'hidden'}`}>
              <div className="cart-scrollable-content flex-1 overflow-y-auto pr-2">
                <div id="cart-items" className="space-y-3">
                  {items.map(item => (
                    <div key={item.id} className="flex justify-between items-center p-3 bg-gray-50 dark:bg-zinc-700/50 rounded-xl">
                      <div>
                        <p className="font-bold dark:text-white">{item.name}</p>
                        <p className="text-sm text-gray-500">R$ {item.price.toFixed(2)}</p>
                      </div>
                      <div className="flex items-center gap-3">
                        <div className="flex items-center bg-white dark:bg-zinc-800 rounded-lg border dark:border-zinc-700">
                          <button onClick={() => updateQuantity(item.id, -1)} className="p-1 px-2 text-orange-600"><i className="fas fa-minus text-xs"></i></button>
                          <span className="px-2 font-bold dark:text-white">{item.quantity}</span>
                          <button onClick={() => updateQuantity(item.id, 1)} className="p-1 px-2 text-orange-600"><i className="fas fa-plus text-xs"></i></button>
                        </div>
                        <button onClick={() => removeItem(item.id)} className="text-red-500"><i className="fas fa-trash-can"></i></button>
                      </div>
                    </div>
                  ))}
                </div>
                <div className="mt-4 pt-4 border-t dark:border-zinc-700">
                   <div className="flex justify-between text-xl font-bold text-orange-600">
                      <span>Total:</span>
                      <span>R$ {totalPrice.toFixed(2)}</span>
                   </div>
                </div>
              </div>
              <button onClick={handleNext} className="w-full bg-orange-600 text-white py-4 rounded-xl font-bold shadow-lg mt-4 flex items-center justify-center gap-2">
                <span>Continuar</span>
                <i className="fas fa-arrow-right"></i>
              </button>
            </div>

            {/* Step 2: Delivery Option */}
            <div className={`checkout-step-content p-6 flex flex-col h-full ${step === 2 ? 'active' : 'hidden'}`}>
              <div className="flex-1 space-y-4">
                <h4 className="font-bold text-lg dark:text-white">Escolha como prefere receber:</h4>
                <div className="space-y-3">
                  <label className={`flex items-center p-4 border-2 rounded-2xl cursor-pointer transition-all ${isDelivery ? 'border-orange-500 bg-orange-50 dark:bg-orange-900/20' : 'border-gray-200 dark:border-zinc-700'}`}>
                    <input type="radio" name="delivery" checked={isDelivery} onChange={() => setIsDelivery(true)} className="w-5 h-5 accent-orange-600" />
                    <div className="ml-4">
                      <p className="font-bold dark:text-white">Entrega no Endereço</p>
                      <p className="text-sm text-gray-500">Levamos até você!</p>
                    </div>
                  </label>
                  <label className={`flex items-center p-4 border-2 rounded-2xl cursor-pointer transition-all ${!isDelivery ? 'border-orange-500 bg-orange-50 dark:bg-orange-900/20' : 'border-gray-200 dark:border-zinc-700'}`}>
                    <input type="radio" name="delivery" checked={!isDelivery} onChange={() => setIsDelivery(false)} className="w-5 h-5 accent-orange-600" />
                    <div className="ml-4">
                      <p className="font-bold dark:text-white">Retirada na Loja</p>
                      <p className="text-sm text-gray-500">Você busca no nosso balcão.</p>
                    </div>
                  </label>
                </div>
              </div>
              <div className="flex gap-3 mt-4">
                <button onClick={handlePrev} className="flex-1 bg-gray-200 dark:bg-zinc-700 py-4 rounded-xl font-bold">Voltar</button>
                <button onClick={handleNext} className="flex-[2] bg-orange-600 text-white py-4 rounded-xl font-bold shadow-lg">Próximo</button>
              </div>
            </div>

            {/* Step 3: Address */}
            <div className={`checkout-step-content p-6 flex flex-col h-full ${step === 3 ? 'active' : 'hidden'}`}>
              <div className="flex-1 space-y-4">
                <h4 className="font-bold text-lg dark:text-white">{isDelivery ? 'Onde devemos entregar?' : 'Local de Retirada'}</h4>
                {isDelivery ? (
                  <textarea 
                    className="w-full bg-gray-100 dark:bg-zinc-700 rounded-xl p-4 min-h-[120px] dark:text-white"
                    placeholder="Rua, número, complemento e ponto de referência..."
                    value={address}
                    onChange={(e) => setAddress(e.target.value)}
                  />
                ) : (
                  <div className="bg-orange-50 dark:bg-orange-900/20 p-4 rounded-xl border border-orange-200">
                    <p className="font-bold text-orange-800 dark:text-orange-200">Nosso Endereço:</p>
                    <p className="text-sm">Av. Doutor José Thomas D'Avila Nabuco, 579 - Aracaju</p>
                  </div>
                )}
              </div>
              <div className="flex gap-3 mt-4">
                <button onClick={handlePrev} className="flex-1 bg-gray-200 dark:bg-zinc-700 py-4 rounded-xl font-bold">Voltar</button>
                <button onClick={handleNext} className="flex-[2] bg-orange-600 text-white py-4 rounded-xl font-bold shadow-lg">Continuar</button>
              </div>
            </div>

            {/* Step 4: Payment */}
            <div className={`checkout-step-content p-6 flex flex-col h-full ${step === 4 ? 'active' : 'hidden'}`}>
              <div className="flex-1 space-y-6 overflow-y-auto pr-2">
                <div className="bg-orange-50 dark:bg-orange-900/20 rounded-2xl border-2 border-orange-200 p-5">
                   <h4 className="font-bold text-orange-800 dark:text-orange-200 mb-3 flex items-center gap-2">
                      <i className="fas fa-list-check"></i> Resumo Detalhado
                   </h4>
                   <div className="space-y-1 text-sm">
                      {items.map(item => (
                        <div key={item.id} className="flex justify-between">
                          <span>{item.quantity}x {item.name}</span>
                          <span className="font-bold">R$ {(item.price * item.quantity).toFixed(2)}</span>
                        </div>
                      ))}
                      <div className="border-t border-orange-200 mt-2 pt-2 flex justify-between font-bold text-orange-600">
                        <span>Total:</span>
                        <span>R$ {totalPrice.toFixed(2)}</span>
                      </div>
                   </div>
                </div>
                <div>
                  <label className="text-sm font-semibold mb-2 block dark:text-gray-300">Forma de Pagamento*</label>
                  <select 
                    value={paymentMethod}
                    onChange={(e) => setPaymentMethod(e.target.value)}
                    className="w-full bg-gray-100 dark:bg-zinc-700 rounded-xl p-4 dark:text-white"
                  >
                    <option value="">Selecione...</option>
                    <option value="Pix">Pix</option>
                    <option value="Cartão de Crédito">Cartão de Crédito</option>
                    <option value="Cartão de Débito">Cartão de Débito</option>
                    <option value="Dinheiro">Dinheiro</option>
                  </select>
                </div>
              </div>
              <div className="flex gap-3 mt-4">
                <button onClick={handlePrev} className="flex-1 bg-gray-200 dark:bg-zinc-700 py-4 rounded-xl font-bold">Voltar</button>
                <button onClick={handleCheckout} className="flex-[2] bg-green-600 text-white py-4 rounded-xl font-bold shadow-lg flex items-center justify-center gap-2">
                  <i className="fab fa-whatsapp"></i> Enviar WhatsApp
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

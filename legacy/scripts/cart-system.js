/**
 * cart-system.js
 * Sistema centralizado de carrinho de compras.
 * Integra correções de dispositivos móveis, resumo final e acessibilidade.
 */

const CartState = {
    items: [],
    total: 0,
    currentStep: 1,
    deliveryMethod: 'delivery', // 'delivery' ou 'pickup'
    address: '',
    paymentMethod: '',

    init() {
        console.log('🛒 CartState: Inicializando');
        this.loadState();
        this.updateTotal();
    },

    addItem(item) {
        try {
            const existingItem = this.items.find(i => i.name === item.name);
            if (existingItem) {
                existingItem.quantity += item.quantity;
            } else {
                this.items.push({ ...item });
            }
            this.updateTotal();
            this.saveState();
            return true;
        } catch (error) {
            console.error('🛒 CartState: Erro ao adicionar item', error);
            return false;
        }
    },

    removeItem(itemName) {
        this.items = this.items.filter(i => i.name !== itemName);
        this.updateTotal();
        this.saveState();
    },

    updateQuantity(itemName, quantity) {
        const item = this.items.find(i => i.name === itemName);
        if (item) {
            item.quantity = Math.max(1, Math.min(10, quantity));
            this.updateTotal();
            this.saveState();
        }
    },

    updateTotal() {
        this.total = this.items.reduce((sum, item) => sum + (item.price * item.quantity), 0);
        return this.total;
    },

    saveState() {
        localStorage.setItem('cartState', JSON.stringify({
            items: this.items,
            total: this.total,
            currentStep: this.currentStep,
            deliveryMethod: this.deliveryMethod,
            address: this.address,
            paymentMethod: this.paymentMethod
        }));
    },

    loadState() {
        try {
            const saved = JSON.parse(localStorage.getItem('cartState'));
            if (saved) {
                this.items = saved.items || [];
                this.total = saved.total || 0;
                this.currentStep = saved.currentStep || 1;
                this.deliveryMethod = saved.deliveryMethod || 'delivery';
                this.address = saved.address || '';
                this.paymentMethod = saved.paymentMethod || '';
            }
        } catch (e) {
            console.error('🛒 CartState: Erro ao carregar estado', e);
        }
    },

    reset() {
        this.items = [];
        this.total = 0;
        this.currentStep = 1;
        this.saveState();
    },

    getItemCount() {
        return this.items.reduce((count, item) => count + item.quantity, 0);
    }
};

const CartUI = {
    elements: {},

    init() {
        console.log('🛒 CartUI: Inicializando');
        this.loadElements();
        this.setupEventListeners();
        this.updateCartCounter();
        this.applyMobileFixes();
    },

    loadElements() {
        this.elements = {
            modal: document.getElementById('cart-modal'),
            cartItems: document.getElementById('cart-items'),
            summaryContainer: document.getElementById('order-summary-container'),
            finalSummary: document.getElementById('final-order-summary'),
            cartCount: document.getElementById('fixed-cart-count'),
            closeBtn: document.getElementById('close-modal-btn'),
            checkoutBtn: document.getElementById('checkout-btn'),
            steps: document.querySelectorAll('.checkout-step'),
            contents: document.querySelectorAll('.checkout-step-content')
        };
    },

    setupEventListeners() {
        // Delegação de eventos para botões de adicionar ao carrinho (renderização dinâmica)
        document.addEventListener('click', (e) => {
            const addBtn = e.target.closest('.add-to-cart-btn');
            if (addBtn) {
                const name = addBtn.dataset.name;
                const price = parseFloat(addBtn.dataset.price);
                const quantityDisplay = addBtn.closest('.menu-item').querySelector('.quantity-display');
                const quantity = parseInt(quantityDisplay ? quantityDisplay.textContent : '1');

                CartState.addItem({ name, price, quantity });
                this.updateCartCounter();

                Toastify({
                    text: `${quantity}x ${name} adicionado ao carrinho!`,
                    duration: 2000,
                    gravity: "top",
                    position: "center",
                    style: { background: "#f97316" }
                }).showToast();

                // Reset quantity display to 1
                if (quantityDisplay) quantityDisplay.textContent = '1';
            }

            // Botões de quantidade no menu
            const qtyBtn = e.target.closest('.quantity-btn');
            if (qtyBtn && !qtyBtn.closest('.cart-item')) {
                const display = qtyBtn.closest('.flex').querySelector('.quantity-display');
                let val = parseInt(display.textContent);
                if (qtyBtn.dataset.action === 'increase') val++;
                else if (val > 1) val--;
                display.textContent = val;
            }
        });

        // Botão fixo do carrinho
        const fixedBtn = document.getElementById('fixed-cart-btn');
        if (fixedBtn) {
            fixedBtn.addEventListener('click', () => this.openCart());
        }

        if (this.elements.closeBtn) {
            this.elements.closeBtn.addEventListener('click', () => this.closeCart());
        }

        // Navegação entre etapas
        document.querySelectorAll('[id$="-next"]').forEach(btn => {
            btn.addEventListener('click', () => this.nextStep());
        });

        document.querySelectorAll('[id$="-prev"]').forEach(btn => {
            btn.addEventListener('click', () => this.prevStep());
        });

        // Finalizar Pedido
        if (this.elements.checkoutBtn) {
            this.elements.checkoutBtn.addEventListener('click', () => this.processOrder());
        }

        // Opções de entrega
        document.querySelectorAll('input[name="delivery-option"]').forEach(opt => {
            opt.addEventListener('change', (e) => {
                CartState.deliveryMethod = e.target.value;
                this.updateStepVisibility();
            });
        });
    },

    openCart() {
        this.elements.modal.classList.remove('hidden');
        this.elements.modal.style.display = 'flex';
        this.goToStep(1);
        this.updateCartUI();
    },

    closeCart() {
        this.elements.modal.classList.add('hidden');
        this.elements.modal.style.display = 'none';
    },

    updateCartUI() {
        this.renderCartItems();
        this.renderOrderSummary();
        this.updateFinalSummary();
    },

    renderCartItems() {
        if (!this.elements.cartItems) return;

        if (CartState.items.length === 0) {
            this.elements.cartItems.innerHTML = '<p class="text-center text-gray-500 py-8">Seu carrinho está vazio.</p>';
            return;
        }

        this.elements.cartItems.innerHTML = CartState.items.map(item => `
            <div class="cart-item flex items-center justify-between py-3 border-b border-gray-100 dark:border-gray-700">
                <div class="flex-1">
                    <h4 class="font-bold text-gray-800 dark:text-gray-200">${item.name}</h4>
                    <p class="text-sm text-orange-600 dark:text-orange-400 font-medium">R$ ${item.price.toFixed(2)}</p>
                </div>
                <div class="flex items-center gap-3">
                    <div class="flex items-center bg-gray-100 dark:bg-gray-700 rounded-lg overflow-hidden cart-quantity-control">
                        <button class="px-2 py-1 hover:bg-gray-200 dark:hover:bg-gray-600 text-orange-600 dark:text-orange-400 cart-quantity-btn" onclick="CartUI.changeQty('${item.name}', -1)">
                            <i class="fas fa-minus"></i>
                        </button>
                        <span class="px-2 text-sm font-bold dark:text-white">${item.quantity}</span>
                        <button class="px-2 py-1 hover:bg-gray-200 dark:hover:bg-gray-600 text-orange-600 dark:text-orange-400 cart-quantity-btn" onclick="CartUI.changeQty('${item.name}', 1)">
                            <i class="fas fa-plus"></i>
                        </button>
                    </div>
                    <button class="text-red-500 hover:text-red-700 p-2" onclick="CartUI.removeItem('${item.name}')" aria-label="Remover item">
                        <i class="fas fa-trash-alt"></i>
                    </button>
                </div>
            </div>
        `).join('');
    },

    renderOrderSummary() {
        if (!this.elements.summaryContainer) return;
        this.elements.summaryContainer.innerHTML = `
            <div class="mt-4 p-4 bg-gray-50 dark:bg-gray-700/50 rounded-lg cart-total-summary">
                <div class="flex justify-between items-center mb-2">
                    <span class="text-gray-600 dark:text-gray-400">Subtotal:</span>
                    <span class="font-medium dark:text-white">R$ ${CartState.total.toFixed(2)}</span>
                </div>
                <div class="flex justify-between items-center text-lg font-bold">
                    <span class="dark:text-white">Total:</span>
                    <span class="text-orange-600 dark:text-orange-400">R$ ${CartState.total.toFixed(2)}</span>
                </div>
            </div>
        `;
    },

    updateFinalSummary() {
        if (!this.elements.finalSummary) return;

        let html = `
          <div class="order-summary p-5 bg-orange-50/50 dark:bg-orange-900/10 rounded-2xl border-2 border-orange-500/30 dark:border-orange-500/20 shadow-sm mb-4">
            <h4 class="text-lg font-bold mb-4 text-orange-800 dark:text-orange-300 flex items-center gap-2">
              <i class="fas fa-clipboard-list text-orange-600"></i>
              Resumo Detalhado
            </h4>
            <div class="order-items-container max-h-48 overflow-y-auto mb-4 scrollbar-thin rounded-lg border border-orange-200 dark:border-orange-800">
              <table class="w-full text-sm">
                <thead class="border-b border-orange-200 dark:border-orange-800 sticky top-0 bg-orange-100 dark:bg-zinc-800">
                  <tr>
                    <th class="text-left p-3 font-semibold text-orange-900 dark:text-orange-200">Item</th>
                    <th class="text-center p-3 font-semibold text-orange-900 dark:text-orange-200">Qtd</th>
                    <th class="text-right p-3 font-semibold text-orange-900 dark:text-orange-200">Subtotal</th>
                  </tr>
                </thead>
                <tbody class="divide-y divide-orange-100 dark:divide-orange-900/30">
                  ${CartState.items.map(item => `
                    <tr class="hover:bg-orange-100/50 dark:hover:bg-orange-900/10 transition-colors">
                      <td class="p-3 dark:text-gray-300">${item.name}</td>
                      <td class="p-3 text-center dark:text-gray-300">${item.quantity}</td>
                      <td class="p-3 text-right font-medium dark:text-gray-300">R$ ${(item.price * item.quantity).toFixed(2)}</td>
                    </tr>
                  `).join('')}
                </tbody>
              </table>
            </div>
            <div class="flex justify-between items-center border-t-2 border-orange-200 dark:border-orange-800 pt-4">
              <span class="font-bold text-gray-700 dark:text-gray-300">Total do Pedido:</span>
              <span class="font-black text-2xl text-orange-600 dark:text-orange-500">R$ ${CartState.total.toFixed(2)}</span>
            </div>
          </div>
        `;
        this.elements.finalSummary.innerHTML = html;
    },

    changeQty(name, delta) {
        const item = CartState.items.find(i => i.name === name);
        if (item) {
            CartState.updateQuantity(name, item.quantity + delta);
            this.updateCartUI();
            this.updateCartCounter();
        }
    },

    removeItem(name) {
        CartState.removeItem(name);
        this.updateCartUI();
        this.updateCartCounter();
    },

    updateCartCounter() {
        const count = CartState.getItemCount();
        if (this.elements.cartCount) {
            this.elements.cartCount.textContent = count;
            this.elements.cartCount.classList.toggle('hidden', count === 0);
        }
    },

    goToStep(step) {
        CartState.currentStep = step;

        // Atualiza a visibilidade dos conteúdos usando IDs diretos
        [1, 2, 3, 4].forEach(i => {
            const content = document.getElementById(`checkout-step-${i}`);
            if (content) {
                const isActive = i === step;
                content.classList.toggle('hidden', !isActive);
                content.classList.toggle('active', isActive);
                
                // Adiciona classe de passo para permitir CSS específico
                content.classList.remove('step-1', 'step-2', 'step-3', 'step-4');
                if (isActive) {
                    content.classList.add(`step-${i}`);
                }
            }
        });

        // Atualiza os indicadores de passos (círculos)
        this.elements.steps.forEach((s, idx) => {
            const stepNum = idx + 1;
            s.classList.toggle('active', stepNum === step);
            s.classList.toggle('completed', stepNum < step);
        });

        // Scroll to top of content para melhor UX
        const activeContent = document.querySelector('.checkout-step-content.active .cart-scrollable-content');
        if (activeContent) {
            activeContent.scrollTop = 0;
        }

        this.updateFinalSummary();
    },

    nextStep() {
        if (CartState.currentStep === 1 && CartState.items.length === 0) {
            Toastify({ text: "O carrinho está vazio!", background: "#ef4444" }).showToast();
            return;
        }

        let next = CartState.currentStep + 1;

        // Pular etapa de endereço se for retirada
        if (next === 3 && CartState.deliveryMethod === 'pickup') {
            CartState.address = 'Retirada na loja';
            next = 4;
        }

        if (next <= 4) this.goToStep(next);
    },

    prevStep() {
        let prev = CartState.currentStep - 1;
        if (prev === 3 && CartState.deliveryMethod === 'pickup') prev = 2;
        if (prev >= 1) this.goToStep(prev);
    },

    updateStepVisibility() {
        // Implementar lógica condicional se necessário
    },

    processOrder() {
        const address = document.getElementById('address')?.value;
        const payment = document.getElementById('payment-method')?.value;

        if (CartState.deliveryMethod === 'delivery' && !address) {
            Toastify({ text: "Por favor, informe o endereço!", background: "#ef4444" }).showToast();
            return;
        }

        if (!payment) {
            Toastify({ text: "Selecione uma forma de pagamento!", background: "#ef4444" }).showToast();
            return;
        }

        // Montagem da mensagem de WhatsApp
        const itemsText = CartState.items.map(i => `• ${i.quantity}x ${i.name} - R$ ${(i.price * i.quantity).toFixed(2)}`).join('\n');
        const deliveryHeader = CartState.deliveryMethod === 'delivery' ? '🛵 ENTREGA EM CASA' : '🏪 RETIRADA NA LOJA';

        const message = [
            '🛒 NOVO PEDIDO - República dos Pastéis',
            '',
            deliveryHeader,
            '',
            '📋 ITENS:',
            itemsText,
            '',
            `💰 TOTAL: R$ ${CartState.total.toFixed(2)}`,
            '',
            `🏠 ENDEREÇO: ${CartState.deliveryMethod === 'delivery' ? address : 'Retirada na Loja'}`,
            `💳 PAGAMENTO: ${payment}`,
            '',
            'Aguardando confirmação...'
        ].join('\n');

        const phone = '5579981575934';
        const url = `https://wa.me/${phone}?text=${encodeURIComponent(message)}`;

        window.open(url, '_blank');
        CartState.reset();
        this.updateCartCounter();
        this.closeCart();

        Toastify({ text: "Pedido enviado com sucesso!", background: "#22c55e" }).showToast();
    },

    applyMobileFixes() {
        const isMobile = /Android|iPhone|iPad/i.test(navigator.userAgent) || window.innerWidth < 768;
        if (isMobile) {
            document.querySelectorAll('.cart-scrollable-content').forEach(el => {
                el.style.paddingBottom = '80px';
                el.style.WebkitOverflowScrolling = 'touch';
            });
        }
    }
};

// Inicialização Global
window.CartUI = CartUI;
window.CartState = CartState;

document.addEventListener('DOMContentLoaded', () => {
    CartState.init();
    CartUI.init();
});

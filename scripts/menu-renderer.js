/**
 * menu-renderer.js
 * Gerencia a renderização dinâmica dos produtos do cardápio.
 */

const MenuRenderer = {
    /**
     * Inicializa a renderização de todas as seções
     */
    init() {
        console.log('🚀 MenuRenderer: Inicializando renderização do cardápio');
        
        // Mapeamento de categorias para IDs de containers no HTML
        const categoryMap = {
            'pasteis': 'section-pasteis-container',
            'especiais': 'section-especiais-container',
            'doces': 'section-doces-container',
            'cuscuz': 'section-cuscuz-container',
            'bebidas': 'section-bebidas-container'
        };

        // Renderiza cada categoria
        for (const [category, containerId] of Object.entries(categoryMap)) {
            this.renderCategory(category, containerId);
        }
        
        console.log('🚀 MenuRenderer: Renderização concluída');
    },

    /**
     * Renderiza os produtos de uma categoria específica
     */
    renderCategory(category, containerId) {
        const container = document.getElementById(containerId);
        if (!container) {
            console.warn(`⚠️ MenuRenderer: Container #${containerId} não encontrado.`);
            return;
        }

        let products = [];
        
        // Lógica especial para a seção Caprichado (clona os pastéis com +R$ 2.00)
        if (category === 'especiais') {
            const normalPasteis = window.MENU_DATA['pasteis'] || [];
            products = normalPasteis.map(p => ({
                ...p,
                id: `cap-${p.id}`,
                name: `Caprichado - ${p.name}`,
                price: p.price + 2.00,
                description: `${p.description} (Dobro de recheio)`
            }));
        } else {
            products = window.MENU_DATA[category] || [];
        }

        container.innerHTML = ''; // Limpa o container

        products.forEach(product => {
            const productElement = this.createProductHTML(product, category);
            container.appendChild(productElement);
        });
    },

    /**
     * Cria o elemento HTML para um produto
     */
    createProductHTML(product, category) {
        const div = document.createElement('div');
        
        // Classes base para todos os itens (extraídas do menu-fix.js)
        div.className = 'flex gap-3 menu-item p-3 rounded-lg animate-fade-in bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 shadow-md hover:shadow-lg transition-all hover:-translate-y-1';
        
        // Estilização extra baseada na categoria
        if (category === 'bebidas') {
            div.classList.add('bg-gradient-to-br', 'from-white', 'to-blue-50', 'dark:from-gray-800', 'dark:to-blue-900/10', 'hover:rotate-1');
        } else if (category === 'doces') {
            div.classList.add('bg-gradient-to-br', 'from-white', 'to-pink-50', 'dark:from-gray-800', 'dark:to-pink-900/10');
        } else if (category === 'especiais') {
            div.classList.add('bg-gradient-to-br', 'from-white', 'to-orange-50', 'dark:from-gray-800', 'dark:to-orange-900/10');
        }

        div.innerHTML = `
            <img 
                src="${product.image}" 
                alt="${product.name}" 
                class="w-28 h-28 rounded-md hover:scale-110 duration-300 object-cover shadow-sm"
                loading="lazy"
            />
            <div class="w-full flex flex-col justify-between">
                <div>
                    <h3 class="font-bold text-lg text-gray-900 dark:text-gray-100">${product.name}</h3>
                    <p class="text-sm text-gray-600 dark:text-gray-400 mt-1">${product.description}</p>
                </div>
                
                <div class="flex items-center gap-2 justify-between mt-3">
                    <p class="font-bold text-lg text-gray-900 dark:text-gray-100" aria-label="Preço: ${product.price.toFixed(2)} reais">
                        R$ ${product.price.toFixed(2)}
                    </p>
                    <div class="flex items-center gap-2">
                        <div class="flex items-center bg-gray-100 dark:bg-gray-700 rounded" role="group" aria-label="Controle de quantidade">
                            <button 
                                class="px-2 py-1 text-orange-600 dark:text-orange-400 quantity-btn hover:bg-gray-200 dark:hover:bg-gray-600 rounded-l focus:outline-none focus:ring-1 focus:ring-orange-500" 
                                data-action="decrease" 
                                aria-label="Diminuir quantidade"
                            >
                                <i class="fas fa-minus" aria-hidden="true"></i>
                            </button>
                            <span class="quantity-display px-3" aria-live="polite">1</span>
                            <button 
                                class="px-2 py-1 text-orange-600 dark:text-orange-400 quantity-btn hover:bg-gray-200 dark:hover:bg-gray-600 rounded-r focus:outline-none focus:ring-1 focus:ring-orange-500" 
                                data-action="increase" 
                                aria-label="Aumentar quantidade"
                            >
                                <i class="fas fa-plus" aria-hidden="true"></i>
                            </button>
                        </div>
                        <button 
                            class="bg-orange-600 hover:bg-orange-700 focus:ring-2 focus:ring-orange-500 px-5 py-2 rounded add-to-cart-btn text-white transition-colors shadow-sm hover:shadow-md"
                            data-name="${product.name}"
                            data-price="${product.price.toFixed(2)}"
                            aria-label="Adicionar ${product.name} ao carrinho"
                        >
                            <i class="fa fa-cart-plus text-lg" aria-hidden="true"></i>
                            <span class="sr-only">Adicionar ao carrinho</span>
                        </button>
                    </div>
                </div>
            </div>
        `;

        return div;
    }
};

// Inicializa quando o DOM estiver pronto
document.addEventListener('DOMContentLoaded', () => {
    MenuRenderer.init();
});

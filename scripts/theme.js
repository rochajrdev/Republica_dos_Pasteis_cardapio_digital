/**
 * theme.js
 * Gerencia a alternância de tema claro/escuro e animações visuais.
 */

function setupThemeToggle() {
    // Cria o botão de alternância de tema
    const themeToggle = document.createElement('button');
    themeToggle.id = 'theme-toggle';
    themeToggle.setAttribute('aria-label', 'Alternar tema claro/escuro');
    
    // Define o ícone inicial baseado no tema atual
    const isDarkMode = localStorage.getItem('theme') === 'dark' || 
        (!localStorage.getItem('theme') && window.matchMedia('(prefers-color-scheme: dark)').matches);
    
    themeToggle.innerHTML = isDarkMode 
        ? '<i class="fas fa-sun" aria-hidden="true"></i>' 
        : '<i class="fas fa-moon" aria-hidden="true"></i>';
    
    // Aplica o modo escuro se necessário
    if (isDarkMode) {
        document.documentElement.classList.add('dark');
    }
    
    // Evento de clique
    themeToggle.addEventListener('click', function() {
        const isDark = document.documentElement.classList.toggle('dark');
        
        if (isDark) {
            localStorage.setItem('theme', 'dark');
            this.innerHTML = '<i class="fas fa-sun" aria-hidden="true"></i>';
            announceThemeChange('Tema escuro ativado');
        } else {
            localStorage.setItem('theme', 'light');
            this.innerHTML = '<i class="fas fa-moon" aria-hidden="true"></i>';
            announceThemeChange('Tema claro ativado');
        }

        // Notifica o sistema de carrinho sobre a mudança de tema para ajustar estilos dinâmicos
        document.dispatchEvent(new CustomEvent('themeChanged', { detail: { isDark } }));
    });
    
    // Insere o botão no nav do header
    const nav = document.querySelector('nav');
    if (nav) {
        nav.appendChild(themeToggle);
    } else {
        const header = document.querySelector('header');
        if (header) {
            const navElement = document.createElement('nav');
            navElement.className = 'absolute top-0 left-0 right-0 flex justify-end p-4';
            navElement.appendChild(themeToggle);
            header.appendChild(navElement);
        } else {
            document.body.appendChild(themeToggle);
        }
    }
}

function announceThemeChange(message) {
    const announcement = document.createElement('div');
    announcement.setAttribute('aria-live', 'polite');
    announcement.classList.add('sr-only');
    announcement.textContent = message;
    document.body.appendChild(announcement);
    
    setTimeout(() => {
        document.body.removeChild(announcement);
    }, 3000);
}

/**
 * Melhora a animação de "voar" para o carrinho ao adicionar um item
 */
function enhanceCartAnimation() {
    // Usamos delegação de eventos para funcionar com itens renderizados dinamicamente
    document.addEventListener('click', function(e) {
        const btn = e.target.closest('.add-to-cart-btn');
        if (!btn) return;

        const menuItem = btn.closest('.menu-item');
        const itemImage = menuItem ? menuItem.querySelector('img') : null;
        const cartBtn = document.getElementById('fixed-cart-btn');
        
        if (itemImage && cartBtn) {
            const flyingImage = itemImage.cloneNode();
            flyingImage.classList.add('fixed', 'z-50', 'rounded-md', 'shadow-lg');
            flyingImage.style.height = '50px';
            flyingImage.style.width = '50px';
            flyingImage.style.opacity = '0.8';
            flyingImage.style.position = 'fixed';
            
            const rect = itemImage.getBoundingClientRect();
            flyingImage.style.top = `${rect.top}px`;
            flyingImage.style.left = `${rect.left}px`;
            
            document.body.appendChild(flyingImage);
            
            const cartRect = cartBtn.getBoundingClientRect();
            setTimeout(() => {
                flyingImage.style.transition = 'all 0.8s cubic-bezier(0.25, 0.1, 0.25, 1)';
                flyingImage.style.top = `${cartRect.top}px`;
                flyingImage.style.left = `${cartRect.left}px`;
                flyingImage.style.height = '20px';
                flyingImage.style.width = '20px';
                flyingImage.style.opacity = '0';
                
                setTimeout(() => {
                    document.body.removeChild(flyingImage);
                    cartBtn.classList.add('animate-bounce');
                    setTimeout(() => cartBtn.classList.remove('animate-bounce'), 500);
                }, 800);
            }, 10);
        }
    });
}

// Inicializa quando o DOM estiver pronto
document.addEventListener('DOMContentLoaded', function() {
    setupThemeToggle();
    enhanceCartAnimation();
    
    // Melhora a navegação por teclado para acessibilidade
    const focusableElements = document.querySelectorAll('button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])');
    focusableElements.forEach(el => {
        el.addEventListener('keydown', function(e) {
            if (e.key === 'Enter' || e.key === ' ') {
                if (this.tagName !== 'BUTTON' && this.tagName !== 'A') {
                    e.preventDefault();
                    this.click();
                }
            }
        });
    });
});

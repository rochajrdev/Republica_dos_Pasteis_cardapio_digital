/**
 * menu-data.js
 * Dados dos produtos organizados por categoria.
 * Preparado para futura integração com backend/API.
 */

const MENU_DATA = {
    pasteis: [
        { id: 'p-vento', name: 'Pastel de vento', description: 'Massa crocante tradicional', price: 7.00, image: '/assets/pastel.jpg' },
        { id: 'p-carne', name: 'Carne', description: 'Pastel recheado com carne moída temperada', price: 9.00, image: '/assets/pastel.jpg' },
        { id: 'p-carne-queijo', name: 'Carne com queijo', description: 'Pastel recheado com carne moída e queijo coalho', price: 10.00, image: '/assets/pastel.jpg' },
        { id: 'p-carne-catupiry', name: 'Carne com catupiry', description: 'Pastel recheado com carne moída e catupiry', price: 10.00, image: '/assets/pastel.jpg' },
        { id: 'p-frango', name: 'Frango', description: 'Pastel recheado com frango desfiado temperado', price: 9.00, image: '/assets/pastel.jpg' },
        { id: 'p-frango-queijo', name: 'Frango com queijo coalho', description: 'Frango desfiado com queijo coalho', price: 10.00, image: '/assets/pastel.jpg' },
        { id: 'p-frango-catupiry', name: 'Frango com catupiry', description: 'Frango desfiado com catupiry', price: 10.00, image: '/assets/pastel.jpg' },
        { id: 'p-frango-3queijos', name: 'Frango aos três queijos', description: 'Frango com catupiry, coalho e cheddar', price: 11.00, image: '/assets/pastel.jpg' },
        { id: 'p-3queijos', name: 'Três queijos', description: 'Catupiry, coalho e cheddar', price: 11.00, image: '/assets/pastel.jpg' },
        { id: 'p-pizza', name: 'Pizza', description: 'Molho de tomate, queijo, presunto e orégano', price: 10.00, image: '/assets/pastel.jpg' },
        { id: 'p-misto', name: 'Misto', description: 'Queijo coalho e presunto', price: 10.00, image: '/assets/pastel.jpg' },
        { id: 'p-queijo', name: 'Queijo', description: 'Escolha: queijo coalho ou cheddar', price: 10.00, image: '/assets/pastel.jpg' },
        { id: 'p-charque', name: 'Charque', description: 'Pastel recheado com charque desfiada', price: 13.00, image: '/assets/pastel.jpg' },
        { id: 'p-charque-queijo', name: 'Charque c/queijo', description: 'Escolha: queijo coalho ou catupiry', price: 14.00, image: '/assets/pastel.jpg' },
        { id: 'p-calabresa', name: 'Calabresa', description: 'Pastel recheado com calabresa', price: 10.50, image: '/assets/pastel.jpg' },
        { id: 'p-calabresa-queijo', name: 'Calabresa com queijo coalho', description: 'Pastel de calabresa com queijo coalho', price: 11.50, image: '/assets/pastel.jpg' },
        { id: 'p-marguerita', name: 'Marguerita', description: 'Queijo, tomate, orégano, manjericão', price: 10.00, image: '/assets/pastel.jpg' },
        { id: 'p-portuguesa', name: 'Portuguesa', description: 'Queijo, presunto, ovos, azeitona, tomate', price: 11.50, image: '/assets/pastel.jpg' },
        { id: 'p-baiana', name: 'Baiana', description: 'Calabresa, pimenta calabresa, tomate, cebola', price: 11.50, image: '/assets/pastel.jpg' },
        { id: 'p-camarao', name: 'Camarão', description: 'Pastel recheado com camarão temperado', price: 13.00, image: '/assets/pastel.jpg' },
        { id: 'p-camarao-queijo', name: 'Camarão c/queijo', description: 'Escolha: catupiry ou queijo coalho', price: 14.00, image: '/assets/pastel.jpg' },
        { id: 'p-misto-3queijos', name: 'Misto aos três queijos', description: 'Presunto, queijo coalho, catupiry, cheddar', price: 11.50, image: '/assets/pastel.jpg' },
        { id: 'p-moda', name: 'A moda da casa', description: 'Queijo, presunto, calabresa, milho, tomate, azeitona', price: 11.50, image: '/assets/pastel.jpg' },
        { id: 'p-presunto-especial', name: 'Presunto especial', description: 'Presunto, queijo, ovos, milho, orégano, azeitona', price: 11.50, image: '/assets/pastel.jpg' },
        { id: 'p-brasileirinha', name: 'Brasileirinha', description: 'Charque, milho, azeitona, tomate, e cebola', price: 14.00, image: '/assets/pastel.jpg' },
        { id: 'p-caipira', name: 'Caipira', description: 'Molho de tomate, frango, queijo, presunto e catupiry', price: 11.50, image: '/assets/pastel.jpg' }
    ],
    especiais: [
        { id: 'cap-frango-catupiry', name: 'Frango com Catupiry (Caprichado)', description: 'O dobro de recheio de frango com catupiry', price: 8.00, image: '/assets/pastel.jpg' }
    ],
    doces: [
        { id: 'd-brigadeiro', name: 'Brigadeiro', description: 'Pastel com chocolate', price: 10.50, image: '/assets/pastel.jpg' },
        { id: 'd-romeu-julieta', name: 'Romeu e Julieta', description: 'Queijo e goiabada', price: 10.50, image: '/assets/pastel.jpg' },
        { id: 'd-doce-leite', name: 'Doce de leite', description: 'Pastel com doce de leite', price: 10.50, image: '/assets/pastel.jpg' },
        { id: 'd-banana-canela', name: 'Banana com canela', description: 'Banana, canela e açucar', price: 10.50, image: '/assets/pastel.jpg' },
        { id: 'd-mancha-negra', name: 'Mancha negra', description: 'Chocolate, banana e leite condensado', price: 10.50, image: '/assets/pastel.jpg' },
        { id: 'd-banela', name: 'Banela', description: 'Banana, queijo coalho, canela e leite condensado', price: 10.50, image: '/assets/pastel.jpg' },
        { id: 'd-super-sensacao', name: 'Super sensação', description: 'Doce de leite com banana', price: 10.50, image: '/assets/pastel.jpg' }
    ],
    cuscuz: [
        { id: 'c-carne-queijo', name: 'Carne com queijo coalho', description: 'Cuscuz recheado de carne com queijo coalho', price: 11.00, image: '/assets/cuscuz.jpg' },
        { id: 'c-frango-queijo', name: 'Frango com queijo coalho', description: 'Cuscuz recheado de frango com queijo coalho', price: 11.00, image: '/assets/cuscuz.jpg' },
        { id: 'c-calabresa-queijo', name: 'Calabresa com queijo coalho', description: 'Cuscuz recheado de calabresa com queijo coalho', price: 12.00, image: '/assets/cuscuz.jpg' },
        { id: 'c-charque-queijo', name: 'Charque com queijo coalho', description: 'Cuscuz de charque com queijo coalho', price: 15.50, image: '/assets/cuscuz.jpg' },
        { id: 'c-camarao-queijo', name: 'Camarão com queijo coalho', description: 'Cuscuz de camarão com queijo coalho', price: 15.50, image: '/assets/cuscuz.jpg' }
    ],
    bebidas: [
        { id: 'b-coca-lata', name: 'Coca-Cola', description: 'Lata (350ml)', price: 5.00, image: '/assets/refri-1.png' },
        { id: 'b-guarana-lata', name: 'Guaraná', description: 'Lata (350ml)', price: 5.00, image: '/assets/refri-2.png' }
    ]
};

// Exportar para uso global (como o projeto é vanilla sem módulos ES por enquanto)
window.MENU_DATA = MENU_DATA;
console.log('📦 MENU_DATA: Carregado com sucesso e atribuído ao objeto window');

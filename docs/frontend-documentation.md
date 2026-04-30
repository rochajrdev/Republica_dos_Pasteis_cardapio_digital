# Documentação do Frontend - República dos Pastéis

Esta documentação descreve a arquitetura, tecnologias e funcionalidades do frontend do cardápio digital da República dos Pastéis, migrado para uma infraestrutura moderna em 2026.

## 🚀 Tecnologias Principais

- **Framework**: [Next.js 16.2 (App Router)](https://nextjs.org/)
- **Linguagem**: [TypeScript](https://www.typescriptlang.org/)
- **Estilização**: [Tailwind CSS v4](https://tailwindcss.com/)
- **Componentes UI**: [shadcn/ui](https://ui.shadcn.com/)
- **Gerenciamento de Estado**: [Zustand](https://docs.pmnd.rs/zustand/getting-started/introduction)
- **Gerenciamento de Tema**: [next-themes](https://github.com/pacocoursey/next-themes)
- **Ícones**: FontAwesome 6 (via CDN) & Lucide React

---

## 📂 Estrutura de Pastas

```text
src/
├── app/              # Rotas, layouts e estilos globais (Next.js App Router)
├── components/       # Componentes React reutilizáveis
│   ├── ui/           # Componentes base do shadcn/ui
│   ├── Header.tsx    # Cabeçalho com lógica de horário
│   ├── Menu.tsx      # Navegação de categorias e listagem
│   ├── ProductCard.tsx # Cartão individual de produto
│   └── CartModal.tsx # Wizard de checkout multi-etapa
├── data/             # Dados estáticos e tipagens (menu-data.ts)
├── hooks/            # Hooks customizados (use-cart.ts para o carrinho)
├── lib/              # Funções utilitárias (utils.ts)
└── styles/           # Arquivos CSS legados portados para fidelidade visual
```

---

## 🛠️ Funcionalidades Principais

### 1. Gerenciamento do Carrinho (Zustand)
O carrinho é gerenciado pelo hook `useCart`, que utiliza a middleware `persist` do Zustand para salvar os itens no `localStorage`. Isso garante que o cliente não perca o pedido ao atualizar a página.

- **Localização**: `src/hooks/use-cart.ts`
- **Ações**: Adicionar, remover, atualizar quantidade e limpar carrinho.

### 2. Status de Funcionamento Dinâmico
O sistema verifica automaticamente se a pastelaria está aberta com base no horário local do cliente.
- **Regra**: Terça a Domingo, das 16:00 às 22:00.
- **Componente**: `Header.tsx`.
- **Feedback**: Badge muda entre verde (Aberto) e vermelho (Fechado).

### 3. Wizard de Checkout (CartModal)
O fluxo de finalização de pedido é dividido em 4 etapas para melhorar a conversão e clareza:
1. **Resumo**: Revisão dos itens e preços.
2. **Recebimento**: Escolha entre Entrega ou Retirada.
3. **Endereço**: Preenchimento do local de entrega (se aplicável).
4. **Pagamento**: Escolha da forma de pagamento e envio final para o WhatsApp.

### 4. Fidelidade Visual e Modo Escuro
O projeto utiliza uma combinação de Tailwind 4 com arquivos CSS legados para manter o design original aprovado pelo usuário. O suporte ao modo escuro é feito via classe `.dark` e gerenciado pelo `next-themes`.

---

## 📦 Gestão de Ativos (Assets)

Todas as imagens e ícones estão localizados na pasta `public/assets/`.
- `avatar.png`: Logo oficial.
- `bg.png`: Imagem de fundo do cabeçalho.
- Imagens de produtos: Organizadas para carregamento rápido (lazy loading).

---

## ⌨️ Guia de Desenvolvimento

### Instalação
```bash
npm install
```

### Rodar em Desenvolvimento
```bash
npm run dev
```

### Build de Produção
```bash
npm run build
```

---

## 📝 Observações Técnicas
- **Hidratação**: O projeto utiliza `suppressHydrationWarning` em tags críticas para evitar conflitos entre o render do servidor (SSR) e as mutações dinâmicas de tema e horário no cliente.
- **Acessibilidade**: Mantido o suporte a navegação por teclado e tags ARIA presentes na versão original.

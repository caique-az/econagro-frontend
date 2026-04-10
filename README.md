# EconAgro — Frontend

Interface web de e-commerce agrícola desenvolvida com Next.js 16 e Tailwind CSS.

**Repositório do backend:** _link do repositório aqui_

---

## Visão geral

EconAgro conecta produtores rurais e consumidores por meio de uma plataforma de comércio eletrônico focada em produtos agrícolas. O frontend consome uma REST API desenvolvida separadamente em Node.js + Express + MongoDB.

## Funcionalidades implementadas

- Listagem de produtos por categoria via API
- Busca de produtos em tempo real (client-side)
- Carrinho de compras com gerenciamento de quantidade e frete
- Páginas de login, cadastro e recuperação de senha (UI pronta, integração com API pendente)
- Formulário de contato com validação
- Design responsivo (mobile-first)

## Integrações pendentes (dependem do backend)

- Autenticação (JWT) — endpoints `/auth/login` e `/auth/register`
- Checkout e pagamento — endpoint `/orders`
- Validação de cupons — endpoint `/discounts/validate`
- Newsletter — endpoint a definir

## Arquitetura

```
Browser
  └── Next.js App Router (SSR/SSG + Client Components)
        ├── Server Components  → layout, páginas estáticas, categorias
        ├── Client Components  → carrinho, busca, formulários
        ├── Context API        → estado global de carrinho e busca
        └── Axios (services/)  → chamadas à REST API
                                    │
                                    ▼
                             REST API (backend)
                             Node.js + Express + MongoDB
```

**Divisão server / client:**
- Páginas sem interatividade (home, categoria, sobre) são server components — sem JavaScript extra no cliente.
- Componentes com estado (carrinho, header com busca, formulários) são client components com `'use client'`.

## Stack

| Camada | Tecnologia |
|---|---|
| Framework | Next.js 16 (App Router) |
| UI | React 18 + Tailwind CSS 3 |
| HTTP | Axios |
| Ícones | Font Awesome 6 |

## Estrutura do projeto

```
src/
├── app/              # Páginas e rotas (App Router)
├── components/       # Componentes reutilizáveis (Header, Footer, Produtos…)
├── constants/        # Constantes globais (ex: URLs de imagem de fallback)
├── context/          # Estado global (CartContext, SearchContext)
├── data/             # Dados estáticos (categorias)
├── hooks/            # Custom hooks (useCartLogic)
├── services/         # Comunicação com a API (Axios, productService)
└── utils/            # Utilitários puros (priceUtils)
```

## Configuração

### 1. Instalar dependências

```bash
npm install
```

### 2. Configurar variáveis de ambiente

```bash
cp .env.example .env
```

| Variável | Descrição | Padrão |
|---|---|---|
| `NEXT_PUBLIC_API_URL` | URL base da API backend | `http://localhost:3001/api` |

### 3. Iniciar em desenvolvimento

```bash
npm run dev
# http://localhost:3000
```

### 4. Build de produção

```bash
npm run build
npm start
```

## Scripts

| Comando | Descrição |
|---|---|
| `npm run dev` | Servidor de desenvolvimento |
| `npm run build` | Build de produção |
| `npm start` | Servidor de produção |
| `npm run lint` | Verificação de lint |

## Pré-requisitos

- Node.js 18+
- npm 9+

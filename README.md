# EconAgro — Frontend

Plataforma de e-commerce agrícola desenvolvida com Next.js e Tailwind CSS, conectando produtores rurais e consumidores.

> Este repositório contém apenas o frontend. O backend reside em um repositório separado (Node.js + Express + MongoDB).

## Funcionalidades

- Navegação por categorias de produtos (Grãos, Frutas, Legumes, Verduras)
- Busca de produtos em tempo real
- Carrinho de compras com cálculo de frete
- Páginas de login, cadastro e recuperação de senha
- Formulário de contato
- Design responsivo (mobile-first)

## Stack

| Camada | Tecnologia |
|---|---|
| Framework | Next.js 16 (App Router) |
| UI | React 18 + Tailwind CSS 3 |
| HTTP | Axios |
| Ícones | Font Awesome 6 |

## Estrutura

```
src/
├── app/              # Páginas e rotas (App Router)
├── components/       # Componentes reutilizáveis (Header, Footer, Produtos…)
├── constants/        # Constantes globais (imagens de fallback, etc.)
├── context/          # Estado global (CartContext, SearchContext)
├── data/             # Dados estáticos (categorias)
├── hooks/            # Custom hooks (useCartLogic)
├── services/         # Comunicação com API (Axios, productService)
└── utils/            # Utilitários (priceUtils)
```

## Configuração

### 1. Instalar dependências

```bash
npm install
```

### 2. Configurar variáveis de ambiente

Copie o arquivo de exemplo e ajuste a URL da API:

```bash
cp .env.example .env
```

| Variável | Descrição | Padrão |
|---|---|---|
| `NEXT_PUBLIC_API_URL` | URL base da API backend | `http://localhost:3001/api` |

### 3. Iniciar em desenvolvimento

```bash
npm run dev
```

Acesse em `http://localhost:3000`.

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
| `npm start` | Inicia o servidor de produção |
| `npm run lint` | Verificação de lint |

## Pré-requisitos

- Node.js 18+
- npm 9+

---

Desenvolvido pela equipe EconAgro

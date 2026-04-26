# EconAgro — Frontend

Frontend do projeto **EconAgro**, uma interface demonstrativa de e-commerce agrícola construída com Next.js, React e Tailwind CSS.

O frontend consome uma API REST própria desenvolvida em Node.js, Express e MongoDB.

**Backend:** https://github.com/caique-az/econagro-backend

---

## Visão geral

O EconAgro conecta uma interface de catálogo agrícola a uma API real, permitindo listar produtos vindos do MongoDB, navegar por categorias e montar um carrinho client-side.

O projeto foi desenvolvido com foco em portfólio, demonstrando:

- Integração frontend/backend
- Consumo de API REST
- Deploy fullstack
- Configuração de variáveis de ambiente
- Uso de imagens externas via Cloudinary
- UI responsiva
- Organização de componentes, hooks, services e contextos

---

## Stack

| Camada | Tecnologia |
|---|---|
| Framework | Next.js 16 |
| UI | React 18 |
| Estilização | Tailwind CSS 3 |
| HTTP Client | Axios |
| Ícones | Font Awesome |
| Deploy | Vercel |
| API | Node.js + Express + MongoDB |

---

## Funcionalidades implementadas

- Listagem de produtos consumindo API real
- Listagem de produtos por categoria
- Busca client-side de produtos carregados
- Carrinho client-side com:
  - adicionar produto
  - remover produto
  - alterar quantidade
  - calcular subtotal, frete e total
- Páginas institucionais:
  - Home
  - Sobre
  - Fale Conosco
- Páginas de autenticação:
  - Login
  - Cadastro
  - Recuperação de senha
- Layout responsivo
- Fallback de imagens
- Configuração para imagens externas do Cloudinary
- Integração com backend via `NEXT_PUBLIC_API_URL`

---

## Escopo atual

Esta versão tem como foco demonstrar o fluxo principal do e-commerce:

```txt
Usuário acessa o frontend
        ↓
Frontend consulta a API
        ↓
API busca produtos/categorias no MongoDB
        ↓
Frontend renderiza catálogo e categorias
        ↓
Usuário pode montar carrinho client-side
```

---

## Fora do escopo desta versão

As seguintes funcionalidades não fazem parte do escopo atual:

- Pagamento real
- Checkout real
- Validação real de cupons
- Newsletter persistida
- Painel administrativo
- Gestão de pedidos

Esses pontos foram propositalmente deixados fora para manter o projeto focado em integração fullstack, catálogo, API e deploy.

---

## Arquitetura

```txt
Browser
  └── Next.js App Router
        ├── Server Components
        ├── Client Components
        ├── Context API
        ├── Custom Hooks
        └── Axios Services
                ↓
          REST API Backend
                ↓
          MongoDB Atlas
```

---

## Estrutura do projeto

```txt
src/
├── app/              # Rotas e páginas do App Router
├── components/       # Componentes reutilizáveis
├── constants/        # Constantes globais
├── context/          # Contextos globais
├── data/             # Dados estáticos auxiliares
├── hooks/            # Custom hooks
├── services/         # Configuração Axios e serviços da API
└── utils/            # Funções utilitárias
```

---

## Configuração local

### 1. Instalar dependências

```bash
npm install
```

### 2. Configurar variáveis de ambiente

Crie um arquivo `.env` com base no `.env.example`.

```bash
cp .env.example .env
```

Exemplo local:

```env
NEXT_PUBLIC_API_URL=http://localhost:3001/api
```

Exemplo produção:

```env
NEXT_PUBLIC_API_URL=https://seu-backend.onrender.com/api
```

A aplicação normaliza a URL da API automaticamente, então tanto isto:

```env
NEXT_PUBLIC_API_URL=https://seu-backend.onrender.com
```

quanto isto:

```env
NEXT_PUBLIC_API_URL=https://seu-backend.onrender.com/api
```

funcionam.

---

## Rodando localmente

```bash
npm run dev
```

Acesse:

```txt
http://localhost:3000
```

O backend precisa estar rodando e acessível pela URL definida em `NEXT_PUBLIC_API_URL`.

---

## Build de produção

```bash
npm run build
npm start
```

---

## Scripts

| Comando | Descrição |
|---|---|
| `npm run dev` | Inicia ambiente de desenvolvimento |
| `npm run build` | Gera build de produção |
| `npm start` | Inicia build de produção |
| `npm run lint` | Executa ESLint |

---

## Variáveis de ambiente

| Variável | Descrição | Exemplo |
|---|---|---|
| `NEXT_PUBLIC_API_URL` | URL base da API backend | `https://seu-backend.onrender.com/api` |

---

## Deploy na Vercel

Configuração sugerida:

| Campo | Valor |
|---|---|
| Framework | Next.js |
| Build Command | `npm run build` |
| Install Command | `npm install` |
| Output Directory | Padrão do Next.js |
| Branch | `main` |

Variável obrigatória na Vercel:

```env
NEXT_PUBLIC_API_URL=https://seu-backend.onrender.com/api
```

Após alterar variáveis de ambiente na Vercel, faça novo deploy.

---

## Integração com backend

O frontend consome os seguintes endpoints principais:

```txt
GET /api/products
GET /api/products/category/:categoryName
```

Exemplo:

```txt
https://seu-backend.onrender.com/api/products
```

As categorias esperadas pela interface são:

```txt
Carnes
Ovos
Laticínios
Grãos
Frutas
Verduras
Legumes
Sementes
```

Essas categorias devem existir no banco para que as páginas de categoria retornem produtos corretamente.

---

## Imagens

O projeto usa imagens externas hospedadas no Cloudinary e também aceita URLs absolutas retornadas pela API.

Domínios remotos permitidos no Next.js:

- `res.cloudinary.com`
- `placehold.co`
- `images.unsplash.com`
- `ui-avatars.com`

---

## Status do projeto

Implementado:

- Catálogo conectado à API
- Categorias conectadas à API
- Carrinho client-side
- Layout responsivo
- Deploy na Vercel
- Integração com backend na Render

Em andamento:

- Integração real das telas de login/cadastro com a API de autenticação

Fora do escopo:

- Pagamentos reais
- Checkout real
- Cupons reais
- Newsletter persistida

---

## Licença

MIT

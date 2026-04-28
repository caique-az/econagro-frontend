# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Contexto do projeto

EconAgro é um projeto fullstack de portfólio.

- Frontend: Next.js + React + Tailwind, deploy na Vercel.
- Backend: Node.js + Express + Mongoose, deploy no Render.
- Banco: MongoDB Atlas.

## Commands

```bash
npm run dev          # servidor de desenvolvimento (Next.js)
npm run build        # build de produção
npm run start        # servidor de produção
npm run lint         # ESLint (config: eslint-config-next/core-web-vitals)
npm run format       # Prettier (reescreve arquivos)
npm run format:check # Prettier (apenas verifica, não altera)
```

Antes de finalizar qualquer tarefa, executar sempre:

```bash
npm run lint
npm run build
```

Não há testes automatizados configurados no projeto ainda (Testing Library instalada, mas sem Jest/Vitest).

## Variáveis de ambiente

Copie `.env.example` para `.env` e ajuste conforme necessário:

```
NEXT_PUBLIC_API_URL=http://localhost:3001/api
```

Em produção aponta para `https://econagro-backend.onrender.com`. O `src/services/api.js` normaliza a URL automaticamente — adiciona `/api` se ausente e remove barra final. Nos services, usar `/auth/login`, nunca `/api/auth/login`.

## Arquitetura

### Roteamento (Next.js App Router)

Todas as páginas ficam em `src/app/`:

| Rota | Arquivo |
|---|---|
| `/` | `page.jsx` — home com categorias e produtos em destaque |
| `/categoria/[categoryName]` | `categoria/[categoryName]/page.jsx` — produtos filtrados por categoria |
| `/carrinho` | `carrinho/page.jsx` |
| `/login`, `/cadastro`, `/recuperar-senha` | páginas de autenticação |
| `/talktous`, `/aboutus` | páginas institucionais |

O `layout.jsx` raiz envolve tudo com `<Providers>`, `<Header>` e `<Footer>`.

### Estado global (`src/context/`)

Contextos expostos via `src/components/Providers.jsx`:

- **`CartContext`** — carrinho em memória (sem persistência). Expõe `cart`, `addToCart`, `removeFromCart`, `updateQuantity`, `clearCart`. Consumido via `useCart()`.
- **`SearchContext`** — termo de busca global. Expõe `searchTerm`, `updateSearch`, `clearSearch`. Consumido via `useSearch()`.
- **`AuthContext`** *(a criar)* — auth com Bearer token. Ver seção de roadmap.

Todos os contextos são Client Components (`"use client"`).

### Serviços e API (`src/services/`)

- **`api.js`** — instância Axios configurada. Em dev, loga requests/responses no console. Erros normalizados para `{ status, message }`. Deve incluir interceptor de Authorization com Bearer token (lendo `localStorage` apenas quando `typeof window !== 'undefined'`).
- **`productService.js`** — busca produtos. Resolve imagens relativas para URL absoluta e aplica fallback (`src/constants/images.js`).

### Componente `Produtos`

`src/components/Produtos.jsx` — listagem central. Recebe `category` (opcional) como prop, busca via `productService`, filtra por `searchTerm` do contexto, controla estados de loading/erro e feedback visual de "adicionado".

### Hook `useCartLogic`

`src/hooks/useCartLogic.jsx` — cálculo de subtotal, frete e desconto. Cupom promocional tem TODO para `POST /discounts/validate` — backend não implementa essa rota ainda.

### Estilização

Tailwind CSS com tema em `tailwind.config.js`:

| Token | Valor |
|---|---|
| `primary` | `#17A354` (verde) |
| `secondary` | `#2e7d32` |
| `accent` | `#F9A825` (amarelo) |
| `dark` | `#333333` |
| `bg-light` | `#f9f9f9` |
| `error` / `success` | vermelho / verde claro |

Fonte: Quicksand via `next/font`. Ícones: FontAwesome — `config.autoAddCss = false` no layout para evitar conflito; estilos importados manualmente.

### Imagens externas permitidas

`next.config.mjs`: `ui-avatars.com`, `images.unsplash.com`, `placehold.co`, `res.cloudinary.com`, `econagro-backend.onrender.com`.

---

## Padrão de engenharia

Priorizar:

- Integração real com o backend — não manter simulação onde existe API.
- Contratos claros entre frontend e API.
- Estados de loading/erro/sucesso reais em toda chamada HTTP.
- Mudanças pequenas e verificáveis — não misturar features grandes com limpeza cosmética.

Evitar:

- Refatorações amplas sem necessidade imediata.
- UI que finge fazer algo (sucesso fake, `console.log` de token/senha).
- Introduzir dependências sem necessidade forte.
- Mudar design ou arquitetura por gosto pessoal.

Se encontrar erro crasso, corrigir diretamente. Se for decisão arquitetural aceitável, não transformar em drama.

---

## Contratos do backend

Auth usa Bearer token — **não** usar cookie/httpOnly, **não** usar `withCredentials`.

```
POST /api/auth/register   { name, email, password }
POST /api/auth/login      { email, password }
GET  /api/auth/me         Authorization: Bearer <token>
```

Resposta de sucesso:

```json
{ "success": true, "token": "...", "data": { "id", "name", "email", "role" } }
```

Erros:

```json
{ "success": false, "message": "..." }
```

Produtos (públicos):

```
GET /api/products
GET /api/products/:id
GET /api/products/category/:categoryName
```

Backend só retorna produtos com `active: true` em categorias ativas. Produto inativo por ID retorna 404.

Categorias (públicas):

```
GET /api/categories
GET /api/categories/:id
```

Resposta: `{ _id, id, name, image, active, order }`. Só retorna ativas, ordenadas por `order` depois `name`.

Token armazenado em `localStorage` com chaves `econagro:token` e `econagro:user`.

---

## Roadmap de prioridades

### Prioridade 1 — Autenticação real

Arquivos a criar/alterar:

- `src/services/authService.js` — métodos `login()`, `register()`, `me()`
- `src/context/AuthContext.jsx` — expõe `user`, `token`, `isAuthenticated`, `isLoading`, `login`, `register`, `logout`, `loadUser`
- `src/services/api.js` — adicionar interceptor de Authorization
- `src/components/Providers.jsx` — incluir `AuthProvider`
- `src/app/login/page.jsx` — chamar `auth.login`, loading no botão, erro real da API
- `src/app/cadastro/page.jsx` — enviar `{ name, email, password }` (nome completo); não enviar `number`/`gender`; autenticar automaticamente com token retornado
- `src/components/header.jsx` — mostrar nome/Sair quando logado; Entrar/Criar Conta quando não logado

Não implementar: cookie httpOnly, refresh token, OAuth, admin UI, recuperação de senha.

### Prioridade 2 — Categorias dinâmicas

Arquivos a criar/alterar:

- `src/services/categoryService.js` — método `getCategories()` com resolução de imagem igual ao `productService`
- `src/app/page.jsx` — buscar categorias da API (componente client `CategoryGrid`)
- `src/components/header.jsx` — carregar categorias via `categoryService`; fallback silencioso se API cair
- `src/components/footer.jsx` — remover seção de categorias (duplicação desnecessária)
- `src/data/categories.jsx` — parar de usar como fonte de verdade
- Links de categoria devem usar `encodeURIComponent(cat.name)`

### Prioridade 3 — Renomear quantity no carrinho

`CartContext` usa `quantity` para quantidade no carrinho, mas no backend `quantity` = estoque do produto.

- Renomear para `cartQuantity` em `CartContext`, na página do carrinho, em `useCartLogic` e no contador do header.
- Preservar `product.quantity` como estoque.

### Prioridade 4 — Placeholders honestos

Telas que afirmam sucesso sem backend:

- **Recuperação de senha** — backend não implementa. Esconder link ou exibir mensagem honesta de indisponibilidade.
- **Fale Conosco** — não envia para API. Deixar claro que é demonstração ou remover.
- **Newsletter** — não chama API. Remover campo ou marcar como futura funcionalidade.
- **Cupom promocional** — remover UI enquanto backend não tiver `/discounts/validate`.

### Prioridades futuras (não iniciar sem pedido explícito)

- Admin UI (somente após auth real integrada)
- Testes frontend (Vitest ou Jest)
- CI com GitHub Actions

---

## Hard constraints

- Não hardcodar URL do backend em componentes — sempre via `NEXT_PUBLIC_API_URL`.
- Não usar `withCredentials` — CORS está alinhado com Bearer token, não com cookie.
- Não enviar `password` ou token para console.
- Não vazar token em URL.
- Não usar categorias estáticas como fonte final de verdade.
- Não misturar admin UI antes de auth real estar integrada.
- Não migrar para TypeScript.
- Não mudar design inteiro durante integração de API.
- `localStorage` só existe no browser — checar `typeof window !== 'undefined'` antes de acessar.
- Componentes com hooks de estado/contexto precisam de `"use client"`.

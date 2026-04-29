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

Se alguma mudança quebrar build por uso de API de browser:

- revisar `localStorage`;
- revisar `sessionStorage`;
- revisar `window`;
- garantir `typeof window !== "undefined"`;
- garantir que componentes com hooks tenham `"use client"`.

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
| `/login`, `/cadastro`, `/recuperar-senha`, `/redefinir-senha` | páginas de autenticação |
| `/talktous`, `/aboutus` | páginas institucionais |

O `layout.jsx` raiz envolve tudo com `<Providers>`, `<Header>` e `<Footer>`.

### Estado global (`src/context/`)

Contextos expostos via `src/components/Providers.jsx`:

- **`CartContext`** — carrinho em memória (sem persistência). Expõe `cart`, `addToCart`, `removeFromCart`, `updateQuantity`, `clearCart`. Consumido via `useCart()`.
- **`SearchContext`** — termo de busca global. Expõe `searchTerm`, `updateSearch`, `clearSearch`. Consumido via `useSearch()`.
- **`AuthContext`** — auth com Bearer token. Expõe `user`, `token`, `isAuthenticated`, `isLoading`, `login`, `register`, `logout`. O `login` aceita `rememberMe` (bool): `true` → `localStorage` (persiste entre sessões), `false` → `sessionStorage` (limpa ao fechar o browser). O `register` sempre usa `localStorage`.

Todos os contextos são Client Components (`"use client"`).

### Serviços e API (`src/services/`)

- **`api.js`** — instância Axios configurada. Em dev, loga requests/responses no console. Erros normalizados para `{ status, message }`. Deve incluir interceptor de Authorization com Bearer token (lendo `localStorage` apenas quando `typeof window !== 'undefined'`).
- **`productService.js`** — busca produtos. Resolve imagens relativas para URL absoluta e aplica fallback (`src/constants/images.js`).
- **`authService.js`** — `login()`, `register()`, `me()`, `forgotPassword({ email })`, `resetPassword({ token, password })`.
- **`contactService.js`** — `sendMessage({ name, email, message })` — chama `POST /contact`.

### Componente `Produtos`

`src/components/Produtos.jsx` — listagem central. Recebe `category` (opcional) como prop, busca via `productService`, filtra por `searchTerm` do contexto, controla estados de loading/erro e feedback visual de "adicionado".

### Hook `useCartLogic`

`src/hooks/useCartLogic.jsx` — cálculo de subtotal e frete. Cupom promocional foi removido completamente. Usa `cartQuantity` (quantidade escolhida no carrinho) em vez de `quantity` (estoque do produto vindo do backend).

### Semântica de `quantity` vs `cartQuantity`

- `product.quantity` = estoque vindo do backend. Não alterar.
- `item.cartQuantity` = quantidade escolhida pelo usuário no carrinho. Usar em todo lugar que representa quantidade no carrinho (exibição, cálculo de total, incremento/decremento).

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
POST /api/auth/register        { name, email, password }
POST /api/auth/login           { email, password }
GET  /api/auth/me              Authorization: Bearer <token>
POST /api/auth/forgot-password { email }
POST /api/auth/reset-password  { token, password }
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

Contato:

```
POST /api/contact  { name, email, message }
```

Token armazenado com chaves `econagro:token` e `econagro:user`. Quando "Lembrar-me" está marcado usa `localStorage`; caso contrário usa `sessionStorage`. O interceptor do Axios e o init do `AuthContext` verificam ambos os storages.

---

## Plano de implementação

### Prioridade 1 — Remover completamente a feature de cupom ✅

O carrinho não possui mais UI nem lógica de código promocional. Cupom foi removido sem substituto porque o backend não implementa `/discounts/validate`.

Arquivos afetados:

- `src/hooks/useCartLogic.jsx` — removidos: `promoCode`, `setPromoCode`, `promoDiscount`, `promoError`, `promoSuccess`, `applyPromoCode`. `calculateTotal` simplificado para subtotal + frete.
- `src/app/carrinho/page.jsx` — removida toda a UI de cupom (input, botão "Aplicar", mensagens, linha de desconto).

### Prioridade 2 — Corrigir `quantity` para `cartQuantity` ✅

No backend, `quantity` significa estoque do produto. No carrinho do frontend, a quantidade escolhida pelo usuário agora usa `cartQuantity`.

Arquivos afetados:

- `src/context/CartContext.jsx` — `addToCart` usa `{ ...product, cartQuantity: 1 }`, `updateQuantity` usa `cartQuantity`.
- `src/components/Header.jsx` — contador usa `item.cartQuantity`.
- `src/app/carrinho/page.jsx` — exibição e controles usam `item.cartQuantity`.
- `src/hooks/useCartLogic.jsx` — `calculateTotal` multiplica `parsePrice(item.price) * item.cartQuantity`.

### Prioridade 3 — Padronizar cadastro com o backend atual ✅

O formulário de cadastro pede apenas nome completo, e-mail, senha e confirmação de senha. Envia `{ name, email, password }` para o backend.

Arquivo afetado:

- `src/app/cadastro/page.jsx` — substituídos campos separados `name` + `lastname` por campo único "Nome completo". Removidos campos inexistentes no backend.

### Prioridade 4 — Header deve respeitar `AuthContext.isLoading` ✅

Enquanto o `AuthContext` restaura a sessão via `/auth/me`, o Header exibe placeholder discreto na área de auth para evitar flicker visual entre estado deslogado e logado.

Arquivo afetado:

- `src/components/Header.jsx` — consome `isLoading` do `useAuth()` e exibe `"..."` na área de auth durante carregamento.

### Prioridade 5 — Integrar recuperação de senha ao backend real

Fluxo esperado:

1. Usuário acessa `/recuperar-senha`, informa e-mail.
2. Frontend chama `POST /auth/forgot-password { email }`.
3. Tela mostra mensagem genérica independente de o e-mail existir.
4. Usuário recebe link para `/redefinir-senha?token=<token>`.
5. Usuário informa nova senha; frontend chama `POST /auth/reset-password { token, password }`.
6. Após sucesso, redireciona para `/login`.

Arquivos afetados:

- `src/services/authService.js` — adicionar `forgotPassword({ email })` e `resetPassword({ token, password })`.
- `src/app/recuperar-senha/page.jsx` — chamar backend real, não simular.
- `src/app/redefinir-senha/page.jsx` — criar página com `useSearchParams` para ler token.

Mensagem de sucesso para forgot-password (não revelar se e-mail existe):

```
Se o e-mail informado estiver cadastrado, você receberá um link de recuperação em instantes.
```

Proibido: `console.log(token)`.

### Prioridade 6 — Integrar Fale Conosco ao backend real

Endpoint:

```
POST /contact  { name, email, message }
```

Arquivos afetados:

- `src/services/contactService.js` — criar com `sendMessage({ name, email, message })`.
- `src/app/talktous/page.jsx` — chamar `contactService.sendMessage`, mostrar loading, bloquear duplo submit, mostrar sucesso/erro real.

Não usar EmailJS, SMTP, API key de e-mail no browser.

### Prioridade 7 — Atualizar `CLAUDE.md`

Refletir no CLAUDE.md todas as mudanças acima após conclusão.

---

## Validação final

Rodar sempre:

```bash
npm run lint
npm run build
```

Teste manual mínimo:

1. Cadastro com nome/e-mail/senha.
2. Login com "Lembrar-me" marcado.
3. Login com "Lembrar-me" desmarcado.
4. Recarregar página e verificar Header sem flicker grosseiro.
5. Adicionar produto ao carrinho.
6. Aumentar/diminuir quantidade no carrinho.
7. Confirmar que `cartQuantity` não destrói `quantity` do produto.
8. Verificar que cupom não existe mais.
9. Solicitar recuperação de senha com e-mail qualquer.
10. Ver mensagem genérica.
11. Abrir `/redefinir-senha?token=fake` e verificar erro controlado.
12. Enviar Fale Conosco com dados válidos.
13. Simular erro de API no Fale Conosco e verificar mensagem de erro.

---

## Hard constraints

- Não implementar backend neste repositório.
- Não enviar e-mail diretamente do frontend.
- Não usar API key de e-mail no browser.
- Não recriar cupom.
- Não usar `withCredentials` — CORS está alinhado com Bearer token, não com cookie.
- Não trocar Bearer token por cookie.
- Não migrar para TypeScript.
- Não fazer admin UI.
- Não mexer no design inteiro.
- Não manter sucesso fake onde existe integração real esperada.
- Não logar token, senha ou dados sensíveis no console.
- Não hardcodar URL do backend em componente — sempre via `NEXT_PUBLIC_API_URL`.
- Não vazar token em URL.
- Usar services para chamadas HTTP — manter Axios centralizado em `src/services/api.js`.
- `localStorage` só existe no browser — checar `typeof window !== 'undefined'` antes de acessar.
- Componentes com hooks de estado/contexto precisam de `"use client"`.
- Não usar categorias estáticas como fonte final de verdade.

### Prioridades futuras (não iniciar sem pedido explícito)

- Admin UI (somente após auth real integrada)
- Testes frontend (Vitest ou Jest)
- CI com GitHub Actions

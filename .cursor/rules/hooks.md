---
description: Custom hook authoring conventions
globs: ["src/**/hooks/*.ts", "src/**/use*.ts"]
alwaysApply: false
---

# Hooks Contain All Logic

Business logic, data fetching, derived state, and side effects live in hooks — not in components. If logic appears inside a component body, extract it into a hook.

# Single Responsibility

Each hook does one thing. Split hooks that handle multiple concerns.

```ts
// Correct: focused, composable hooks
function useCart() { /* cart state and actions */ }
function useCheckout() { /* checkout submission */ }
function useCartTotal() { /* derives total from cart items */ }

// Wrong: one hook doing too much
function useCheckoutPage() { /* cart + checkout + user + payment + analytics */ }
```

# Naming

- Descriptive and agnostic — the name describes what the hook does, not which component uses it
- `useCart` not `useCheckoutPageCart`
- `useLogin` not `useLoginFormHandler`
- `useProductList` not `useCatalogData`
- If the hook's name only makes sense in one specific place, it is a signal it is too tightly coupled or doing too much

# Return Shape

Return only what the consumer needs. Reshape and name things meaningfully — do not return raw store slices or raw API responses.

```ts
// Correct
return { items, total, addItem, removeItem, isLoading }

// Wrong
return { state, dispatch, queryResult }
```

# Data Fetching

- Use TanStack Query for server state
- Define `queryOptions` in `features/<name>/services/` — not inline in hooks
- Query keys live alongside their query functions
- Use `useSuspenseQuery` for data required to render; `useQuery` when partial/loading states are acceptable
- Any mapping or transformation of API responses belongs in the hook, not the service — services return raw data, hooks reshape it for the component

# Forms

- Use React Hook Form + Zod via `@hookform/resolvers/zod`
- Define schema with `z.object({...})`, infer type with `z.infer<typeof schema>`
- Keep form state, validation, and submission logic in a dedicated hook — not in the component

```ts
// features/auth/hooks/useLoginForm.ts
export function useLoginForm() {
  const form = useForm<LoginInput>({ resolver: zodResolver(loginSchema) })
  const { mutate: login, isPending } = useLoginMutation()

  function onSubmit(data: LoginInput) {
    login(data)
  }

  return { form, onSubmit, isPending }
}
```

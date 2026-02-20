---
description: Zustand store conventions
globs: ["src/**/stores/*.ts"]
alwaysApply: false
---

# Store Placement

- Feature-scoped state: `src/features/<name>/stores/useCamelCaseStore.ts`
- Global/cross-feature state: `src/stores/useCamelCaseStore.ts` (auth, current user, session, app-wide UI state)

# When to Use Which Tool

| State type | Tool |
|---|---|
| Server data (fetched from API) | TanStack Query |
| Concrete app state shared across components | Zustand |
| Ephemeral local UI state (open/close, hover, unsubmitted field) | useState |

Prefer Zustand over prop-passing for concrete state. If you would pass a state value through more than one component to reach its consumer, it belongs in a store.

# Store Structure

Actions are defined inside `create()`. Types are explicit. No `any`.

```ts
import { create } from 'zustand'

type CartState = {
  items: CartItem[]
  addItem: (item: CartItem) => void
  removeItem: (id: string) => void
  clear: () => void
}

export const useCartStore = create<CartState>()((set) => ({
  items: [],
  addItem: (item) => set((s) => ({ items: [...s.items, item] })),
  removeItem: (id) => set((s) => ({ items: s.items.filter((i) => i.id !== id) })),
  clear: () => set({ items: [] }),
}))
```

# Selectors

Always select only what you need — never subscribe to the whole store. Subscribing to the whole store causes re-renders on every state change.

```ts
// Correct
const items = useCartStore((s) => s.items)
const addItem = useCartStore((s) => s.addItem)

// Wrong — re-renders on any store change
const { items, addItem } = useCartStore()
```

# Expose Stores via Hooks

Components never import store files directly. Wrap store access in a hook. This keeps the store as an implementation detail and allows derived state to be colocated.

```ts
// features/cart/hooks/useCart.ts
import { useCartStore } from '@/features/cart/stores/useCartStore'

export function useCart() {
  const items = useCartStore((s) => s.items)
  const addItem = useCartStore((s) => s.addItem)
  const removeItem = useCartStore((s) => s.removeItem)
  const total = items.reduce((sum, i) => sum + i.price * i.quantity, 0)

  return { items, total, addItem, removeItem }
}
```

# Props vs Store

- **Config props** (fine to pass): `variant`, `size`, `className`, `disabled`, event handler callbacks
- **State props** (use store instead): anything the UI reads as data — `isLoading`, `user`, `items`, `count`, `error`

State passed as props creates invisible coupling and forces intermediary components to know about data they don't use. Put state in the store and let the consumer hook fetch it directly.

---
description: Component authoring conventions
globs: ["src/**/*.tsx"]
alwaysApply: false
---

# Components Are Purely Presentational

Components render UI and call hooks. They contain no business logic, data fetching, state derivation, or conditional data transformation.

```tsx
// Correct: component calls focused hooks, renders output
function ProductCard({ variant }: { variant: 'compact' | 'full' }) {
  const { product, isLoading } = useProduct()
  const { addItem } = useCart()

  if (isLoading) return <Skeleton />
  return (
    <div>
      <p>{product.name}</p>
      <Button onClick={() => addItem(product)}>Add to cart</Button>
    </div>
  )
}

// Wrong: logic inside the component body
function ProductCard() {
  const [product, setProduct] = useState(null)
  useEffect(() => { fetch('/api/product').then(r => r.json()).then(setProduct) }, [])
  const discountedPrice = product ? product.price * 0.9 : 0
  return <div>{discountedPrice}</div>
}
```

# Props

- **Config props** (pass freely): appearance and behaviour — `variant`, `size`, `className`, `disabled`, callback handlers like `onClick`
- **State props** (never pass): data the UI displays — `isLoading`, `user`, `items`, `count`, `error`. This state comes from Zustand stores accessed via hooks.
- Callback props are fine — they represent what to do on an event, not what state is

# Multiple Hooks Per Component

A component may call multiple hooks when they serve isolated purposes. Do not merge unrelated concerns into one hook for a tidier call site.

```tsx
function CheckoutPage() {
  const { cart, total } = useCart()
  const { user } = useCurrentUser()
  const { submit, isSubmitting } = useCheckout()

  return (...)
}
```

# Naming

- Descriptive and agnostic — names describe what the component represents, not which page uses it
- `ProductCard` not `CatalogProductCard`
- `UserAvatar` not `NavbarUserAvatar`
- `OrderSummary` not `CheckoutOrderSummary`

# Styling

- Use `cn()` from `@/lib/utils` for conditional Tailwind classes
- Use shadcn/ui components from `@/components/ui/` for base UI elements
- Files in `src/components/ui/` may be edited to match designs — but when pulling an updated version via `npx shadcn@latest add <name>`, manually migrate any local style changes into the newly generated file

# shadcn/ui — Use Before Building

Before building any base UI element (button, input, checkbox, select, dialog, etc.), check whether shadcn/ui provides it.

1. Check `src/components/ui/` — if the component is already installed, use it.
2. If it is not installed, add it before writing any custom implementation:
   ```bash
   npx shadcn@latest add <component-name>
   ```
3. Only build a custom element from scratch if shadcn/ui has no equivalent.

Never hand-roll a native `<input type="checkbox">`, `<select>`, `<dialog>`, or similar when a shadcn/ui component exists. Using the library keeps styling, accessibility, and behaviour consistent across the app.

# Routing

- Route files in `src/routes/` export `const Route = createFileRoute('...')({...})`
- Route components are thin shells — delegate to feature components immediately
- Never edit `src/routeTree.gen.ts` — it is auto-generated

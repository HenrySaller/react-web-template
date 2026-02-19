# Features

Feature modules go here. Each feature should be self-contained with its own components, hooks, services, and types.

## Structure

```
features/
└── my-feature/
    ├── components/   # Feature-specific components
    ├── hooks/        # Feature-specific hooks
    ├── services/     # API calls and business logic
    └── types/        # Feature-specific TypeScript types
```

## Conventions

- Import directly from feature files (no barrel/index files in app code)
- Keep features independent from each other
- Share code via `src/components`, `src/hooks`, `src/lib`, or `src/stores`

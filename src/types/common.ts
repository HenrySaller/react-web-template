export type Nullable<T> = T | null
export type Optional<T> = T | undefined
export type AsyncReturnType<T extends (...args: unknown[]) => Promise<unknown>> = Awaited<
  ReturnType<T>
>

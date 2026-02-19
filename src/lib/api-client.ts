import ky from 'ky'

export const apiClient = ky.create({
  prefixUrl: import.meta.env.VITE_API_URL ?? '/api',
  headers: {
    'Content-Type': 'application/json',
  },
})

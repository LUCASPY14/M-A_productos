import axios from 'axios'

export const API_URL = import.meta.env.VITE_API_URL ?? 'http://localhost:8000/api'

const ACCESS_KEY = 'ma_access_token'
const REFRESH_KEY = 'ma_refresh_token'

export const tokenStorage = {
  getAccess: () => localStorage.getItem(ACCESS_KEY),
  getRefresh: () => localStorage.getItem(REFRESH_KEY),
  set: (access: string, refresh: string) => {
    localStorage.setItem(ACCESS_KEY, access)
    localStorage.setItem(REFRESH_KEY, refresh)
  },
  setAccess: (access: string) => localStorage.setItem(ACCESS_KEY, access),
  clear: () => {
    localStorage.removeItem(ACCESS_KEY)
    localStorage.removeItem(REFRESH_KEY)
  },
}

export const api = axios.create({ baseURL: API_URL })

api.interceptors.request.use((config) => {
  const token = tokenStorage.getAccess()
  if (token) {
    config.headers.Authorization = `Bearer ${token}`
  }
  return config
})

let refreshing: Promise<string> | null = null

api.interceptors.response.use(
  (response) => response,
  async (error) => {
    const original = error.config
    if (error.response?.status !== 401 || original._retry) {
      throw error
    }

    const refresh = tokenStorage.getRefresh()
    if (!refresh) {
      tokenStorage.clear()
      window.location.href = '/login'
      throw error
    }

    original._retry = true
    try {
      refreshing ??= axios
        .post(`${API_URL}/token/refresh/`, { refresh })
        .then((res) => {
          tokenStorage.setAccess(res.data.access)
          return res.data.access as string
        })
        .finally(() => {
          refreshing = null
        })

      const newAccess = await refreshing
      original.headers.Authorization = `Bearer ${newAccess}`
      return api(original)
    } catch {
      tokenStorage.clear()
      window.location.href = '/login'
      throw error
    }
  },
)

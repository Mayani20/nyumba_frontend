export const cache = {
  get: <T>(key: string): T | null => {
    try {
      const value = localStorage.getItem(key)
      return value ? JSON.parse(value) : null
    } catch {
      return null
    }
  },

  set: (key: string, value: any) => {
    try {
      localStorage.setItem(key, JSON.stringify(value))
    } catch {}
  },

  remove: (key: string) => {
    localStorage.removeItem(key)
  }
}

'use client'

import { useEffect, useState } from 'react'

interface LocationState {
  city: string | null
  normalizedCity: string | null
  loading: boolean
  error: string | null
}

const normalize = (location: string) =>
  location.toLowerCase().trim().replace(/\s+/g, ' ')

export const useLocation = () => {
  const [state, setState] = useState<LocationState>({
    city: null,
    normalizedCity: null,
    loading: true,
    error: null,
  })

  useEffect(() => {
    if (!navigator.geolocation) {
      setState(s => ({ ...s, loading: false, error: 'Not supported' }))
      return
    }

    navigator.geolocation.getCurrentPosition(
      async (pos) => {
        try {
          const { latitude, longitude } = pos.coords

          const res = await fetch(
            `https://nominatim.openstreetmap.org/reverse?lat=${latitude}&lon=${longitude}&format=json`
          )

          const data = await res.json()

          const city =
            data.address?.city ||
            data.address?.town ||
            data.address?.village

          setState({
            city,
            normalizedCity: city ? normalize(city) : null,
            loading: false,
            error: null,
          })
        } catch {
          setState(s => ({ ...s, loading: false, error: 'Failed to detect location' }))
        }
      },
      () => {
        setState(s => ({ ...s, loading: false, error: 'Permission denied' }))
      }
    )
  }, [])

  return state
}

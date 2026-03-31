'use client'

import { useEffect, useState } from 'react'
import { api } from '@/services/api'
import { Property } from '@/types/property'

interface LandingData {
  featured: Property[]
  recent: Property[]
  cities: string[]
  loading: boolean
  error: string | null
}

export const useLandingData = (location?: string | null) => {
  const [data, setData] = useState<LandingData>({
    featured: [],
    recent: [],
    cities: [],
    loading: true,
    error: null,
  })

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await api.getLanding(
          location ? { location } : {}
        )

        const payload = res.data.data

        setData({
          featured: payload?.featured ?? [],
          recent: payload?.recent ?? [],
          cities: payload?.cities ?? [],
          loading: false,
          error: null,
        })
      } catch (err: any) {
        setData(s => ({
          ...s,
          loading: false,
          error: err?.response?.data?.error || 'Failed to load'
        }))
      }
    }

    fetchData()
  }, [location])

  return data
}

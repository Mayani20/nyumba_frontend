'use client'

import { useEffect, useState } from 'react'
import { api } from '@/services/api'

export const usePropertyImages = (ids: number[]) => {
  const [images, setImages] = useState<Map<number, string>>(new Map())

  useEffect(() => {
    if (!ids.length) return

    const fetchImages = async () => {
      try {
        const res = await api.getPropertyImages(ids)

        const map = new Map<number, string>()

        Object.entries(res.data.images).forEach(([id, imgs]: any) => {
          if (imgs?.length) {
            const first = imgs[0]
            const url = typeof first === 'string'
              ? first
              : first.img_url

            map.set(Number(id), url)
          }
        })

        setImages(map)
      } catch (e) {
        console.error('Image error', e)
      }
    }

    fetchImages()
  }, [ids])

  return images
}

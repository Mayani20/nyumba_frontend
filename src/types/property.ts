export interface PropertyImage {
  img_url?: string
  image_url?: string
  url?: string
  path?: string
}

export interface Property {
  id: number
  title: string
  price: number | string
  location: string
  image?: string
  images?: PropertyImage[]
  image_url?: string
  isVerified?: boolean
  rating?: number
  bedrooms?: number
  created_at?: string
}

import Image from 'next/image'
import { Property } from '@/types/property'

interface Props {
  property: Property
  image?: string
  onClick: () => void
}

export const PropertyCard = ({ property, image, onClick }: Props) => {
  return (
    <div
      onClick={onClick}
      className="bg-white rounded-xl shadow hover:shadow-lg cursor-pointer overflow-hidden"
    >
      <div className="relative h-48">
        <Image
          src={image || '/placeholder.jpg'}
          alt={property.title}
          fill
          className="object-cover"
        />
       
      </div>

      <div className="p-4">
        <h3 className="font-bold">{property.title}</h3>
        <p className="text-sm text-gray-500">{property.location}</p>
      </div>
    </div>
  )
}

import { getProperties } from "@/services/api";

export default async function PropertiesPage() {
  const properties = await getProperties();

  return (
    <div>
      <h1>Properties</h1>

      {properties.map((property) => (
        <div key={property.id}>
          <h2>{property.title}</h2>
          <p>Price: {property.price}</p>
        </div>
      ))}
    </div>
  );
}





// // src/app/properties/page.tsx
// import { getProperties, Property } from "@/services/api";

// export default async function PropertiesPage() {
//   // Explicitly type the properties
//   const properties: Property[] = await getProperties();

//   return (
//     <div className="p-4">
//       <h1 className="text-2xl font-bold mb-4">Properties</h1>

//       {properties.length === 0 ? (
//         <p>No properties found.</p>
//       ) : (
//         properties.map((property) => (
//           <div key={property.id} className="border p-4 rounded mb-2">
//             <h2 className="font-semibold text-lg">{property.title}</h2>
//             <p>Price: ${property.price}</p>
//           </div>
//         ))
//       )}
//     </div>
//   );
// }

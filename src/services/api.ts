// import axios from '@/lib/axios'

// export const api = {
// //   getLanding: (params?: any) =>
// //     axios.get('/api/tenant/properties/landing', { params }),

//   getUsers: () =>
//     axios.get('/api/users'),

//   getPropertyImages: (ids: number[]) =>
//     axios.post('/api/properties/images', { property_ids: ids }),
// }








import axios from "@/lib/axios";

export const api = {
  // Auth endpoints (available - from AuthController)
  register: (data: any) => axios.post("/api/auth/register", data),
  login: (data: any) => axios.post("/api/auth/login", data),

  // Test endpoints (available - from Program.cs)
  dbTest: () => axios.get("/db-test"),
  healthCheck: () => axios.get("/"),
  weatherForecast: () => axios.get("/weatherforecast"),

  // NOTE: The following endpoints are NOT available in your backend yet:
  // getLanding, getProperties, getPropertyById, getUsers, getPropertyImages
};

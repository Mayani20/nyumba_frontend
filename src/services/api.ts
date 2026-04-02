import axios from "@/lib/axios";

export const api = {
  // Auth endpoints (available - from AuthController)
  register: (data: any) => axios.post("/api/auth/register", data),
  login: (data: any) => axios.post("/api/auth/login", data),

  // Test endpoints (available - from Program.cs)
  dbTest: () => axios.get("/db-test"),
  healthCheck: () => axios.get("/"),
  weatherForecast: () => axios.get("/weatherforecast"),

   getLanding: (params?: { location?: string }) =>
    axios.get("/api/tenant/properties/landing", { params }),

getPropertyImages: (ids: number[]) =>
    axios.post("/api/property-images/bulk", { ids }),
};

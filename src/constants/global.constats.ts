export const authorImage =
  "https://images.unsplash.com/photo-1522075469751-3a6694fb2f61?q=80&w=1780&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D";
export const protectedRoutes = [
  "/user-profile",
  "/user-profile/:path*",
  "/login",
  "/register",
  "/dashboard",
  "/dashboard/:path:*",
];

export const travelerInterests = [
  { key: "Backpacking", label: "Backpacking" },
  { key: "CulturalImmersion", label: "CulturalImmersion" },
  { key: "Photography", label: "Photography" },
  { key: "AdventureSports", label: "AdventureSports" },
  { key: "CulinaryExploration", label: "CulinaryExploration" },
  { key: "SoloTravel", label: "SoloTravel" },
  { key: "SustainableTravel", label: "SustainableTravel" },
  { key: "HistoricalSites", label: "HistoricalSites" },
  { key: "BeachGetaways", label: "BeachGetaways" },
  { key: "RoadTrips", label: "RoadTrips" },
];

export const tableClasses = {
  wrapper: "p-0 shadow rounded-lg !overflow-x-auto",
  th: "text-shark-800 text-sm px-[24px] py-5 first:!rounded-s-none last:!rounded-e-none",
  td: "px-[24px] py-5 text-shark-600 text-sm first:before:!rounded-l-none last:before:!rounded-r-none group-data-[odd=true]:before:bg-[#F7F7F8]",
};

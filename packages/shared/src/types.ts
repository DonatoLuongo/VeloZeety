export type Role = "client" | "driver" | "admin";

export type VehicleType = "moto" | "car";

export type RideStatus =
  | "searching"
  | "accepted"
  | "driver_en_route"
  | "in_progress"
  | "completed"
  | "cancelled";

export interface UserBase {
  id: string;
  email: string;
  role: Role;
  createdAt: string;
}

export interface ClientProfile extends UserBase {
  role: "client";
  fullName: string;
  phone?: string;
  avatarUrl?: string;
  walletBalance: number;
  referralCode?: string;
}

export interface DriverProfile extends UserBase {
  role: "driver";
  fullName: string;
  phone: string;
  avatarUrl?: string;
  vehicleType: VehicleType;
  plate?: string;
  documentId?: string;
  rating?: number;
  totalTrips?: number;
}

export interface Stop {
  id: string;
  name: string;
  lat: number;
  lng: number;
  address: string;
  vehicleTypes: VehicleType[];
}

export interface RideRequest {
  pickup: { lat: number; lng: number; address?: string };
  dropoff: { lat: number; lng: number; address?: string };
  vehicleType: VehicleType;
  stopId?: string;
}

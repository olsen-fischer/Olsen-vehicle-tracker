export interface BaseVehicle {
  make: string;
  model: string;
}

export interface Car extends BaseVehicle {
  type: 'car';
  seats: number;
}

export interface Bus extends BaseVehicle {
  type: 'bus';
  payloadCapacity: number;
}

export interface Truck extends BaseVehicle {
  type: 'truck';
  maxLoad: number;
}

export type Vehicle = Car | Bus | Truck;

// Optional: type guards
export function isCar(v: Vehicle): v is Car {
  return v.type === 'car';
}

export function isBus(v: Vehicle): v is Bus {
  return v.type === 'bus';
}

export function isTruck(v: Vehicle): v is Truck {
  return v.type === 'truck';
}

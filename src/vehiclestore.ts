import { Vehicle } from './vehicle';

export class VehicleStore<T extends Vehicle> {
  private vehicles: T[] = [];

  constructor() {
    const saved = localStorage.getItem('vehicles');
    this.vehicles = saved ? JSON.parse(saved) : [];
  }

  add(vehicle: T): void {
    this.vehicles.push(vehicle);
    localStorage.setItem('vehicles', JSON.stringify(this.vehicles));
  }

  getAll(): Readonly<T[]> {
    return this.vehicles;
  }

  filterByType(type: Vehicle['type'] | 'all'): Readonly<T[]> {
    return type === 'all' ? this.vehicles : this.vehicles.filter(v => v.type === type);
  }

  clearAll(): void {
    this.vehicles = [];
    localStorage.removeItem('vehicles');
  }
}

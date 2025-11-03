import { Vehicle } from '../vehicle';
import { VehicleStore } from '../vehiclestore';

export class Renderer {
  private list: HTMLUListElement;

  constructor(listId: string) {
    this.list = document.getElementById(listId) as HTMLUListElement;
  }

  render(vehicles: Readonly<Vehicle[]>): void {
    this.list.innerHTML = '';

    vehicles.forEach(v => {
      const li = document.createElement('li');
      switch (v.type) {
        case 'car':
          li.textContent = ` Car: ${v.make} ${v.model} — ${v.seats} seats`;
          break;
        case 'bus':
          li.textContent = ` Bus: ${v.make} ${v.model} — ${v.payloadCapacity} kg payload`;
          break;
        case 'truck':
          li.textContent = ` Truck: ${v.make} ${v.model} — ${v.maxLoad} kg max load`;
          break;
        default:
          const neverType: never = v;
          throw new Error(`Unknown type: ${neverType}`);
      }
      this.list.appendChild(li);
    });
  }
}

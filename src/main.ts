import { Vehicle } from './vehicle';
import { VehicleStore } from './vehiclestore';
import { Renderer } from './ui/renderer';

const store = new VehicleStore<Vehicle>();
const renderer = new Renderer('vehicle-list');

const form = document.getElementById('vehicle-form') as HTMLFormElement;
const filterSelect = document.getElementById('filter') as HTMLSelectElement;
const clearBtn = document.getElementById('clear') as HTMLButtonElement;

function parseNumberInput(value: string): number | null {
  const num = Number(value);
  return !isNaN(num) && num > 0 ? num : null;
}

// vehicle handler
form.addEventListener('submit', e => {
  e.preventDefault();

  const type = (document.getElementById('vehicle-type') as HTMLSelectElement)
    .value as Vehicle['type'];
  const make = (document.getElementById('make') as HTMLInputElement).value.trim();
  const model = (document.getElementById('model') as HTMLInputElement).value.trim();
  const extraValue = (document.getElementById('extra') as HTMLInputElement).value.trim();
  const extra = parseNumberInput(extraValue);

  // validation to prevent empty or invalid entries
  if (!make || !model || extra === null) {
    alert('Please fill in all fields correctly.');
    return;
  }

  let newVehicle: Vehicle;
  switch (type) {
    case 'car':
      newVehicle = { type, make, model, seats: extra };
      break;
    case 'bus':
      newVehicle = { type, make, model, payloadCapacity: extra };
      break;
    case 'truck':
      newVehicle = { type, make, model, maxLoad: extra };
      break;
    default:
      alert('Invalid vehicle type.');
      return;
  }

  store.add(newVehicle);
  renderer.render(store.getAll());
  form.reset();
});

filterSelect.addEventListener('change', () => {
  const type = filterSelect.value as Vehicle['type'] | 'all';
  const filtered = store.filterByType(type);
  renderer.render(filtered);
});

clearBtn?.addEventListener('click', () => {
  if (confirm('Are you sure you want to clear all vehicles?')) {
    store.clearAll?.(); 
    renderer.render([]);
  }
});

renderer.render(store.getAll());

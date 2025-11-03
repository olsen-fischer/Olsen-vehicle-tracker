import { VehicleStore } from './vehiclestore';
import { Renderer } from '../ui/renderer';
const store = new VehicleStore();
const renderer = new Renderer('vehicle-list');
const form = document.getElementById('vehicle-form');
const filterSelect = document.getElementById('filter');
form.addEventListener('submit', e => {
    e.preventDefault();
    const type = document.getElementById('vehicle-type').value;
    const make = document.getElementById('make').value;
    const model = document.getElementById('model').value;
    const extra = parseInt(document.getElementById('extra').value);
    let newVehicle;
    if (type === 'car')
        newVehicle = { type, make, model, seats: extra };
    else if (type === 'bus')
        newVehicle = { type, make, model, payloadCapacity: extra };
    else
        newVehicle = { type, make, model, maxLoad: extra };
    store.add(newVehicle);
    renderer.render(store.getAll());
    form.reset();
});
filterSelect.addEventListener('change', () => {
    renderer.render(store.filterByType(filterSelect.value));
});

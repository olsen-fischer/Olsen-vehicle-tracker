import { VehicleStore } from './vehiclestore.js';
import { Renderer } from './ui/renderer.js';
const store = new VehicleStore();
const renderer = new Renderer('vehicle-list');
const form = document.getElementById('vehicle-form');
const filterSelect = document.getElementById('filter');
const clearBtn = document.getElementById('clear');
function parseNumberInput(value) {
    const num = Number(value);
    return !isNaN(num) && num > 0 ? num : null;
}
// vehicle handler
form.addEventListener('submit', e => {
    e.preventDefault();
    const type = document.getElementById('vehicle-type')
        .value;
    const make = document.getElementById('make').value.trim();
    const model = document.getElementById('model').value.trim();
    const extraValue = document.getElementById('extra').value.trim();
    const extra = parseNumberInput(extraValue);
    // validation to prevent empty or invalid entries
    if (!make || !model || extra === null) {
        alert('Please fill in all fields correctly.');
        return;
    }
    let newVehicle;
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
    const type = filterSelect.value;
    const filtered = store.filterByType(type);
    renderer.render(filtered);
});
clearBtn === null || clearBtn === void 0 ? void 0 : clearBtn.addEventListener('click', () => {
    var _a;
    if (confirm('Are you sure you want to clear all vehicles?')) {
        (_a = store.clearAll) === null || _a === void 0 ? void 0 : _a.call(store);
        renderer.render([]);
    }
});
renderer.render(store.getAll());

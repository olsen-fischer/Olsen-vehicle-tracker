export class VehicleStore {
    constructor() {
        this.vehicles = [];
        const saved = localStorage.getItem('vehicles');
        this.vehicles = saved ? JSON.parse(saved) : [];
    }
    add(vehicle) {
        this.vehicles.push(vehicle);
        localStorage.setItem('vehicles', JSON.stringify(this.vehicles));
    }
    getAll() {
        return this.vehicles;
    }
    filterByType(type) {
        return type === 'all' ? this.vehicles : this.vehicles.filter(v => v.type === type);
    }
    clearAll() {
        this.vehicles = [];
        localStorage.removeItem('vehicles');
    }
}

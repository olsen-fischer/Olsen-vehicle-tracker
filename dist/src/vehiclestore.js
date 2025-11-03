export class VehicleStore {
    constructor() {
        this.vehicles = [];
    }
    add(vehicle) {
        this.vehicles.push(vehicle);
    }
    getAll() {
        return this.vehicles;
    }
    filterByType(type) {
        return type === 'all'
            ? this.vehicles
            : this.vehicles.filter(v => v.type === type);
    }
}

async function sleep(ms: number) {
    return new Promise((resolve, reject) => {
        setTimeout(() => resolve(), ms)
    })
}

async function randomDelay() {
    const randomTime = Math.round(Math.random() * 1000)
    return sleep(randomTime)
}

class ShipmentSearchIndex {
    async updateShipment(id: string, shipmentData: any) {
        const startTime = new Date()
        await randomDelay()
        const endTime = new Date()
        console.log(`update ${id}@${
            startTime.toISOString()
            } finished@${
            endTime.toISOString()
            }`
        )

        return { startTime, endTime }
    }
}

// Implementation needed
interface ShipmentUpdateListenerInterface {
    receiveUpdate(id: string, shipmentData: any): any
}

class ShipmentUpdate implements ShipmentUpdateListenerInterface {

    shipmentSI: ShipmentSearchIndex
    constructor() {
        this.shipmentSI = new ShipmentSearchIndex();
    }

    @CheckShipmentStore()
    async receiveUpdate(id: string, shipmentData: any) {
        try {
            const processTime = await this.shipmentSI.updateShipment(id, shipmentData);

            console.log('Shipment Updated \n', { id, ...shipmentData, ...processTime });
        } catch (error) {
            console.warn('error updating shipments ...');
            console.error(error.message)
        }
        return
    }
}

// use decorator to perform a check on shipment store
function CheckShipmentStore() {
    return function (target: Object, key: string | symbol, descriptor: PropertyDescriptor) {
        const original = descriptor.value;
        descriptor.value = function (...args: any[]) {
            const id = args[0];
            if (ShipmentStore.has(id)) {
                console.log(`shipment with id:${id} has already been processed`)
                return null;
            }
            ShipmentStore.put(id);
            console.log('store state :=>>', ShipmentStore.data());
            return original.apply(this, args)
        }
        return descriptor;
    }
}

/**
 * Make a Shipment store to save processed shipments
 */
class ShipmentStore {
    static store: string[] = [];
    /**
     * save a shipment in the store using its id
     * @param {string} id store id  
     */
    static put(id: string) {
        this.store.push(id)
    }

    /**
     * remove a shipment from store
     * @param {string} id store id  
     */
    static remove(id: string): string[] {
        const shipmentId = this.store.indexOf(id);
        if (shipmentId) return this.store.splice(shipmentId, 1)

        return []
    }

    /**
     * check whether shipment exist in the store
     * @param {string} id store id  
     */
    static has(id: string): boolean {
        return this.store.includes(id)
    }

    static data(): string[] {
        return this.store;
    }
}

// (async function runShipmentAsyn() {
//   let shipUpdate = new ShipmentUpdate();
//   await shipUpdate.receiveUpdate('xyz123', {date: Date.now(), qty: 20, price: 500})
//   await shipUpdate.receiveUpdate('ab123c', {date: Date.now(), qty: 10, price: 250})
//   await shipUpdate.receiveUpdate('1yca23', {date: Date.now(), qty: 10, price: 250})

//   await shipUpdate.receiveUpdate('xb1z23', {date: Date.now(), qty: 15, price: 375})
//   await shipUpdate.receiveUpdate('xyz123', {date: Date.now(), qty: 20, price: 500})
//   await shipUpdate.receiveUpdate('1yca23', {date: Date.now(), qty: 12, price: 300})
// })()

(function runShipment() {
    let shipUpdate = new ShipmentUpdate();
    shipUpdate.receiveUpdate('xyz123', { date: Date.now(), qty: 20, price: 500 })
    shipUpdate.receiveUpdate('ab123c', { date: Date.now(), qty: 10, price: 250 })
    shipUpdate.receiveUpdate('xyz123', { date: Date.now(), qty: 20, price: 500 })

    let shipUpdate2 = new ShipmentUpdate();
    shipUpdate2.receiveUpdate('xb1z23', { date: Date.now(), qty: 15, price: 375 })
    shipUpdate2.receiveUpdate('1yca23', { date: Date.now(), qty: 10, price: 250 })
    shipUpdate2.receiveUpdate('1yca23', { date: Date.now(), qty: 12, price: 300 })
})()
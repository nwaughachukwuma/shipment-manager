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

    async receiveUpdate(id: string, shipmentData: any) {
        try {
            // check that the shipment with :id has not already been processed
            if (ShipmentStore.has(id)) {
                console.log(`Shipment:${id} has already been processed`)
                return
            }
            ShipmentStore.put(id);
            await this.shipmentSI.updateShipment(id, shipmentData);
        } catch (error) {
            console.warn('error updating shipments ...');
            console.error(error.message)
        } finally {
            console.log('shipment data :=>>', id, shipmentData)
            console.log('store state :=>>', ShipmentStore.data())
        }
        return
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
    static splice(id: string): string[] {
        const shipmentId = this.store.indexOf(id);
        if (shipmentId)  return this.store.splice(shipmentId, 1)
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
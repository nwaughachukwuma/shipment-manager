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
    receiveUpdate(id: string, shipmentData: any)
}

// My solution starts here @17:50 GMT
class ShipmentUpdate implements ShipmentUpdateListenerInterface {

    shipmentSI: any
    constructor() {
        this.shipmentSI = new ShipmentSearchIndex()
    }

    async receiveUpdate(id: string, shipmentData: any) {
        // effect a defined delay of 1s to avoid concurrency of operations
        await sleep(1000)
        return await this.shipmentSI.updateShipment(id, shipmentData) 
    }
}
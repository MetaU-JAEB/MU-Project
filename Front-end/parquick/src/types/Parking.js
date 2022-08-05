// @flow

import type { Dimensions } from "./Dimensions";
import type { Ubication } from "./Ubication";

export type Parking = {
    _id: string,
    ubication: Ubication,
    price?: number,
    images: Array<string>,
    dimensions: Dimensions,
    totalLots?: number,
    availableLots?: number,
    isUnderShade?: boolean,
    isInside?: boolean,
    isWorking?: boolean
}

export const testParking = {
    _id: "1",
    ubication: {
        address: "Sunnyvale",
        lat: "16.14",
        lng: "50",
    },
    dimensions: {
        heightFts: 13,
        lengthFts: 14,
        widthFts: 15
    },
    price: 100,
    totalLots: 10,
    availableLots: 5,
    images: ["https://sf.streetsblog.org/wp-content/uploads/sites/3/2015/04/Menlo-Park-Parking-Plaza-3.jpg"]
}

export const testDashbordParkings = [
    testParking,
    { ...testParking, _id: "2", price: 25 },
    { ...testParking, _id: "3", price: 55 },
    { ...testParking, _id: "4", price: 75 },
]

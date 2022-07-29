// @flow

import type { LatLngLiteral } from "../types/LatLngLiteral";
import type { Parking } from "../types/Parking";

export const generateParkings = (position: LatLngLiteral): Array<LatLngLiteral> => {
    const _parkings: Array<LatLngLiteral> = [];
    if (!position) return _parkings;
    for (let i = 0; i < 50; i++) {
        const directionLat = Math.random() < 0.5 ? -50 : 50;
        const directionLng = Math.random() < 0.5 ? -50 : 50;
        _parkings.push({
            lat: position.lat + Math.random() / directionLat,
            lng: position.lng + Math.random() / directionLng,
            id: i
        });
    }
    return _parkings;
};

export function randomInteger(min : number, max: number) : number {
    return parseInt(Math.random() * (max - min) + min);
}

export function randomBoolean() : boolean {
    return Math.random() < 0.5 ? false : true;
}

export function randomCoordenadeoffset() : number {
    const direction = Math.random() < 0.5 ? -50 : 50;
    const offset = Math.random() / direction;
    return offset;
}

// For later make a query to create them in the DB
export const createParkings = (position: LatLngLiteral): Array<Parking> => {
    const _parkings: Array<Parking> = [];
    if (!position) return _parkings;
    for (let i = 0; i < 50; i++) {
        const ubication = {
            lat: (`${position.lat + randomCoordenadeoffset()}`),
            lng: (`${position.lng + randomCoordenadeoffset()}`),
            address: `${randomInteger(1,1000)} hacker way, California, 94025`
        }
        const images = []
        for (let j = 0; j < 5; j++) {
            const imgWidth = randomInteger(300, 700);
            const imgHeight = randomInteger(300, 700);
            const imgId = randomInteger(1, 1100);
            const img = `https://picsum.photos/id/${imgId}/${imgWidth}/${imgHeight}`
            images.push(img);
        }
        const dimensions = {
            heightFts: randomInteger(10, 50),
            lengthFts: randomInteger(10, 50),
            widthFts: randomInteger(10, 50)
        }


        const parking = {
            ubication: ubication,
            price: randomInteger(50, 500),
            images: images,
            dimensions: dimensions,
            totalLots: randomInteger(5,10),
            availableLots: randomInteger(0,5),
            isUnderShade: randomBoolean(),
            isInside: randomBoolean(),
            isWorking: randomBoolean(),
            _id: `${i}`
        }
        _parkings.push(parking);
    }
    return _parkings;
};

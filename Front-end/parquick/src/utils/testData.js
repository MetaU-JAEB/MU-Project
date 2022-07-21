// @flow

import type { LatLngLiteral } from "../types/LatLngLiteral";

export const generateParkings = (position: LatLngLiteral): Array<LatLngLiteral> => {
    const _parkings: Array<LatLngLiteral> = [];
    if(!position) return _parkings;
    for (let i = 0; i < 100; i++) {
        const directionLat = Math.random() < 0.5 ? -50 : 50;
        const directionLng = Math.random() < 0.5 ? -50 : 50;
        _parkings.push({
            lat: position.lat + Math.random() / directionLat,
            lng: position.lng + Math.random() / directionLng,
        });
    }
    return _parkings;
};

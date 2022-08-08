// @flow

import { MAKE_PARKING_STRING } from '../queries/parkingQueries';
import type { LatLngLiteral } from '../types/LatLngLiteral';
import type { Parking } from '../types/Parking';

export const generateParkings = (
  position: LatLngLiteral,
): Array<LatLngLiteral> => {
  const _parkings: Array<LatLngLiteral> = [];
  if (!position) return _parkings;
  for (let i = 0; i < 50; i++) {
    const directionLat = Math.random() < 0.5 ? -50 : 50;
    const directionLng = Math.random() < 0.5 ? -50 : 50;
    _parkings.push({
      lat: position.lat + Math.random() / directionLat,
      lng: position.lng + Math.random() / directionLng,
      id: i,
    });
  }
  return _parkings;
};

export function randomInteger(min: number, max: number): number {
  return parseInt(Math.random() * (max - min) + min);
}

export function randomBoolean(): boolean {
  return Math.random() < 0.5 ? false : true;
}

export function randomCoordenadeoffset(): number {
  const direction = Math.random() < 0.5 ? -50 : 50;
  const offset = Math.random() / direction;
  return offset;
}

/* This should be secret */
const owners = [
  '62dedd6f0b1c5e910ecb9213',
  '62dee4e96feff464e9af09d4',
  '62dee5ce6feff464e9af09d7',
  '62e1b837d3ff5f14f9652db8',
  '62e1b8cfd3ff5f14f9652dbb',
  '62e1cca601d2de1ef4ba0369',
  '62e31dc2dc5914ccb6b11235',
];

function randomOwner(): string {
  const min = 0;
  const max = owners.length;
  const index = parseInt(Math.random() * (max - min) + min);
  return owners[index];
}

/* For later make a query to create them in the DB */
const saveParkings = (parkings: Array<Parking>): void => {
  let whole = `"records" : [`;
  parkings.forEach(park => {
    whole += MAKE_PARKING_STRING(park);
  });
  whole += ']';
  /**
   * The next console.info is used to be pasted in the
   * Apollo server/graphiql UI and make the mutation from there
   */
  console.info('records: ', whole);
};

/* Function to generate diverse parkings around the area */
export const createParkings = (position: LatLngLiteral): Array<Parking> => {
  const _parkings: Array<Parking> = [];
  if (!position) return _parkings;
  for (let i = 0; i < 50; i++) {
    const ubication = {
      lat: `${position.lat + randomCoordenadeoffset()}`,
      lng: `${position.lng + randomCoordenadeoffset()}`,
      address: `${randomInteger(1, 1000)} hacker way, California, 94025`,
    };
    const images = [];
    for (let j = 0; j < 5; j++) {
      const imgWidth = randomInteger(300, 700);
      const imgHeight = randomInteger(300, 700);
      const imgId = randomInteger(1, 1100);
      const img = `https://picsum.photos/id/${imgId}/${imgWidth}/${imgHeight}`;
      images.push(img);
    }
    const dimensions = {
      heightFts: randomInteger(10, 50),
      lengthFts: randomInteger(10, 50),
      widthFts: randomInteger(10, 50),
    };
    const parking = {
      ownerId: randomOwner(),
      ubication: ubication,
      price: randomInteger(50, 500),
      images: images,
      dimensions: dimensions,
      totalLots: randomInteger(5, 10),
      availableLots: randomInteger(0, 5),
      isUnderShade: randomBoolean(),
      isInside: randomBoolean(),
      isWorking: randomBoolean(),
      _id: `${i}`,
    };
    _parkings.push(parking);
  }
  saveParkings(_parkings);
  return _parkings;
};

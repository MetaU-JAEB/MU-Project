//
import { gql } from '@apollo/client';
export const GET_PARKINGS = gql`
  query ParkingMany {
    parkingMany {
      images
      price
      availableLots
      totalLots
      _id
      ubication {
        address
      }
    }
  }
`;

export const GET_PARKINGS_FOR_DRIVER = gql`
  query ParkingMany {
    parkingMany {
      ubication {
        lat
        lng
        address
      }
      price
      dimensions {
        heightFts
        lengthFts
        widthFts
      }
      isUnderShade
      isInside
      isWorking
      totalLots
      availableLots
      _id
      images
    }
  }
`;

export const GET_PARKING_BY_ID = id => {
  return gql`
    query ParkingById {
        parkingById(_id: "${id}") {
          _id
          images
          price
          isUnderShade
          totalLots
          ubication {
              address
          }
        }
      }
    `;
};

// casting for graphql, but returning just the string, not the gql
export const MAKE_PARKING_STRING = parking => {
  return `
    {
        "images": [${parking.images.map(img => `"${img}"`)}],
        "ownerId": "${parking.ownerId}",
        "ubication": {
          "lat": "${parking.ubication.lat}",
          "lng": "${parking.ubication.lng}",
          "address": "${parking.ubication.address}"
        },
        "price": ${parking.price},
        "dimensions": {
          "heightFts": ${parking.dimensions.heightFts},
          "lengthFts": ${parking.dimensions.lengthFts},
          "widthFts": ${parking.dimensions.widthFts}
        },
        "isUnderShade": ${parking.isUnderShade},
        "isInside": ${parking.isInside},
        "isWorking": ${parking.isWorking},
        "totalLots": ${parking.totalLots},
        "availableLots": ${parking.availableLots}
      },
    `;
};

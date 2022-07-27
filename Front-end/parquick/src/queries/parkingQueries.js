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

export const GET_PARKING_BY_ID = (id) => {
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
}

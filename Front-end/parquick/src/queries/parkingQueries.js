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

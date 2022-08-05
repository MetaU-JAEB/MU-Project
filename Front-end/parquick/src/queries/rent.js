//
import { gql } from '@apollo/client';

// Mutation for record a rent
export const CREATE_RENT = (parkingId: string, driverId: string, startAt: string, endsAt: string) => {
    return gql`
    mutation createRent {
        rentCreate(record: {
          parkingId: "${parkingId}",
          driverId: "${driverId}",
          startAt: "${startAt}",
          endsAt: "${endsAt}"
        }) {
          record {
            parkingId
            driverId
            startAt
            endsAt
            _id
          }
        }
      }
`};

// @flow

type ParkingType = {
    address : string,
    minPrice? : number,
    images? : [string],
    width? : number,
    length? : number,
    height? : number,
    lotsCount? : number,
    lotsAvailable? : number,
    hasShade? : number,
    isInInterior? : number,
    isWorking? : number
}
export type Parking = ParkingType;

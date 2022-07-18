// @flow

export type Parking = {
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

export const testParking = {
    address : "Sunnyvale"
}

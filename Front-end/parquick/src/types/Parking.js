// @flow

export type Parking = {
    address : string,
    lat? : string,
    lon? : string,
    price? : number,
    images? : [string],
    width? : number,
    length? : number,
    height? : number,
    totalLots? : number,
    lotsAvailable? : number,
    hasShade? : number,
    isInInterior? : number,
    isWorking? : number
}

export const testParking = {
    address : "Sunnyvale"
}

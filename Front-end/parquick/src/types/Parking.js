// @flow

export type Parking = {
    id: string,
    ownerId? : string,
    address? : string,
    lat? : string,
    lon? : string,
    price? : number,
    images? : Array<string>,
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
    id : "1",
    address : "Sunnyvale",
    lat : "16.14",
    lon : "50",
    price : 100,
    totalLots: 10,
    lotsAvailable : 5,
    images : ["images/map-example.png", "images/map-example.png", "images/map-example.png"]
}

export const testDashbordParkings = [
    testParking,
    {...testParking, id : "2", price : 25},
    {...testParking, id : "3", price : 55},
    {...testParking, id : "4", price : 75},
]

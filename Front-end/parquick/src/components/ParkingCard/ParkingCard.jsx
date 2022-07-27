// @flow
import * as React from 'react'
import { Link } from 'react-router-dom';
import './ParkingCard.css';
import type { Parking } from "../../types/Parking";
import { testParking } from "../../types/Parking";

type PropsParkingCard = {
    parking : Parking
}

function ParkingCard({ parking = testParking } : PropsParkingCard): React.MixedElement {
    return <>
        <div className="parking-card">
            <div className="parking-card-picture">
                <Link to={`parking/${parking._id}`} >
                    <img src={parking.images[0]} alt="" className='parking-card-img' />
                </Link>
            </div>
            <div className="parking-card-content">
                <p>Total : {parking.totalLots}</p>
                <p>Available : {parking.availableLots}</p>
                <p>id: {parking._id}</p>
                <p>Price : {parking.price}</p>
                <p>Address {parking.ubication?.address}</p>
            </div>
        </div>
    </>
}

export default ParkingCard;

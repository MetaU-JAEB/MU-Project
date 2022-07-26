//
import * as React from 'react'
import './ParkingCard.css';

function ParkingCard({parking}): React.MixedElement {
    return <>
        <div className="parking-card">
            <div className="parking-card-picture">
                <img src={parking.photo} alt="" className='parking-card-img'/>
            </div>
            <div className="parking-card-content">
                <p>Rented/Available</p>
                <p>id: {parking.id}</p>
                <p>Price : {parking.name}</p>
                <p>Address {parking.description}</p>
            </div>
        </div>
    </>
}

export default ParkingCard;

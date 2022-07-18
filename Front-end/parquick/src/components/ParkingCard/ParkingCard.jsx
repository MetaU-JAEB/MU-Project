//
import * as React from 'react'
import './ParkingCard.css';

function ParkingCard({parking}): React.MixedElement {
    return <>
        <div className="parking-card">
            <div className="parking-card-picture">
                <img src="images/map-example.png" alt="" />
            </div>
            <div className="parking-card-content">
                <p>Rented/Available</p>
                <p>id: {parking}</p>
                <p>Price</p>
                <p>Address</p>
            </div>
        </div>
    </>
}

export default ParkingCard;

// @flow
import * as React from 'react'
import './Parking.css';
import { testParking } from '../../types/Parking';

function Parking(): React.MixedElement {

    function handleOnClickRent(event){
        // TODO : make query to rent a parking lot
    }

    return <>
        <p>id : {testParking._id}</p>
        <div className="park-images">
            {testParking.images.map(image => {
                return <img src={`${image}`} key={image}></img>
            })}
        </div>
        <p>Address : {testParking.ubication.address}</p>
        <p>Price : ${testParking.price}</p>
        <label htmlFor="rent-until">Rent until</label>
        <input type="date" name="rento-until" id="" />
        <br />
        <button onClick={handleOnClickRent}>Rent</button>
    </>
}

export default Parking;

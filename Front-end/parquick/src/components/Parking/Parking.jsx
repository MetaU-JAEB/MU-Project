// @flow
import * as React from 'react'
import { useEffect, useState } from "react";
import './Parking.css';
import { useParams } from "react-router-dom";
import { useQuery } from "@apollo/client";
import { GET_PARKING_BY_ID } from '../../queries/parkingQueries';

function Parking(): React.MixedElement {
    const { parkingId } = useParams();
    const [parking, setParking] = useState(null);
    const { loading, error, data } = useQuery(GET_PARKING_BY_ID(parkingId));

    useEffect(() => {

    }, [parkingId])

    useEffect(() => {
        if (data?.parkingById) {
            setParking(data.parkingById);
        }
    }, [data])

    function handleOnClickRent(event) {
        // TODO : make query to rent a parking lot
    }

    if (loading) return <p> Loading ...</p>
    if (error) return <p>Error</p>

    return <>
        {parking && <>
            <p>id : {parking._id}</p>
            <div className="park-images">
                {parking.images.map(image => {
                    return <img src={`${image}`} key={image}></img>
                })}
            </div>
            <p>Address : {parking.ubication.address}</p>
            <p>Price : ${parking.price}</p>
            <label htmlFor="rent-until">Rent until</label>
            <input type="date" name="rento-until" id="" />
            <br />
            <button onClick={handleOnClickRent}>Rent</button>
        </>}
    </>
}

export default Parking;

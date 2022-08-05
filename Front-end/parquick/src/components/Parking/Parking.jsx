// @flow
import * as React from 'react';
import { useEffect, useState } from "react";
import './Parking.css';
import { useParams } from "react-router-dom";
import { useQuery } from "@apollo/client";
import { GET_PARKING_BY_ID } from '../../queries/parkingQueries';
import { client } from '../../queries/client';
import { CREATE_RENT } from '../../queries/rent';
import { useUser } from '../../contexts/UserContext';

function Parking(): React.MixedElement {
    const { parkingId } = useParams();
    const { user } = useUser();
    const [parking, setParking] = useState(null);
    const [selectedDate, setSelectedDate] = useState(new Date().toLocaleDateString());
    const { loading, error, data } = useQuery(GET_PARKING_BY_ID(parkingId));

    useEffect(() => {

    }, [parkingId])

    useEffect(() => {
        if (data?.parkingById) {
            setParking(data.parkingById);
        }
    }, [data])

    const makeRent = async (todayDate, endDate) => {
        client
            .mutate({
                mutation: CREATE_RENT(parkingId, user._id, todayDate, endDate),
            })
            .then((result) => {
                // Todo: create a conversation
            });
    }

    function handleOnClickRent(event) {
        const todayDate = new Date().toLocaleDateString()
        const endDate = new Date(selectedDate).toLocaleDateString();
        makeRent(todayDate, endDate);
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
            <input type="date" name="rento-until" id="" value={selectedDate} onChange={(e) => setSelectedDate(e.target.value)} />
            <br />
            <button onClick={handleOnClickRent}>Rent</button>
        </>}
    </>
}

export default Parking;

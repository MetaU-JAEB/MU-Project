// @flow
import * as React from 'react'
import { useEffect } from 'react';
import { useState } from 'react';
import { Link } from 'react-router-dom';
import { useQuery } from '@apollo/client';
import ParkingCard from '../ParkingCard/ParkingCard';
import './MainOwner.css';
import { GET_PARKINGS } from '../../queries/parkingQueries';


function MainOwner(): React.MixedElement {
    const { loading, error, data } = useQuery(GET_PARKINGS);
    const [address, setAddress] = useState("");

    useEffect(() => {
        // TODO: display owner's parkings close to the specified address
    }, [address])

    function handleOnChangeAddress(event) {
        setAddress(event.target.value)
    }



    return <>
        <div className="owner-options">
            <div className="owner-option">
                <label htmlFor="btn-add"> + </label>
                <Link to="AddParking"><button name='btn-add'>Add</button></Link>
            </div>
            <div className="owner-option">
                <label htmlFor="input-address"> Search</label>
                <input type="text" name='input-address' placeholder='Address' value={address} onChange={handleOnChangeAddress} />
            </div>
            <div className="owner-option">
                <Link to="Dashboard" ><button> $Dashboard$ </button></Link>
            </div>
        </div>
        <div className="owner-parkings">
            {
                loading ? <p>Loading...</p>
                    :
                    error ? <p> Error </p>
                        :
                        (
                            data !== null &&
                            data.parkingMany.map((parking) =>
                                <ParkingCard key={parking._id} parking={parking}/>
                            )
                        )

            }
        </div>

    </>
}


export default MainOwner;

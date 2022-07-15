//
import * as React from 'react'
import { useEffect } from 'react';
import { useState } from 'react';
import { Link } from 'react-router-dom';
import ParkingCard from '../ParkingCard/ParkingCard';
import './MainOwner.css';

const testParkings = [1,2,3,4,5,6,7,8,9,10]

function MainOwner(): React.MixedElement {

        const [address, setAddress] = useState("");

        useEffect(()=>{
            // console.log("address: ", address);
        },[address])

        function handleOnChangeAddress (event) {
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
                testParkings.map((parking) =>
                    <ParkingCard key={parking} parking={parking}></ParkingCard>
                )
            }
        </div>

    </>
}

export default MainOwner;

// @flow
import * as React from 'react'
import { useEffect } from 'react';
import { useState } from 'react';
import { Link } from 'react-router-dom';
import { useQuery, gql } from '@apollo/client';
import ParkingCard from '../ParkingCard/ParkingCard';
import './MainOwner.css';

const testParkings = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10]
const GET_LOCATIONS = gql`
  query GetLocations {
    locations {
      id
      name
      description
      photo
    }
  }
`;

function MainOwner(): React.MixedElement {
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
                testParkings.map((parking) =>
                    <ParkingCard key={parking} parking={parking}></ParkingCard>
                )
            }
        </div>
        <DisplayLocations />

    </>
}

function DisplayLocations() {
    const { loading, error, data } = useQuery(GET_LOCATIONS);

    if (loading) return <p>Loading...</p>;
    if (error) return <p>Error :(</p>;

    return data.locations.map(({ id, name, description, photo }) => (
      <div key={id}>
        <h3>{name}</h3>
        <img width="400" height="250" alt="location-reference" src={`${photo}`} />
        <br />
        <b>About this location:</b>
        <p>{description}</p>
        <br />
      </div>
    ));
  }

export default MainOwner;

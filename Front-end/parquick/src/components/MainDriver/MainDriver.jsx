//
import * as React from 'react'
import { useEffect, useState } from "react";
import { useLoadScript } from '@react-google-maps/api'
import Map from '../Map/Map';
import './MainDriver.css';

const librariesMaps = ["places"]

function MainDriver(): React.MixedElement {


    const [address, setAddress] = useState("");
    const [filter, setFilter] = useState("");

    const { isLoaded } = useLoadScript({
        googleMapsApiKey: process.env.REACT_APP_MAPS,
        libraries: librariesMaps
    })

    useEffect(() => {
        // TODO: when the address changes, maps should recommend other parkings
    }, [address])
    useEffect(() => {
        // TODO: display parkings based on the new filter requested
    }, [filter]);


    function handleOnChangeAddress(event) {
        setAddress(event.target.value)
    }
    function handlerOnChangeRadioFilter(event) {
        setFilter(event.target.value);
    }

    return <>
        <div className="driver-search-address">
            <label htmlFor="driver-address"> Search</label>
            <input type="text" name='driver-address' placeholder='Address' value={address} onChange={handleOnChangeAddress} />
        </div>
        <div className="driver-filter-options">
            <div className="radio-filter">
                <input type="radio" name="filter-sort" id="driver-radio-closest" value={"closest"} checked={filter == "closest"} onChange={handlerOnChangeRadioFilter} />
                <label htmlFor="filter-sort"> closest </label>
            </div>
            <div className="radio-filter">
                <input type="radio" name="filter-sort" id="radio-driver-cheapest" value={"cheapest"} checked={filter == "cheapest"} onChange={handlerOnChangeRadioFilter} />
                <label htmlFor="filter-sort"> cheapest </label>
            </div>
        </div>
        <div className="map">
            { isLoaded && <Map isLoaded/>}
        </div>
    </>
}

export default MainDriver;

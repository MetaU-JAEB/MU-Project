//
import * as React from 'react'
import { GoogleMap, Marker} from '@react-google-maps/api'
import './Map.css';
import { useCallback } from 'react';
import { useRef } from 'react';
import { useMemo } from 'react';
import DriverLocation from '../DriverLocation/DriverLocation';
import { useState } from 'react';
import { useEffect } from 'react';
import {MAP_DEFAULT_LOCATION} from '../../utils/constants'




function Map({isLoaded}): React.MixedElement {


    const [location, setLocation] = useState();


    const mapRef = useRef();
    const center = useMemo(() => ({ lat : MAP_DEFAULT_LOCATION.LAT, lng: MAP_DEFAULT_LOCATION.LNG }), []);
    const options = useMemo(() => ({
        disableDefaultUI: true,
        clickableIcons: false
    }), [])


    useEffect(() => {
        // TODO: Do something else when a new location is set by the user
        // for the moment it is handled in the setLocation below
    }, [location])

    const onLoad = useCallback((map) => (mapRef.current = map), [])

    return <>

        {
            !isLoaded ? <p> Loading ...</p>
                :
                <>
                    <DriverLocation
                        setLocation={(position) => {
                            setLocation(position);
                            mapRef.current?.setZoom(15);
                            mapRef.current?.panTo(position);
                        }}
                    />
                    <div className="map">
                        <GoogleMap
                            zoom={10}
                            center={center}
                            mapContainerClassName='map-container'
                            options={options}
                            onLoad={onLoad}
                        >
                            {location &&
                                <Marker
                                    position={location}
                                    icon={'./icons/car-icon.png'}
                                    title='You are here'
                                />
                            }
                        </GoogleMap>
                    </div>
                </>
        }
    </>
}

export default Map;

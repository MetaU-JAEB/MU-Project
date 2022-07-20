//
import * as React from 'react'
import { GoogleMap, useLoadScript, Marker} from '@react-google-maps/api'
import './Map.css';
import { useCallback } from 'react';
import { useRef } from 'react';
import { useMemo } from 'react';
import DriverLocation from '../DriverLocation/DriverLocation';
import { useState } from 'react';
import { useEffect } from 'react';




function Map(): React.MixedElement {


    const [location, setLocation] = useState();


    const mapRef = useRef();
    const center = useMemo(() => ({ lat: 37.4800384, lng: -122.1558272 }), []);
    const options = useMemo(() => ({
        disableDefaultUI: true,
        clickableIcons: false
    }), [])



    const { isLoaded } = useLoadScript({
        googleMapsApiKey: process.env.REACT_APP_MAPS,
        libraries: ["places"]
    })

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
                    ></DriverLocation>
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

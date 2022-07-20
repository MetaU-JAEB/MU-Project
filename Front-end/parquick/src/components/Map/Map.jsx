// @flow
import * as React from 'react'
import { GoogleMap, Marker} from '@react-google-maps/api'
import './Map.css';
import { useCallback } from 'react';
import { useRef } from 'react';
import { useMemo } from 'react';
import DriverLocation from '../DriverLocation/DriverLocation';
import { useState } from 'react';
import { useEffect } from 'react';
import { MAP_DEFAULT_LOCATION } from '../../utils/constants'
import type { LatLngLiteral } from "../../types/LatLngLiteral";
import { generateParkings } from "../../utils/testData";

type Props = {
    isLoaded: boolean
}


function Map({ isLoaded }: Props): React.MixedElement {


    const [location, setLocation] = useState < LatLngLiteral > ({});


    const mapRef = useRef();
    const center = useMemo(() => ({ lat: MAP_DEFAULT_LOCATION.LAT, lng: MAP_DEFAULT_LOCATION.LNG }), []);
    const options = useMemo(() => ({
        disableDefaultUI: true,
        clickableIcons: false
    }), [])


    useEffect(() => {
        // TODO: Do something else when a new location is set by the user
        // for the moment it is handled in the setLocation below
    }, [location])

    const onLoad = useCallback((map) => (mapRef.current = map), []);
    const parkings = useMemo(() => generateParkings(location), [location]);

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
                            {location.lat && (<>
                                <Marker
                                    position={location}
                                    icon={'./icons/car-icon.png'}
                                    title='You are here'
                                />
                                {


                                    parkings.map((parking) => (
                                        <Marker
                                            key={parking.lat}
                                            position={parking}
                                            title='parking'
                                        />
                                    ))
                                }

                            </>)

                            }
                        </GoogleMap>
                    </div>
                </>
        }
    </>
}




export default Map;

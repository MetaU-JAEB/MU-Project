// @flow
import * as React from 'react'
import { GoogleMap, MarkerF, MarkerClusterer, DirectionsRenderer, Circle } from '@react-google-maps/api'
import './Map.css';
import { useCallback } from 'react';
import { useRef } from 'react';
import { useMemo } from 'react';
import DriverLocation from '../DriverLocation/DriverLocation';
import { useState } from 'react';
import { useEffect } from 'react';
import { MAP_CIRCLES_DISTANCES, MAP_DEFAULT_LOCATION, MAP_ZOOM } from '../../utils/constants'
import { generateParkings } from "../../utils/testData";
import type { LatLngLiteral } from "../../types/LatLngLiteral";
import { mapsStyleOptions } from "../../utils/mapsStyleOptions";

type Props = {
    isLoaded: boolean
}

function Map({ isLoaded }: Props): React.MixedElement {


    const [location, setLocation] = useState < any > (null);
    const [directions, setDirections] = useState < any > (null);


    const mapRef = useRef();
    const center = useMemo(() => ({ lat: MAP_DEFAULT_LOCATION.LAT, lng: MAP_DEFAULT_LOCATION.LNG }), []);
    const options = useMemo(() => ({
        disableDefaultUI: true,
        clickableIcons: false,
    }), [])


    useEffect(() => {
        // TODO: Do something else when a new location is set by the user
        // for the moment it is handled in the setLocation inside DriverLocation component
    }, [location])

    useEffect(() => {
        // TODO: Display more info about how to go from X to Y location
    }, [directions])

    const onLoad = useCallback((map) => (mapRef.current = map), []);
    const parkings = useMemo(() => generateParkings(location), [location]);

    const fetchDirections = (parking: LatLngLiteral) => {
        if (!location) return;

        const service = new window.google.maps.DirectionsService();

        // TO FIX: After rendering a route, th eprevious one remains
        // Maybe I should use useRef for the renderer
        service.route(
            {
                origin: location,
                destination: parking,
                travelMode: window.google.maps.TravelMode.DRIVING,
            },
            (result, status) => {
                if (status === "OK" && result) {
                    // TO FIX: something like DirectionRendererRef.current?.setDirections(result)
                    setDirections(result);
                }
            }
        );
    };

    return <>

        {
            !isLoaded ? <p> Loading ...</p>
                :
                <>
                    <DriverLocation
                        setLocation={(position) => {
                            setLocation(position);
                            mapRef.current?.setZoom(MAP_ZOOM.NEIGHBORHOOD);
                            mapRef.current?.panTo(position);
                        }}
                    />
                    <div className="map">
                        <GoogleMap
                            zoom={MAP_ZOOM.CITY}
                            center={center}
                            mapContainerClassName='map-container'
                            options={options}
                            onLoad={onLoad}
                        >
                            {directions && (
                                <DirectionsRenderer
                                    directions={directions}
                                    options={{
                                        polylineOptions: {
                                            zIndex: 50,
                                            strokeColor: "#1976D2",
                                            strokeWeight: 5,
                                        },
                                    }}
                                />
                            )}
                            {location && (<>
                                <MarkerF
                                    zIndex={15}
                                    position={location}
                                    icon={'./icons/car-icon.png'}
                                    title='You are here'
                                />


                                <MarkerClusterer>
                                    {(clusterer) =>

                                        parkings.map((parking) => (
                                            <MarkerF
                                                key={parking.lat}
                                                position={parking}
                                                clusterer={clusterer}
                                                title='parking'
                                                onClick={() => {
                                                    fetchDirections(parking);
                                                }}
                                            />
                                        ))
                                    }
                                </MarkerClusterer>

                                <Circle center={location} radius={MAP_CIRCLES_DISTANCES.CLOSE} options={mapsStyleOptions.closeOptions} />
                                <Circle center={location} radius={MAP_CIRCLES_DISTANCES.MIDDLE} options={mapsStyleOptions.middleOptions} />
                                <Circle center={location} radius={MAP_CIRCLES_DISTANCES.FAR} options={mapsStyleOptions.farOptions} />

                            </>)

                            }
                        </GoogleMap>
                    </div>
                </>
        }
    </>
}




export default Map;

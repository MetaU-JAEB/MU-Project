// @flow
import * as React from 'react'
import { GoogleMap, Marker, MarkerClusterer, DirectionsRenderer, Circle, InfoWindow } from '@react-google-maps/api'
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
    const [directions, setDirections] = useState < any > ();
    const [Direcciones, setDirecciones] = useState < React.MixedElement > (<></>);
    const [circles, setCircles] = useState < React.MixedElement > (<></>);
    const [markerMap, setMarkerMap] = useState({});
    const [infoOpen, setInfoOpen] = useState(false);
    const [selectedPlace, setSelectedPlace] = useState(null);


    const mapRef = useRef();
    const center = useMemo(() => ({ lat: MAP_DEFAULT_LOCATION.LAT, lng: MAP_DEFAULT_LOCATION.LNG }), []);
    const options = useMemo(() => ({
        disableDefaultUI: true,
        clickableIcons: false,
    }), [])


    useEffect(() => {
        // TODO: Do something else when a new location is set by the user
        // for the moment it is handled in the setLocation inside DriverLocation component

        mapRef.current?.setZoom(MAP_ZOOM.NEIGHBORHOOD);
        mapRef.current?.panTo(location);

        setCircles(<>
            <Circle center={location} radius={MAP_CIRCLES_DISTANCES.CLOSE} options={mapsStyleOptions.closeOptions} />
            <Circle center={location} radius={MAP_CIRCLES_DISTANCES.MIDDLE} options={mapsStyleOptions.middleOptions} />
            <Circle center={location} radius={MAP_CIRCLES_DISTANCES.FAR} options={mapsStyleOptions.farOptions} />
        </>);

    }, [location])

    useEffect(() => {
        // TODO: Display more info about how to go from X to Y location
        setDirecciones(
            <DirectionsRenderer
                directions={directions}
                options={{
                    polylineOptions: {
                        zIndex: 50,
                        strokeColor: "#1976D2",
                        strokeWeight: 5,
                    },
                }}
            />)
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

    const markerLoadHandler = (marker, place) => {
        return setMarkerMap(prevState => {
            return { ...prevState, [place.id]: marker };
        });
    };
    const markerClickHandler = async (event, place) => {

        await setInfoOpen(false);
        await setSelectedPlace(null);

        // Remember which place was clicked


        // Required so clicking a 2nd marker works as expected




        await setInfoOpen(true);
        await setSelectedPlace(place);

        // If you want to zoom in a little on marker click

        // if you want to center the selected Marker
        //setCenter(place.pos)
      };

    return <>

        {
            !isLoaded ? <p> Loading ...</p>
                :
                <>
                    <DriverLocation
                        setLocation={(position) => {
                            setLocation(position);
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
                            {
                                Direcciones
                            }
                            {location && (<>
                                <Marker
                                    zIndex={15}
                                    position={location}
                                    icon={'./icons/car-icon.png'}
                                    title='You are here'
                                />


                                <MarkerClusterer>
                                    {(clusterer) =>

                                        parkings.map((parking) => (
                                            <Marker
                                                key={parking.lat}
                                                position={parking}
                                                clusterer={clusterer}
                                                title='parking'
                                                onClick={async (event) => {
                                                    fetchDirections(parking);
                                                    await markerClickHandler(event, parking);
                                                }}
                                                onLoad={marker => markerLoadHandler(marker, parking)}
                                            >
                                            </Marker>
                                        ))
                                    }
                                </MarkerClusterer>
                                {infoOpen && selectedPlace && (
                                    <InfoWindow
                                        anchor={markerMap[selectedPlace.id]}
                                        onCloseClick={async () => await setInfoOpen(false)}
                                        zIndex={10}
                                    >
                                        <div>
                                            <h3>{selectedPlace.id}</h3>
                                            <div>This is your info window content</div>
                                        </div>
                                    </InfoWindow>
                                )}
                                {
                                    circles
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

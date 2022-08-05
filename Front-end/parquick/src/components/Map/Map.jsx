// @flow
import * as React from 'react'
import { GoogleMap, MarkerF, MarkerClusterer, DirectionsRenderer, Circle, InfoWindowF } from '@react-google-maps/api'
import './Map.css';
import { useCallback } from 'react';
import { useRef } from 'react';
import { useMemo } from 'react';
import DriverLocation from '../DriverLocation/DriverLocation';
import { useState } from 'react';
import { useEffect } from 'react';
import { MAP_CIRCLES_DISTANCES, MAP_DEFAULT_LOCATION, MAP_ZOOM } from '../../utils/constants'
import { mapsStyleOptions } from "../../utils/mapsStyleOptions";
import { Link } from 'react-router-dom';
import { client } from '../../queries/client';
import { GET_PARKINGS_FOR_DRIVER } from '../../queries/parkingQueries';
import type { Parking } from "../../types/Parking";

type Props = {
    isLoaded: boolean
}


function Map({ isLoaded }: Props): React.MixedElement {


    const [location, setLocation] = useState < any > (null);
    const [directions, setDirections] = useState < any > ();
    const [Direcciones, setDirecciones] = useState < React.MixedElement > (<></>);
    const [circles, setCircles] = useState < React.MixedElement > (<></>);
    const [markerMap, setMarkerFMap] = useState({});
    const [infoIsOpen, setInfoIsOpen] = useState(false);
    const [selectedParking, setSelectedParking] = useState(null);
    const [parkings, setParkings] = useState([])
    const [isHovering, setIsHovering] = useState(false);
    const [hoveredParking, setHoveredParking] = useState(null)


    const mapRef = useRef();
    const center = useMemo(() => ({ lat: MAP_DEFAULT_LOCATION.LAT, lng: MAP_DEFAULT_LOCATION.LNG }), []);
    const options = useMemo(() => ({
        disableDefaultUI: true,
        clickableIcons: false,
    }), [])

    const onLoad = useCallback((map) => (mapRef.current = map), []);


    const fetchParkings = async () => {
        let _parkings: Array<Parking> = [];
        const result = await client
            .query({
                query: GET_PARKINGS_FOR_DRIVER,
            })

        _parkings = result?.data?.parkingMany;

        setParkings(_parkings);
    }
    useEffect(() => {
        fetchParkings();
    }, [location])

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



    const fetchDirections = (parking: Parking) => {
        if (!location) return;

        const service = new window.google.maps.DirectionsService();

        // TO FIX: After rendering a route, th eprevious one remains
        // Maybe I should use useRef for the renderer
        const p_ubication = {
            lat: Number(parking.ubication.lat),
            lng: Number(parking.ubication.lng),
        }
        service.route(
            {
                origin: location,
                destination: p_ubication,
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

    const markerLoadHandler = (marker, parking) => {
        return setMarkerFMap(prevState => {
            return { ...prevState, [parking._id]: marker };
        });
    };
    const markerHoverHandler = (event, parking) =>{
         setIsHovering(true);
         setHoveredParking(parking);
    }
    const markerHoverLeave = (event, parking) =>{
        setIsHovering(false);
        setHoveredParking(null);
   }
    const markerClickHandler = (event, parking) => {
        // clean the previous window if selected a marker before
         setInfoIsOpen(false);
         setSelectedParking(null);
         setInfoIsOpen(true);
         setSelectedParking(parking);
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
                                <MarkerF
                                    zIndex={15}
                                    position={location}
                                    icon={'./icons/car-icon.png'}
                                    title='You are here'
                                />
                                <MarkerClusterer>
                                    {(clusterer) =>

                                        parkings?.map((parking) => {

                                            const p_ubication = {
                                                lat: Number(parking.ubication.lat),
                                                lng: Number(parking.ubication.lng),
                                            }
                                            return (
                                                <MarkerF
                                                    key={parking._id}
                                                    position={p_ubication}
                                                    clusterer={clusterer}
                                                    title='parking'
                                                    onClick={ (event) => {
                                                        fetchDirections(parking);
                                                        markerClickHandler(event, parking);
                                                    }}
                                                    onLoad={marker => markerLoadHandler(marker, parking)}
                                                    onMouseOver={ (event) => {
                                                        markerHoverHandler(event, parking);
                                                    }}
                                                    onMouseOut={ (event) => {
                                                        markerHoverLeave(event, parking);
                                                    }}
                                                />
                                            )
                                        })
                                    }
                                </MarkerClusterer>
                                {infoIsOpen && selectedParking && (
                                    <InfoWindowF
                                        anchor={markerMap[selectedParking._id]}
                                        onCloseClick={ () =>setInfoIsOpen(false)}
                                        zIndex={10}
                                    >
                                        {<div>
                                            <div className="parking-marker-picture">
                                                <Link to={`parking/${selectedParking._id}`} >
                                                    <img src={selectedParking.images[0]} alt="" className='parking-marker-img' />
                                                </Link>
                                            </div>
                                            <h4>Address: {selectedParking.ubication.address}</h4>
                                            <div>
                                                <p>Total lots: {selectedParking.totalLots}</p>
                                                <p>Available lots: {selectedParking.availableLots}</p>
                                                <p>{selectedParking.isUnderShade? "Under shade" : "Not under shade"}</p>
                                            </div>
                                            <Link to={`/parking/${selectedParking._id}`}> Rent</Link>
                                        </div>}

                                    </InfoWindowF>
                                )}
                                {isHovering && hoveredParking && (
                                    <InfoWindowF
                                        anchor={markerMap[hoveredParking._id]}
                                        onCloseClick={ () => setIsHovering(false)}
                                        zIndex={10}
                                    >
                                        {<div>
                                            <div>
                                                <p>Available lots: {hoveredParking.availableLots}</p>
                                                <p className='click-advice'>Click below for more info</p>
                                            </div>
                                        </div>}

                                    </InfoWindowF>
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

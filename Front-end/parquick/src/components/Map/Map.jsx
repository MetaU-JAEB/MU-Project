//
import * as React from 'react'
import { GoogleMap, useLoadScript } from '@react-google-maps/api'
import './Map.css';
import { useCallback } from 'react';
import { useRef } from 'react';
import { useMemo } from 'react';




function Map(): React.MixedElement {


    const mapRef = useRef();
    const center = useMemo( ()=>({ lat: 43, lng: -80 }),[] ) ;
    const options = useMemo(() => ({
        disableDefaultUI: true,
        clickableIcons: false
    }),[])


    const { isLoaded } = useLoadScript({
        googleMapsApiKey: process.env.REACT_APP_MAPS,
        libraries: ["places"]
    })

    const onLoad = useCallback((map) => (mapRef.current = map) ,[])

    return <>
        {
            !isLoaded ? <p> Loading ...</p>
                :
                <div className="map">
                    <GoogleMap
                        zoom={10}
                        center={center}
                        mapContainerClassName='map-container'
                        options={options}
                        onLoad={onLoad}
                    ></GoogleMap>
                </div>
        }
    </>
}

export default Map;

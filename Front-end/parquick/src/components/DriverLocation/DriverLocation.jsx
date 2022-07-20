//
import * as React from 'react'
import './DriverLocation.css';
import usePlacesAutocomplete, { getGeocode, getLatLng } from 'use-places-autocomplete';
import {
    Combobox,
    ComboboxInput,
    ComboboxPopover,
    ComboboxList,
    ComboboxOption
} from '@reach/combobox';
import "@reach/combobox/styles.css";

/* type Props = {
    setLocation: (position : google.maps.LatLngLiteral) => void;
} */

function DriverLocation({ setLocation }): React.MixedElement {

    const {
        ready,
        value,
        setValue,
        suggestions: { status, data },
        clearSuggestions,
    } = usePlacesAutocomplete();

    const handleSelect = async (val: string) => {
        setValue(val, false);
        clearSuggestions();

        const results = await getGeocode({ address: val });
        const { lat, lng } = await getLatLng(results[0]);
        setLocation({ lat, lng });
    };


    const handleGetCurrentLocation = () => {
        const options = {
            enableHighAccuracy: false,
            timeout: 5000,
            maximumAge: 0
        };

        function success(pos) {
            const crd = pos.coords;
            const lat = crd.latitude;
            const lng = crd.longitude
            setLocation({ lat, lng })
        }

        function error(err) {
            console.warn(`ERROR(${err.code}): ${err.message}`);
        }

        navigator.geolocation.getCurrentPosition(success, error, options);
    }

    return <>
        <div className="current-location">
            <button onClick={handleGetCurrentLocation} className='btn-get-curr-locat'>Use current Location</button>
        </div>
        <div className="driver-search-location">
            <label htmlFor="driver-location"> Search</label>
            <Combobox onSelect={handleSelect}>
                <ComboboxInput
                    value={value}
                    onChange={(e) => setValue(e.target.value)}
                    disabled={!ready}
                    className="combobox-input"
                    placeholder="Search office address"
                />
                <ComboboxPopover>
                    <ComboboxList>
                        {status === "OK" &&
                            data.map(({ place_id, description }) => (
                                <ComboboxOption key={place_id} value={description} />
                            ))}
                    </ComboboxList>
                </ComboboxPopover>
            </Combobox>
        </div>
    </>
}

export default DriverLocation;

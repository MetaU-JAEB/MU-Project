// @flow
import * as React from 'react'
import { useState } from "react";
import type { Parking } from '../../types/Parking';
import { testParking } from '../../types/Parking';
import './AddParking.css';


function AddParking(): React.MixedElement {
    const [parking] = useState < Parking > (testParking)
    return <>
        <div className='add-parking'>
            <form action="#">
                <input type="text" className='add-parking-info' value={parking.address} name="new-parking-address" id="new-parking-address" placeholder='new-parking-address' />
                <input type="text" name="lat" id="lat" placeholder='lat' disabled/>
                <input type="text" name="lon" id="lon" placeholder='lon' disabled/>
                <input type="number" className='add-parking-info' placeholder='price, in USD' />
                <label htmlFor="pictures" > Pictures </label>
                <input type="file" className='add-parking-info' name='pictures' />

                <input type="number" className='add-parking-info' placeholder='Total amount of lots' />


                <fieldset>
                    <legend> Extras </legend>
                    <input type="checkbox" name="has-shade" id="has-shade" />
                    <label htmlFor="has-shade" > Has shade </label>
                    <input type="checkbox" name="is-in-interior" id="is-in-interior" />
                    <label htmlFor="is-in-interior" > Is in interior </label>
                </fieldset>

                <fieldset>
                    <legend> Size </legend>
                    <input type="number" name="height" id="height" placeholder='height'/>
                    <input type="number" name="length" id="length" placeholder='length'/>
                    <input type="number" name="width" id="width" placeholder='width'/>
                </fieldset>

                <button type="submit"> Add Parking</button>


            </form>
        </div>
    </>
}

export default AddParking;

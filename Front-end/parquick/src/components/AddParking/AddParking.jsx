// @flow
import * as React from 'react'
import { useState } from "react";
import type {Parking} from '../../types/Parking';
import './AddParking.css';

const testParking = {
    address : "Sunnyvale"
}

function AddParking () : React.MixedElement {
    const [parking] = useState<Parking>(testParking)
    return <>
        <p>{parking.address}</p>
    </>
}

export default AddParking;

// @flow
import * as React from 'react'
import './Dashboard.css';
import { testDashbordParkings } from '../../types/Parking';

function Dashboard () : React.MixedElement {
    return <>
        <div>
            <h1> Lots rented </h1>
            {
                testDashbordParkings.map((park) => {
                    return <div className="park-element" key={park.id}>
                        <p>id: {park.id}</p>
                        <p>address: {park.address}</p>
                        <p>price : ${park.price}</p>
                    </div>
                })
            }
            <div>
                Total earnings :
                {testDashbordParkings.reduce((prevVal, currPark)=>{
                    return prevVal + currPark.price
                },0)}
            </div>
        </div>
    </>
}

export default Dashboard;

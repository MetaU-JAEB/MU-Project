//
import * as React from 'react'
import MainDriver from '../MainDriver/MainDriver';
import MainOwner from '../MainOwner/MainOwner';
import './Main.css';

/* type User = {
    name : string,
    type : string,
    logged: boolean
} */

function Main({user}): React.MixedElement {
    return <>
        {
            user.type === "owner" ?
            <>
                <MainOwner></MainOwner>
            </>
            : user.type === "driver" ?
            <>
                <MainDriver></MainDriver>
            </>
            :
            <></>
        }
    </>
}

export default Main;

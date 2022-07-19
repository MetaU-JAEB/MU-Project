// @flow
import * as React from 'react'
import './LogOut.css';

function LogOut () : React.MixedElement {

    function logout () {
        // TODO : delete current user Data
        window.location.href = "/login";
    }
    logout();

    return <>
        <p>Logout</p>
    </>
}

export default LogOut;

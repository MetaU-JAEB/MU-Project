// @flow
import * as React from 'react'
import { useContext, useEffect } from "react";
import { userContext } from '../../contexts/UserContext';
import './LogOut.css';
import { useNavigate } from "react-router-dom";

function LogOut () : React.MixedElement {
    const {setUser} = useContext(userContext);
    const navigate = useNavigate();

    function logout () {
        // TODO : delete current user Data
        setUser({logged : false});
        navigate('/Login');
    }

    useEffect(()=>{
        logout();
    },[])


    return <>
        <p>Logout</p>
    </>
}

export default LogOut;

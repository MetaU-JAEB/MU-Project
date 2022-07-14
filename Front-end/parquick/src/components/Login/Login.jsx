// @flow
import * as React from 'react'
import { useEffect, useState } from "react";
import './Login.css';

function Login(): React.MixedElement {

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    useEffect(()=>{
        // console.log("email: ", email, ". pass: ", password);
    }, [email, password]);

    function handleOnSubmitLogin(event){
        event.preventDefault();
        // console.log("loggining");
    }

    return <>
        <form action="#">
            <input type="text" name="e-mail" id="e-mail" placeholder='e-mail' value={email} onChange={(e) => setEmail(e.target.value)}/>
            <input type="text" name="password" id="password" placeholder='password' value={password} onChange={(e)=> setPassword(e.target.value)}/>
            <button type="submit" onClick={handleOnSubmitLogin} disabled={(email==="" || password==="")}>Login</button>
        </form>
    </>
}

export default Login;

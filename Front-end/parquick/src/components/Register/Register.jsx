// @flow
import * as React from 'react'
import { useEffect } from 'react';
import { useState } from 'react';
import './Register.css';

function Register(): React.MixedElement {

    const [userType, setUserType] = useState("");

    useEffect(() => {
        // TODO: display extra info if required based on user type
    }, [userType])

    function handlerOnChangeRadioType(event) {
        setUserType(event.target.value)
    }

    function handleOnSubmitRegister(event) {
        event.preventDefault();
        // TODO: Make post request/mutation to the server
    }




    return <>
        <div className="register">
            <form action="#">
                <fieldset>
                    <legend>Choose what kind of user you are going to be</legend>
                    <div className="radio-type">
                        <input type="radio" name="type" id="radio-owner" value={"owner"} checked={userType == "owner"} onChange={handlerOnChangeRadioType} />
                        <label htmlFor="type"> Owner </label>
                    </div>
                    <div className="radio-type">
                        <input type="radio" name="type" id="radio-driver" value={"driver"} checked={userType == "driver"} onChange={handlerOnChangeRadioType} />
                        <label htmlFor="type"> Driver </label>
                    </div>

                </fieldset>
                <fieldset>
                    <legend>Account Info</legend>
                    <input type="text" name="first-name" id="first-name" placeholder='first name' />
                    <input type="text" name="last-name" id="last-name" placeholder='last name' />
                    <input type="text" name="e-mail" id="e-mail" placeholder='e-mail' />
                    <input type="text" name="passwrod" id="passwrod" placeholder='passwrod' />
                    <input type="text" name="password-repeat" id="password-repeat" placeholder='repeat password' />

                </fieldset>

                <fieldset>
                    <legend>Personal Info</legend>

                    <input type="text" name="phone-number" id="phone-number" placeholder='phone number' />
                    <input type="text" name="address" id="address" placeholder='address' />



                </fieldset>

                <fieldset>
                    <legend>Payment info</legend>
                    <input type="text" name="card-number" id="card-number" placeholder='card number' />
                    <input type="text" name="card-expiration-date" id="card-expiration-date" placeholder='card expiration date' />
                    <input type="text" name="card-ccv" id="card-ccv" placeholder='card ccv' />
                    {
                        userType === "owner" ?
                            <>
                                <input type="text" name="routing-number" id="routing-number" placeholder='routing number' />
                                <input type="text" name="account-number" id="account-number" placeholder='account number' />
                            </>
                            :
                            <></>
                    }

                </fieldset>
                {
                    userType === "driver" ?
                        <fieldset>
                            <legend>Car info</legend>
                            <input type="text" name="car-height-fts" id="car-height-fts" placeholder='car height, in feets' />
                            <input type="text" name="car-length-fts" id="car-length-fts" placeholder='car length, in feets' />
                            <input type="text" name="car-width-fts" id="car-width-fts" placeholder='car width, in feets' />
                        </fieldset>
                        :
                        <></>
                }
                <button type="submit" onClick={handleOnSubmitRegister} disabled={!(userType === "driver" || userType === "owner")}>Register</button>
            </form>
        </div>

    </>
}

export default Register;

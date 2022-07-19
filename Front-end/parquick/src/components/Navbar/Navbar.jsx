// @flow
import * as React from 'react'
import { useContext } from "react";
import { Link } from 'react-router-dom';
import { userContext } from '../../contexts/UserContext';
import './Navbar.css';



function Navbar(): React.MixedElement {
    const {user} = useContext(userContext);

    // TODO: use redux, Context or Local storage to save user data and
    // display info according to user type
    return <>
        <div className='navbar'>
            <div className="navbar-left logo">
                <Link className='navbar-item navbar-logo' to="/"> Logo </Link>
            </div>
            <div className="navbar-right">
                {
                    user.logged ?
                        <>
                            <Link className='navbar-item' to="/"> Main </Link>
                            {
                                user.type === "owner" ?
                                    <>
                                        <Link className='navbar-item' to="AddParking"> Add Parking </Link>
                                        <Link className='navbar-item' to="Dashboard"> Dashboard </Link>
                                    </>
                                    :
                                    <>
                                        <Link className='navbar-item' to="Rented"> Rented </Link>
                                    </>

                            }
                            <Link className='navbar-item' to="LogOut"> Log out </Link>
                        </>
                        :
                        <>
                            <Link className='navbar-item' to="Login"> Login </Link>
                            <Link className='navbar-item' to="Register"> Register </Link>
                        </>
                }
            </div>

        </div>


    </>
}

export default Navbar;

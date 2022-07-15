
import * as React from 'react'
import { Link } from 'react-router-dom';
import './Navbar.css';

/* type User = {
    name : string,
    type : string,
    logged : boolean
  } */

const defaultUser = {
    name: "Jose",
    type: "driver",
    logged: true
}

function Navbar({ user = defaultUser }): React.MixedElement {
    // console.log('User', user);
    return <>
        <div className='navbar'>
            <div className="navbar-left logo">
                <Link className='navbar-item navbar-logo' to="/"> Logo </Link>
            </div>
            <div className="navbar-right">
                {
                    user.logged === true ?
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

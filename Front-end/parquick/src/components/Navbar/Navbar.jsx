
import * as React from 'react'
import { Link } from 'react-router-dom';
import './Navbar.css';

type User = {
    name : string,
    type : string,
    logged : boolean
  }

const defaultUser = {
    logged : true
}

function Navbar ({user}) : React.MixedElement {
    console.log('User',user);
    return <>
        {
            user.logged === true ?
                <>
                    <Link to="/"> Main </Link>
                    {
                        user.type === "owner" ?
                            <>
                                <Link to="AddParking"> Add Parking </Link>
                                <Link to="Dashboard"> Dashboard </Link>
                            </>
                            :
                            <>
                                <Link to="Rented"> Rented </Link>
                            </>

                    }
                    <Link to="LogOut"> Log out </Link>
                </>
            :
                <>
                    <Link to="Login"> Login </Link>
                    <Link to="Register"> Register </Link>
                </>
        }

    </>
}

export default Navbar;

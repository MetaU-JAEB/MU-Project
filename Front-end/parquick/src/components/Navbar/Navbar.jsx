// @flow
import * as React from 'react';
import { Link } from 'react-router-dom';
import { useUser } from '../../contexts/UserContext';
import './Navbar.css';

function Navbar(): React.MixedElement {
  const { user } = useUser();

  const OwnerItems = (): React.MixedElement => {
    return (
      <>
        <Link className="navbar-item" to="AddParking">
          Add Parking
        </Link>
        <Link className="navbar-item" to="Dashboard">
          Dashboard
        </Link>
      </>
    );
  };

  const DriverItems = (): React.MixedElement => {
    return (
      <Link className="navbar-item" to="Rented">
        Rented
      </Link>
    );
  };

  const LoggedItems = (): React.MixedElement => {
    return (
      <>
        <Link className="navbar-item" to="/">
          Main
        </Link>
        {user.type === 'Owner' ? OwnerItems() : DriverItems()}
        <Link className="navbar-item" to="Messenger">
          Messenger
        </Link>
        <Link className="navbar-item" to="LogOut">
          Log out
        </Link>
      </>
    );
  };

  const NoLoggedItems = (): React.MixedElement => {
    return (
      <>
        <Link className="navbar-item" to="Login">
          Login
        </Link>
        <Link className="navbar-item" to="Register">
          Register
        </Link>
      </>
    );
  };

  return (
    <div className="navbar">
      <div className="navbar-left logo">
        <Link className="navbar-item navbar-logo" to="/">
          Parquick
        </Link>
      </div>
      <div className="navbar-right">
        {user.token && user.token !== '' ? LoggedItems() : NoLoggedItems()}
      </div>
    </div>
  );
}

export default Navbar;

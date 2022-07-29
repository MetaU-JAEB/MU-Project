// @flow
import './App.css';
import * as React from "react";
import { useState, useEffect } from "react";
import { Routes, Route, /* Link, useParams, */ BrowserRouter } from 'react-router-dom';
import Navbar from './components/Navbar/Navbar';
import Main from './components/Main/Main';
import Parking from './components/Parking/Parking';
import NotFound from './components/NotFound/NotFound';
import Rented from './components/Rented/Rented';
import AddParking from './components/AddParking/AddParking';
import Dashboard from './components/Dashboard/Dashboard';
import LogOut from './components/LogOut/LogOut';
import Login from './components/Login/Login';
import Register from './components/Register/Register';
import type { User } from './types/User';
import { UserContext } from "./contexts/UserContext";
import { testUser } from "./types/User";



function App(): React.MixedElement {

  const [user, setUser] = useState < User > (testUser);

  useEffect(() => {
    // TODO: Fetch whatever that needs to be fetched at the begining
  }, [])

  return (
    <div className="App">
      <UserContext.Provider value={{ user, setUser }} >
        <BrowserRouter>
          <Navbar />
          <Routes>
            <Route path="/" element={<Main/>} />
            <Route path="Rented" element={<Rented />} />
            <Route path="AddParking" element={<AddParking />} />
            <Route path="Dashboard" element={<Dashboard />} />
            <Route path="LogOut" element={<LogOut />} />
            <Route path="Login" element={<Login />} />
            <Route path="Register" element={<Register />} />
            <Route path="parking/:parkingId" element={<Parking />} />
            <Route path="*" element={<NotFound />} />
          </Routes>
        </BrowserRouter>
      </UserContext.Provider>
    </div>
  );
}

export default App;

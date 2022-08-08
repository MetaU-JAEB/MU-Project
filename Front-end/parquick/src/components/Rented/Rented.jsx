// @flow
import * as React from 'react';
import './Rented.css';
import { testParking } from '../../types/Parking';

function Rented(): React.MixedElement {
  function handleOnClickExtend(event) {
    // TODO : make query to extend time of rental
  }
  return (
    <>
      <p>id : {testParking._id}</p>
      <div className="park-images">
        {testParking.images.map(image => {
          return <img src={`${image}`} key={image}></img>;
        })}
      </div>
      <p>Address : {testParking.ubication.address}</p>
      <p>Price : ${testParking.price}</p>
      <label htmlFor="rent-until">Rent until</label>
      <input type="date" name="rento-until" id="" />
      <br />
      <button onClick={handleOnClickExtend}>Extend time</button>
    </>
  );
}

export default Rented;

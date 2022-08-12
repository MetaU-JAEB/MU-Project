// @flow
import * as React from 'react';
import { useEffect, useState } from 'react';
import './Parking.css';
import { useParams } from 'react-router-dom';
import { useQuery } from '@apollo/client';
import { GET_PARKING_BY_ID } from '../../queries/parkingQueries';
import { client } from '../../queries/client';
import { CREATE_RENT } from '../../queries/rent';
import { useUser } from '../../contexts/UserContext';
import { CREATE_CONVERSATION } from '../../queries/conversation';

function Parking(): React.MixedElement {
  const { parkingId } = useParams();
  const { user } = useUser();
  const [parking, setParking] = useState(null);
  const [selectedDate, setSelectedDate] = useState(
    new Date().toLocaleDateString(),
  );
  const { loading, error, data } = useQuery(GET_PARKING_BY_ID(parkingId));
  const [indexSelected, setIndexSelected] = useState(0);

  useEffect(() => {}, [parkingId]);

  useEffect(() => {
    if (data?.parkingById) {
      setParking(data.parkingById);
    }
  }, [data]);

  const makeConversation = (driverId, ownerId) => {
    client
      .mutate({
        mutation: CREATE_CONVERSATION(driverId, ownerId),
      })
      .then(result => {
        // Todo: Tell user the conversation was created
      });
  };

  const makeRent = (todayDate, endDate) => {
    client
      .mutate({
        mutation: CREATE_RENT(parkingId, user._id, todayDate, endDate),
      })
      .then(result => {
        const driverId = result.data.rentCreate.record.driverId;
        const ownerId = result.data.rentCreate.record.parking.owner._id;
        makeConversation(driverId, ownerId);
      });
  };

  function handleOnClickRent(event) {
    const todayDate = new Date().toLocaleDateString();
    const endDate = new Date(selectedDate).toLocaleDateString();
    makeRent(todayDate, endDate);
  }

  const DetailsThumb = images => {
    return (
      <div className="thumb">
        {images.map((img, index) => (
          <img
            src={img}
            alt=""
            key={index}
            onClick={() => setIndexSelected(index)}
            className={indexSelected == index ? 'active' : ''}
          />
        ))}
      </div>
    );
  };

  if (loading) return <p> Loading ...</p>;
  if (error) return <p>Error</p>;

  return (
    <>
      {parking && (
        <>
          <div className="product">
            <div className="details" key={parking._id}>
              <div className="big-img">
                <img src={parking?.images[indexSelected]} alt="" />
              </div>

              <div className="box">
                <div className="row">
                  <h2>${parking.price}</h2>
                  <span>{`${parking.totalLots} available`}</span>
                </div>

                <p>{parking.ubication.address}</p>
                <p className="option-shade">
                  {parking.isUnderShade ? 'Is under shade' : 'Not under shade'}
                </p>
                <p className="option-outside">
                  {parking.isInside ? 'Is inside a building' : 'Is outside'}
                </p>
                {DetailsThumb(parking.images)}
                <button className="cart" onClick={handleOnClickRent}>Rent today</button>
              </div>
            </div>
          </div>
          <div className='box'>
            <h4>Or rent until</h4>
            <input
              type="date"
              name="rent-until"
              id=""
              value={selectedDate}
              onChange={e => setSelectedDate(e.target.value)}
            />
            <br />
            <button className='cart' onClick={handleOnClickRent}>Rent</button>
          </div>
        </>
      )}
    </>
  );
}

export default Parking;

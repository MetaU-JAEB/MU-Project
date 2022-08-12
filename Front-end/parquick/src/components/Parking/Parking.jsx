// @flow
import * as React from 'react';
import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
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
  const [imgIndexSelected, setImgIndexSelected] = useState(0);
  const [isCreatingRent, setIsCreatingRent] = useState(false);
  const [isCreatingConversation, setIsCreatingConversation] = useState(false);
  const [conversationCreated, setConversationCreated] = useState(null);

  useEffect(() => {}, [parkingId]);

  useEffect(() => {
    if (data?.parkingById) {
      setParking(data.parkingById);
    }
  }, [data]);

  const makeConversation = (driverId, ownerId) => {
    setIsCreatingConversation(true);
    client
      .mutate({
        mutation: CREATE_CONVERSATION(driverId, ownerId),
      })
      .then(result => {
        setIsCreatingConversation(false);
        setConversationCreated(result.data.conversationCreate.record);
        // Todo: Tell user the conversation was created
      });
  };

  const makeRent = (todayDate, endDate) => {
    setIsCreatingRent(true);
    client
      .mutate({
        mutation: CREATE_RENT(parkingId, user._id, todayDate, endDate),
      })
      .then(result => {
        setIsCreatingRent(false);
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
            onClick={() => setImgIndexSelected(index)}
            className={imgIndexSelected == index ? 'active' : ''}
          />
        ))}
      </div>
    );
  };

  const loadingStatus = () => {
    if (isCreatingRent) return <p> Creating Rent...</p>;
    if (isCreatingConversation) return <p> Creating Conversation...</p>;
    return <></>;
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
                <img src={parking?.images[imgIndexSelected]} alt="" />
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
                <button className="cart" onClick={handleOnClickRent}>
                  Rent today
                </button>
              </div>
            </div>
          </div>
          <div className="box">
            <h4>Or rent until</h4>
            <input
              type="date"
              name="rent-until"
              id=""
              value={selectedDate}
              onChange={e => setSelectedDate(e.target.value)}
            />
            <br />
            <button className="cart" onClick={handleOnClickRent}>
              Rent
            </button>
          </div>
          {loadingStatus()}
          {conversationCreated && (
            <Link to={`/Messenger/${conversationCreated._id}`}>
              <button className="btn-rent talk">Talk to the owner</button>
            </Link>
          )}
        </>
      )}
    </>
  );
}

export default Parking;

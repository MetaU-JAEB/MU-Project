// @flow
import * as React from 'react';
import { Link } from 'react-router-dom';
import './ParkingCard.css';
import type { Parking } from '../../types/Parking';
import { testParking } from '../../types/Parking';

type PropsParkingCard = {
  parking: Parking,
};

function ParkingCard({
  parking = testParking,
}: PropsParkingCard): React.MixedElement {
  const percentage = (total, available) => {
    const occupied = Number(total) - Number(available);
    const usagePercentage = ((occupied / Number(total)) * 100).toFixed(0);
    return usagePercentage;
  };

  const Progress = ({ used }) => {
    const [style, setStyle] = React.useState({});

    setTimeout(() => {
      const newStyle = {
        opacity: 1,
        width: `${used}%`,
      };

      setStyle(newStyle);
    }, 200);

    return (
      <div className="progress">
        <div className="progress-used" style={style}>
          {used}% occupied
        </div>
      </div>
    );
  };

  return (
    <>
      <div className="parking-card">
        <div className="parking-card-picture">
          <Link to={`parking/${parking._id}`}>
            <img src={parking.images[0]} alt="" className="parking-card-img" />
          </Link>
        </div>
        <div className="parking-card-content">
          <p>
            <b>Address:</b> &emsp;
            {parking.ubication?.address}
          </p>
          <p>
            <b>Price:</b> &emsp; ${parking.price}
          </p>
          <p>
            <b>Shade:</b> &emsp;
            {parking.isUnderShade ? 'Yes' : 'No'}
          </p>
          <p>
            <b>Outside:</b> &emsp;
            {parking.isInside ? 'No' : 'Yes'}
          </p>
          <p>
            <b>Availables:</b> &emsp;{parking.availableLots}/{parking.totalLots}
          </p>
          <Progress
            used={percentage(parking.totalLots, parking.availableLots)}
          />
          <p className='action-buttons'>
            <button className="btn-update">Update</button>
            <button className="btn-delete">Delete</button>
          </p>
        </div>
      </div>
    </>
  );
}

export default ParkingCard;

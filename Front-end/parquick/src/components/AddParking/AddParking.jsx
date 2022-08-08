// @flow
import * as React from 'react';
import { useState } from 'react';
import type { Parking } from '../../types/Parking';
import { testParking } from '../../types/Parking';
import './AddParking.css';

function AddParking(): React.MixedElement {
  const [parking, setParking] = useState<Parking>(testParking);

  function handleOnChangeParking(event, property: string) {
    setParking(prev => {
      return { ...prev, [property]: event.target.value };
    });
  }

  function handleOnClickBooleanParking(event, property: string) {
    setParking(prev => {
      return { ...prev, [property]: event.target.checked };
    });
  }

  function handleOnSubmitParking(event) {
    event.preventDefault;
    // TODO : check if it has filled the required fields,
    // then make mutation to add parking.
  }

  return (
    <>
      <div className="add-parking">
        <form action="#">
          <input
            type="text"
            onChange={e => handleOnChangeParking(e, 'address')}
            className="add-parking-info"
            value={parking.ubication?.address}
            name="new-parking-address"
            id="new-parking-address"
            placeholder="new-parking-address"
          />
          <input
            type="text"
            onChange={e => handleOnChangeParking(e, 'lat')}
            name="lat"
            id="lat"
            placeholder="lat"
            disabled
          />
          <input
            type="text"
            onChange={e => handleOnChangeParking(e, 'lon')}
            name="lon"
            id="lon"
            placeholder="lon"
            disabled
          />
          <input
            type="number"
            onChange={e => handleOnChangeParking(e, 'price')}
            className="add-parking-info"
            placeholder="price, in USD"
          />
          <label htmlFor="pictures"> Pictures </label>
          <input type="file" className="add-parking-info" name="pictures" />

          <input
            type="number"
            onChange={e => handleOnChangeParking(e, 'totalLots')}
            className="add-parking-info"
            placeholder="Total amount of lots"
          />

          <fieldset>
            <legend> Extras </legend>
            <input
              type="checkbox"
              onClick={e => handleOnClickBooleanParking(e, 'hasShade')}
              name="has-shade"
              id="has-shade"
            />
            <label htmlFor="has-shade"> Has shade </label>
            <input
              type="checkbox"
              onClick={e => handleOnClickBooleanParking(e, 'isInInterior')}
              name="is-in-interior"
              id="is-in-interior"
            />
            <label htmlFor="is-in-interior"> Is in interior </label>
          </fieldset>

          <fieldset>
            <legend> Size </legend>
            <input
              type="number"
              onChange={e => handleOnChangeParking(e, 'height')}
              name="height"
              id="height"
              placeholder="height"
            />
            <input
              type="number"
              onChange={e => handleOnChangeParking(e, 'length')}
              name="length"
              id="length"
              placeholder="length"
            />
            <input
              type="number"
              onChange={e => handleOnChangeParking(e, 'width')}
              name="width"
              id="width"
              placeholder="width"
            />
          </fieldset>

          <button type="submit" onClick={handleOnSubmitParking}>
            {' '}
            Add Parking
          </button>
        </form>
      </div>
    </>
  );
}

export default AddParking;

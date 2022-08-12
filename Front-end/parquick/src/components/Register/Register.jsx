// @flow
import * as React from 'react';
import { useState } from 'react';
import './Register.css';
import type { User } from '../../types/User';
import type { BankCard } from '../../types/BankCard';
import { emptyUser } from '../../types/User';
import { testCard } from '../../types/BankCard';
import { client } from '../../queries/client';
import { USER_REGISTER } from '../../queries/userQueries';

function Register(): React.MixedElement {
  const [card, setCard] = useState<BankCard>(testCard);
  const [user, setUser] = useState<User>(emptyUser);

  function handleOnChangeUser(event, property: string) {
    setUser(prev => {
      return { ...prev, [property]: event.target.value };
    });
  }

  function handleOnChangeCard(event, property: string) {
    setCard(prev => {
      const newCard = { ...prev, [property]: event.target.value };
      setUser(prev => {
        return { ...prev, cards: [newCard] };
      });
      return newCard;
    });
  }

  function handleOnSubmitRegister(event) {
    event.preventDefault();
    // Added in the previous commit
    client
      .mutate({
        mutation: USER_REGISTER(user),
      })
      .then(result => {
        // TODO: store the result in localstorage
        // auto-login or redirect to login
      });
  }

  return (
    <div className="register">
      <div className="form-container">
        <form action="#" className="register-form">
          <div className="inner-form">
            <fieldset>
              <legend>Choose what kind of user you are going to be</legend>
              <div className="radio-type">
                <input
                  type="radio"
                  name="type"
                  id="radio-owner"
                  value={'Owner'}
                  checked={user.type == 'Owner'}
                  onChange={e => handleOnChangeUser(e, 'type')}
                />
                <label htmlFor="type"> Owner </label>
              </div>
              <div className="radio-type">
                <input
                  type="radio"
                  name="type"
                  id="radio-driver"
                  value={'Driver'}
                  checked={user.type == 'Driver'}
                  onChange={e => handleOnChangeUser(e, 'type')}
                />
                <label htmlFor="type"> Driver </label>
              </div>
            </fieldset>
            <fieldset>
              <legend>Account Info</legend>

              <input
                type="text"
                onChange={e => handleOnChangeUser(e, 'firstName')}
                value={user.firstName}
                name="first-name"
                className="input-register"
                id="first-name"
                placeholder="first name"
              />
              <input
                type="text"
                onChange={e => handleOnChangeUser(e, 'lastName')}
                value={user.lastName}
                name="last-name"
                className="input-register"
                id="last-name"
                placeholder="last name"
              />
              <input
                type="text"
                onChange={e => handleOnChangeUser(e, 'email')}
                value={user.email}
                name="e-mail"
                className="input-register"
                id="e-mail"
                placeholder="e-mail"
              />
              <input
                type="password"
                onChange={e => handleOnChangeUser(e, 'password')}
                value={user.password}
                name="password"
                className="input-register"
                id="password"
                placeholder="password"
              />
              <input
                type="password"
                onChange={e => handleOnChangeUser(e, 'passwordRepeat')}
                value={user.passwordRepeat}
                name="password-repeat"
                className="input-register"
                id="password-repeat"
                placeholder="repeat password"
              />
            </fieldset>

            <fieldset>
              <legend>Personal Info</legend>

              <input
                type="text"
                onChange={e => handleOnChangeUser(e, 'phone')}
                value={user.phone}
                name="phone-number"
                id="phone-number"
                className="input-register"
                placeholder="phone number"
              />
              <input
                type="text"
                onChange={e => handleOnChangeUser(e, 'address')}
                value={user.address}
                name="address"
                className="input-register"
                id="address"
                placeholder="address"
              />
            </fieldset>

            <fieldset>
              <legend>Payment info</legend>
              <input
                type="text"
                name="card-number"
                onChange={e => handleOnChangeCard(e, 'number')}
                value={card.number}
                id="card-number"
                className="input-register"
                placeholder="card number"
              />
              <input
                type="text"
                name="card-expiration-date"
                onChange={e => handleOnChangeCard(e, 'expiration')}
                value={card.expiration}
                id="card-expiration-date"
                className="input-register"
                placeholder="card expiration date"
              />
              <input
                type="text"
                name="card-ccv"
                id="card-ccv"
                className="input-register"
                onChange={e => handleOnChangeCard(e, 'CCV')}
                value={card.CCV}
                placeholder="card ccv"
              />
            </fieldset>
            {user.type === 'Driver' ? (
              <fieldset>
                <legend>Car info</legend>
                <input
                  type="text"
                  name="car-height-fts"
                  id="car-height-fts"
                  className="input-register"
                  placeholder="car height, in feets"
                />
                <input
                  type="text"
                  name="car-length-fts"
                  id="car-length-fts"
                  className="input-register"
                  placeholder="car length, in feets"
                />
                <input
                  type="text"
                  name="car-width-fts"
                  id="car-width-fts"
                  className="input-register"
                  placeholder="car width, in feets"
                />
              </fieldset>
            ) : (
              <></>
            )}
            <button
              type="submit"
              onClick={handleOnSubmitRegister}
              className={
                user.type === 'Driver' || user.type === 'Owner'
                  ? 'btn-register'
                  : 'btn-register inactive'
              }
              disabled={!(user.type === 'Driver' || user.type === 'Owner')}
            >
              Register
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default Register;

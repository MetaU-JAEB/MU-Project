// @flow
import * as React from 'react';
import { useEffect } from 'react';
import MainDriver from '../MainDriver/MainDriver';
import MainOwner from '../MainOwner/MainOwner';
import './Main.css';
import { useUser } from '../../contexts/UserContext';
import { userIsLogged } from '../../utils/checkUser';
import { useNavigate } from 'react-router-dom';

function Main(): React.MixedElement {
  const { user } = useUser();
  const navigate = useNavigate();

  useEffect(() => {
    if (!userIsLogged(user)) {
      navigate('/Login');
    }
  }, []);

  if (!user.token) {
    return <>Not logged</>;
  }

  return (
    <>
      {user.type === 'Owner' ? (
        <>
          <MainOwner />
        </>
      ) : user.type === 'Driver' ? (
        <>
          <MainDriver />
        </>
      ) : (
        <></>
      )}
    </>
  );
}

export default Main;

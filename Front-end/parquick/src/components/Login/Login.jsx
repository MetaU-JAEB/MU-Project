//
import * as React from 'react';
import { useEffect, useState } from 'react';
import { ApolloClient, InMemoryCache } from '@apollo/client';
import './Login.css';
import { API_URL } from '../../utils/constants';
import { USER_LOGIN } from '../../queries/userQueries';
import { useUser } from '../../contexts/UserContext';
import { useNavigate } from 'react-router-dom';

const client = new ApolloClient({
  uri: API_URL,
  cache: new InMemoryCache(),
});

function Login(): React.MixedElement {
  const navigate = useNavigate();
  const { setUser } = useUser();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  useEffect(() => {
    // TODO: when email or password changes maybe change the style
    // of the submit button (toggles disability for the moment)
  }, [email, password]);

  function handleOnSubmitLogin(event) {
    event.preventDefault();
    client
      .mutate({
        mutation: USER_LOGIN(email, password),
      })
      .then(result => {
        // TODO: store the result in localstorage
        setUser(result?.data?.userLogin?.record);
        navigate('/');
      });
  }

  return (
    <>
      <form action="#">
        <input
          type="text"
          name="e-mail"
          id="e-mail"
          placeholder="e-mail"
          value={email}
          onChange={e => setEmail(e.target.value)}
        />
        <input
          type="text"
          name="password"
          id="password"
          placeholder="password"
          value={password}
          onChange={e => setPassword(e.target.value)}
        />
        <button
          type="submit"
          onClick={handleOnSubmitLogin}
          disabled={email === '' || password === ''}
        >
          Login
        </button>
      </form>
    </>
  );
}

export default Login;

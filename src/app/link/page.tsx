'use client';
import React, { useCallback, useContext, useEffect } from 'react';
import { BASE_PATH } from '../constants';
import LinkContext, { LinkProvider } from '../contexts/link/linkContext';
import Link from './Link';

const LinkPage = () => {
  const { dispatch } = useContext(LinkContext);
  const generateToken = useCallback(async () => {
    const path = BASE_PATH + '/api/plaid/create-link-token';
    const response = await fetch(path, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded;charset=UTF-8',
      },
      body: `public_token=123`,
    });
    console.log('create link', response);
    if (!response.ok) {
      dispatch({ type: 'SET_STATE', state: { linkToken: null } });
      return;
    }
    const data = await response.json();
    if (data) {
      if (data.error != null) {
        console.log('data', data);
        dispatch({
          type: 'SET_STATE',
          state: {
            linkToken: null,
            linkTokenError: data.error,
          },
        });
        return;
      }
      console.log('link_token', data);
      dispatch({ type: 'SET_STATE', state: { linkToken: data.link_token } });
    }
    // Save the link_token to be used later in the Oauth flow.
    localStorage.setItem('link_token', data.link_token);
  }, [dispatch]);

  useEffect(() => {
    const init = async () => {
      // do not generate a new token for OAuth redirect; instead
      // setLinkToken from localStorage
      if (window.location.href.includes('?oauth_state_id=')) {
        dispatch({
          type: 'SET_STATE',
          state: {
            linkToken: localStorage.getItem('link_token'),
          },
        });
        return;
      }
      generateToken();
    };
    init();
  }, [dispatch, generateToken]);

  return (
    <div>
      <Link></Link>
    </div>
  );
};

export default LinkPage;

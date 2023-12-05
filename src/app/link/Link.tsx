'use client';
import React, { useEffect, useContext } from 'react';
import { usePlaidLink } from 'react-plaid-link';
import Button from 'plaid-threads/Button';

import LinkContext from '../contexts/link/linkContext';
import { BASE_PATH } from '../constants';

const Link = () => {
  const { linkToken, dispatch } = useContext(LinkContext);

  const onSuccess = React.useCallback(
    (public_token: string) => {
      // If the access_token is needed, send public_token to server
      const exchangePublicTokenForAccessToken = async () => {
        const response = await fetch(
          BASE_PATH + '/api/plaid/set-access-token',
          {
            method: 'POST',
            headers: {
              'Content-Type': 'application/x-www-form-urlencoded;charset=UTF-8',
            },
            body: `public_token=${public_token}`,
          }
        );
        if (!response.ok) {
          dispatch({
            type: 'SET_STATE',
            state: {
              itemId: `no item_id retrieved`,
              accessToken: `no access_token retrieved`,
              isItemAccess: false,
            },
          });
          return;
        }
        const data = await response.json();
        console.log('access-token dat', data);
        dispatch({
          type: 'SET_STATE',
          state: {
            itemId: data.item_id,
            accessToken: data.access_token,
            isItemAccess: true,
          },
        });
      };

      exchangePublicTokenForAccessToken();

      dispatch({ type: 'SET_STATE', state: { linkSuccess: true } });
      window.history.pushState('', '', '/');
    },
    [dispatch]
  );

  const config: Parameters<typeof usePlaidLink>[0] = {
    token: linkToken!,
    onSuccess,
  };

  const { open, ready } = usePlaidLink(config);

  return (
    <Button type='button' large onClick={() => open()} disabled={!ready}>
      Launch Link
    </Button>
  );
};

Link.displayName = 'Link';

export default Link;

import React, { useEffect } from 'react';

import { gapi } from 'gapi-script';
import { useGoogleLogout } from 'react-google-login';

export function GoogleLogout({ onSuccessfulLogout }) {
  const clientId = import.meta.env.VIRTUAL_HUB_GOOGLE_AUTH_CLIENT_ID;
  const { signOut } = useGoogleLogout({ clientId });

  useEffect(() => {
    const initClient = () => {
      gapi.client.init({
        clientId,
        scope: '',
      });
    };
    gapi.load('client:auth2', initClient);
  });

  function logout() {
    signOut();
    onSuccessfulLogout();
  }

  return <button type="button" onClick={logout}>Logout</button>;
}

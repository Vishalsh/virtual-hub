import React, { useEffect } from 'react';

import { gapi } from 'gapi-script';
import { useGoogleLogout } from 'react-google-login';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSignOut } from '@fortawesome/free-solid-svg-icons/faSignOut';
import styles from './GoogleLogout.module.scss';

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

  return (
    <button
      type="button"
      onClick={logout}
      className={styles.googleLogout}
    >
      <FontAwesomeIcon icon={faSignOut} />
      <span>Logout</span>
    </button>
  );
}

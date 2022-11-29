import React from 'react';
import { useMsal } from '@azure/msal-react';
import { faSignOut } from '@fortawesome/free-solid-svg-icons/faSignOut';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import styles from './MsLogout.module.scss';

export function MsLogout({ onSuccessfulLogout }) {
  const { instance } = useMsal();

  function handleLogout() {
    instance.logoutPopup();
    onSuccessfulLogout();
  }

  return (
    <button
      type="button"
      onClick={handleLogout}
      className={styles.msLogout}
    >
      <FontAwesomeIcon icon={faSignOut} />
      <span>Logout</span>
    </button>
  );
}

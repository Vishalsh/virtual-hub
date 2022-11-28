import React from 'react';
import { useMsal } from '@azure/msal-react';

export function MsLogout({ onSuccessfulLogout }) {
  const { instance } = useMsal();

  function handleLogout() {
    instance.logoutRedirect();
    onSuccessfulLogout();
  }

  return <button type="button" onClick={handleLogout}>Sign out</button>;
}

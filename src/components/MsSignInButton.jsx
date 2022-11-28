import React from 'react';
import { useMsal } from '@azure/msal-react';

export function MsSignInButton() {
  const { instance } = useMsal();

  function handleSignIn() {
    instance.loginPopup({
      scopes: ['user.read'],
    });
  }

  return <button type="button" onClick={handleSignIn}>Sign in with Microsoft</button>;
}

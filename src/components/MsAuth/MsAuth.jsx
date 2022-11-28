import React, { useEffect } from 'react';
import { useMsal } from '@azure/msal-react';
import { EventType } from '@azure/msal-browser';
import { MsSignInButton } from '../MsSignInButton/MsSignInButton';
import { AUTH_PROVIDER } from '../../utils/constants';

export function MsAuth({ onSuccessfulLogin }) {
  const { instance } = useMsal();

  useEffect(() => {
    const callbackId = instance.addEventCallback((event) => {
      if (event.eventType === EventType.LOGIN_SUCCESS) {
        instance.setActiveAccount(event.payload.account);
        onSuccessfulLogin({
          name: event.payload.account.name,
          authProvider: AUTH_PROVIDER.microsoft,
        });
      }
    });
    return () => {
      if (callbackId) {
        instance.removeEventCallback(callbackId);
      }
    };
  }, [instance]);

  return <MsSignInButton />;
}

import { MsSignInButton } from "./MsSignInButton.jsx";
import { useIsAuthenticated, useMsal } from "@azure/msal-react";
import { MsLogout } from "./MsLogout.jsx";
import { useEffect } from "react";
import { EventType } from "@azure/msal-browser";
import { AUTH_PROVIDER } from "../utils/constants.js";

export const MsAuth = ({ onSuccessfulLogin }) => {
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
};

import React, { useEffect } from "react";

import { gapi } from "gapi-script";
import { useGoogleLogout } from "react-google-login";

export const GoogleLogout = ({ onSuccessfulLogout }) => {
  const clientId = import.meta.env.VIRTUAL_HUB_GOOGLE_AUTH_CLIENT_ID;
  const { signOut } = useGoogleLogout({ clientId });

  useEffect(() => {
    const initClient = () => {
      gapi.client.init({
        clientId: clientId,
        scope: "",
      });
    };
    gapi.load("client:auth2", initClient);
  });

  function logout() {
    signOut();
    onSuccessfulLogout();
  }

  return <button onClick={logout}>Logout</button>;
};

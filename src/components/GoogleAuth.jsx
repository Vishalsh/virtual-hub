import React, { useEffect } from "react";

import { gapi } from "gapi-script";
import { GoogleLogin } from "react-google-login";
import {AUTH_PROVIDER} from "../utils/constants.js";

export const GoogleAuth = ({ onSuccessfulLogin }) => {
  const clientId = import.meta.env.VIRTUAL_HUB_GOOGLE_AUTH_CLIENT_ID;

  useEffect(() => {
    const initClient = () => {
      gapi.client.init({
        clientId: clientId,
        scope: "",
      });
    };
    gapi.load("client:auth2", initClient);
  });

  function onSuccess(res) {
    onSuccessfulLogin({
      name: res.profileObj.name,
      imageUrl: res.profileObj.imageUrl,
      authProvider: AUTH_PROVIDER.google
    });
  }

  function onFailure(err) {
    alert("Could Not login via Google");
  }

  return (
    <>
      <GoogleLogin
        clientId={clientId}
        buttonText="Sign in with Google"
        onSuccess={onSuccess}
        onFailure={onFailure}
        cookiePolicy={"single_host_origin"}
        isSignedIn={false}
      />
    </>
  );
};

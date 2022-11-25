import React, { useEffect } from "react";

import { gapi } from "gapi-script";
import { GoogleLogin } from "react-google-login";

export const GoogleAuth = ({ onSuccessfulLogin }) => {
  const clientId =
    "722979341660-08ksqdp9fvvgdtvjc0ahlggj5uf20ji6.apps.googleusercontent.com";

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
    console.log(res);
    onSuccessfulLogin({
      name: res.profileObj.name,
      imageUrl: res.profileObj.imageUrl,
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
        isSignedIn={true}
      />
    </>
  );
};

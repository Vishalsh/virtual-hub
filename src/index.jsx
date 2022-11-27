import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import { PublicClientApplication } from "@azure/msal-browser";

const pca = new PublicClientApplication({
  auth: {
    clientId: import.meta.env.VIRTUAL_HUB_MS_AUTH_CLIENT_ID,
    authority: import.meta.env.VIRTUAL_HUB_MS_AUTH_AUTHORITY,
    redirectUri: "/ ",
    postLogoutRedirectUri: "/",
  },
});

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <App msalInstance={pca} />
  </React.StrictMode>
);

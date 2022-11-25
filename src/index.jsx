import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import {EventType, PublicClientApplication} from "@azure/msal-browser";

const pca = new PublicClientApplication({
  auth: {
    clientId: '',
    authority: '',
    redirectUri: '/ ',
    postLogoutRedirectUri: '/'
  },
});

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <App msalInstance={pca} />
  </React.StrictMode>
)

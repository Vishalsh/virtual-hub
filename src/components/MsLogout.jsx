import {useMsal} from "@azure/msal-react";

export const MsLogout = ({ onSuccessfulLogout }) => {
  const {instance} = useMsal();

  const handleLogout = () => {
    instance.logoutRedirect();
    onSuccessfulLogout();
  }

  return <button onClick={handleLogout}>Sign out</button>
}
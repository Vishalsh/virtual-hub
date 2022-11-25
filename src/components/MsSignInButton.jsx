import {useMsal} from "@azure/msal-react";

export const MsSignInButton = () => {
  const {instance} = useMsal();

  const handleSignIn = () => {
    instance.loginRedirect({
      scopes: ['user.read'],
    });
  }

  return <button onClick={handleSignIn}>Sign in with Microsoft</button>
}
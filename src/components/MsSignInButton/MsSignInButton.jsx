import {useMsal} from "@azure/msal-react";
import styles from './MsSignInButton.module.scss'

export const MsSignInButton = () => {
  const {instance} = useMsal();

  const handleSignIn = () => {
    instance.loginRedirect({
      scopes: ['user.read'],
    });
  }

  return (
    <button onClick={handleSignIn} className={styles.msSignInButton}>
      <div className={styles.msSignInButton__icon}></div>
      <span className={styles.msSignInButton__label}>Sign in with Microsoft</span>
    </button>
  )
}
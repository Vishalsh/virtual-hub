import {useMsal} from "@azure/msal-react";
import styles from './MsSignInButton.module.scss'

const MsLogo = () => (
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 23 23" width="18" height="18"><path fill="#f3f3f3" d="M0 0h23v23H0z"/><path fill="#f35325" d="M1 1h10v10H1z"/><path fill="#81bc06" d="M12 1h10v10H12z"/><path fill="#05a6f0" d="M1 12h10v10H1z"/><path fill="#ffba08" d="M12 12h10v10H12z"/></svg>
)

export const MsSignInButton = () => {
  const {instance} = useMsal();

  const handleSignIn = () => {
    instance.loginRedirect({
      scopes: ['user.read'],
    });
  }

  return (
    <button onClick={handleSignIn} className={styles.msSignInButton}>
      <div className={styles.msSignInButton__icon}>
        <MsLogo />
      </div>
      <span className={styles.msSignInButton__label}>Sign in with Microsoft</span>
    </button>
  )
}
import React, { Component } from 'react';
import IdleTimer from 'react-idle-timer';
import TimeoutModal from 'TimeOutModal';
import { useAuth } from 'signin/security';
class Landing extends Component {

  constructor(props) {
    super(props);
    this.state = { keycloak: null, authenticated: false, showModal: false };

    this.idleTimer = null;
    this.logoutTimer = null;
  }
 
  onIdle = () => {
    this.togglePopup();
    this.logoutTimer = setTimeout(() => {
      this.handleLogout();
    }, 1000 * 5 * 1); // 5 seconds
  }
 
  togglePopup = () => {
    this.setState(prevState => ({ showModal: !prevState.showModal }));
  }
 
  handleStayLoggedIn = () => {
    if (this.logoutTimer) {
      clearTimeout(this.logoutTimer);
      this.logoutTimer = null;
    }
    this.idleTimer.reset();
    this.togglePopup();
  }

  handleLogout = () => {
    window.localStorage.removeItem('auth');
    window.location.href='http://silverfir:8787/realms/MisDev2/protocol/openid-connect/logout';
    /*const { authService } = useAuth();
    authService.logout(true)
            .then(() => window.location.replace(process.env.REACT_APP_WEBSITE_CONTEXT));*/
  }

  render() {
    const { showModal } = this.state.showModal;
  return (
        <div>
          <p>
            This is a Keycloak-secured component of the application. You shouldn't be able to see this
            unless you've authenticated with Keycloak.
          </p>
          <button
                     type="button"
                     className="text-blue-800"
                     onClick={(e) => {
                      e.preventDefault();
                      this.handleLogout();
                      }}
                   >
                     Logout
                   </button>
                   <IdleTimer
        ref={ref => { this.idleTimer = ref }}
        element={document}
        stopOnIdle={true}
        onIdle={this.onIdle}
        timeout={1000 * 990 * 1} // 900 seconds
      />

      <TimeoutModal
        showModal={this.state.showModal}
        togglePopup={this.togglePopup}
        handleStayLoggedIn={this.handleStayLoggedIn}
      />
        </div>
      );
  }
}

export default Landing;

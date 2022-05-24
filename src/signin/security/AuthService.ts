// /* eslint-disable @typescript-eslint/camelcase */
import {createPKCECodes, PKCECodePair} from './pkce'
import {toUrlEncoded} from './util'
import jwtDecode from 'jwt-decode'
import {clearStateVariables} from "../utility";

// const gatewayHost = 'http://localhost:9000';



export interface AuthServiceProps {
  clientId: string
  clientSecret?: string
  contentType?: string
  location?: Location
  provider: string
  authorizeEndpoint?: string
  tokenEndpoint?: string
  logoutEndpoint?: string
  audience?: string
  redirectUri?: string
  scopes: string[]
  autoRefresh?: boolean
  refreshSlack?: number
}

export interface AuthTokens {
  id_token: string
  access_token: string
  refresh_token: string
  expires_in: number
  expires_at?: number // calculated on login
  token_type: string
}

export interface JWTIDToken {
  given_name: string
  family_name: string
  name: string
  email: string
}

export interface TokenRequestBody {
  clientId: string
  grantType: string
  redirectUri?: string
  refresh_token?: string
  clientSecret?: string
  code?: string
  codeVerifier?: string
}

export class AuthService<TIDToken = JWTIDToken> {
  props: AuthServiceProps
  timeout?: number

  constructor(props: AuthServiceProps) {
    this.props = props
    const code = this.getCodeFromLocation(window.location)
    if (code !== null) {
      this.fetchToken(code)
        .then(() => {
          this.restoreUri()
        })
        .catch((e) => {
          this.removeItem('pkce')
          this.removeItem('auth')
          this.removeCodeFromLocation()
          console.warn({ e })
        })
    // } else if (this.props.autoRefresh) {
    //   this.startTimer()
    }
  }

  getUser(): {} {
    const t = this.getAuthTokens()
    if (null === t) return {}
    const decoded = jwtDecode(t.id_token) as TIDToken
    return decoded
  }

  getPreSigninUrlFromLocation(location: Location): string | null {
    const split = location.toString().split('?')
    if (split.length < 2) {
      return null
    }
    const pairs = split[1].split('&')
    for (const pair of pairs) {
      const [key, value] = pair.split('=')
      if (key === 'preAuthUri') {
        return decodeURIComponent(value || '')
      }
    }
    let redirectUri: string | null = null;
    if (this.props.redirectUri !== undefined) {
      redirectUri = this.props.redirectUri;
    }
    return redirectUri;
  }

  getCodeFromLocation(location: Location): string | null {
    const split = location.toString().split('?')
    if (split.length < 2) {
      return null
    }
    const pairs = split[1].split('&')
    for (const pair of pairs) {
      const [key, value] = pair.split('=')
      if (key === 'code') {
        return decodeURIComponent(value || '')
      }
    }
    return null
  }

  removeCodeFromLocation(): void {
    const [base, search] = window.location.href.split('?')
    if (!search) {
      return
    }
    const newSearch = search
      .split('&')
      .map((param) => param.split('='))
      .filter(([key]) => key !== 'code')
      .map((keyAndVal) => keyAndVal.join('='))
      .join('&')
    window.history.replaceState(
      window.history.state,
      'null',
      base + (newSearch.length ? `?${newSearch}` : '')
    )
  }

  getItem(key: string): string | null {
    return window.localStorage.getItem(key)
  }
  removeItem(key: string): void {
    window.localStorage.removeItem(key)
  }

  getPkce(): PKCECodePair {
    const pkce = window.localStorage.getItem('pkce')
    if (null === pkce) {
      throw new Error('PKCE pair not found in local storage')
    } else {
      return JSON.parse(pkce)
    }
  }



  setAuthTokens(auth: AuthTokens): void {
    const { refreshSlack = 5 } = this.props
    const now = new Date().getTime()
    auth.expires_at = now + (auth.expires_in + refreshSlack) * 1000
    window.localStorage.setItem('auth', JSON.stringify(auth))
  }

  getAuthTokens(): AuthTokens {
    return JSON.parse(window.localStorage.getItem('auth') || '{}')
  }

  isPending(): boolean {
    return (
      window.localStorage.getItem('pkce') !== null &&
      window.localStorage.getItem('auth') === null
    )
  }

  isAuthenticated(): boolean {
    const authDetail = window.localStorage.getItem('auth');
    if (authDetail !== null && authDetail !== 'null') {
      const authDetailObj = JSON.parse(authDetail);
      return (authDetailObj.expires_at > Date.now());
    }
    return false;
  }

  async logout(shouldEndSession: boolean = false): Promise<boolean> {
    console.log('+++ logout ' + shouldEndSession + ':' + JSON.stringify(this.props));
    console.log('Should End? ' + shouldEndSession);

    clearStateVariables();

    if (shouldEndSession) {
      const { logoutEndpoint } = this.props;
      let accessToken = this.getAuthTokens().access_token;

      console.log('LOGOUT: ' + logoutEndpoint);
      console.log('accessToken: ' + accessToken);
      fetch(logoutEndpoint as string, {
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded',
          'Authorization': 'Bearer ' + accessToken
        },
        method: 'POST'
      }).then((response) => {
        console.log('SUCCESSFUL LOGOUT');
        console.log(response)
      })
        .catch(() => console.log('FAILED LOGOUT'));

      console.log("DONE integration api gateway logout")

      this.removeItem('pkce');
      this.removeItem('auth');
      this.removeItem('currentUser');
      return true;

    } else {
      this.removeItem('pkce');
      this.removeItem('auth');
      this.removeItem('currentUser');
      window.location.reload()
      return true
    }
  }


  setPreAuthUrl(url:string) {
    window.localStorage.setItem('preAuthUri', url);
  }

  async login(): Promise<void> {
    console.log("+++ login()");
    let preSigninUrl = this.getPreSigninUrlFromLocation(window.location);

    this.authorize(preSigninUrl as string);
  }

  // this will do a full page reload and to to the OAuth2 provider's login page and then redirect back to redirectUri
  authorize(preSigninUrl: string): boolean {
    const { clientId, provider, authorizeEndpoint, redirectUri, scopes, audience } = this.props

    const pkce = createPKCECodes()
    window.localStorage.setItem('pkce', JSON.stringify(pkce))
    window.localStorage.setItem('preAuthUri', preSigninUrl)
    window.localStorage.removeItem('auth')
    const codeChallenge = pkce.codeChallenge

    const query = {
      clientId,
      scope: scopes.join(' '),
      responseType: 'code',
      redirectUri,
      ...(audience && { audience }),
      codeChallenge,
      codeChallengeMethod: 'S256'
    }
    // Responds with a 302 redirect
    const url = `${authorizeEndpoint || `${provider}/auth`}?${toUrlEncoded(query)}`
    // const url = `${authorizeEndpoint || `${provider}/authorize`}?${toUrlEncoded(query)}`

    // From a deployoment point of view, use of window.location.replace is acceptable here since it
    // navigates to the Auth server, not to a context within the React Router v6 application
    //
    window.location.replace(url)
    return true
  }

  // this happens after a full page reload. Read the code from localstorage
  async fetchToken(code: string, isRefresh = false): Promise<AuthTokens> {
    console.log('FETCHING TOKEN');
    const {
      clientId,
      clientSecret,
      contentType,
      provider,
      tokenEndpoint,
      redirectUri,
      autoRefresh = true
    } = this.props
    const grantType = 'authorization_code'

    let payload: TokenRequestBody = {
      clientId,
      ...(clientSecret ? { clientSecret } : {}),
      redirectUri,
      grantType
    }

    if (isRefresh) {
      payload = {
        ...payload,
        grantType: 'refresh_token',
        refresh_token: code
      }
    } else {
      const pkce: PKCECodePair = this.getPkce()
      const codeVerifier = pkce.codeVerifier
      payload = {
        ...payload,
        code,
        codeVerifier
      }
    }
    let authorizationHeaderValue = 'Basic ' + btoa(clientId + ':')
    const response = await fetch(`${tokenEndpoint || `${provider}/token`}`, {
      headers: {
        'Content-Type': contentType || 'application/x-www-form-urlencoded',
        'Authorization': authorizationHeaderValue
      },
      method: 'POST',
      body: toUrlEncoded(payload)
    })
    this.removeItem('pkce')
    let json = await response.json()
    if (isRefresh && !json.refresh_token) {
      json.refresh_token = payload.refresh_token
    }
    this.setAuthTokens(json as AuthTokens)
    if (autoRefresh) {
      this.startTimer()
    }

    return this.getAuthTokens()
  }

  armRefreshTimer(refreshToken: string, timeoutDuration: number): void {
    console.log("+++ armRefreshTimer " + timeoutDuration);
    if (this.timeout) {
      clearTimeout(this.timeout)
    }
    console.log('setting up Refresh timer for ' + timeoutDuration);

    this.timeout = window.setTimeout(() => {
      console.log('Attempting Refresh');

      this.fetchToken(refreshToken, true)
        .then(({ refresh_token: newRefreshToken, expires_at: expiresAt }) => {
;
          if (!expiresAt) return
          const now = new Date().getTime()
          const timeout = expiresAt - now
          if (timeout > 0) {
            this.armRefreshTimer(newRefreshToken, timeout)
          } else {
            this.removeItem('auth')
            this.removeCodeFromLocation()
          }
        })
        .catch((e) => {
          this.removeItem('auth')
          this.removeCodeFromLocation()
          console.warn({ e })
        })
    }, timeoutDuration)
  }

  startTimer(): void {
    console.log('+++ startTimer ' + this.isAuthenticated());
    const authTokens = this.getAuthTokens()
    if (!authTokens) {
      return
    }
    const { refresh_token: refreshToken, expires_at: expiresAt } = authTokens
    if (!expiresAt || !refreshToken) {
console.log('Not going to set the timer.  ExpiresAt: ' + expiresAt + ', Refresh Token: ' + refreshToken);
      return
    }
    // const now = new Date().getTime()
    const timeout = 1000 * 15;
//    const timeout = expiresAt - now
    if (timeout > 0) {
      this.armRefreshTimer(refreshToken, timeout)
    } else {
      this.removeItem('auth')
      this.removeCodeFromLocation()
    }
  }



  restoreUri(): void {
    let uri:string|null = window.localStorage.getItem('preAuthUri')
    window.localStorage.removeItem('preAuthUri')
    console.log({ uri })
    // if (uri !== null && uri !== 'null') {
    //   window.location.replace(uri)
    // } else if (this.props.redirectUri !== undefined) {
    //   window.location.replace(this.props.redirectUri);
    // } else {
      // @ts-ignore
    window.location.replace(process.env.REACT_APP_WEBSITE_CONTEXT);
    // }
    this.removeCodeFromLocation()
  }


  getCurrentUser() {
    let retrievedCurrentUser = {};
    let currentUser = window.localStorage.getItem('currentUser');
    if (currentUser !== null && currentUser !== 'null') {
      retrievedCurrentUser = JSON.parse(currentUser);
    }

    return retrievedCurrentUser
  }

  setCurrentUser(userDetail:Object) {
    window.localStorage.setItem('currentUser', JSON.stringify(userDetail));
  }

}

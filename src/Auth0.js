import auth0 from 'auth0-js';

const auth0Client = new auth0.WebAuth({
  // the following three lines MUST be updated
  domain: process.env.REACT_APP_AUTH0_DOMAIN,
  audience: process.env.REACT_APP_AUTH0_AUDIENCE,
  clientID: process.env.REACT_APP_AUTH0_CLIENTID,
  redirectUri: process.env.REACT_APP_AUTH0_REDIRECTURI,
  responseType: 'id_token',
  scope: 'openid profile email'
});

export function handleAuthentication() {
  return new Promise((resolve, reject) => {
    auth0Client.parseHash((err, authResult) => {
      if (err) return reject(err);
      if (!authResult || !authResult.idToken) {
        return reject(err);
      }
      const idToken = authResult.idToken;
      const profile = authResult.idTokenPayload;
      // set the time that the id token will expire at
      const expiresAt = authResult.idTokenPayload.exp * 1000;
      resolve({
        authenticated: true,
        idToken,
        profile,
        expiresAt
      });
    });
  });
}

export function logIn() {
  auth0Client.authorize();
}

export function signUp() {
  auth0Client.authorize();
}

export function signOut() {
  auth0Client.logout({
    returnTo: process.env.REACT_APP_AUTH0_RETURNTO,
    clientID: process.env.REACT_APP_AUTH0_CLIENTID
  })
}
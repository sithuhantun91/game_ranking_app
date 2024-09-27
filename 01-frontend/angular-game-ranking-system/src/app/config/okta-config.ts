// src/app/okta-config.ts
import { OktaAuth } from '@okta/okta-auth-js';

export const oktaConfig = {
  clientId: '0oajqmtunhqwWQzh05d7',
  issuer: 'https://dev-23518799.okta.com/oauth2/default',
  redirectUri: window.location.origin + '/login/callback',
  scopes: ['openid', 'profile', 'email'],
  pkce: true
};

export const oktaAuth = new OktaAuth(oktaConfig);

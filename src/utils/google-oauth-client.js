import { OAuth2Client } from 'google-auth-library';
import { getEnvVar } from './getEnvVar.js';
import { ENV_VARS } from '../constants/envVars.js';

const oAuth2Client = new OAuth2Client({
  client_id: getEnvVar(ENV_VARS.GOOGLE_OAUTH_CLIENT_ID),
  redirect_uri: getEnvVar(ENV_VARS.GOOGLE_OAUTH_REDIRECT_URI),
  client_secret: getEnvVar(ENV_VARS.GOOGLE_OAUTH_CLIENT_SECRET),
  project_id: getEnvVar(ENV_VARS.GOOGLE_OAUTH_PROJECT_ID),
});

export const getGoogleOAuthUrl = () =>
  oAuth2Client.generateAuthUrl({
    access_type: 'offline',
    scope: [
      'https://www.googleapis.com/auth/userinfo.profile',
      'https://www.googleapis.com/auth/userinfo.email',
    ],
    redirect_uri: getEnvVar(ENV_VARS.GOOGLE_OAUTH_REDIRECT_URI),
    /*prompt: 'consent',*/
  });

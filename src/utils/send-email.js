import { createTransport } from 'nodemailer';
import { getEnvVar } from './getEnvVar';
import { ENV_VARS } from '../constants/envVars';
import createHttpError from 'http-errors';

const mailClient = createTransport({
  host: getEnvVar(ENV_VARS.SMTP_HOST),
  port: getEnvVar(ENV_VARS.SMTP_PORT),
  auth: {
    user: getEnvVar(ENV_VARS.SMTP_USER),
    password: getEnvVar(ENV_VARS.SMTP_PASSWORD),
  },
});

export const sendEmail = async ({ email }) => {
  try {
    await mailClient.sendMail({
      to: email,
      subject: 'Reset your password!',
      html: '<h1>Here is your reset password email!</h1>',
      from: getEnvVar(ENV_VARS.SMTP_FROM),
    });
  } catch (err) {
    console.error(err);
    throw createHttpError(500, 'Failed to send email');
  }
};

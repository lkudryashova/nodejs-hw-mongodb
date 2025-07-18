import nodemailer from 'nodemailer';
import { getEnvVar } from './getEnvVar.js';
import { ENV_VARS } from '../constants/envVars.js';
import createHttpError from 'http-errors';

const mailClient = nodemailer.createTransport({
  host: getEnvVar(ENV_VARS.SMTP_HOST),
  port: Number(getEnvVar(ENV_VARS.SMTP_PORT)),
  secure: false,
  auth: {
    user: getEnvVar(ENV_VARS.SMTP_USER),
    pass: getEnvVar(ENV_VARS.SMTP_PASSWORD),
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
    // console.error(err);
    // throw createHttpError(500, 'Failed to send email');
    console.error('SMTP ERROR:', err);
    throw createHttpError(500, err.message || 'Failed to send email');
  }
};

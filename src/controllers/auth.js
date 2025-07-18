import {
  registerUser,
  loginUser,
  refreshUser,
  logoutUser,
  requestResetPasswordEmail,
} from '../services/auth.js';

const setupSession = (res, session) => {
  res.cookie('refreshToken', session.refreshToken, {
    httpOnly: true,
    expires: session.refreshTokenValidUntil,
  });

  res.cookie('sessionId', session._id, {
    httpOnly: true,
    expres: session.refreshTokenValidUntil,
  });
};

export const registerController = async (req, res) => {
  const newUser = await registerUser(req.body);
  const { password, ...userWithoutPassword } = newUser.toObject();

  res.status(201).json({
    status: 201,
    message: 'Successfully register user',
    data: userWithoutPassword,
  });
};

export const loginController = async (req, res) => {
  const session = await loginUser(req.body);

  setupSession(res, session);

  res.json({
    status: 200,
    message: 'Successfully logged in an user!',
    data: {
      accessToken: session.accessToken,
    },
  });
};

export const refreshController = async (req, res) => {
  const session = await refreshUser(req.cookies);

  setupSession(res, session);

  res.json({
    status: 200,
    message: 'Successfully refreshed a session!',
    data: {
      accessToken: session.accessToken,
    },
  });
};

export const logoutController = async (req, res) => {
  if (req.cookies.sessionId) {
    await logoutUser(req.cookies.sessionId);
  }

  res.clearCookie('sessionId');
  res.clearCookie('refreshToken');

  res.status(204).send();
};

export const requestResetPasswordEmailController = async (req, res) => {
  const { email } = req.body;
<<<<<<< HEAD

  await requestResetPasswordEmail(email);

  res.send({
    status: 200,
    message: 'Successfully sent reset password email!',
=======
  await requestResetPasswordEmail(email);
  res.send({
    status: 200,
    message: 'Reset password email has been successfully sent.',
>>>>>>> 12b1b4ef4fc1328476be33f38765f8e30058b799
    data: {},
  });
};

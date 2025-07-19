import { Router } from 'express';

import { ctrlWrapper } from '../utils/ctrlWrapper.js';
import { validateBody } from '../utils/validateBody.js';

import { authRegisterSchema, authLoginSchema } from '../validation/auth.js';
import {
  registerController,
  loginController,
  refreshController,
  logoutController,
  requestResetPasswordEmailController,
  resetPasswordController,
} from '../controllers/auth.js';
import { requestResetPasswordEmailValidationSchema } from '../validation/request-reset-password-email-validation-schema.js';
import { resetPasswordValidationSchema } from '../validation/reset-password-validation-schema.js';

const authRouter = Router();

authRouter.post(
  '/register',
  validateBody(authRegisterSchema),
  ctrlWrapper(registerController),
);

authRouter.post(
  '/login',
  validateBody(authLoginSchema),
  ctrlWrapper(loginController),
);

authRouter.post('/refresh', ctrlWrapper(refreshController));
authRouter.post('/logout', ctrlWrapper(logoutController));
authRouter.post(
  '/request-reset-password-email',
  validateBody(requestResetPasswordEmailValidationSchema),
  requestResetPasswordEmailController,
);

authRouter.post(
  '/send-reset-email',
  validateBody(requestResetPasswordEmailValidationSchema),
  requestResetPasswordEmailController,
);

authRouter.post(
  '/reset-pwd',
  validateBody(resetPasswordValidationSchema),
  resetPasswordController,
);

export default authRouter;

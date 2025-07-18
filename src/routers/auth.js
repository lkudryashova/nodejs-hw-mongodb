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
} from '../controllers/auth.js';
import { requestResetPasswordEmailValidationSchema } from '../validation/request-reset-password-email-validation-schema.js';

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
//authRouter.post('/reset-password');

export default authRouter;

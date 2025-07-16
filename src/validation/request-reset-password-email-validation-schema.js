import Joi from 'joi';

export const requestResetPasswordEmailValidationSchema = Joi.object({
  email: Joi.string().min(3).max(20),
});

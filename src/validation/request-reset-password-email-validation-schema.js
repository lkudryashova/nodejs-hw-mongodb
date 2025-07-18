import Joi from 'joi';

export const requestResetPasswordEmailValidationSchema = Joi.object({
<<<<<<< HEAD
  email: Joi.string().email().required(),
=======
  email: Joi.string().min(3).max(20),
>>>>>>> 12b1b4ef4fc1328476be33f38765f8e30058b799
});

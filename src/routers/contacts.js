import { Router } from 'express';

import {
  getContactsController,
  getContactsByIdController,
  addContactController,
  patchContactController,
  deleteContactController,
} from '../controllers/contacts.js';

import { isValidId } from '../middlewares/isValidId.js';
import { authenticate } from '../middlewares/authenticate.js';

import { validateBody } from '../utils/validateBody.js';

import {
  contactAddSchema,
  contactUpdateSchema,
} from '../validation/contacts.js';

import { ctrlWrapper } from '../utils/ctrlWrapper.js';

const contactsRouter = Router();

contactsRouter.use(authenticate);

contactsRouter.get('/', ctrlWrapper(getContactsController));

contactsRouter.get(
  '/:contactId',
  isValidId,
  ctrlWrapper(getContactsByIdController),
);

contactsRouter.post(
  '/',
  validateBody(contactAddSchema),
  ctrlWrapper(addContactController),
);

contactsRouter.patch(
  '/:contactId',
  isValidId,
  validateBody(contactUpdateSchema),
  ctrlWrapper(patchContactController),
);

contactsRouter.delete(
  '/:contactId',
  isValidId,
  ctrlWrapper(deleteContactController),
);

export default contactsRouter;

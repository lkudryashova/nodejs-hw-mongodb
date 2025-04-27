import { Router } from 'express';

import {
  getContactsController,
  getContactsByIdController,
  addContactController,
  patchContactController,
  deleteContactController,
} from '../controllers/contacts.js';

import { ctrlWrapper } from '../utils/ctrlWrapper.js';

const contactsRouter = Router();

contactsRouter.get('/', ctrlWrapper(getContactsController));

contactsRouter.get('/:contactId', ctrlWrapper(getContactsByIdController));

contactsRouter.post('/', ctrlWrapper(addContactController));

contactsRouter.patch('/:contactId', ctrlWrapper(patchContactController));

contactsRouter.delete('/:contactId', ctrlWrapper(deleteContactController));

export default contactsRouter;

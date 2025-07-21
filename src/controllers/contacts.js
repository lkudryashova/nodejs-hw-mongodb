import createHttpError from 'http-errors';
import { parsePaginationParams } from '../utils/parsePaginationParams.js';
import { parseSortParams } from '../utils/parseSortParams.js';
import { parseContactFilterParams } from '../utils/filters/parseContactFilterParams.js';
import Contact, { contactSortField } from '../db/models/Contact.js';

import {
  getContacts,
  getContactById,
  addContact,
  updateContact,
  deleteContactById,
  uploadContactAvatar,
} from '../services/contacts.js';
import { saveFileToCloudinary } from '../utils/save-file-to-cloudinary.js';

export const getContactsController = async (req, res) => {
  const paginationParams = parsePaginationParams(req.query);
  const sortParams = parseSortParams(req.query, contactSortField);
  const filters = parseContactFilterParams(req.query);
  filters.userId = req.user._id;
  const data = await getContacts({
    ...paginationParams,
    ...sortParams,
    filters,
  });

  res.json({
    status: 200,
    message: 'Successfully found contacts!',
    data,
  });
};

export const getContactsByIdController = async (req, res) => {
  const { contactId } = req.params;
  const { _id: userId } = req.user;
  const data = await getContactById({ _id: contactId, userId });

  if (!data) {
    throw createHttpError(404, 'Contact not found or does not belong to you');
  }

  res.json({
    status: 200,
    message: `Successfully found contact with id ${contactId}!`,
    data,
  });
};

/*export const addContactController = async (req, res) => {
  const { _id: userId } = req.user;
  const photo = req.file?.path; // update
  const data = await addContact({ ...req.body, photo, userId }); // update

  res.status(201).json({
    status: 201,
    message: 'Successfully created a contact!',
    data,
  });
};*/

/*---------------------------------------------------*/

export const addContactController = async (req, res, next) => {
  try {
    const { _id: userId } = req.user;
    const payload = { ...req.body, userId };

    if (req.file) {
      payload.photo = await saveFileToCloudinary(req.file);
    }

    const newContact = await addContact(payload);

    res.status(201).json({
      status: 201,
      message: 'Successfully created a contact!',
      data: newContact,
    });
  } catch (err) {
    next(err);
  }
};

/*--------------------------------------------*/

/*export const patchContactController = async (req, res) => {
  const { contactId } = req.params;
  const { _id: userId } = req.user;

  if (req.file?.path) {
    req.body.photo = req.file.path;
  } // update

  const result = await updateContact({ _id: contactId, userId }, req.body);

  if (!result) {
    throw createHttpError(404, 'Contact not found or does not belong to you');
  }
  res.json({
    status: 200,
    message: 'Successfully patched a contact!',
    data: result,
  });
};*/

/*-------------------------------------------*/

export const patchContactController = async (req, res, next) => {
  try {
    const { contactId } = req.params;
    const userId = req.user._id;

    const updates = { ...req.body };

    if (req.file) {
      updates.photo = await saveFileToCloudinary(req.file);
    }

    const result = await updateContact(contactId, updates, userId);

    if (!result) {
      throw createHttpError(404, 'Contact not found or does not belong to you');
    }

    res.json({
      status: 200,
      message: 'Successfully patched a contact!',
      data: result.data,
    });
  } catch (err) {
    next(err);
  }
};

export const deleteContactController = async (req, res) => {
  const { contactId } = req.params;
  const { _id: userId } = req.user;
  const data = await deleteContactById({ _id: contactId, userId });

  if (!data) {
    throw createHttpError(404, 'Contact not found or does not belong to you');
  }
  res.status(204).send();
};

export const uploadContactsAvatarController = async (req, res) => {
  const { contactId } = req.params;

  const contact = await uploadContactAvatar(contactId, req.file);
  return res.json({
    status: 200,
    message: `Successfully updated contacts avatar with id ${contactId}!`,
    data: contact,
  });
};

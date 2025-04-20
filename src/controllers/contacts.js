import createHttpError from 'http-errors';
import { getContacts, getContactById } from '../services/contacts.js';

export const getContactsController = async (req, res) => {
  try {
    const data = await getContacts();
    res.json({
      status: 200,
      message: 'Successfully found contacts!',
      data,
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const getContactsByIdController = async (req, res, next) => {
  try {
    const { contactId } = req.params;
    const data = await getContactById(contactId);

    if (!data) {
      throw createHttpError(404, 'Contact not found');
      /*const error = new Error('Contact not found');
      error.status = 404;
      throw error;
      /*return res.status(404).json({
        message: 'Contact not found',
      });*/
    }

    res.json({
      status: 200,
      message: 'Successfully found contact with id {contactId}!',
      data,
    });
  } catch (error) {
    next(error);
  }
};

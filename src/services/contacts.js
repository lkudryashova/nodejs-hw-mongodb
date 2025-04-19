import Contact from '../db/models/Contact.js';

export const getContacts = () => Contact.find();
export const getContactById = (contactId) =>
  Contact.findOne({ _id: contactId });

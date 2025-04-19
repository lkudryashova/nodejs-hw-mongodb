import Contact from '../db/models/contact.js';

export const getContacts = () => Contact.find();
export const getContactById = (contactId) =>
  Contact.findOne({ _id: contactId });

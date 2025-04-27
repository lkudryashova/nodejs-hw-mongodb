import Contact from '../db/models/Contact.js';

export const getContacts = () => Contact.find();

export const getContactById = (contactId) =>
  Contact.findOne({ _id: contactId });

export const addContact = (payload) => Contact.create(payload);

export const updateContact = async (_id, payload, options = {}) => {
  const { upsert } = options;
  const rawResult = await Contact.findOneAndUpdate({ _id }, payload, {
    new: true,
    upsert,
    includeResultMetadata: true,
  });

  if (!rawResult || !rawResult.value) return null;
  return {
    data: rawResult.value,
    isNew: Boolean(rawResult.lastErrorObject.upserted),
  };
};

export const deleteContactById = (_id) => Contact.findOneAndDelete({ _id });

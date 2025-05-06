import Contact from '../db/models/Contact.js';

import { sortList } from '../constants/index.js';

import { calcPaginationData } from '../utils/calcPaginationData.js';

export const getContacts = async ({
  page = 1,
  perPage = 10,
  sortBy,
  sortOrder = sortList[0],
}) => {
  const skip = (page - 1) * perPage;
  const data = await Contact.find()
    .skip(skip)
    .limit(perPage)
    .sort({ [sortBy]: sortOrder });
  const totalItems = await Contact.countDocuments();

  const paginationData = calcPaginationData(totalItems, perPage, page);

  return {
    data,
    ...paginationData,
  };
};

export const getContactById = (contactId) =>
  Contact.findOne({ _id: contactId });

export const addContact = (payload) => Contact.create(payload);

export const updateContact = async (_id, payload, options = {}) => {
  const { upsert } = options;
  const rawResult = await Contact.findOneAndUpdate({ _id }, payload, {
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

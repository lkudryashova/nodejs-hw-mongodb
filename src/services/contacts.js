import Contact from '../db/models/Contact.js';

import { sortList } from '../constants/index.js';

import { calcPaginationData } from '../utils/calcPaginationData.js';

export const getContacts = async ({
  page = 1,
  perPage = 10,
  sortBy,
  sortOrder = sortList[0],
  filters = {},
}) => {
  const skip = (page - 1) * perPage;
  const contactQuery = Contact.find();

  if (filters.userId) {
    contactQuery.where('userId').equals(filters.userId);
  }

  if (filters.type) {
    contactQuery.where('contactType').equals(filters.type);
  }

  if (filters.isFavourite !== undefined) {
    contactQuery.where('isFavourite').equals(filters.isFavourite);
  }

  const totalItems = await Contact.countDocuments(contactQuery.getFilter());

  const sortParams = {};
  if (sortBy) {
    sortParams[sortBy] = sortOrder;
  }
  sortParams.contactType = 'asc';

  contactQuery.sort(sortParams);

  const data = await contactQuery
    .skip(skip)
    .limit(perPage)
    .sort({ [sortBy]: sortOrder });

  const paginationData = calcPaginationData(totalItems, perPage, page);

  return {
    data,
    ...paginationData,
  };
};

export const getContactById = (contactId, userId) =>
  Contact.findOne({ _id: contactId, userId });

export const addContact = (payload) => Contact.create(payload);

export const updateContact = async (_id, payload, userId, options = {}) => {
  const { upsert } = options;
  const rawResult = await Contact.findOneAndUpdate({ _id, userId }, payload, {
    upsert,
    includeResultMetadata: true,
  });

  if (!rawResult || !rawResult.value) return null;
  return {
    data: rawResult.value,
    isNew: Boolean(rawResult.lastErrorObject.upserted),
  };
};

export const deleteContactById = (_id, userId) =>
  Contact.findOneAndDelete({ _id, userId });

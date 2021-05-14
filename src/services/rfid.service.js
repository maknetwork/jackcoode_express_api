const httpStatus = require('http-status');
const Rfid = require('../models/rfid.model');
const ApiError = require('../utils/ApiError');
const https = require('http');

/**
 * Create a user
 * @param {Object} userBody
 * @returns {Promise<User>}
 */
const createRfid = async (userBody) => {
  if (await Rfid.isTagIdTaken(userBody.tagId)) {
    throw new ApiError(httpStatus.BAD_REQUEST, 'Tag id already taken');
  }
  const rfid = await Rfid.create(userBody);

  return rfid;
};
const queryRfids = async (filter, options) => {
  const rfids = await Rfid.paginate(filter, options);
  return rfids;
};

const getRfidByTagId = async (tagId) => {
  return Rfid.findOne({ tagId });
};
const scannedRfid = async (tagId) => {
  return Rfid.findOne({ tagId });
};

const updateRfidById = async (tagId) => {
  const user = await getRfidByTagId(tagId);
  if (!user) {
    throw new ApiError(httpStatus.NOT_FOUND, 'User not found');
  }

  const now = new Date();
  user.updated_at = now;
  if (!user.created_at) {
    user.created_at = now;
  }
  if (user.catInside) {
    user.catInside = false;
  } else {
    user.catInside = true;
  }
  await user.save();
  return user;
};
const deleteRfidById = async (tagId) => {
  const user = await getRfidByTagId(tagId);
  if (!user) {
    throw new ApiError(httpStatus.NOT_FOUND, 'User not found');
  }

  await user.remove();
  return user;
};
module.exports = {
  createRfid,
  queryRfids,
  scannedRfid,
  updateRfidById,
  getRfidByTagId,
  deleteRfidById,
};

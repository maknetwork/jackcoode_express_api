const httpStatus = require('http-status');
const Extra = require('../models/extra.model');
const ApiError = require('../utils/ApiError');
const https = require('http');

/**
 * Create a user
 * @param {Object} userBody
 * @returns {Promise<User>}
 */
const createRfid = async (userBody) => {
  const rfid = await Extra.create(userBody);

  return rfid;
};
const queryRfids = async (filter, options) => {
  const rfids = await Extra.paginate(filter, options);
  return rfids;
};
const getRfidByTagId = async (deviceToken) => {
  return Extra.findOne({ deviceToken });
};
const updateUserById = async (deviceToken, updateBody) => {
  const user = await getRfidByTagId(deviceToken);
  if (!user) {
    throw new ApiError(httpStatus.NOT_FOUND, 'User not found');
  }

  Object.assign(user, updateBody);
  await user.save();
  return user;
};
const deleteRfidById = async (deviceToken) => {
  const user = await getRfidByTagId(deviceToken);
  if (!user) {
    throw new ApiError(httpStatus.NOT_FOUND, 'User not found');
  }

  await user.remove();
  return user;
};
module.exports = {
  createRfid,
  queryRfids,
  getRfidByTagId,
  updateUserById,
  deleteRfidById,
};

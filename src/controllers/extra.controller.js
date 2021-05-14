const httpStatus = require('http-status');
const pick = require('../utils/pick');
const ApiError = require('../utils/ApiError');
const catchAsync = require('../utils/catchAsync');
const extraService = require('../services/extra.service');
const https = require('http');

const createRfid = catchAsync(async (req, res) => {
  const rfid = await extraService.createRfid(req.body);
  res.status(httpStatus.CREATED).send(rfid);
});
const getRfids = catchAsync(async (req, res) => {
  const filter = pick(req.query, ['deviceToken']);
  console.log(req.query);
  const options = pick(req.query, ['sortBy', 'limit', 'page']);

  const result = await extraService.queryRfids(filter, options);
  res.send(result);
});

const getRfid = catchAsync(async (req, res) => {
  const user = await extraService.getRfidByTagId(req.params.deviceToken);
  if (!user) {
    throw new ApiError(httpStatus.NOT_FOUND, 'RFID not found');
  }
  res.send(user);
});
const updateUser = catchAsync(async (req, res) => {
  const user = await extraService.updateUserById(req.params.deviceToken, req.body);
  res.send(user);
});
const deleteRfid = catchAsync(async (req, res) => {
  await extraService.deleteRfidById(req.params.deviceToken);
  res.status(httpStatus.NO_CONTENT).send();
});
module.exports = {
  createRfid,
  getRfids,
  getRfid,
  deleteRfid,
  updateUser,
};

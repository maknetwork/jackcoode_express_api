const Joi = require('joi');

const createRfid = {
  body: Joi.object().keys({
    name: Joi.string().required(),
    tagId: Joi.number().required(),
  }),
};

const getRfids = {
  query: Joi.object().keys({
    name: Joi.string(),
    tagId: Joi.number(),
  }),
};

const scannedRfid = {
  params: Joi.object().keys({
    tagId: Joi.number(),
  }),
};

const getRfid = {
  params: Joi.object().keys({
    tagId: Joi.number(),
  }),
};

const updateRfid = {
  params: Joi.object().keys({
    tagId: Joi.number().required(),
  }),
  body: Joi.object()
    .keys({
      tagId: Joi.number(),
      name: Joi.string(),
    })
    .min(1),
};

const deleteRfid = {
  params: Joi.object().keys({
    tagId: Joi.number(),
  }),
};

module.exports = {
  createRfid,
  getRfids,
  getRfid,
  scannedRfid,
  updateRfid,
  deleteRfid,
};

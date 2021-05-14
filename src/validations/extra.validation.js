const Joi = require('joi');

const createRfid = {
  body: Joi.object().keys({
    deviceToken: Joi.string().required(),
    entryOnly: Joi.boolean(),
  }),
};

const getRfids = {
  query: Joi.object().keys({
    deviceToken: Joi.string(),
  }),
};

const updateRfid = {
  params: Joi.object().keys({
    deviceToken: Joi.number().required(),
  }),
  body: Joi.object()
    .keys({
      entryOnly: Joi.boolean(),
    })
    .min(1),
};
const getRfid = {
  params: Joi.object().keys({
    deviceToken: Joi.string(),
  }),
};

const deleteRfid = {
  params: Joi.object().keys({
    deviceToken: Joi.string(),
  }),
};

module.exports = {
  createRfid,
  getRfids,
  getRfid,
  deleteRfid,
  updateRfid,
};

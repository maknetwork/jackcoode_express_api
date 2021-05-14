const mongoose = require('mongoose');
const { toJSON, paginate } = require('./plugins');
const { tokenTypes } = require('../config/tokens');
const { number } = require('joi');

const rfidSchema = mongoose.Schema(
  {
    tagId: { type: Number, required: false },


    lastAccessed: {
      type: Date,
      required: false,
    },
  },
  {
    timestamps: true,
  }
);

// add plugin that converts mongoose to json
rfidSchema.plugin(toJSON);
rfidSchema.plugin(paginate);
rfidSchema.statics.isTagIdTaken = async function (tagId, excludeUserId) {
  const user = await this.findOne({ tagId, _id: { $ne: excludeUserId } });
  return !!user;
};
/* rfidSchema.statics.istagIdTaken = async function (tagId, excludeUserId) {
  const user = await this.findOne({ tagId, _id: { $ne: excludeUserId } });
  return !!user;
}; */
/**
 * @typedef Rfid
 */
const RFID = mongoose.model('RFID', rfidSchema);

module.exports = RFID;

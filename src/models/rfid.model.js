const mongoose = require('mongoose');
const { toJSON, paginate } = require('./plugins');

const rfidSchema = mongoose.Schema(
  {
    tagId: { type: Number, required: false },

    name: {
      type: String,
      required: true,
      trim: true,
    },

    catInside: {
      type: Boolean,
      required: false,
      default: true,
    },

    created_at: { type: Date, default: Date.now },
    updated_at: { type: Date, default: Date.now },
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

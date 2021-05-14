const mongoose = require('mongoose');
const { toJSON, paginate } = require('./plugins');

const extraSchema = mongoose.Schema(
  {
    deviceToken: {
      type: String,
      required: true,
      trim: true,
    },

    entryOnly: {
      type: Boolean,
      default: false,
      required: false,
    },
    created_at: { type: Date, default: Date.now },
    updated_at: { type: Date, default: Date.now },
  },
  {
    timestamps: true,
  }
);

// add plugin that converts mongoose to json
extraSchema.plugin(toJSON);
extraSchema.plugin(paginate);

/* rfidSchema.statics.istagIdTaken = async function (tagId, excludeUserId) {
  const user = await this.findOne({ tagId, _id: { $ne: excludeUserId } });
  return !!user;
}; */
/**
 * @typedef Rfid
 */
const Extra = mongoose.model('Extra', extraSchema);

module.exports = Extra;

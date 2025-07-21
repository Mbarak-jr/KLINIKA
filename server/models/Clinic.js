const mongoose = require('mongoose');

const clinicSchema = mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    address: {
      type: String,
      required: true,
    },
    phone: {
      type: String,
      required: true,
    },
    hours: {
      type: Map,
      of: String, // Opening and closing hours for each day
      required: true,
    },
    services: {
      type: [String],
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model('Clinic', clinicSchema);
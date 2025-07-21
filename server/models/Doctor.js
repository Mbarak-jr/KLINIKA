const mongoose = require('mongoose');

const doctorSchema = mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: 'User',
    },
    specialization: {
      type: String,
      required: true,
    },
    qualifications: {
      type: [String],
      required: true,
    },
    experience: {
      type: Number,
      required: true,
      default: 0,
    },
    clinic: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Clinic',
    },
    schedule: {
      type: Map,
      of: [String], // Array of available time slots for each day
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model('Doctor', doctorSchema);
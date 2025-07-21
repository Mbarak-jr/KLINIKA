const asyncHandler = require('express-async-handler');
const Appointment = require('../models/Appointment');
const User = require('../models/User');
const Doctor = require('../models/Doctor');

// @desc    Get appointments based on role
// @route   GET /api/appointments
// @access  Private
const getAppointments = asyncHandler(async (req, res) => {
  let appointments;

  if (req.user.role === 'admin') {
    appointments = await Appointment.find()
      .populate('patient', 'name email')
      .populate('doctor', 'name specialization');
  } else if (req.user.role === 'patient') {
    appointments = await Appointment.find({ patient: req.user.id })
      .populate('doctor', 'name specialization');
  } else if (req.user.role === 'doctor') {
    appointments = await Appointment.find({ doctor: req.user.id })
      .populate('patient', 'name email');
  } else {
    res.status(401);
    throw new Error('Not authorized');
  }

  res.json(appointments);
});

// @desc    Create new appointment
// @route   POST /api/appointments
// @access  Private
const createAppointment = asyncHandler(async (req, res) => {
  const { doctor, date, time, reason } = req.body;

  if (!doctor || !date || !time) {
    res.status(400);
    throw new Error('Please add all fields');
  }

  const doctorExists = await Doctor.findById(doctor);
  if (!doctorExists) {
    res.status(400);
    throw new Error('Doctor not found');
  }

  const appointment = await Appointment.create({
    patient: req.user.id,
    doctor,
    date,
    time,
    reason,
    status: 'scheduled',
  });

  if (appointment) {
    res.status(201).json(appointment);
  } else {
    res.status(400);
    throw new Error('Invalid appointment data');
  }
});

// @desc    Update appointment
// @route   PUT /api/appointments/:id
// @access  Private
const updateAppointment = asyncHandler(async (req, res) => {
  const appointment = await Appointment.findById(req.params.id);

  if (!appointment) {
    res.status(404);
    throw new Error('Appointment not found');
  }

  if (
    appointment.patient.toString() !== req.user.id &&
    appointment.doctor.toString() !== req.user.id &&
    req.user.role !== 'admin'
  ) {
    res.status(401);
    throw new Error('Not authorized');
  }

  const updatedAppointment = await Appointment.findByIdAndUpdate(
    req.params.id,
    req.body,
    { new: true }
  );

  res.json(updatedAppointment);
});

// @desc    Delete appointment
// @route   DELETE /api/appointments/:id
// @access  Private
const deleteAppointment = asyncHandler(async (req, res) => {
  const appointment = await Appointment.findById(req.params.id);

  if (!appointment) {
    res.status(404);
    throw new Error('Appointment not found');
  }

  if (
    appointment.patient.toString() !== req.user.id &&
    req.user.role !== 'admin'
  ) {
    res.status(401);
    throw new Error('Not authorized');
  }

  await appointment.remove();

  res.json({ id: req.params.id });
});

module.exports = {
  getAppointments,
  createAppointment,
  updateAppointment,
  deleteAppointment,
};

const asyncHandler = require('express-async-handler');
const Doctor = require('../models/Doctor');
const User = require('../models/User');

// @desc    Get all doctors
// @route   GET /api/doctors
// @access  Public
const getDoctors = asyncHandler(async (req, res) => {
  const doctors = await Doctor.find().populate('user', 'name email');
  res.json(doctors);
});

// @desc    Get single doctor
// @route   GET /api/doctors/:id
// @access  Public
const getDoctorById = asyncHandler(async (req, res) => {
  const doctor = await Doctor.findById(req.params.id).populate('user', 'name email');

  if (doctor) {
    res.json(doctor);
  } else {
    res.status(404);
    throw new Error('Doctor not found');
  }
});

// @desc    Create a doctor
// @route   POST /api/doctors
// @access  Private/Admin
const createDoctor = asyncHandler(async (req, res) => {
  const { userId, specialization, qualifications, experience, clinic, schedule } = req.body;

  // Check if user exists and is a doctor
  const user = await User.findById(userId);
  if (!user || user.role !== 'doctor') {
    res.status(400);
    throw new Error('User is not registered as a doctor');
  }

  // Check if doctor profile already exists
  const doctorExists = await Doctor.findOne({ user: userId });
  if (doctorExists) {
    res.status(400);
    throw new Error('Doctor profile already exists');
  }

  const doctor = await Doctor.create({
    user: userId,
    specialization,
    qualifications,
    experience,
    clinic,
    schedule,
  });

  if (doctor) {
    res.status(201).json(doctor);
  } else {
    res.status(400);
    throw new Error('Invalid doctor data');
  }
});

// @desc    Update a doctor
// @route   PUT /api/doctors/:id
// @access  Private/Admin or Doctor
const updateDoctor = asyncHandler(async (req, res) => {
  const doctor = await Doctor.findById(req.params.id);

  if (!doctor) {
    res.status(404);
    throw new Error('Doctor not found');
  }

  // Check if user is admin or the doctor themselves
  if (req.user.role !== 'admin' && doctor.user.toString() !== req.user.id) {
    res.status(401);
    throw new Error('Not authorized');
  }

  doctor.specialization = req.body.specialization || doctor.specialization;
  doctor.qualifications = req.body.qualifications || doctor.qualifications;
  doctor.experience = req.body.experience || doctor.experience;
  doctor.clinic = req.body.clinic || doctor.clinic;
  doctor.schedule = req.body.schedule || doctor.schedule;

  const updatedDoctor = await doctor.save();
  res.json(updatedDoctor);
});

// @desc    Delete a doctor
// @route   DELETE /api/doctors/:id
// @access  Private/Admin
const deleteDoctor = asyncHandler(async (req, res) => {
  const doctor = await Doctor.findById(req.params.id);

  if (doctor) {
    await doctor.remove();
    res.json({ message: 'Doctor removed' });
  } else {
    res.status(404);
    throw new Error('Doctor not found');
  }
});

module.exports = {
  getDoctors,
  getDoctorById,
  createDoctor,
  updateDoctor,
  deleteDoctor,
};
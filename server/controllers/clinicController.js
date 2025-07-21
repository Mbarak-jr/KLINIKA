const asyncHandler = require('express-async-handler');
const Clinic = require('../models/Clinic');

// @desc    Get all clinics
// @route   GET /api/clinics
// @access  Public
const getClinics = asyncHandler(async (req, res) => {
  const clinics = await Clinic.find();
  res.json(clinics);
});

// @desc    Get single clinic
// @route   GET /api/clinics/:id
// @access  Public
const getClinicById = asyncHandler(async (req, res) => {
  const clinic = await Clinic.findById(req.params.id);

  if (clinic) {
    res.json(clinic);
  } else {
    res.status(404);
    throw new Error('Clinic not found');
  }
});

// @desc    Create a clinic
// @route   POST /api/clinics
// @access  Private/Admin
const createClinic = asyncHandler(async (req, res) => {
  const { name, address, phone, hours, services } = req.body;

  const clinic = await Clinic.create({
    name,
    address,
    phone,
    hours,
    services,
  });

  if (clinic) {
    res.status(201).json(clinic);
  } else {
    res.status(400);
    throw new Error('Invalid clinic data');
  }
});

// @desc    Update a clinic
// @route   PUT /api/clinics/:id
// @access  Private/Admin
const updateClinic = asyncHandler(async (req, res) => {
  const clinic = await Clinic.findById(req.params.id);

  if (clinic) {
    clinic.name = req.body.name || clinic.name;
    clinic.address = req.body.address || clinic.address;
    clinic.phone = req.body.phone || clinic.phone;
    clinic.hours = req.body.hours || clinic.hours;
    clinic.services = req.body.services || clinic.services;

    const updatedClinic = await clinic.save();
    res.json(updatedClinic);
  } else {
    res.status(404);
    throw new Error('Clinic not found');
  }
});

// @desc    Delete a clinic
// @route   DELETE /api/clinics/:id
// @access  Private/Admin
const deleteClinic = asyncHandler(async (req, res) => {
  const clinic = await Clinic.findById(req.params.id);

  if (clinic) {
    await clinic.remove();
    res.json({ message: 'Clinic removed' });
  } else {
    res.status(404);
    throw new Error('Clinic not found');
  }
});

module.exports = {
  getClinics,
  getClinicById,
  createClinic,
  updateClinic,
  deleteClinic,
};
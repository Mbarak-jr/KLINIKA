const express = require('express');
const router = express.Router();
const {
  getDoctors,
  getDoctorById,
  createDoctor,
  updateDoctor,
  deleteDoctor,
} = require('../controllers/doctorController');
const { protect, admin } = require('../middlewares/authMiddleware');

router.route('/')
  .get(getDoctors)
  .post(protect, admin, createDoctor);

router.route('/:id')
  .get(getDoctorById)
  .put(protect, updateDoctor)
  .delete(protect, admin, deleteDoctor);

module.exports = router;
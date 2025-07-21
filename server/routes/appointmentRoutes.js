const express = require('express');
const router = express.Router();
const {
  getAppointments,
  createAppointment,
  updateAppointment,
  deleteAppointment,
} = require('../controllers/appointmentController');
const { protect } = require('../middlewares/authMiddleware');

router.route('/')
  .get(protect, getAppointments) // ✅ Removed 'admin' middleware here
  .post(protect, createAppointment);

router.route('/:id')
  .put(protect, updateAppointment)
  .delete(protect, deleteAppointment);

module.exports = router;

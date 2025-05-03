const express = require('express');
const router = express.Router();
const { 
  bookAppointment,
  getPatientAppointments
} = require('../controllers/appointmentController');
const { protect } = require('../middleware/authMiddleware');

// All routes are protected
router.use(protect);

router.post('/book', bookAppointment);
router.get('/', getPatientAppointments);

module.exports = router;
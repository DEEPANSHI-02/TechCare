const Appointment = require('../models/Appointment');

// @desc    Book a new appointment
// @route   POST /api/appointments/book
// @access  Private
const bookAppointment = async (req, res) => {
  try {
    const { doctorName, doctorSpecialty, doctorId, appointmentDate, reason, notes } = req.body;
    
    // Create appointment
    const appointment = await Appointment.create({
      patient: req.patient._id,
      doctor: {
        name: doctorName,
        specialty: doctorSpecialty,
        id: doctorId
      },
      appointmentDate: new Date(appointmentDate),
      reason,
      notes
    });

    if (appointment) {
      res.status(201).json({
        success: true,
        appointment
      });
    } else {
      res.status(400).json({ success: false, message: 'Invalid appointment data' });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, message: 'Server error', error: error.message });
  }
};

// @desc    Get patient's appointments
// @route   GET /api/appointments
// @access  Private
const getPatientAppointments = async (req, res) => {
  try {
    const appointments = await Appointment.find({ patient: req.patient._id })
                                         .sort({ appointmentDate: 1 });
    
    res.json({
      success: true,
      count: appointments.length,
      appointments
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, message: 'Server error', error: error.message });
  }
};

module.exports = {
  bookAppointment,
  getPatientAppointments
};
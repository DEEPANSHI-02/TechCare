const mongoose = require('mongoose');

const appointmentSchema = new mongoose.Schema({
    patient: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Patient',
        required: true
    },
    doctor: {
        name: {
            type: String,
            required: true
        },
        specialty: {
            type: String,
            required: true
        },
        id: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Doctor'  // For future integration with Doctor model
        }
    },
    appointmentDate: {
        type: Date,
        required: true
    },
    status: {
        type: String,
        enum: ['scheduled', 'completed', 'cancelled', 'no-show'],
        default: 'scheduled'
    },
    reason: {
        type: String,
        required: true
    },
    notes: {
        type: String
    },
    createdAt: {
        type: Date,
        default: Date.now
    }
});

// Virtual for formatted date
appointmentSchema.virtual('formattedDate').get(function() {
    return this.appointmentDate.toLocaleDateString();
  });
  
  // Virtual for formatted time
  appointmentSchema.virtual('formattedTime').get(function() {
    return this.appointmentDate.toLocaleTimeString();
  });
  
  const Appointment = mongoose.model('Appointment', appointmentSchema);
  
  module.exports = Appointment;
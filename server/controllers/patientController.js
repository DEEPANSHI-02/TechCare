const jwt = require('jsonwebtoken');
const Patient = require('../models/Patient');

// Generate JWT 
const generateToken = (id) => {
    return jwt.sign({ id }, process.env.JWT_SECRET || '', {
        expiresIn: '30d',
    });
};

// @desc    Register a new patient
// @route   POST /api/patient/register
// @access  Public

const registerPatient = async (req, res) => {
    try {
      const { name, email, password, age, gender, phone, address, medicalHistory } = req.body;
  
      // Check if patient already exists
      const patientExists = await Patient.findOne({ email });
  
      if (patientExists) {
        return res.status(400).json({ success: false, message: 'Patient already exists' });
      }
  
      // Create patient
      const patient = await Patient.create({
        name,
        email,
        password,
        age,
        gender,
        phone,
        address,
        medicalHistory
      });
  
      if (patient) {
        res.status(201).json({
          success: true,
          patient: {
            _id: patient._id,
            name: patient.name,
            email: patient.email,
            age: patient.age,
            gender: patient.gender,
            token: generateToken(patient._id)
          }
        });
      } else {
        res.status(400).json({ success: false, message: 'Invalid patient data' });
      }
    } catch (error) {
      console.error(error);
      res.status(500).json({ success: false, message: 'Server error', error: error.message });
    }
  };
  
  // @desc    Login patient / Get token
  // @route   POST /api/patient/login
  // @access  Public
  const loginPatient = async (req, res) => {
    try {
      const { email, password } = req.body;
  
      // Check for patient email
      const patient = await Patient.findOne({ email });
  
      if (!patient) {
        return res.status(401).json({ success: false, message: 'Invalid email or password' });
      }
  
      // Check if password matches
      const isMatch = await patient.matchPassword(password);
  
      if (!isMatch) {
        return res.status(401).json({ success: false, message: 'Invalid email or password' });
      }
  
      res.json({
        success: true,
        patient: {
          _id: patient._id,
          name: patient.name,
          email: patient.email,
          age: patient.age,
          gender: patient.gender,
          token: generateToken(patient._id)
        }
      });
    } catch (error) {
      console.error(error);
      res.status(500).json({ success: false, message: 'Server error', error: error.message });
    }
  };
  
  // @desc    Get patient profile
  // @route   GET /api/patient/profile
  // @access  Private
  const getPatientProfile = async (req, res) => {
    try {
      const patient = await Patient.findById(req.patient._id).select('-password');
      
      if (!patient) {
        return res.status(404).json({ success: false, message: 'Patient not found' });
      }
      
      res.json({
        success: true,
        patient
      });
    } catch (error) {
      console.error(error);
      res.status(500).json({ success: false, message: 'Server error', error: error.message });
    }
  };
  
  module.exports = {
    registerPatient,
    loginPatient,
    getPatientProfile
  };
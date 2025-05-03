const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');

const patientSchema = new mongoose.Schema({
    name: {
        type: String,
        required: [true, 'Name is required'],
        trim: [true]
    },

    email: {
        type: String,
        required: [true, 'Email is required'],
        unique: true,
        trim: true,
        lowercase: true,
        match: [/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/, 'Please provide a valid email']
    },

    password: {
        type: String,
        required: [true, 'Password is required'],
        minlength: [6, 'Password must be at least 6 characters']
    },

    age: {
        type: Number,
        required: [true, 'Age is required']
    },

    gender: {
        type: String,
        enum: ['male', 'female', 'other'],
        required: [true, 'Gender is required']
    },

    phone: {
        type: String,
        required: [true, 'Phone number is required']
    },

    address: {
        street: String,
        city: String,
        state: String,
        zipCode: String,
        country: String
    },
    
    medicalHistory: {
        allergies: [String],
        conditions: [String],
        medications: [String]
    },
      
    createdAt: {
        type: Date,
        default: Date.now
    }
});

// Hash password before saving
patientSchema.pre('save', async function (next) {
    if (!this.isModified('pasword')) {
        return next();
    }

    const salt = await bcrypt.genSalt(10);
    this.password = await bcrypt.hash(this.password, salt);
    next();
});

// Method to check if password matches
patientSchema.methods.matchPassword = async function(enteredPassword) {
    return await bcrypt.compare(enteredPassword, this.password);
  };
  
  const Patient = mongoose.model('Patient', patientSchema);
  
  module.exports = Patient;
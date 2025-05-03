const express = require ('express');
const dotenv = require ('dotenv');
const connectDB = require('./config/db');

dotenv.config();

connectDB();

const app = express();

app.use(express.json()); 

app.use('/api/patient', require('./routes/patientRoutes'));
app.use('/api/appointments', require('./routes/appointmentRoutes'));

app.get('/', (req, res) => {
    res.json({ message: 'Welcome to Hospital Management API' });
});
    
const PORT = process.env.PORT || 8001;

app.listen(PORT, () => {
    console.log(`server running on port ${PORT}`);
});
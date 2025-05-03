const express = require ('express');
const dotenv = require ('dotenv');
const connectDB = require('./config/db');
dotenv.config();

connectDB();

const app = express();

app.use(express.json()); 

app.get('/', (req, res) => {
    res.json({ message: 'hahaa' });
});
    
const PORT = process.env.PORT || 8001;

app.listen(PORT, () => {
    console.log("server running B");
});
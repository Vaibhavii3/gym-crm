import express from 'express';
import dotenv from 'dotenv';
import cors from 'cors';
import bodyParser from 'body-parser';
import connectDB from './config/db.js';
import {cloudinaryConnect} from './config/cloudinary.js'
import fileUpload from 'express-fileupload';


import clientRoutes from './routes/clientRoutes.js'
import adminRoutes from './routes/adminRoutes.js'

dotenv.config();

//database connect
connectDB();

const app = express();

app.use(cors({
    origin: ['https://gym-crm-five.vercel.app' , 'http://localhost:5173'], 
    methods: ['GET', 'POST', 'PUT', 'DELETE', 'PATCH'],
    credentials: true
}));


app.use(express.json());
app.use(bodyParser.json());

app.use(
    fileUpload({
        useTempFiles:true,
        tempFileDir:"/tmp",
    })
)

//cloudinary connection
cloudinaryConnect();

// routes
app.use('/api/v1/clients', clientRoutes);
app.use('/api/v1/admin', adminRoutes);

app.get('/', (req, res) => {
    res.send('Gym CRM API is Running...');
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server started on port ${PORT}`));



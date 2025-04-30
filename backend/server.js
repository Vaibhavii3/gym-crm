import express from 'express';
import dotenv from 'dotenv';
import cors from 'cors';
import connectDB from './config/db.js';
import {cloudinaryConnect} from './config/cloudinary.js'
import fileUpload from 'express-fileupload';


import clientRoutes from './routes/clientRoutes.js'

dotenv.config();

//database connect
connectDB();

//middlewares
const app = express();
app.use(cors());
app.use(express.json());

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

app.get('/', (req, res) => {
    res.send('Gym CRM API is Running...');
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server started on port ${PORT}`));



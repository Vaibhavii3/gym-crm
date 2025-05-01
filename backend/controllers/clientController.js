import mongoose from "mongoose";
import Client from "../models/Client.js";
import { uploadImageToCloudinary } from "../utils/imageUploader.js";
import dayjs from 'dayjs';

// Create Client
export const createClient = async (req, res) => {
    try {

        const {
            name,
            phone,
            email,
            birthday,
            membershipType,
            membershipStartDate,
            personalTrainer,
            totalPaid,
            dueAmount,
            status,
        } = req.body;

        const image = req.files.clientImage;

        // validation
        if( !name || !phone || !email || !birthday ||!membershipStartDate || !membershipType || !totalPaid == null || !dueAmount == null || !status) {
            return res.status(400).json({
                success:false,
                message: 'All fields are required',
            });
        }

        //Check if client with same phone or email already exists
        const existingClient = await Client.findOne({
            $or: [{ phone}, { email }]
        });

        if (existingClient) {
            return res.status(400).json({
                error: 'Client with this phone number or email already exists',
            });
        }

        const startDate = dayjs(membershipStartDate);
        if (!startDate.isValid()) {
            return res.status(400).json({
                success: false,
                message: 'Invalid membership start date.'
            });
        }

        const durationMap = {
            "monthly": 1,
            "3-month": 3,
            "6-month": 6,
        };
        // const endDate = startDate.add(durationMap[membershipType], 'month');

        const duration = durationMap[membershipType.toLowerCase()];
        if (!duration) {
            return res.status(400).json({
                success: false,
                message: 'Invalid membership type. Choose from monthly, 3-month, or 6-month.',
            });
        }
        const endDate = startDate.add(duration, 'month');

        //upload Image to Cloudinary
        const clientImage = await uploadImageToCloudinary(image, process.env.Folder_NAME);

        const newClient = new Client({
            name,
            phone,
            email,
            birthday,
            membershipType,
            membershipStartDate: startDate.toDate(),
            membershipEndDate: endDate.toDate(),
            personalTrainer,
            totalPaid,
            image: clientImage.secure_url,
            dueAmount,
            status: status || 'active',
        });

        await newClient.save();
        res.status(201).json({ message: 'Client created successfully', client: newClient });
    } catch (error) {
        console.error('Error creating client:', error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
};

// Get All Clients
export const getClients = async (req, res) => {
    try {
        const clients = await Client.find();
        res.status(200).json(clients);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// Get Single Client
export const getClientById = async (req, res) => {
    try {
        const { id } = req.params;
        const client = await Client.findById(id);

        if (!client) return res.status(404).json({ message: 'Client not found' });

        res.status(200).json(client);
    } catch (error) {
        console.error('Error fetching client:', error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
};

// Update Client
export const updateClient = async (req, res) => {
    try {
        const client = await Client.findByIdAndUpdate(req.params.id, req.body, { new: true}
        );
        if (!client) return res.status(404).json({ message: 'Client not found' });
        res.status(200).json(client);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

//Delete Client
export const deleteClient = async (req, res) => {
    try {
        const { id } = req.params;

        if (!mongoose.Types.ObjectId.isValid(id)) {
            return res.status(400).json({ error: "Invalid client ID"});
        }

        const client = await Client.findByIdAndDelete(id);
        if (!client) return res.status(404).json({ message: 'Client not found '});

        res.status(200).json({ message: 'Client removed' });
    } catch (error) {
        console.error('Error deleting client:', error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
};

// Get Clients with Upcoming Birthday or Due Membership
// export const getUpComing = async (req, res) => {
//     try {
//         const today = dayjs();
//         const nextWeek = today.add(7, 'day');

//         const upcomingClients = await Client.find({
//             $or: [
//                 { birthday: { $gte: today.toDate(), $lte: nextWeek.toDate() } },
//                 { membershipEndDate: { $gte: today.toDate(), $lte: nextWeek.toDate() }}
//             ]
//         });

//         res.status(200).json(upcomingClients);
//     } catch (error) {
//         res.status(500).json({ message: error.message });
//     }
// };

// Get Clients Upcoming Birthday
export const getUpComingBirthdays = async (req, res) => {
    try {
        const today = dayjs();
        const nextWeek = today.add(7, 'day');

        const clients = await Client.aggregate([
            {
                $addFields: {
                    birthdayMonthDay: {
                        $dateToString: { format: "%m-%d", date: "$birthday" },
                    },
                },
            },
            {
                $match: {
                    status: "active",
                    birthdayMonthDay: {
                        $gte: today.format("MM-DD"),
                        $lte: nextWeek.format("MM-DD"),
                    },
                },
            },
        ]);

        res.status(200).json(clients);
    } catch (error) {
        console.error('Error fetching upcoming birthday:', error);
        res.status(500).json({ message: error.message });
    }
};

// get upcoming membership End Dates (Due Renewals)
export const getUpcomingMembershipDue = async (req, res) => {
    try {
        const today = dayjs().startOf('day');
        const nextWeek = today.add(7, 'day').endOf('day');

        const clients = await Client.find({
            status: 'active',
            membershipEndDate: {
                $gte: today.toDate(),
                $lte: nextWeek.toDate(),
            },
        });

        res.status(200).json(clients);
    } catch (error) {
        console.error('Error fetching upcoming due memberships:', error);
        res.status(500).json({ message: error.message });
    }
};

// Get Clients with Due Payments
export const getClientsWithDuePayments = async (req, res) => {
    try {
        const clients = await Client.find({
            status: 'active',
            dueAmount: { $exists: true, $gt: 0 },
        });

        res.status(200).json(clients);
    } catch (error) {
        console.error('Error fetching clients with due payments:', error);
        res.status(500).json({ message: error.message });
    }
};


//Get Active Clients

export const getActiveClients = async (req, res) => {
    try {
        const activeClients = await Client.find({ status: 'active' });
        res.status(200).json(activeClients);
    } catch (error) {
        console.error('Error fetching active clients:', error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
};
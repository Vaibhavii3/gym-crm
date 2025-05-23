import mongoose from "mongoose";
import Client from "../models/Client.js";
import { uploadImageToCloudinary } from "../utils/imageUploader.js";
import dayjs from 'dayjs';
import { addMonths, isBefore } from "date-fns";

// Create Client
export const createClient = async (req, res) => {
    try {
        const {
            name,
            phone,
            email,
            birthday,
            age,
            weight,
            address,
            aadharNumber,
            medicalProblems,
            membershipType,
            membershipStartDate,
            personalTrainer,
            totalPaid,
            dueAmount,
            status,
        } = req.body;

        // Check if image was uploaded
        if (!req.files || !req.files.clientImage) {
            return res.status(400).json({
                success: false,
                message: 'Client image is required',
            });
        }
        
        const image = req.files.clientImage;

        // Validation
        if (!name || !phone || totalPaid === undefined || dueAmount === undefined) {
            return res.status(400).json({
                success: false,
                message: 'All fields are required',
            });
        }

        // Check if client with same phone already exists
        const existingClient = await Client.findOne({
            $or: [{ phone }]
        });

        if (existingClient) {
            return res.status(400).json({
                success: false,
                message: 'Client with this phone number already exists',
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
            "3-months": 3,
            "6-months": 6,
            "yearly": 12,
            
        };

        const membershipTypeLower = membershipType.toLowerCase();
        const duration = durationMap[membershipTypeLower];
        if (!duration) {
            return res.status(400).json({
                success: false,
                message: 'Invalid membership type. Choose from monthly, 3-months, 6-months, yearly.',
            });
        }
        const endDate = startDate.add(duration, 'month');

        // Upload Image to Cloudinary
        let clientImage;
        try {
            clientImage = await uploadImageToCloudinary(image, process.env.FOLDER_NAME);
        } catch (uploadError) {
            console.error('Error uploading image:', uploadError);
            return res.status(500).json({
                success: false,
                message: 'Error uploading client image'
            });
        }

        const newClient = new Client({
            name,
            phone,
            email: email || null,
            birthday: birthday || null,
            age: age || null,
            weight: weight || null,
            address: address || null,
            aadharNumber: aadharNumber || null,
            medicalProblems: medicalProblems || null,
            membershipType,
            membershipStartDate: startDate.toDate(),
            membershipEndDate: endDate.toDate(),
            personalTrainer: personalTrainer || false,
            totalPaid: Number(totalPaid),
            image: clientImage.secure_url,
            dueAmount: Number(dueAmount),
            status: status || 'active',
        });

        await newClient.save();
        res.status(201).json({ 
            success: true,
            message: 'Client created successfully', 
            client: newClient 
        });
    } catch (error) {
        console.error('Error creating client:', error);
        res.status(500).json({ 
            success: false,
            message: 'Internal Server Error',
            error: error.message 
        });
    }
};

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
        
        if (!mongoose.Types.ObjectId.isValid(id)) {
            return res.status(400).json({ 
                success: false,
                message: 'Invalid client ID'
            });
        }
        
        const client = await Client.findById(id);

        if (!client) {
            return res.status(404).json({ 
                success: false,
                message: 'Client not found' 
            });
        }

        res.status(200).json({
            success: true,
            client
        });
    } catch (error) {
        console.error('Error fetching client:', error);
        res.status(500).json({ 
            success: false,
            message: 'Internal Server Error',
            error: error.message 
        });
    }
};

// Update Client
// export const updateClient = async (req, res) => {
//     try {
//         const { id } = req.params;
        
//         if (!mongoose.Types.ObjectId.isValid(id)) {
//             return res.status(400).json({ 
//                 success: false,
//                 message: 'Invalid client ID'
//             });
//         }
        
//         const clientExists = await Client.findById(id);
//         if (!clientExists) {
//             return res.status(404).json({ 
//                 success: false,
//                 message: 'Client not found' 
//             });
//         }
        
//         // Handle membership date updates
//         if (req.body.membershipType && req.body.membershipStartDate) {
//             const startDate = dayjs(req.body.membershipStartDate);
//             if (!startDate.isValid()) {
//                 return res.status(400).json({
//                     success: false,
//                     message: 'Invalid membership start date.'
//                 });
//             }
            
//             const durationMap = {
//                 "monthly": 1,
//                 "3-months": 3,
//                 "6-months": 6,
//                 "yearly": 12,
                
//             };
            
//             const membershipTypeLower = req.body.membershipType.toLowerCase();
//             const duration = durationMap[membershipTypeLower];
            
//             if (!duration) {
//                 return res.status(400).json({
//                     success: false,
//                     message: 'Invalid membership type. Choose from monthly, 3-months, 6-months, yearly.',
//                 });
//             }
            
//             req.body.membershipEndDate = startDate.add(duration, 'month').toDate();
//         }
        
//         // Handle image update if provided
//         if (req.files && req.files.clientImage) {
//             try {
//                 const image = req.files.clientImage;
//                 const clientImage = await uploadImageToCloudinary(image, process.env.FOLDER_NAME);
//                 req.body.image = clientImage.secure_url;
//             } catch (uploadError) {
//                 console.error('Error uploading image:', uploadError);
//                 return res.status(500).json({
//                     success: false,
//                     message: 'Error uploading client image'
//                 });
//             }
//         }
        
//         const client = await Client.findByIdAndUpdate(
//             id, 
//             req.body, 
//             { new: true, runValidators: true }
//         );
        
//         res.status(200).json({
//             success: true,
//             message: 'Client updated successfully',
//             client
//         });
//     } catch (error) {
//         console.error('Error updating client:', error);
//         res.status(500).json({ 
//             success: false,
//             message: 'Internal Server Error',
//             error: error.message 
//         });
//     }
// };

export const updateClient = async (req, res) => {
    try {
        const { id } = req.params;
        
        if (!mongoose.Types.ObjectId.isValid(id)) {
            return res.status(400).json({
                success: false,
                message: 'Invalid client ID'
            });
        }
        
        const clientExists = await Client.findById(id);
        if (!clientExists) {
            return res.status(404).json({
                success: false,
                message: 'Client not found'
            });
        }
        
        // Create a copy of the request body to avoid modifying the original
        const updateData = { ...req.body };
        
        // Parse and handle null values for date fields
        if (updateData.birthday === "null" || updateData.birthday === "") {
            updateData.birthday = null;
        }
        
        // Handle other date fields similarly if needed
        if (updateData.membershipStartDate === "null" || updateData.membershipStartDate === "") {
            updateData.membershipStartDate = null;
        }
        
        // Handle membership date updates
        if (updateData.membershipType || (updateData.membershipStartDate && updateData.membershipStartDate !== null)) {
            // Use new values or existing values from the client
            const membershipType = updateData.membershipType || clientExists.membershipType;
            const startDateValue = updateData.membershipStartDate || clientExists.membershipStartDate;
            
            const startDate = dayjs(startDateValue);
            if (!startDate.isValid()) {
                return res.status(400).json({
                    success: false,
                    message: 'Invalid membership start date.'
                });
            }
            
            const durationMap = {
                "monthly": 1,
                "3-months": 3,
                "6-months": 6,
                "yearly": 12,
            };
            
            const membershipTypeLower = membershipType.toLowerCase();
            const duration = durationMap[membershipTypeLower];
            
            if (!duration) {
                return res.status(400).json({
                    success: false,
                    message: 'Invalid membership type. Choose from monthly, 3-months, 6-months, yearly.',
                });
            }
            
            // Update the end date based on the current values
            updateData.membershipEndDate = startDate.add(duration, 'month').toDate();
        }
        
        // Handle numeric fields
        if (updateData.totalPaid !== undefined) {
            updateData.totalPaid = updateData.totalPaid === "null" ? null : Number(updateData.totalPaid);
        }
        
        if (updateData.dueAmount !== undefined) {
            updateData.dueAmount = updateData.dueAmount === "null" ? null : Number(updateData.dueAmount);
        }
        
        if (updateData.age !== undefined) {
            updateData.age = updateData.age === "null" ? null : Number(updateData.age);
        }
        
        if (updateData.weight !== undefined) {
            updateData.weight = updateData.weight === "null" ? null : Number(updateData.weight);
        }
        
        // Handle image update if provided
        if (req.files && req.files.clientImage) {
            try {
                const image = req.files.clientImage;
                const clientImage = await uploadImageToCloudinary(image, process.env.FOLDER_NAME);
                updateData.image = clientImage.secure_url;
            } catch (uploadError) {
                console.error('Error uploading image:', uploadError);
                return res.status(500).json({
                    success: false,
                    message: 'Error uploading client image'
                });
            }
        }
        
        const updatedClient = await Client.findByIdAndUpdate(
            id,
            updateData,
            { new: true, runValidators: true }
        );
        
        res.status(200).json({
            success: true,
            message: 'Client updated successfully',
            client: updatedClient
        });
    } catch (error) {
        console.error('Error updating client:', error);
        res.status(500).json({
            success: false,
            message: 'Internal Server Error',
            error: error.message
        });
    }
};

// Delete Client
export const deleteClient = async (req, res) => {
    try {
        const { id } = req.params;

        if (!mongoose.Types.ObjectId.isValid(id)) {
            return res.status(400).json({ 
                success: false,
                message: 'Invalid client ID'
            });
        }

        const client = await Client.findByIdAndDelete(id);
        
        if (!client) {
            return res.status(404).json({ 
                success: false,
                message: 'Client not found'
            });
        }

        res.status(200).json({ 
            success: true,
            message: 'Client removed successfully' 
        });
    } catch (error) {
        console.error('Error deleting client:', error);
        res.status(500).json({ 
            success: false,
            message: 'Internal Server Error',
            error: error.message 
        });
    }
};


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

// export const getClientsWithDuePayments = async (req, res) => {
//     try {
//         const clients = await Client.find({
//             status: 'active',
//             $or: [
//                 { dueAmount: { $exists: true, $gt: 0 } },
//                 { totalPaid: { $exists: true, $gt: 0 } },
//             ]
//         });

//         const today = new Date();

//         const filteredClients = clients.filter(client => {
//             const durationMap = {
//                 "monthly": 1,
//                 "3-months": 3,
//                 "6-months": 6,
//                 "yearly": 12,
//             };
            
//             const duration = durationMap[client.membershipType.toLowerCase()] || 0;
//             const membershipEndDate = addMonths(new Date(client.membershipStartDate), duration);

//             return membershipEndDate < today
            
//         });

//         res.status(200).json(filteredClients);
//     } catch (error) {
//         console.error('Error fetching clients with due payments:', error);
//         res.status(500).json({ message: error.message });
//     }
// };

export const getClientsWithDuePayments = async (req, res) => {
    try {
        // First, get all active clients
        const allActiveClients = await Client.find({
            status: 'active'
        });

        const today = new Date();
        
        // Filter clients based on multiple conditions
        const clientsWithDuePayments = allActiveClients.filter(client => {
            // Case 1: Client hasn't paid anything (totalPaid = 0)
            const hasNoPaidAmount = client.totalPaid === 0;
            
            // Case 2: Client has due amount AND expired membership
            const hasDueAmount = client.dueAmount > 0;
            
            let isExpired = false;
            
            // Check if membership has expired
            if (client.membershipEndDate) {
                // If end date is directly stored
                isExpired = new Date(client.membershipEndDate) < today;
            } else if (client.membershipStartDate) {
                // Calculate end date from start date and duration
                const durationMap = {
                    "monthly": 1,
                    "3-months": 3,
                    "6-months": 6,
                    "yearly": 12,
                };
                
                const membershipTypeLower = client.membershipType.toLowerCase();
                const duration = durationMap[membershipTypeLower] || 0;
                const membershipEndDate = addMonths(new Date(client.membershipStartDate), duration);
                isExpired = membershipEndDate < today;
            }
            
            // Return true if client matches any of our conditions:
            // 1. Has no payment (totalPaid = 0)
            // 2. Has due amount AND expired membership
            return hasNoPaidAmount || (hasDueAmount && isExpired);
        });

        res.status(200).json(clientsWithDuePayments);
    } catch (error) {
        console.error('Error fetching clients with due payments:', error);
        res.status(500).json({ message: error.message });
    }
};

// Get Active Clients
export const getActiveClients = async (req, res) => {
    try {
        // Add pagination
        const page = parseInt(req.query.page) || 1;
        const limit = parseInt(req.query.limit) || 10;
        const skip = (page - 1) * limit;
        
        const activeClients = await Client.find({ status: 'active' })
            .sort({ membershipStartDate: -1 })
            .skip(skip)
            .limit(limit);
            
        const total = await Client.countDocuments({ status: 'active' });
        
        res.status(200).json({
            success: true,
            count: total,
            clients: activeClients,
            pagination: {
                page,
                pages: Math.ceil(total / limit),
                limit
            }
        });
    } catch (error) {
        console.error('Error fetching active clients:', error);
        res.status(500).json({ 
            success: false,
            message: 'Internal Server Error',
            error: error.message 
        });
    }
};

// Get Clients Grouped by Membership Type
export const getClientByMembershipType = async (req, res) => {
    try {
        const groupedClients = await Client.aggregate([
            {
                $match: {
                    status: "active"
                }
            },
            {
                $group: {
                    _id: "$membershipType",
                    clients: { $push: "$$ROOT" },
                    count: { $sum: 1 },
                    totalRevenue: { $sum: "$totalPaid" }
                }
            },
            {
                $project: {
                    membershipType: "$_id",
                    clients: 1,
                    count: 1,
                    totalRevenue: 1,
                    _id: 0
                }
            },
            {
                $sort: {
                    count: -1
                }
            }
        ]);
        
        res.status(200).json({
            success: true,
            data: groupedClients
        });
    } catch (error) {
        console.error("Error fetching clients by membership type:", error);
        res.status(500).json({ 
            success: false,
            message: "Internal Server Error",
            error: error.message
        });
    }
};

// Get New Joinings by Month
export const getMonthlyJoinings = async (req, res) => {
    try {
        const startDate = req.query.startDate ? new Date(req.query.startDate) : new Date(new Date().getFullYear(), 0, 1);
        const endDate = req.query.endDate ? new Date(req.query.endDate) : new Date();
        
        if (isNaN(startDate.getTime()) || isNaN(endDate.getTime())) {
            return res.status(400).json({
                success: false,
                message: "Invalid date format. Please use YYYY-MM-DD format."
            });
        }

        const match = {
            status: "active",
            membershipStartDate: {
                $gte: startDate,
                $lte: endDate
            }
        };

        const joinings = await Client.aggregate([
            { $match: match },
            {
                $group: {
                    _id: {
                        year: { $year: "$membershipStartDate" },
                        month: { $month: "$membershipStartDate" }
                    },
                    newJoinings: { $sum: 1 },
                    revenue: { $sum: "$totalPaid" }
                }
            },
            { $sort: { "_id.year": 1, "_id.month": 1 } },
            {
                $project: {
                    month: {
                        $concat: [
                            { $toString: "$_id.month" },
                            "-",
                            { $toString: "$_id.year" }
                        ]
                    },
                    newJoinings: 1,
                    revenue: 1,
                    _id: 0
                }
            }
        ]);
        
        res.status(200).json({
            success: true,
            timeframe: {
                from: startDate,
                to: endDate
            },
            data: joinings
        });
    } catch (error) {
        console.error("Error fetching monthly joinings:", error);
        res.status(500).json({ 
            success: false,
            message: "Internal Server Error",
            error: error.message
        });
    }
};

// Get Monthly Revenue
export const getMonthlyRevenue = async (req, res) => {
    try {
        const startDate = req.query.startDate ? new Date(req.query.startDate) : new Date(new Date().getFullYear(), 0, 1);
        const endDate = req.query.endDate ? new Date(req.query.endDate) : new Date();
        
        if (isNaN(startDate.getTime()) || isNaN(endDate.getTime())) {
            return res.status(400).json({
                success: false,
                message: "Invalid date format. Please use YYYY-MM-DD format."
            });
        }
        
        const match = {
            status: "active",
            membershipStartDate: {
                $gte: startDate,
                $lte: endDate
            }
        };
        
        const revenue = await Client.aggregate([
            { $match: match },
            {
                $group: {
                    _id: {
                        year: { $year: "$membershipStartDate" },
                        month: { $month: "$membershipStartDate" }
                    },
                    totalRevenue: { $sum: "$totalPaid" },
                    totalDue: { $sum: "$dueAmount" },
                    clients: { $sum: 1 }
                }
            },
            {
                $sort: {
                    "_id.year": 1,
                    "_id.month": 1
                }
            },
            {
                $project: {
                    month: {
                        $concat: [
                            { $toString: "$_id.month" },
                            "-",
                            { $toString: "$_id.year" }
                        ]
                    },
                    totalRevenue: 1,
                    totalDue: 1,
                    clients: 1,
                    _id: 0
                }
            }
        ]);
        
        // Calculate totals
        const totals = {
            totalRevenue: revenue.reduce((sum, item) => sum + item.totalRevenue, 0),
            totalDue: revenue.reduce((sum, item) => sum + item.totalDue, 0),
            totalClients: revenue.reduce((sum, item) => sum + item.clients, 0)
        };
        
        res.status(200).json({
            success: true,
            timeframe: {
                from: startDate,
                to: endDate
            },
            totals,
            data: revenue
        });
    } catch (error) {
        console.error("Error calculating monthly revenue:", error);
        res.status(500).json({ 
            success: false,
            message: "Internal Server Error",
            error: error.message
        });
    }
};

export const markClientAsPaid = async (req, res) => {
  try {
    const clientId = req.params.id;
    const client = await Client.findById(clientId);

    if (!client) {
      return res.status(404).json({ message: 'Client not found' });
    }

    const paidAmount = client.dueAmount;
    client.totalPaid += paidAmount;
    client.dueAmount = 0;
    await client.save();

    res.status(200).json({ message: 'Payment marked as paid successfully' });
  } catch (error) {
    console.error('Error updating client payment status:', error);
    res.status(500).json({ message: error.message });
  }
};

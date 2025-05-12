import mongoose from 'mongoose';

const clientSchema = new mongoose.Schema({
    name: { 
        type: String, 
        required: true },

    phone: { 
        type: String, 
        required: true },

    email: { 
        type: String },

    birthday: { type: Date },
    age: { type: Number, default: null },
    weight: { type: Number, default: null },
    address: { type: String, default: null },
    aadharNumber: { type: String, default: null },
    medicalProblems: { type: String, default: null },

    membershipType: { type: String,  enum: ['Monthly', '3-months', '6-months', 'Yearly'], default: 'Monthly' },

    membershipStartDate: { type: Date },

    membershipEndDate: { type: Date },

    personalTrainer: { type: Boolean },

    totalPaid: { type: Number, default: 0 },

    dueAmount: { type: Number, default: 0 },

    image: { type: String },

    status: { 
        type: String, 
        enum: ['active', 'inactive'], 
        default: 'active'},
        
}, { timestamps: true });

const Client = mongoose.model('Client', clientSchema);
export default Client;

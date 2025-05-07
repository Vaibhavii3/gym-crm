import mongoose from 'mongoose';

const clientSchema = new mongoose.Schema({
    name: { 
        type: String, 
        required: true },

    phone: { 
        type: String, 
        required: true },

    email: { 
        type: String, 
        required: true },

    birthday: { type: Date },
    age: { type: Number },
    weight: { type: Number },
    address: { type: String },
    aadharNumber: { type: String },
    medicalProblems: { type: String },

    membershipType: { type: String,  enum: ['Monthly', '3-months', '6-months'], default: 'Monthly' },

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

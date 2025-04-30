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

    membershipType: { type: String },

    membershipStartDate: { type: Date },

    membershipEndDate: { type: Date },

    personalTrainer: { type: Boolean },

    totalPaid: { type: Number },

    dueAmount: { type: Number },

    image: { type: String },

    status: { 
        type: String, 
        enum: ['active', 'inactive'], 
        default: 'active'},
        
}, { timestamps: true });

const Client = mongoose.model('Client', clientSchema);
export default Client;

const mongoose = require('mongoose');
const adminSchema = new mongoose.Schema({

    email: {
        type: String,
        password: String
    }
});

module.exports = mongoose.model('Admin', adminSchema);
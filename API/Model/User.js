const mongoose = require('mongoose');

const UserSchema = mongoose.Schema({
   name: { type: String },
   email: { type: String },
   password: { type: String },
   phoneNumber: { type: String},
   userRole: {
    type: String,
    enum: ['END_USER', 'SYSTEM_ADMIN', 'TICKET_ADMIN'],
    default: 'END_USER'
},
});

module.exports = model = mongoose.model('LMS_User', UserSchema);
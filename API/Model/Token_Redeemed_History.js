const mongoose = require('mongoose');

const Token_Redeem_Schema = mongoose.Schema({
   Transaction_ID: { type: String },
   userPhoneNumber: { type: String },
   timeStamp: { type: String},
   tokensReddemed: { type: String},
   place: { type: String }
}, {
    timestamps: true
});

module.exports = model = mongoose.model('LMS_Token_Redeem', Token_Redeem_Schema);
const mongoose = require('mongoose');

const Ticket_Booking_Schema = mongoose.Schema({
   Ticket_ID: { type: String },
   userPhoneNumber: { type: String },
   booked_by_ticket_admin: { type: String },
   timeStamp: { type: String},
   billAmount: { type: String},
   amountPaid: { type: String},
   tokensUsed: {type: String},
   tokensAdded: { type: String},
   placeVisited: { type: String },
   number_of_tickets: { type: String}
}, {
    timestamps: true
});

module.exports = model = mongoose.model('LMS_Ticket_Booking', Ticket_Booking_Schema);
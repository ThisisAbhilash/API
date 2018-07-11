//Model import
const Ticket_Booking = require('../Model/Ticket_Booking_History');


exports.getAllTicketBookedHistory = (req, res) => {
    console.log('Rest Request to fetch all ticket booked details');
    Ticket_Booking.find({}, (err, allBookedTickets) => {
        if (err) return res.status(500).send('Error on the server.');
        if (!allBookedTickets) return res.status(404).send('No user found.');

        return res.status(200).send(allBookedTickets);
    });
}

exports.addToTicketBookedHistory = (req, res) => {
    if (!req.body) {
        return res.status(400).send({
            message: "Ticket History (Request Body) content cannot be empty"
        });
    }
    console.log('Rest Request to add a Ticket booking History with details ', req.body);
    const newHistory = new Ticket_Booking({
        Ticket_ID: uuidv1(),
        userPhoneNumber: req.body.userPhoneNumber,
        booked_by_ticket_admin: decoded.id,
        timeStamp: Date.now(),
        billAmount: req.body.billAmount,
        amountPaid: req.body.amountPaid,
        tokensUsed: req.body.tokensUsed,
        tokensAdded: req.body.tokensAdded,
        placeVisited: req.body.placeVisited,
        number_of_tickets: req.body.number_of_tickets,
    });
    newHistory.save()
        .then(data => {
            return res.status(200).send(data);
        }).catch(err => {
            return res.status(500).send({
                message: err.message || "Some error occurred while adding to Ticket Booked History."
            });
        });
}

exports.getTicketHistoryByNumber = (req, res) => {
    console.log('Request to fetch all ticket history details');
    Ticket_Booking.find({ userPhoneNumber: req.params.phoneNumber }, (err, allTicketHistory) => {
        if (err) return res.status(500).send('Error on the server.');
        if (!allTicketHistory) return res.status(404).send('No user found.');
        return res.status(200).send(allTicketHistory);
    });
}

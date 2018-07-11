module.exports =  (app) => {

    const UserController = require('../Controller/UserController');
    const TicketBookingController = require('../Controller/TicketBookingController');
    const TokenRedeemController = require('../Controller/TokenReedemController');
    const BlockController = require('../Controller/Block');
    const PlaceController = require('../Controller/PlaceController');
    
    //-----------------------------User Controller--------------------------------------
    //validate login
    app.post('/login', UserController.loginUser);

    // Register a new User
    app.post('/registerUser', UserController.registerUser);

    // Retrieve all Users
    app.get('/allUsers', UserController.allUsers);

    //find a user by mobile number
    app.get('/userDetailsByMobile/:phoneNumber', UserController.userDetailsByMobile);

    //find a user by Email
    app.get('/userDetailsByEmail/:email', UserController.userDetailsByEmail);

    //-------------------------------Ticket Booking Controller----------------------------
    //get all Ticket Booked History
    app.get('/allTicketBookedHistory', TicketBookingController.getAllTicketBookedHistory);

    //add to ticket booked history
    app.post('/addTicketHistory', TicketBookingController.addToTicketBookedHistory);

    //get ticket history by user mobile number
    app.get('/getTicketHistory/:phoneNumber', TicketBookingController.getTicketHistoryByNumber);

    //-------------------------------Token Redeem Controller----------------------------
    //get all Toen Redeem History
    app.get('/allTokenRedeemHistory', TokenRedeemController.getAllTokenRedeemHistory);

    //add to token redeem history
    app.post('/addTokenRedeem', TokenRedeemController.addToTokenRedeemHistory);

    //get token redeem by user mobile number
    app.get('/getReddemHistory/:phoneNumber', TokenRedeemController.getTokenRedeemByNumber);

    //-------------------------------Block Chain Controller----------------------------
    //to get token balance from Blockchain
    app.get('/getTokenBalance/:phoneNumber', BlockController.getTokenBalance);

    //to add token to a user
    app.post('/incrementTokenforUser', BlockController.incrementToken);

    //to deduct token from user
    app.post('/deductTokenforUser', BlockController.decrementToken);

    //---------------------------Place Controller------------------------------------
    
}
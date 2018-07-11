//Model import
const Token_Reedem = require('../Model/Token_Redeemed_History');

exports.addToTokenRedeemHistory = (req, res) => {
    if (!req.body) {
        return res.status(400).send({
            message: "Ticket History (Request Body) content cannot be empty"
        });
    }
    console.log('Rest Request to add a Token Redeem History with details - ', req.body);
    const newHistory = new Token_Reedem({
        Transaction_ID: uuidv1(),
        userPhoneNumber: req.body.userPhoneNumber,
        timeStamp: Date.now(),
        tokensReddemed: req.body.tokensReddemed,
        place: req.body.place
    });
    newHistory.save()
        .then(data => {
            return res.status(200).send(data);
        }).catch(err => {
            return res.status(500).send({
                message: err.message || "Some error occurred while adding to Token Redeemed History."
            });
        });
}

exports.getAllTokenRedeemHistory = (req, res) => {
    console.log('Request to fetch all token redeemed history details');
    Token_Reedem.find({}, (err, allRedeemedToken) => {
        if (err) return res.status(500).send('Error on the server.');
        if (!allRedeemedToken) return res.status(404).send('No user found.');
        return res.status(200).send(allRedeemedToken);
    });
}

exports.getTokenRedeemByNumber = (req, res) => {
    console.log('Request to fetch all token redeemed history details');
    Token_Reedem.find({ phoneNumber: req.params.phoneNumber }, (err, allRedeemedToken) => {
        if (err) return res.status(500).send('Error on the server.');
        if (!allRedeemedToken) return res.status(404).send('No user found.');
        return res.status(200).send(allRedeemedToken);
    });
}
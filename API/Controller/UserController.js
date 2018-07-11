// Model import
const User = require('../Model/User');

const helper = require('../Utils/helper');
const allConfig = require('../Config/allConfig');
const uuidv1 = require('uuid/v1');
const jwt = require('jsonwebtoken');


exports.loginUser = (req, res) => {

    console.log("Rest Request to Login User with Phone Number - ", req.body.phoneNumber,
        " and password - ", req.body.password);

    if (!req.body) {
        return res.status(400).send({
            message: "Request Body content cannot be empty while logging in."
        });
    }

    User.findOne({ phoneNumber: req.body.phoneNumber }, function (err, user) {
        console.log("Found user ", user);
        if (err) return res.status(500).send('Error on the server.');
        if (!user) return res.status(404).send('No user found.');

        var passwordIsValid = (helper.decodePassword(user.password) == req.body.password);
        console.log(passwordIsValid);
        if (!passwordIsValid) return res.status(401).send({ auth: false, token: null });

        var jwtToken = jwt.sign({ id: user._id, userRole: user.userRole }, allConfig.secretKeyJWT, {
            expiresIn: 86400 // expires in 24 hours
        });
        return res.status(200).send({ auth: true, token: jwtToken });
    });

};

exports.registerUser = (req, res) => {
    console.log("Rest Request to Register a User with these details - ", req.body);

    if (!req.body) {
        return res.status(400).send({
            message: "User (Request Body) content cannot be empty"
        });
    }

    const user = new User({
        name: req.body.name,
        email: req.body.email,
        password: helper.codePassword(req.body.password),
        phoneNumber: req.body.phoneNumber,
        userRole: req.body.userRole
    });

    user.save()
        .then(data => {
            // create a token
            var jwtToken = jwt.sign({ id: data._id }, allConfig.secretKeyJWT, {
                expiresIn: 86400 // expires in 24 hours
            });
            return res.status(200).send({ auth: true, token: jwtToken });
        }).catch(err => {
            return res.status(500).send({
                message: err.message || "Some error occurred while creating the User."
            });
        });
};

exports.allUsers = (req, res) => {
    console.log('Rest request to fetch all users details');

    User.find({}, (err, allUser) => {
        if (err) return res.status(500).send('Error on the server.');
        if (!allUser) return res.status(404).send('No user found.');
        return res.status(200).send(allUser);
    });
};

exports.userDetailsByMobile = (req, res) => {
    console.log('Rest request to fetch users details with Mobile Number ', req.params.phoneNumber);

    User.findOne({ phoneNumber: req.params.phoneNumber }, (err, allUser) => {
        if (err) return res.status(500).send('Error on the server.');
        if (!allUser) return res.status(404).send('No user found with this mobile number.');
        return res.status(200).send(allUser);
    });
};

exports.userDetailsByEmail = (req, res) => {
    console.log('Rest request to fetch users details with Email ', req.params.email);

    User.findOne({ email: req.params.email }, (err, allUser) => {
        if (err) return res.status(500).send('Error on the server.');
        if (!allUser) return res.status(404).send('No user found with this email.');

        return res.status(200).send(allUser);
    });

};
const allConfig = require('../Config/allConfig');
const jwt = require('jsonwebtoken');

// config for personal calls to ethereum
const per = require('web3-eth-personal');
const PersonalCalls = new per(allConfig.gethURL);

//config to geth 
const Web3 = require('web3');
const web3 = new Web3(new Web3.providers.HttpProvider(allConfig.gethURL));

//Instaniating the Contract
const MyContract = web3.eth.contract(allConfig.contractABI);
const ContractInstance = MyContract.at(allConfig.contractAddress);


//checking connection to ethereum
if (!web3.isConnected()) {
    console.log("Couldn't connect to Ethereum");
} else {
    console.log("Connected to Ethereum");
}

exports.getTokenBalance = (req, res) => {
    console.log('Rest Request to fetch balance of user with Mobile Number ', req.params.phoneNumber);
    if (!req.params.phoneNumber || req.params.phoneNumber.length == 0) {
        return res.status(403).send({ message: 'bad request to fetch balance' });
    }
    PersonalCalls.unlockAccount(allConfig.ethAdminAccount, allConfig.ethAdminPassword, 1000, (err, success) => {
        if (err) {
            return res.status(500).send({ message: 'Cannot unlock Account' });
        }
        web3.eth.defaultAccount = allConfig.ethAdminAccount;
        ContractInstance.getBalance.call(req.params.phoneNumber, (error, balance) => {
            if (error) console.log(error);
            console.log("Balance ", balance);
            return res.status(200).send({ userAccountBalance: balance.c[0] });
        })
    });
}

exports.incrementToken = (req, res) => {
    if (!req.body) {
        return res.status(400).send({
            message: "Body content cannot be empty"
        });
    }
    console.log("Rest Request to Increment Token with details -> ", req.body);
    let { mobileNumber, place, tokens, timeStamp } = req.body;
    if (!mobileNumber || !place || !timeStamp || !tokens) {
        return res.status(500).send({ message: 'bad request' });
    }
    PersonalCalls.unlockAccount(allConfig.ethAdminAccount, allConfig.ethAdminPassword, 1000, (err, success) => {
        if (err) return res.status(500).send({ message: 'Cannot unlock Account' });
        web3.eth.defaultAccount = allConfig.ethAdminAccount;
        ContractInstance._token_add.sendTransaction(mobileNumber, place, tokens, timeStamp, { from: allConfig.ethAdminAccount },
            (err, txHash) => {
                if (err) return res.status(500).send({ message: "Error in transaction" });
                return res.status(200).send({ status: 'success', TxnHash: txHash });
            })
    });
}

exports.decrementToken = (req, res) => {

    if (!req.body) {
        return res.status(400).send({
            message: "Body content cannot be empty"
        });
    }
    console.log("Rest Request to Decrement Token with details -> ", req.body);
    let { mobileNumber, place, tokens, timeStamp } = req.body;
    if (!mobileNumber || !place || !timeStamp || !tokens) {
        return res.status(500).send({ message: 'bad request' });
    }
    PersonalCalls.unlockAccount(allConfig.ethAdminAccount, allConfig.ethAdminPassword, 1000, (err, success) => {
        if (err) return res.status(500).send({ message: 'Cannot unlock Account' });
        web3.eth.defaultAccount = allConfig.ethAdminAccount;
        ContractInstance._token_deduct.sendTransaction(mobileNumber, place, tokens, timeStamp, { from: allConfig.ethAdminAccount } ,
            (err, txHash) => {
                if (err) return res.status(500).send({ message: "Error in transaction" });
                return res.status(200).send({ status: 'success', TxnHash: txHash });
            })
    });

}

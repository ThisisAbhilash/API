
exports.mongoURL = 'mongodb://127.0.0.1:27017/LMS_Application_DataBase';

exports.gethURL = "http://localhost:8545";

exports.secretKeyJWT = "secretKeyJWT";

exports.secretKeyAES = "secretKeyAES";

exports.ethAdminAccount = "0xc109cda59be53b1c4d47f244f6f4248c33bbb3c9";

exports.ethAdminPassword = "pwc@1234";

exports.contractAddress = "0x7b0d9890ce32805c5cd52141622e31d2a76c8706";

exports.contractABI = [{"constant":true,"inputs":[{"name":"mobileNumber","type":"string"}],"name":"getBalance","outputs":[{"name":"availableBalance","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":false,"inputs":[{"name":"mobileNumber","type":"string"},{"name":"place","type":"string"},{"name":"tokens","type":"uint256"},{"name":"timeStamp","type":"string"}],"name":"_token_add","outputs":[],"payable":true,"stateMutability":"payable","type":"function"},{"constant":true,"inputs":[{"name":"source","type":"string"}],"name":"stringToBytes32","outputs":[{"name":"result","type":"bytes32"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":false,"inputs":[{"name":"mobileNumber","type":"string"},{"name":"place","type":"string"},{"name":"tokens","type":"uint256"},{"name":"timeStamp","type":"string"}],"name":"_token_deduct","outputs":[],"payable":true,"stateMutability":"payable","type":"function"},{"inputs":[],"payable":false,"stateMutability":"nonpayable","type":"constructor"},{"anonymous":false,"inputs":[{"indexed":false,"name":"mobileNumber","type":"string"},{"indexed":false,"name":"place","type":"string"},{"indexed":false,"name":"tokens","type":"uint256"},{"indexed":false,"name":"timeStamp","type":"string"}],"name":"Token_Added","type":"event"},{"anonymous":false,"inputs":[{"indexed":false,"name":"mobileNumber","type":"string"},{"indexed":false,"name":"place","type":"string"},{"indexed":false,"name":"tokens","type":"uint256"},{"indexed":false,"name":"timeStamp","type":"string"}],"name":"Token_Deducted","type":"event"}];

exports.isAuthEnabled = true;

exports.authDisabledRoute = ['/login', '/registerUser'];
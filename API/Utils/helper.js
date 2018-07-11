const CryptoJS = require('crypto-js');
const allConfig = require('../Config/allConfig');

exports.codePassword = inputPassword =>  {
  return CryptoJS.AES.encrypt(inputPassword, allConfig.secretKeyAES);
}

exports.decodePassword = storedPassword => {
    return CryptoJS.AES.decrypt(storedPassword, allConfig.secretKeyAES).toString(CryptoJS.enc.Utf8);
}

exports.notAuthDisabledRoute = (authDisabledRoutes, givenRoute) => {
  return authDisabledRoutes.indexOf(givenRoute) === -1;
}
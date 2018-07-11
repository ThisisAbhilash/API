pragma solidity ^0.4.0;
contract LMS_App {

    mapping (bytes32 => uint) private balanceOf;
    address private admin;

    event Token_Added(string mobileNumber, string place, uint tokens, string timeStamp);
    event Token_Deducted(string mobileNumber, string place, uint tokens, string timeStamp);

    function LMS_App() {
        admin = msg.sender;
    }
    
    function _token_add(string mobileNumber, string place, uint tokens, string timeStamp) payable  {
        require(msg.sender == admin);
        bytes32 mobBytes = stringToBytes32(mobileNumber);
        require((balanceOf[mobBytes] + tokens) >= balanceOf[mobBytes]);

        emit Token_Added(mobileNumber, place, tokens, timeStamp);
        balanceOf[mobBytes] += tokens;
    }

    function _token_deduct(string mobileNumber, string place, uint tokens, string timeStamp) payable  {
        require(msg.sender == admin);
        bytes32 mobBytes = stringToBytes32(mobileNumber);
        require((balanceOf[mobBytes] - tokens) <= balanceOf[mobBytes]);

        emit Token_Deducted(mobileNumber, place, tokens, timeStamp);
        balanceOf[mobBytes] -= tokens;
    }
    
    function getBalance(string mobileNumber) constant returns (uint availableBalance) {
        bytes32 mobBytes = stringToBytes32(mobileNumber);
        availableBalance = balanceOf[mobBytes];
        return availableBalance;
    }
    
    function stringToBytes32(string memory source) constant returns (bytes32 result) {
        bytes memory tempEmptyStringTest = bytes(source);
        if (tempEmptyStringTest.length == 0) {
            return 0x0;
        }
        assembly {
            result := mload(add(source, 32))
        }
   }
}


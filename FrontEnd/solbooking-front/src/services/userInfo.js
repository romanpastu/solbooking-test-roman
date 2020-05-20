const Cookies = require('js-cookie');
const jwtDecode = require('jwt-decode');

const getUserName = () =>{
    
    var decoded = [];
    decoded.userId = [];
    var accesstoken = Cookies.get('accesstoken');
    if(accesstoken){
     var decoded  = jwtDecode(accesstoken)
    }
    return decoded.userName;
    
}

const getUserId = () =>{
    
    var decoded = [];
    decoded.userId = [];
    var accesstoken = Cookies.get('accesstoken');
    if(accesstoken){
     var decoded  = jwtDecode(accesstoken)
    }
    return decoded.userId;
    
}


module.exports = {
    getUserName, getUserId
}
const {sign} = require("jsonwebtoken")

const createAccessToken = (userId) =>{
    return sign({userId}, process.env.ACCESS_TOKEN_SECRET, {
        expiresIn: '1m'
    })
}

const createRefreshToken = (userId) =>{
    return sign({userId}, process.env.REFRESH_TOKEN_SECRET, {
        expiresIn: '7d'
    })
}

const sendAccessToken = (res, accesstoken) => {
    res.send({
        accesstoken
    })
}

module.exports = {
    createAccessToken , createRefreshToken, sendAccessToken
}
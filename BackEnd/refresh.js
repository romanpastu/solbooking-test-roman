const { verify } = require('jsonwebtoken');
const {db} = require('./database.js')
const { createAccessToken, createRefreshToken } = require('./token.js')


const refresh = async (req) => {
    const authorization = req.headers['authorization'];
    if (!authorization) throw new Error("You need to login");
    accesstoken = authorization.split(' ')[1];

    var userId = verify(accesstoken, process.env.ACCESS_TOKEN_SECRET, { ignoreExpiration: true })
    userId = userId.userId
    
    var token = ""
        return db.query("SELECT * FROM users WHERE id='" + userId + "'").then(function (data) {
            var user = data;
            token = user[0].refresh_token;
            var id = user[0].id;
            if (!token) return { accesstoken: '' };
            let payload = null;

            try {
                payload = verify(token, process.env.REFRESH_TOKEN_SECRET);
            } catch (err) {
                return { accesstoken: '' };
            }

            user = "";
            return db.query("SELECT * FROM users WHERE id='" + id + "'").then(function (data) {
                user = data;
                if (!user) return { accesstoken: '' };
                //if user exists check if refreshtoken exist on user
                if (user[0].refresh_token !== token) {
                    return { accesstoken: '' }
                }
                //if token exist create a new Refresh and Accestoken
                const accesstoken = createAccessToken(user[0].id);
                const refreshtoken = createRefreshToken(user[0].id);

                return db.query("UPDATE users SET refresh_token = '" + refreshtoken + "' WHERE id = '" + user[0].id + "';").then(function (data) {
                    // sendRefreshToken(res, refreshtoken); //unnecesary
                    return { accesstoken };
                }).catch(function (error) {
                    console.log("ERROR: ", error)
                })
            })
}).catch(err =>{
    console.log(err)
    res.send(err)
})
}
module.exports =  {
 refresh
}
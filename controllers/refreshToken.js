const usersDB =  {
    users: require("../models/users.json"),
    setUsers: function (data) {this.users = data}
};


const jwt = require("jsonwebtoken");
require('dotenv').config();
const fsPromises = require('fs').promises;
const path = require('path');

const  handleRefreshToken = async (req, res) => {
    const cookie = req.cookie;
    console.log(cookie.jwt)
    if (cookie?.jwt) {
        return res.sendStatus(401)
    }
   const refreshToken = cookie.jwt
   const user = usersDB.users.find((user) => user.refreshToken === refreshToken)

    if (!user) {
       return res.sendStatus(403)
    }

    jwt.verify(
        refreshToken,
        process.env.REFRESH_TOKEN_SECRET,
        (err, decoded) => {
            if (err || user.username !== decoded.username) return res.sendStatus(403)
            const accessToken = jwt.sign(
                {"username": decoded.username},
                process.env.ACCESS_TOKEN_SECRET,
                { expiresIn: "30s"}
                )
                res.json({accessToken})
        }
        
        )
   

    
}

module.exports = handleRefreshToken;
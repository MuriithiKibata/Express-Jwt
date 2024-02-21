const usersDB =  {
    users: require("../models/users.json"),
    setUsers: function (data) {this.users = data}
};

const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
require('dotenv').config();
const fsPromises = require('fs').promises;
const path = require('path');

const  handleAuth = async (req, res) => {
    const {username, password} = req.body;

    if (!username || !password) {
        return res.status(401).json({"message": "Username and password must be provided"})
    }

    user = usersDB.users.find((user) => user.username === username)

    if (!user) {
       return res.status(404).json({"message": "User not found"})
    }

    const match = await bcrypt.compare(password, user.password)

    if (user && match) {
        // create jwt
        jwt.sign({
            "username": username}, 
            process.env.ACCESS_TOKEN_SECRET,
            {expiresIn: '30s'}
            )
            
      return  res.status(200).json({"message": "Login successful"})
    }
}

module.exports = handleAuth;
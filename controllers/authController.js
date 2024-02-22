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

   const user = usersDB.users.find((user) => user.username === username)

    if (!user) {
       return res.status(404).json({"message": "User not found"})
    }

    const match = await bcrypt.compare(password, user.password)

    if (user && match) {
        // create jwt
      const accessToken = jwt.sign({
            "username": username}, 
            process.env.ACCESS_TOKEN_SECRET,
            {expiresIn: '30s'}
            )

        const refreshToken = jwt.sign({
            "username": username}, 
            process.env.REFRESH_TOKEN_SECRET,
            {expiresIn: '1d'}
            )
            
            // Saving refresh token

        const otherUsers = usersDB.users.filter((person) => person.username !== user.username)
        const currentUser = {...user, refreshToken}
        usersDB.setUsers([...otherUsers, currentUser])
        await fsPromises.writeFile(
            path.join(__dirname, '..', 'models', 'users.json'),
            JSON.stringify(usersDB.users)
        )
        res.cookie('jwt', refreshToken, {httpOnly: true, maxAge: 24 * 60 * 60 * 1000})
        res.json({accessToken})
      return  res.status(200).json({"message": "Login successful"})
    }
}

module.exports = handleAuth;
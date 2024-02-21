
const usersDB =  {
    users: require("../models/users.json"),
    setUsers: function (data) {this.users = data}
}


const fsPromises = require("fs").promises

const path = require("path")

const bcrypt = require("bcrypt")




const handleNewUser = async (req, res) => {
    const {username, password} = req.body;

    if(!username || !password) {
        return res.status(400).json({message: "Username and password required"}) //400 bad request
    }

    const dup = usersDB.users.find((person) => person.username === username) // 409 conflict
    if (dup) {
        return res.status(409).json({message: "Username already exists"});
        
    }

    try {
        const hashedPassword = await bcrypt.hash(password, 10)

        const newUser = {username: username, password: hashedPassword}

        usersDB.setUsers([...usersDB.users, newUser])

        await fsPromises.writeFile(
            path.join(__dirname, '..', 'models', 'users.json'), 
            JSON.stringify(usersDB.users))

        console.log(usersDB.users)
        
        res.status(201).json({"message": `${newUser.username} created` })
    }
    catch (err) {
        res.status(500).json({message: err.message})
    }
}

module.exports = handleNewUser
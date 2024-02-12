const usersDB =  {
    users: require("../models/users.json"),
    setUsers: function (data) {this.users = data}
};

const bcrypt = require("bcrypt");


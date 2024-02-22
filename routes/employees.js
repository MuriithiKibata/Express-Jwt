const express = require('express');
const router = express.Router();
const {getEmployees, addEmployee, getEmployeesWithId, deleteEmployee, updateEmployee} = require('../controllers/employeesController');
const verifyJWT = require("../middleware/verifyJWT");


router.route('/')
    .get(verifyJWT, getEmployees)
    .post(addEmployee)

router.route('/:id')
    .get(getEmployeesWithId)
    .patch(updateEmployee)
    .delete(deleteEmployee)



module.exports = router
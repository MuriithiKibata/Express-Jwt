const express = require('express');
const router = express.Router();
const {getEmployees, addEmployee, getEmployeesWithId, deleteEmployee, updateEmployee} = require('../controllers/employeesController');



router.get('/', getEmployees)
router.post('/', addEmployee)
router.get('/:id', getEmployeesWithId)
router.patch('/:id', updateEmployee)
router.delete('/:id', deleteEmployee)
module.exports = router
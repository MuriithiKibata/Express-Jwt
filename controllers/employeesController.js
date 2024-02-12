const data = {};

data.employees = require('../people')


const getEmployees = (req, res) => {
    res.status(200).json(data)
}

const getEmployeesWithId = (req, res) => {
    const employee = data.employees.find(employee => employee.id === Number(req.params.id));
    res.status(200).json(employee)
}


const addEmployee = (req, res) => {
    const employee = req.body
    const newList = [...data.employees, employee]
    res.status(200).json(newList)
}


const updateEmployee = (req, res) => {
    const patchedEmployee = data.employees.find(employee => employee.id === Number(req.params.id))
    if (!patchedEmployee) {
        res.status(404).json({message: "Employee not found"})
    }
    
    patchedEmployee.name = req.body.name
    res.status(200).json(patchedEmployee)
   
}


const deleteEmployee = (req, res) => {
    const employees = data.employees.filter(employee => employee.id !== Number(req.params.id))
    res.status(200).json(employees)
}

module.exports = {getEmployees, getEmployeesWithId, addEmployee, deleteEmployee, updateEmployee}
const express = require('express')
const app = express()
const bodyParser = require('body-parser')

const employeesAPI = require('./routes/employees');

const registerEmployee = require('./routes/register');
 
app.use(bodyParser.json())

app.use('/api/employees', employeesAPI)

app.use('/register', registerEmployee)



app.listen(3000, () => {
    console.log('listening on port 3000');
})
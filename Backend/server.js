const express = require('express')
const mongoose = require('mongoose')
const cors = require('cors')
require('dotenv').config()

const employeeRoutes = require('./routes/employees')
const employeeFamilyRoutes = require('./routes/employeeFamilies')

const app = express()
const port = process.env.PORT || 7070;

app.use(cors())
app.use(express.json())

mongoose.connect(process.env.MONGODB_URL)
.then(() => console.log('MongoDB connected'))
.catch(err => console.log(err))

app.use('/employees', employeeRoutes)
app.use('/employeeFamilies', employeeFamilyRoutes)

app.listen(port, () => {
    console.log(`Server is running on port: ${port}`)
}
)

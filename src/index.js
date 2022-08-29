const express = require('express')
const dotenv = require('dotenv')
dotenv.config()
const connectDB = require('./utils/db')

const app = express()
const PORT = process.env.PORT || 5000


app.listen(PORT, async () => {
    console.log(`Server is listening at port ${PORT}`);
    await connectDB()
})
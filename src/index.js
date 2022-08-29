const express = require('express')
const dotenv = require('dotenv')
const connectDB = require('./utils/db')
dotenv.config()

const authRoutes = require('./routes/auth')


const app = express()
const PORT = process.env.PORT || 5000


app.use('/api/v1/', authRoutes)


const server = app.listen(PORT, async () => {
    console.log(`Server is listening at port ${PORT}`);
    await connectDB()
})


process.on('unhandledRejection', (err) => {
    console.log("SERVER ERROR ==> " + err);
    server.close(process.exit(1))
})
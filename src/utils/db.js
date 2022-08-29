const mongoose = require('mongoose')

const connectDB = async () => {
    const conn = await mongoose.connect(process.env.mongoURI)
    console.log(`Connection Establised with mongoose`);
}

module.exports = connectDB
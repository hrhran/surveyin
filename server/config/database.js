const mongoose = require('mongoose')

const connectDB = async () => {
  try {
    const conn = await mongoose.connect(process.env.mongoURI)
    console.log(`MongoDB Connected Sucessfully`)
  } catch (error) {
    console.log(error)
    process.exit(1)
  }
}

module.exports = connectDB

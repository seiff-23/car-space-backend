// require mongoose
const mongoose = require('mongoose')

// connect to MongoDB
const connectDB = async () => {
    try {
        await mongoose.connect(process.env.DB_URI)
        console.log("✅ ✅ ✅ Connected to MongoDB Successfully");
    } catch (error) {
        console.error('Error connecting to MongoDB:', error.message)
        process.exit(1) // exit process with failure
    }
}

// export connectDB function
module.exports = connectDB
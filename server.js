// require express
const express = require('express')

// create instance of express
const app = express()


// body parser middleware
app.use(express.json())

// dotenv config
require('dotenv').config()

// require cors to allow cross-origin requests
const cors = require("cors");

const PORT_VITE = process.env.PORT_VITE

app.use(
  cors({
    origin: `http://localhost:${PORT_VITE}`,
    credentials: true, // if you're using cookies or auth headers
  })
);

// define PORT
const PORT = process.env.PORT || process.env.PORT_2

// create server
app.listen(PORT, (error) => {
    error
      ? console.log(`Error running server: ${error}`)
      : console.log(`⚡⚡⚡ Server running on http://127.0.0.1:${PORT}`);
})

app.get('/', (req, res) => {
  res.send(('Api is running...'))
})


// connect to database
const connectDB = require('./config/connectDB')
connectDB()


// import car routes
app.use('/api/cars', require('./routes/carRoutes'))

// import auth routes
app.use('/api/auth', require('./routes/authRoutes'))
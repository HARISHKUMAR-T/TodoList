const express = require("express");
const app = express();
//to send the errror that appears in backend to front end
const cors=require('cors')
require('express-async-errors');
const Task=require('./models/Task')
const connectDB = require("./db/connect");
const authRouter=require('./routes/auth');
const categoryRouter=require('./routes/category')
const notFoundMiddleware = require("./middlewares/not-found");
const errorHandlerMiddleware = require("./middlewares/error-handler");
const authenticateUser=require('./middlewares/authentication');
const Category = require("./models/Category");
const User = require("./models/User");
//to use .env variables
require("dotenv").config();

// Middleware to parse incoming JSON data
app.use(express.json());
app.use(cors());

//routes
app.use('/api/v1/auth',authRouter)
app.use('/api/v1/categories',authenticateUser,categoryRouter)

//For errors occuring in backend
app.use(errorHandlerMiddleware)
//if route does not exist
app.use(notFoundMiddleware)

const port = process.env.PORT;
const start = async () => {
  try {
    await connectDB(process.env.MONGO_URI);
    app.listen(port,async(req, res) => {
      // await Task.deleteMany({});
      // await User.deleteMany({});
      // await Category.deleteMany({});
      console.log(`Server is listening to port ${port}...`);
    });
  } catch (error) {
    console.log(error);
  }
};
start();

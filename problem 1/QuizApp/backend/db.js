const mongoose = require("mongoose");

const url = 'mongodb+srv://dtanwer:1234@cluster0.nicacv5.mongodb.net/management?retryWrites=true&w=majority';

const connectDB=() => {
  mongoose
    .connect(url, { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => {
      console.log("🗃️  Database connected successfully");
    })
    .catch((err) => {
      console.log("Database connection failed", err);
    });
};

module.exports = connectDB;
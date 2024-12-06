const mongoose = require("mongoose");

const connectDB = () => {
  mongoose.connect("mongodb://localhost:27017/Salon-Beaute", {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    })
    .then(() => console.log("MongoDB connecté !"))
    .catch((err) => console.log(`Erreur de connexion à MongoDB : ${err}`));
};

module.exports = connectDB;

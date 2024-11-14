const Client = require('../models/Client');
const asyncHandler = require('express-async-handler');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');

const inscrireClient = asyncHandler(async (req, res) => {
  const { nom, adresse, telephone, password } = req.body;

  const clientExistant = await Client.findOne({ telephone });
  if (clientExistant) {
    res.status(400);
    throw new Error('Client déjà existant');
  }

  const client = await Client.create({
    nom,
    adresse,
    telephone,
    password: bcrypt.hashSync(password, 10),
  });

  if (client) {
    res.status(201).json({
      _id: client.id,
      nom: client.nom,
      telephone: client.telephone,
      token: generateToken(client._id),
    });
  } else {
    res.status(400);
    throw new Error('Données invalides');
  }
});

const generateToken = (id) => {
  return jwt.sign({ id }, process.env.JWT_SECRET, {
    expiresIn: '30d',
  });
};

module.exports = { inscrireClient };

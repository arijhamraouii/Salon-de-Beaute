const Rendezvous = require('../models/Rendezvous');

const creerRendezvous = async (detailsRendezvous) => {
  return await Rendezvous.create(detailsRendezvous);
};

module.exports = { creerRendezvous };

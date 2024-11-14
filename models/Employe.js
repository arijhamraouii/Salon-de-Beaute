const employeSchema = new mongoose.Schema({
    nom: { type: String, required: true },
    specialite: { type: String, required: true },
    disponibilites: [{ type: String }], // ex: ['Lundi 9:00-17:00', 'Mardi 10:00-18:00']
  }, { timestamps: true });
  
  module.exports = mongoose.model('Employe', employeSchema);
  
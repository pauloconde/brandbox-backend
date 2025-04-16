import mongoose from 'mongoose';

const TestSchema = new mongoose.Schema(
  {
    nombre: {
      type: String,
      required: [true, 'El nombre es requerido'],
      trim: true,
    },
    mensaje: {
      type: String,
      required: [true, 'El mensaje es requerido'],
    },
    creado: {
      type: Date,
      default: Date.now,
    },
  },
  {
    timestamps: true,
  }
);

// Exportamos el modelo (verificando que no esté ya definido)
export default mongoose.models.Test || mongoose.model('Test', TestSchema);
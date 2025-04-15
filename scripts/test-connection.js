// test-connection.js
require('dotenv').config({ path: '.env.local' });
const mongoose = require('mongoose');

const MONGODB_URI = process.env.MONGODB_URI;

if (!MONGODB_URI) {
  console.error('Error: La variable de entorno MONGODB_URI no está definida');
  process.exit(1);
}

async function testConnection() {
  try {
    console.log('Intentando conectar a MongoDB...');
    await mongoose.connect(MONGODB_URI);
    console.log('¡Conexión exitosa a MongoDB!');
    
    // Crear un modelo simple para probar
    const Test = mongoose.model('Test', new mongoose.Schema({
      name: String,
      date: { type: Date, default: Date.now }
    }));
    
    // Insertar un documento de prueba
    const testDoc = new Test({ name: 'Prueba de conexión' });
    await testDoc.save();
    console.log('Documento guardado correctamente:', testDoc);
    
    // Buscar el documento
    const foundDoc = await Test.findOne({ name: 'Prueba de conexión' });
    console.log('Documento encontrado:', foundDoc);
    
    // Eliminar el documento de prueba
    await Test.deleteOne({ _id: testDoc._id });
    console.log('Documento eliminado correctamente');
    
  } catch (error) {
    console.error('Error al conectar con MongoDB:', error);
  } finally {
    // Cerrar la conexión
    await mongoose.connection.close();
    console.log('Conexión cerrada');
    process.exit(0);
  }
}

testConnection();
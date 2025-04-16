// app/api/test/route.js
import { connectToDatabase } from '@brandbox/lib/db/connection';
import TestModel from '@brandbox/lib/db/schema/test.schema';
import { NextResponse } from 'next/server';

// Manejador para GET
export async function GET() {
  try {
    // Conectar a la base de datos
    await connectToDatabase();
    
    // Obtener todos los documentos de prueba
    const tests = await TestModel.find({}).sort({ creado: -1 });
    
    // Responder con los datos
    return NextResponse.json({ success: true, data: tests });
  } catch (error) {
    console.error('Error al obtener datos:', error);
    return NextResponse.json(
      { success: false, error: 'Error del servidor' },
      { status: 500 }
    );
  }
}

// Manejador para POST
export async function POST(request) {
  try {
    // Conectar a la base de datos
    await connectToDatabase();
    
    // Obtener el cuerpo de la solicitud
    const body = await request.json();
    
    // Crear un nuevo documento de prueba
    const test = await TestModel.create(body);
    
    // Responder con el documento creado
    return NextResponse.json(
      { success: true, data: test },
      { status: 201 }
    );
  } catch (error) {
    console.error('Error al crear dato:', error);
    return NextResponse.json(
      { success: false, error: 'Error del servidor' },
      { status: 500 }
    );
  }
}
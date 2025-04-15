import mongoose, { Schema, Document } from 'mongoose';

export interface ITenant extends Document {
  name: string;
  domain: string;
  branding: {
    logo: string;
    primaryColor: string;
    secondaryColor: string;
  };
  isActive: boolean;
  customFields: {
    products: any[]; // Definición de campos personalizados para productos
  };
  createdAt: Date;
  updatedAt: Date;
}

const TenantSchema: Schema = new Schema(
  {
    name: { type: String, required: true, trim: true },
    domain: { type: String, required: true, unique: true, trim: true },
    branding: {
      logo: { type: String, default: '' },
      primaryColor: { type: String, default: '#3B82F6' },
      secondaryColor: { type: String, default: '#1E3A8A' },
    },
    isActive: { type: Boolean, default: true },
    customFields: {
      products: [{ 
        name: String, 
        type: { type: String, enum: ['text', 'number', 'select', 'boolean', 'date'] },
        options: [String], // Para campos de tipo select
        required: Boolean,
        defaultValue: Schema.Types.Mixed
      }],
    },
  },
  { timestamps: true }
);

// Evitar registrar el modelo varias veces en hot reload durante desarrollo
export default mongoose.models.Tenant || mongoose.model<ITenant>('Tenant', TenantSchema);

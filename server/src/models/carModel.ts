import mongoose, { Document } from 'mongoose';

export interface ICar extends Document {
  brand: string;
  name: string;
  yearOfManufacture: number;
  price: number;
}

const carSchema = new mongoose.Schema({
  brand: String,
  name: String,
  yearOfManufacture: Number,
  price: Number,
});

export const CarModel = mongoose.model<ICar>('Car', carSchema);

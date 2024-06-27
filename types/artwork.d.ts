import { Document, ObjectId } from "mongoose";

// Interfaz para Artwork
export interface IArtwork extends Document {
  title: string;
  description: string;
  imageUrl: string;
  price: number;
  userId: ObjectId;
}

// Tipo para la operación de eliminación
export interface IArtworkDelete {
  id: ObjectId;
}


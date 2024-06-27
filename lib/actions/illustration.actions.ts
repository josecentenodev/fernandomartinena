"use server";

import { revalidatePath } from "next/cache";
import { connectToDatabase } from "@/lib/database/mongoose";

import Illustration from "../database/models/illustration.model";
import { handleError } from "@/lib/utils";

export async function getAllIllustrations() {
  try {
    await connectToDatabase();

    const illustrations = await Illustration.find();
    return JSON.parse(JSON.stringify(illustrations));
  } catch (error) {
    handleError(error);
  }
}

export async function getIllustrationById(id: string) {
    try {
      await connectToDatabase()
      const illustration = await Illustration.findById(id)
      if (!illustration) {
        throw new Error('Illustration not found')
      }
      return illustration
    } catch (error) {
      handleError(error)
      return null
    }
  }

  export async function createIllustration(data: { title: string; imageUrl: string; userId: string }) {
    try {
      await connectToDatabase()
      const newIllustration = new Illustration(data)
      await newIllustration.save()
      revalidatePath('/path-to-illustrations') // Cambia '/path-to-illustrations' por la ruta que corresponda
      return newIllustration
    } catch (error) {
      handleError(error)
      return null
    }
  }

  export async function deleteIllustration(id: string) {
    try {
      await connectToDatabase()
      const result = await Illustration.findByIdAndDelete(id)
      if (!result) {
        throw new Error('Illustration not found')
      }
      revalidatePath('/path-to-illustrations') // Cambia '/path-to-illustrations' por la ruta que corresponda
      return result
    } catch (error) {
      handleError(error)
      return null
    }
  }

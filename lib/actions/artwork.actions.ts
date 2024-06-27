'use server'

import { revalidatePath } from 'next/cache'
import { connectToDatabase } from '@/lib/database/mongoose'

import Artwork from '../database/models/artwork.model'
import { handleError } from '@/lib/utils'


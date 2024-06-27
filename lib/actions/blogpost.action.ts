'use server'

import { revalidatePath } from 'next/cache'
import { connectToDatabase } from '@/lib/database/mongoose'

import BlogPost from '../database/models/blogpost.model'
import { handleError } from '@/lib/utils'


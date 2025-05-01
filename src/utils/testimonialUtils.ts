import fs from 'fs'
import path from 'path'
import { promises as fsPromises } from 'fs'

export interface Testimonial {
  name: string
  message: string
  rating: number
  userType: string
  university: string
}

const TESTIMONIALS_FILE_PATH = path.join(process.cwd(), 'src/data/testimonials.json')

export async function getTestimonials(): Promise<Testimonial[]> {
  try {
    const fileContents = await fsPromises.readFile(TESTIMONIALS_FILE_PATH, 'utf8')
    const data = JSON.parse(fileContents)
    return data.testimonials
  } catch (error) {
    console.error('Error reading testimonials:', error)
    return []
  }
}

export async function addTestimonial(testimonial: Testimonial): Promise<void> {
  try {
    const fileContents = await fsPromises.readFile(TESTIMONIALS_FILE_PATH, 'utf8')
    const data = JSON.parse(fileContents)
    data.testimonials.push(testimonial)
    await fsPromises.writeFile(TESTIMONIALS_FILE_PATH, JSON.stringify(data, null, 2))
  } catch (error) {
    console.error('Error adding testimonial:', error)
    throw error
  }
} 
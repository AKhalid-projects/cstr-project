import { NextResponse } from 'next/server'
import { getTestimonials, addTestimonial } from '@/utils/testimonialUtils'

export async function GET() {
  try {
    const testimonials = await getTestimonials()
    return NextResponse.json({ testimonials })
  } catch (error) {
    console.error('Error fetching testimonials:', error)
    return NextResponse.json({ error: 'Failed to fetch testimonials', details: error instanceof Error ? error.message : 'Unknown error' }, { status: 500 })
  }
}

export async function POST(request: Request) {
  try {
    const testimonial = await request.json()
    await addTestimonial(testimonial)
    return NextResponse.json({ message: 'Testimonial added successfully' })
  } catch (error) {
    console.error('Error adding testimonial:', error)
    return NextResponse.json({ error: 'Failed to add testimonial', details: error instanceof Error ? error.message : 'Unknown error' }, { status: 500 })
  }
} 
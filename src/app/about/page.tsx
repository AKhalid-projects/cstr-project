'use client'

import { motion } from 'framer-motion'
import { GradientBackground } from '@/components/ui/gradient-background'
import { ArrowRight, Code2, Beaker, Cpu, BookOpen, Activity, Award, Star, Plus } from 'lucide-react'
import Link from 'next/link'
import { Button } from '@/components/ui/Button'
import { Swiper, SwiperSlide } from 'swiper/react'
import { Pagination, Autoplay } from 'swiper/modules'
import { useState, useEffect } from 'react'
import TestimonialModal from '@/components/testimonials/TestimonialModal'

// Import Swiper styles
import 'swiper/css'
import 'swiper/css/pagination'

interface Testimonial {
  name: string
  message: string
  rating: number
  userType: string
  university: string
}

const RatingStars = ({ rating }: { rating: number }) => {
  const fullStars = Math.floor(rating)
  const hasHalfStar = rating % 1 !== 0

  return (
    <div className="flex gap-1">
      {/* Full stars */}
      {[...Array(fullStars)].map((_, i) => (
        <Star key={`full-${i}`} className="w-5 h-5 fill-yellow-500 text-yellow-500" />
      ))}
      
      {/* Half star */}
      {hasHalfStar && (
        <div className="relative w-5 h-5">
          {/* Empty star background */}
          <Star className="w-5 h-5 text-yellow-500 absolute" />
          {/* Half-filled star */}
          <div className="overflow-hidden w-[50%] absolute">
            <Star className="w-5 h-5 fill-yellow-500 text-yellow-500" />
          </div>
        </div>
      )}
      
      {/* Empty stars */}
      {[...Array(5 - Math.ceil(rating))].map((_, i) => (
        <Star key={`empty-${i}`} className="w-5 h-5 text-yellow-500" />
      ))}
    </div>
  )
}

export default function AboutPage() {
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [testimonials, setTestimonials] = useState<Testimonial[]>([])
  const [isLoading, setIsLoading] = useState(true)

  // Load testimonials from API on component mount
  useEffect(() => {
    const fetchTestimonials = async () => {
      try {
        const response = await fetch('/api/testimonials')
        const data = await response.json()
        setTestimonials(data.testimonials)
      } catch (error) {
        console.error('Error fetching testimonials:', error)
      } finally {
        setIsLoading(false)
      }
    }

    fetchTestimonials()
  }, [])

  const handleAddTestimonial = async (newTestimonial: Testimonial) => {
    try {
      const response = await fetch('/api/testimonials', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(newTestimonial),
      })

      if (!response.ok) {
        throw new Error('Failed to add testimonial')
      }

      // Refresh testimonials after adding new one
      const updatedResponse = await fetch('/api/testimonials')
      const data = await updatedResponse.json()
      setTestimonials(data.testimonials)
    } catch (error) {
      console.error('Error adding testimonial:', error)
      // You might want to show an error message to the user here
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-900 via-gray-800 to-gray-900">
      <GradientBackground />


      {/* What is CSTR Simulator? */}
      <section className="py-24 relative overflow-hidden">


        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
          <div className="text-center items-center">
            {/* Content */}
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true }}
              className="space-y-8 relative"
            >
              <div className="space-y-4">
                <h2 className="text-4xl font-bold text-white">
                  What is{" "}
                  <span className="bg-gradient-to-r from-purple-500 to-blue-500 text-transparent bg-clip-text">
                    ProcessDynX
                  </span>
                  ?
                </h2>
                <p className="text-xl text-gray-300">
                  A web-based simulation platform designed for visualizing and controlling a gravity-
                  drained tank system. This interactive tool enables users to explore fluid dynamics,
                  control conversion, and process automation in real-time, providing a hands-on
                  learning experience in system behavior and control strategies.
                </p>
              </div>
              <div className="gap-4">
                <Link href="/tuning">
                  <Button
                    size="lg"
                    className="bg-gradient-to-r from-purple-500 to-blue-500 hover:from-purple-600 hover:to-blue-600 relative"
                  >
                    Get Started
                    <ArrowRight className="ml-2 w-5 h-5" />
                  </Button>
                </Link>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Technology Stack */}
      <section className="py-24 relative overflow-hidden">
        <div className="absolute inset-0 bg-grid-white/[0.02] bg-[size:60px_60px]" />
        <div className="absolute inset-0 bg-gradient-to-b from-blue-500/5 to-purple-500/5 -z-10" />

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl font-bold text-white mb-6">
              Built with Modern
              <span className="bg-gradient-to-r from-blue-500 to-purple-500 text-transparent bg-clip-text">
                {" "}Technology Stack
              </span>
            </h2>
            <p className="text-xl text-gray-300 max-w-3xl mx-auto">
              Leveraging cutting-edge technologies to deliver a powerful and seamless simulation experience
            </p>
          </motion.div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {technologies.map((tech, index) => (
              <motion.div
                key={tech.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                viewport={{ once: true }}
                className="group relative h-full"
              >
                <div className="absolute inset-0 bg-gradient-to-r from-blue-500/10 to-purple-500/10 rounded-xl transform group-hover:scale-105 transition-transform duration-300" />
                <div className="relative bg-gray-800/50 backdrop-blur-sm border border-gray-700/50 rounded-xl p-8 hover:border-blue-500/50 transition-colors duration-300 h-full flex flex-col">
                  <div className="mb-6">
                    <div className="w-14 h-14 rounded-xl bg-gradient-to-r from-blue-500/20 to-purple-500/20 flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                      {tech.icon}
                    </div>
                  </div>
                  <h3 className="text-xl font-semibold text-white mb-3">
                    {tech.title}
                  </h3>
                  <p className="text-gray-400 flex-grow">
                    {tech.description}
                  </p>
                  {tech.features && (
                    <ul className="mt-4 space-y-2">
                      {tech.features.map((feature, i) => (
                        <li key={i} className="flex items-center text-sm text-gray-400">
                          <div className="w-1.5 h-1.5 rounded-full bg-blue-500 mr-2" />
                          {feature}
                        </li>
                      ))}
                    </ul>
                  )}
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Educational Purpose */}
      <section className="py-24 bg-gradient-to-b from-gray-900 to-black relative overflow-hidden">
        <div className="absolute inset-0 bg-grid-white/[0.02] bg-[size:60px_60px]" />
        <div className="absolute inset-0 bg-gradient-to-b from-blue-500/5 to-purple-500/5" />

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-white mb-6">
              Empowering the Next Generation of
              <span className="bg-gradient-to-r from-blue-500 to-purple-500 text-transparent bg-clip-text">
                {" "}Process Engineers
              </span>
            </h2>
            <p className="text-xl text-gray-300 max-w-3xl mx-auto">
              Our platform combines advanced simulation technology with intuitive learning paths
              to create an unparalleled educational experience.
            </p>
          </div>

          <div className="grid lg:grid-cols-3 gap-8 mb-16">
            {/* Learning Path Card */}
            <div className="bg-gray-800/50 backdrop-blur-sm border border-gray-700/50 rounded-xl p-8 hover:border-blue-500/50 transition-colors duration-300">
              <div className="flex items-center gap-4 mb-6">
                <div className="p-3 rounded-lg bg-blue-500/10 text-blue-400">
                  <BookOpen className="w-6 h-6" />
                </div>
                <h3 className="text-2xl font-semibold text-white">Educational Resource</h3>
              </div>
              <p className="text-gray-300 mb-6">
                Enhances learning by providing a visual and interactive
                platform for students to understand and apply control strategies.
              </p>
            </div>

            {/* Simulation Environment Card */}
            <div className="bg-gray-800/50 backdrop-blur-sm border border-gray-700/50 rounded-xl p-8 hover:border-purple-500/50 transition-colors duration-300">
              <div className="flex items-center gap-4 mb-6">
                <div className="p-3 rounded-lg bg-purple-500/10 text-purple-400">
                  <Activity className="w-6 h-6" />
                </div>
                <h3 className="text-2xl font-semibold text-white">Real-Time Feedback</h3>
              </div>
              <p className="text-gray-300 mb-6">
                Users can adjust control parameters and immediately see
                the effects on the system, facilitating a deeper understanding of process control.
              </p>
            </div>

            {/* Simulation Environment Card */}
            <div className="bg-gray-800/50 backdrop-blur-sm border border-gray-700/50 rounded-xl p-8 hover:border-purple-500/50 transition-colors duration-300">
              <div className="flex items-center gap-4 mb-6">
                <div className="p-3 rounded-lg bg-purple-500/10 text-purple-400">
                  <Activity className="w-6 h-6" />
                </div>
                <h3 className="text-2xl font-semibold text-white">Flexibility</h3>
              </div>
              <p className="text-gray-300 mb-6">
                Allows for the implementation of various control strategies such as PID,
                feedforward, and system identification.
              </p>
            </div>

            {/* Assessment Card */}
            <div className="bg-gray-800/50 backdrop-blur-sm border border-gray-700/50 rounded-xl p-8 hover:border-green-500/50 transition-colors duration-300">
              <div className="flex items-center gap-4 mb-6">
                <div className="p-3 rounded-lg bg-green-500/10 text-green-400">
                  <Award className="w-6 h-6" />
                </div>
                <h3 className="text-2xl font-semibold text-white">Practical Application</h3>
              </div>
              <p className="text-gray-300 mb-6">
                Offers industry operators a user-friendly tool for simulating
                and optimizing process control.
              </p>
            </div>
          </div>

          <div className="text-center">
            <Link
              href="/signup"
              className="inline-flex items-center px-6 py-3 text-lg font-medium text-white bg-blue-600 rounded-lg hover:bg-blue-500 transition-colors duration-300"
            >
              Start Learning Now
              <ArrowRight className="ml-2 w-5 h-5" />
            </Link>
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section className="py-24 relative overflow-hidden">
        <div className="absolute inset-0 bg-grid-white/[0.02] bg-[size:60px_60px]" />
        <div className="absolute inset-0 bg-gradient-to-b from-blue-500/5 to-purple-500/5 -z-10" />

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center mb-12 relative z-10">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true }}
              className="text-center"
            >
              <h2 className="text-4xl font-bold text-white mb-6">
                What Our Users Say
              </h2>
              <p className="text-xl text-gray-300 max-w-3xl mx-auto">
                Hear from students, professors, and professionals who have used our platform
              </p>
            </motion.div>
            <Button
              onClick={() => setIsModalOpen(true)}
              className="flex items-center gap-2 relative z-10"
            >
              <Plus className="w-4 h-4" />
              Add Testimonial
            </Button>
          </div>

          {isLoading ? (
            <div className="text-center text-white">Loading testimonials...</div>
          ) : (
          <Swiper
            modules={[Pagination, Autoplay]}
            spaceBetween={30}
            slidesPerView={1}
            pagination={{ clickable: true }}
            autoplay={{ delay: 5000 }}
            breakpoints={{
              640: { slidesPerView: 2 },
              1024: { slidesPerView: 3 }
            }}
            className="pb-12"
          >
            {testimonials.map((testimonial, index) => (
              <SwiperSlide key={index}>
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  viewport={{ once: true }}
                  className="bg-gray-800/50 backdrop-blur-sm border border-gray-700/50 rounded-xl p-6 h-full"
                >
                  <div className="flex items-center gap-4 mb-4">
                    <div className="w-12 h-12 rounded-full bg-gradient-to-r from-blue-500/20 to-purple-500/20 flex items-center justify-center">
                      <span className="text-xl font-semibold text-white">
                        {testimonial.name.charAt(0)}
                      </span>
                    </div>
                    <div>
                      <h3 className="text-lg font-semibold text-white">
                        {testimonial.name}
                      </h3>
                      <p className="text-sm text-gray-400">
                        {testimonial.userType} at {testimonial.university}
                      </p>
                    </div>
                  </div>
                  <RatingStars rating={testimonial.rating} />
                  <p className="mt-4 text-gray-300">
                    {testimonial.message}
                  </p>
                </motion.div>
              </SwiperSlide>
            ))}
          </Swiper>
          )}
        </div>
      </section>

      <TestimonialModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onSubmit={handleAddTestimonial}
      />
    </div>
  )
}

const technologies = [
  {
    title: 'Next.js',
    description: 'Modern React framework for production-grade applications',
    icon: <Code2 className="w-6 h-6 text-blue-500" />,
    features: ['Modern React framework', 'Production-grade applications', 'Optimized for performance']
  },
  {
    title: 'Three.js',
    description: '3D visualization library for immersive simulations',
    icon: <Cpu className="w-6 h-6 text-blue-500" />,
    features: ['3D visualization', 'Immersive simulations', 'High-performance rendering']
  },
  {
    title: 'Real-time Processing',
    description: 'Dynamic calculations for instant feedback',
    icon: <Beaker className="w-6 h-6 text-blue-500" />,
    features: ['Dynamic calculations', 'Instant feedback', 'High-performance processing']
  },
  {
    title: 'Interactive Learning',
    description: 'Hands-on approach to understanding control systems',
    icon: <BookOpen className="w-6 h-6 text-blue-500" />,
    features: ['Hands-on approach', 'Interactive learning', 'Intuitive user interface']
  }
] 
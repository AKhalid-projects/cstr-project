'use client'

import { motion } from 'framer-motion'
import { GradientBackground } from '@/components/ui/gradient-background'
import { ArrowRight, Code2, Beaker, Cpu, BookOpen, Check, Activity, Award, Star } from 'lucide-react'
import Link from 'next/link'
import { Button } from '@/components/ui/Button'

interface Testimonial {
  name: string
  message: string
  rating: number
  userType: string
  university: string
}

const testimonials: Testimonial[] = [
  {
    name: "Ahmed Al-Sayed",
    message: "ProcessDynX has transformed how I understand control systems. The interactive simulations make complex concepts tangible and easier to grasp.",
    rating: 5,
    userType: "Student",
    university: "University of Bahrain"
  },
  {
    name: "Dr. Sarah Johnson",
    message: "An excellent teaching tool that bridges the gap between theory and practice. My students have shown remarkable improvement in understanding PID control concepts.",
    rating: 5,
    userType: "Professor",
    university: "Polytechnic Bahrain"
  },
  {
    name: "Mohammed Hassan",
    message: "The real-time visualization helps me understand the impact of different control parameters. It's an invaluable tool for learning process control.",
    rating: 4.4,
    userType: "Graduate Student",
    university: "Arabian Gulf University"
  }
]

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
  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-900 via-gray-800 to-gray-900">
      <GradientBackground />

      {/* Hero Section */}
      <section className="relative pt-20 pb-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center"
          >
            <h1 className="text-4xl md:text-5xl font-bold text-white mb-6">
              About the Project
            </h1>
            <p className="text-xl text-gray-300 max-w-3xl mx-auto">
              An advanced simulation platform for understanding and experimenting with
              PID control systems in real-world applications.
            </p>
          </motion.div>
        </div>
      </section>

      {/* What is CSTR Simulator? */}
      <section className="py-24 relative overflow-hidden">
        {/* Move background elements below content with negative z-index */}
        <div className="absolute inset-0 bg-grid-white/[0.02] bg-[size:60px_60px] -z-10" />
        <div className="absolute inset-0 bg-gradient-to-b from-purple-500/5 to-blue-500/5 -z-20" />

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
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



              <div className="flex gap-4">
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

            {/* Image/Animation */}
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true }}
              className="relative lg:h-[600px] rounded-2xl overflow-hidden"
            >
              <div className="absolute inset-0 bg-gradient-to-r from-purple-500/10 to-blue-500/10 backdrop-blur-sm border border-gray-700/50 rounded-2xl -z-10" />
              <div className="relative h-full flex items-center justify-center">
                {/* Replace this div with your actual simulation preview or screenshot */}
                <div className="w-full aspect-square bg-gradient-to-r from-purple-500/20 to-blue-500/20 rounded-xl p-8 flex items-center justify-center">
                  <Activity className="w-24 h-24 text-white/20" />
                </div>
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
        <div className="absolute inset-0 bg-gradient-to-b from-purple-500/5 to-blue-500/5" />

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl font-bold text-white mb-6">
              What Our Users Say About
              <span className="bg-gradient-to-r from-blue-500 to-purple-500 text-transparent bg-clip-text">
                {" "}ProcessDynX
              </span>
            </h2>
            <p className="text-xl text-gray-300 max-w-3xl mx-auto">
              Hear from students and educators who have experienced the power of interactive learning
            </p>
          </motion.div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {testimonials.map((testimonial, index) => (
              <motion.div
                key={testimonial.name}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.2 }}
                viewport={{ once: true }}
                className="relative group h-full"
              >
                <div className="absolute inset-0 bg-gradient-to-r from-blue-500/10 to-purple-500/10 rounded-2xl transform group-hover:scale-105 transition-transform duration-300" />
                <div className="relative bg-gray-800/50 backdrop-blur-sm border border-gray-700/50 rounded-2xl p-8 hover:border-blue-500/50 transition-colors duration-300 h-full flex flex-col">
                  {/* Rating */}
                  <div className="mb-4">
                    <RatingStars rating={testimonial.rating} />
                  </div>

                  {/* Message */}
                  <p className="text-gray-300 mb-6 flex-grow">
                    "{testimonial.message}"
                  </p>

                  {/* User Info */}
                  <div className="pt-4 border-t border-gray-700/50">
                    <p className="text-white font-semibold">{testimonial.name}</p>
                    <p className="text-sm text-gray-400">{testimonial.userType}</p>
                    <p className="text-sm text-gray-400">{testimonial.university}</p>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>
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
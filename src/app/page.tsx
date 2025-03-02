'use client'

import { motion } from 'framer-motion'
import { Button } from '@/components/ui/Button'
import Link from 'next/link'
import { ArrowRight, Sliders, Activity, Zap, BookOpen, FlaskRound, Factory, GraduationCap } from 'lucide-react'

export default function HomePage() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-900 via-gray-800 to-gray-900">
      {/* Hero Section */}
      <section className="relative overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center"
          >
            <h2 className="text-5xl font-bold text-white mb-6">
              <span className="bg-gradient-to-r from-blue-500 via-purple-500 to-blue-500 bg-clip-text text-transparent animate-gradient bg-300%">
                Welcome to ProcessDynx
              </span>
            </h2>
            <p className="text-xl text-gray-300 mb-8 max-w-2xl mx-auto">
              An in-depth, practical, and engaging platform for teaching process control,
              empowering engineers with the knowledge and skills necessary for industry
              success.
            </p>
            <Link href="/tuning">
              <Button size="lg" className="group">
                Try Simulator
                <ArrowRight className="ml-2 group-hover:translate-x-1 transition-transform" />
              </Button>
            </Link>
          </motion.div>
        </div>

        {/* Animated Background */}
        <div className="absolute inset-0 -z-10">
          <div className="absolute inset-0 bg-gradient-to-r from-blue-500/10 to-purple-500/10" />
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 2 }}
            className="absolute inset-0"
            style={{
              backgroundImage: 'radial-gradient(circle at center, rgba(59, 130, 246, 0.1) 0%, transparent 70%)'
            }}
          />
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl font-bold text-white mb-4">
              Powerful Features
            </h2>
            <p className="text-gray-400">
              Everything you need to comprehensively learn, apply, and advance in process
              control.
            </p>
          </motion.div>

          <div className="grid md:grid-cols-3 gap-8">
            {features.map((feature, index) => (
              <motion.div
                key={feature.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.2 }}
                viewport={{ once: true }}
                className="bg-gray-800/50 rounded-lg p-6 backdrop-blur-sm border border-gray-700"
              >
                <div className="w-12 h-12 bg-blue-500/10 rounded-lg flex items-center justify-center mb-4">
                  {feature.icon}
                </div>
                <h3 className="text-xl font-semibold text-white mb-2">
                  {feature.title}
                </h3>
                <p className="text-gray-400">
                  {feature.description}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Demo Section */}
      <section className="py-20 bg-gray-800/50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="grid lg:grid-cols-2 gap-12 items-center"
          >
            <div>
              <h2 className="text-4xl font-bold text-white mb-6">
                Interactive Learning Experience
              </h2>
              <p className="text-gray-300 mb-8">
                Our simulator provides a hands-on approach to understanding process control systems.
                Experiment with different parameters and see the results in real-time.
              </p>
              <Link href="/tuning">
                <Button variant="outline" size="lg">
                  Start Learning
                </Button>
              </Link>
            </div>
            <div className="relative aspect-video rounded-lg overflow-hidden">
              <div className="absolute inset-0 bg-gradient-to-tr from-blue-500/20 to-purple-500/20 backdrop-blur-sm" />
              {/* Add demo video or animation here */}
            </div>
          </motion.div>
        </div>
      </section>

      {/* Educational Purpose Section */}
      <section className="py-24 relative overflow-hidden">
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
              Learn Process Control
              <span className="bg-gradient-to-r from-blue-500 to-purple-500 text-transparent bg-clip-text">
                {" "}Interactively
              </span>
            </h2>
            <p className="text-xl text-gray-300 max-w-3xl mx-auto">
              ProcessDynX provides a comprehensive learning experience for students,
              professionals, and researchers in process control engineering.
            </p>
          </motion.div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {educationalFeatures.map((feature, index) => (
              <motion.div
                key={feature.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                viewport={{ once: true }}
                className="relative group h-full"
              >
                <div className="absolute inset-0 bg-gradient-to-r from-blue-500/10 to-purple-500/10 rounded-lg transform group-hover:scale-105 transition-transform duration-300" />
                <div className="relative bg-gray-800/50 border border-gray-700 rounded-lg p-6 backdrop-blur-sm h-full flex flex-col">
                  <div className="w-12 h-12 mb-4 rounded-lg bg-gradient-to-r from-blue-500/20 to-purple-500/20 flex items-center justify-center">
                    {feature.icon}
                  </div>
                  <h3 className="text-xl font-semibold text-white mb-3">
                    {feature.title}
                  </h3>
                  <p className="text-gray-400 flex-grow">
                    {feature.description}
                  </p>
                </div>
              </motion.div>
            ))}
          </div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            viewport={{ once: true }}
            className="mt-16 text-center"
          >
            <Link href="/about">
              <Button variant="outline" size="lg" className="group">
                Learn More About Our Platform
                <ArrowRight className="ml-2 group-hover:translate-x-1 transition-transform" />
              </Button>
            </Link>
          </motion.div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="max-w-3xl mx-auto text-center px-4 sm:px-6 lg:px-8"
        >
          <h2 className="text-4xl font-bold text-white mb-6">
            Ready to Get Started?
          </h2>
          <p className="text-xl text-gray-300 mb-8">
            Dive into our simulator and begin exploring process control systems today.  
          </p>
          <Link href="/tuning">
            <Button size="lg" className="group">
              Launch Simulator
              <ArrowRight className="ml-2 group-hover:translate-x-1 transition-transform" />
            </Button>
          </Link>
        </motion.div>
      </section>
    </div>
  )
}

const features = [
  {
    title: 'Real-time Simulation',
    description: 'Watch how your system responds to changes in real-time with our advanced visualization tools.',
    icon: <Activity className="w-6 h-6 text-blue-500" />
  },
  {
    title: 'Multiple Control Strategies',
    description: 'Experiment with PI, PID, and PID with feedforward control strategies.',
    icon: <Sliders className="w-6 h-6 text-blue-500" />
  },
  {
    title: 'Instant Feedback',
    description: 'Get immediate visual feedback on your control system performance.',
    icon: <Zap className="w-6 h-6 text-blue-500" />
  }
]

const educationalFeatures = [
  {
    title: 'Interactive Learning',
    description: 'Hands-on experience with real-time process control simulations and dynamic system responses.',
    icon: <BookOpen className="w-6 h-6 text-blue-400" />,
  },
  {
    title: 'Research Tools',
    description: 'Advanced tools for testing control strategies and analyzing system behavior.',
    icon: <FlaskRound className="w-6 h-6 text-purple-400" />,
  },
  {
    title: 'Industry Practice',
    description: 'Industry-relevant scenarios and practical control system implementations.',
    icon: <Factory className="w-6 h-6 text-blue-400" />,
  },
  {
    title: 'Academic Support',
    description: 'Comprehensive resources for teaching and learning process control concepts.',
    icon: <GraduationCap className="w-6 h-6 text-purple-400" />,
  }
]

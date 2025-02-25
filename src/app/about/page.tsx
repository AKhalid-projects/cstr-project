'use client'

import { motion } from 'framer-motion'
import { Card } from '@/components/ui/Card'
import { GradientBackground } from '@/components/ui/gradient-background'
import { ArrowRight, Code2, Beaker, Cpu, BookOpen, Check, Activity, Award, Factory, LineChart, Play } from 'lucide-react'
import Link from 'next/link'
import { Button } from '@/components/ui/Button'

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
                  An advanced simulation platform designed for learning and mastering process control dynamics
                </p>
              </div>

              <div className="space-y-6">
                {[
                  {
                    title: "Interactive Learning",
                    description: "Experience real-time process control through hands-on simulation and experimentation.",
                    icon: <BookOpen className="w-6 h-6 text-purple-400" />
                  },
                  {
                    title: "Industry-Standard Models",
                    description: "Built on proven mathematical models used in real industrial processes.",
                    icon: <Factory className="w-6 h-6 text-blue-400" />
                  },
                  {
                    title: "Real-time Visualization",
                    description: "Watch your control strategies come to life with dynamic 3D visualization.",
                    icon: <LineChart className="w-6 h-6 text-purple-400" />
                  }
                ].map((feature, index) => (
                  <motion.div
                    key={feature.title}
                    initial={{ opacity: 0, y: 10 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, delay: index * 0.1 }}
                    viewport={{ once: true }}
                    className="flex gap-4 p-4 rounded-lg bg-gray-800/50 border border-gray-700/50 backdrop-blur-sm relative"
                  >
                    <div className="flex-shrink-0 w-12 h-12 rounded-lg bg-gradient-to-r from-purple-500/10 to-blue-500/10 flex items-center justify-center">
                      {feature.icon}
                    </div>
                    <div>
                      <h3 className="text-lg font-semibold text-white mb-1">
                        {feature.title}
                      </h3>
                      <p className="text-gray-400">
                        {feature.description}
                      </p>
                    </div>
                  </motion.div>
                ))}
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
                <Link href="/tuning">
                  <Button 
                    variant="outline" 
                    size="lg"
                    className="relative"
                  >
                    View Demo
                    <Play className="ml-2 w-5 h-5" />
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
                <h3 className="text-2xl font-semibold text-white">Structured Learning</h3>
              </div>
              <p className="text-gray-300 mb-6">
                Follow our carefully crafted learning paths from basic concepts to advanced control strategies.
              </p>
              <ul className="space-y-3">
                {['Interactive Tutorials', 'Hands-on Exercises', 'Real-world Case Studies'].map((item) => (
                  <li key={item} className="flex items-center gap-2 text-gray-400">
                    <Check className="w-5 h-5 text-blue-400" />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Simulation Environment Card */}
            <div className="bg-gray-800/50 backdrop-blur-sm border border-gray-700/50 rounded-xl p-8 hover:border-purple-500/50 transition-colors duration-300">
              <div className="flex items-center gap-4 mb-6">
                <div className="p-3 rounded-lg bg-purple-500/10 text-purple-400">
                  <Activity className="w-6 h-6" />
                </div>
                <h3 className="text-2xl font-semibold text-white">Live Simulation</h3>
              </div>
              <p className="text-gray-300 mb-6">
                Experience real-time process control simulation with our advanced modeling engine.
              </p>
              <ul className="space-y-3">
                {['Dynamic Process Models', 'Real-time Visualization', 'Parameter Tuning'].map((item) => (
                  <li key={item} className="flex items-center gap-2 text-gray-400">
                    <Check className="w-5 h-5 text-purple-400" />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Assessment Card */}
            <div className="bg-gray-800/50 backdrop-blur-sm border border-gray-700/50 rounded-xl p-8 hover:border-green-500/50 transition-colors duration-300">
              <div className="flex items-center gap-4 mb-6">
                <div className="p-3 rounded-lg bg-green-500/10 text-green-400">
                  <Award className="w-6 h-6" />
                </div>
                <h3 className="text-2xl font-semibold text-white">Progress Tracking</h3>
              </div>
              <p className="text-gray-300 mb-6">
                Monitor your learning progress with comprehensive assessments and analytics.
              </p>
              <ul className="space-y-3">
                {['Skill Assessment', 'Performance Analytics', 'Certification Path'].map((item) => (
                  <li key={item} className="flex items-center gap-2 text-gray-400">
                    <Check className="w-5 h-5 text-green-400" />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
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
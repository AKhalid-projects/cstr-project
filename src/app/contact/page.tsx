'use client'

import { motion } from 'framer-motion'
import { Card } from '@/components/ui/Card'
import { Button } from '@/components/ui/Button'
import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea'
import { GradientBackground } from '@/components/ui/gradient-background'
import { Mail, MessageSquare, Phone, MapPin, Plus, Minus, Linkedin } from 'lucide-react'
import { useState } from 'react'
import Image from 'next/image'

export default function ContactPage() {
  const [openFaq, setOpenFaq] = useState<number | null>(null)

  const toggleFaq = (index: number) => {
    setOpenFaq(openFaq === index ? null : index)
  }

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
              Get in Touch
            </h1>
            <p className="text-xl text-gray-300 max-w-3xl mx-auto">
              Have questions about the CSTR Simulator? We're here to help.
            </p>
          </motion.div>
        </div>
      </section>

            {/* Team Section */}
            <section className="py-16 bg-gray-800/30">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl font-bold text-white mb-4">
              Meet Our Team
            </h2>
            <p className="text-xl text-gray-300">
              The minds behind the CSTR Simulator
            </p>
          </motion.div>

          <div className="grid md:grid-cols-3 gap-8">
            {teamMembers.map((member, index) => (
              <motion.div
                key={member.name}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.2 }}
                viewport={{ once: true }}
                className="relative group"
              >
                <Card className="bg-gray-800/50 border-gray-700 p-6 overflow-hidden">
                  <div className="absolute inset-0 bg-gradient-to-b from-blue-500/10 to-purple-500/10 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                  
                  <div className="relative z-10">
                    <div className="w-24 h-24 mx-auto mb-4 rounded-full overflow-hidden bg-gradient-to-r from-blue-500 to-purple-500 p-1">
                      <div className="w-full h-full rounded-full bg-gray-800 flex items-center justify-center">
                        <span className="text-3xl">{member.emoji}</span>
                      </div>
                    </div>
                    
                    <h3 className="text-xl font-semibold text-white text-center mb-2">
                      {member.name}
                    </h3>
                    
                    <p className="text-gray-400 text-center mb-4">
                      {member.role}
                    </p>
                    
                    <div className="flex justify-center">
                      <a
                        href={member.linkedin}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-2 text-blue-400 hover:text-blue-300 transition-colors"
                      >
                        <Linkedin className="w-5 h-5" />
                        <span>Connect on LinkedIn</span>
                      </a>
                    </div>
                  </div>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Contact Grid */}
      <section className="py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-12">
            {/* Contact Form */}
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true }}
            >
              <Card className="bg-gray-800/50 border-gray-700 p-8">
                <h2 className="text-2xl font-bold text-white mb-6">
                  Send us a Message
                </h2>
                <form className="space-y-6">
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="text-sm text-gray-300 mb-2 block">
                        First Name
                      </label>
                      <Input 
                        className="bg-gray-700 border-gray-600 text-white"
                        placeholder="John"
                      />
                    </div>
                    <div>
                      <label className="text-sm text-gray-300 mb-2 block">
                        Last Name
                      </label>
                      <Input 
                        className="bg-gray-700 border-gray-600 text-white"
                        placeholder="Doe"
                      />
                    </div>
                  </div>
                  <div>
                    <label className="text-sm text-gray-300 mb-2 block">
                      Email
                    </label>
                    <Input 
                      type="email"
                      className="bg-gray-700 border-gray-600 text-white"
                      placeholder="john@example.com"
                    />
                  </div>
                  <div>
                    <label className="text-sm text-gray-300 mb-2 block">
                      Message
                    </label>
                    <Textarea 
                      className="bg-gray-700 border-gray-600 text-white h-32"
                      placeholder="Your message..."
                    />
                  </div>
                  <Button className="w-full">
                    Send Message
                  </Button>
                </form>
              </Card>
            </motion.div>

            {/* Contact Info & FAQ */}
            <div className="space-y-8">
              {/* Contact Methods */}
              <motion.div
                initial={{ opacity: 0, x: 20 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.8 }}
                viewport={{ once: true }}
                className="grid sm:grid-cols-2 gap-4"
              >
                {contactMethods.map((method, index) => (
                  <Card 
                    key={method.title}
                    className="bg-gray-800/50 border-gray-700 p-6"
                  >
                    <div className="w-12 h-12 bg-blue-500/10 rounded-lg flex items-center justify-center mb-4">
                      {method.icon}
                    </div>
                    <h3 className="text-lg font-semibold text-white mb-2">
                      {method.title}
                    </h3>
                    <p className="text-gray-400">
                      {method.details}
                    </p>
                  </Card>
                ))}
              </motion.div>

              {/* FAQ Section */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8 }}
                viewport={{ once: true }}
              >
                <Card className="bg-gray-800/50 border-gray-700 p-8">
                  <h2 className="text-2xl font-bold text-white mb-6">
                    Frequently Asked Questions
                  </h2>
                  <div className="space-y-4">
                    {faqs.map((faq, index) => (
                      <div 
                        key={index}
                        className="border-b border-gray-700 last:border-0 pb-4 last:pb-0"
                      >
                        <button
                          onClick={() => toggleFaq(index)}
                          className="flex justify-between items-center w-full text-left"
                        >
                          <span className="text-white font-medium">
                            {faq.question}
                          </span>
                          {openFaq === index ? (
                            <Minus className="w-5 h-5 text-gray-400" />
                          ) : (
                            <Plus className="w-5 h-5 text-gray-400" />
                          )}
                        </button>
                        {openFaq === index && (
                          <p className="text-gray-400 mt-2">
                            {faq.answer}
                          </p>
                        )}
                      </div>
                    ))}
                  </div>
                </Card>
              </motion.div>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}

const contactMethods = [
  {
    title: 'Email',
    details: 'support@cstr-simulator.com',
    icon: <Mail className="w-6 h-6 text-blue-500" />
  },
  {
    title: 'Live Chat',
    details: 'Available 9 AM - 5 PM EST',
    icon: <MessageSquare className="w-6 h-6 text-blue-500" />
  },
  {
    title: 'Phone',
    details: '+1 (555) 123-4567',
    icon: <Phone className="w-6 h-6 text-blue-500" />
  },
  {
    title: 'Location',
    details: 'New York, NY 10001',
    icon: <MapPin className="w-6 h-6 text-blue-500" />
  }
]

const faqs = [
  {
    question: 'What is the CSTR Simulator?',
    answer: 'The CSTR Simulator is an educational tool designed to help users understand and experiment with PID control systems in a virtual environment.'
  },
  {
    question: 'Is the simulator free to use?',
    answer: 'Yes, the simulator is completely free for educational purposes.'
  },
  {
    question: 'Can I save my simulation settings?',
    answer: 'Yes, you can save and load different presets for your simulations.'
  },
  {
    question: 'Do you offer technical support?',
    answer: 'Yes, we provide technical support through email and live chat during business hours.'
  }
]

const teamMembers = [
  {
    name: 'Shahd Mohamed Alnajdi',
    role: 'Project Lead',
    emoji: '👩‍💻',
    linkedin: 'http://linkedin.com/in/shahd-alnajdi-287b4132a'
  },
  {
    name: 'Khlod Abd Allatif Matar',
    role: 'Development Lead',
    emoji: '👩‍🔬',
    linkedin: 'http://linkedin.com/in/khulood-hilal-32a5a8242'
  },
  {
    name: 'Jumana Mohamed Rashdan',
    role: 'Technical Lead',
    emoji: '👩‍🎨',
    linkedin: 'http://linkedin.com/in/jumana-rashdan-bb63b824a'
  }
] 
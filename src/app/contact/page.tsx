'use client'

import { motion } from 'framer-motion'
import { Card } from '@/components/ui/Card'
import { Button } from '@/components/ui/Button'
import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea'
import { GradientBackground } from '@/components/ui/gradient-background'
import { Plus, Minus, Linkedin } from 'lucide-react'
import { useState } from 'react'
import emailjs from '@emailjs/browser'

interface FormData {
  firstName: string
  lastName: string
  email: string
  message: string
}

interface FormStatus {
  loading: boolean
  error: string | null
  success: boolean
}

export default function ContactPage() {
  const [openFaq, setOpenFaq] = useState<number | null>(null)
  const [formData, setFormData] = useState<FormData>({
    firstName: '',
    lastName: '',
    email: '',
    message: ''
  })

  const [status, setStatus] = useState<FormStatus>({
    loading: false,
    error: null,
    success: false
  })

  const toggleFaq = (index: number) => {
    setOpenFaq(openFaq === index ? null : index)
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setStatus({ loading: true, error: null, success: false })

    try {
      await emailjs.send(
        'service_uaqzl1i',
        'template_917gcqg',
        {
          from_name: `${formData.firstName} ${formData.lastName}`,
          from_email: formData.email,
          message: formData.message,
          to_email: 'processdynx@gmail.com',
        },
        '7j4SiPbYsZtLLdIzP'
      )

      setStatus({ loading: false, error: null, success: true })
      setFormData({ firstName: '', lastName: '', email: '', message: '' })
    } catch (error) {
      setStatus({ 
        loading: false, 
        error: 'Failed to send message. Please try again.', 
        success: false 
      })
    }
  }

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData(prev => ({
      ...prev,
      [e.target.name]: e.target.value
    }))
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
              Have questions about our simulation? We&apos;re here to help.
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
              The team behind the development of our simulator.
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
                <form onSubmit={handleSubmit} className="space-y-6">
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="text-sm text-gray-300 mb-2 block">
                        First Name
                      </label>
                      <Input
                        name="firstName"
                        value={formData.firstName}
                        onChange={handleChange}
                        className="bg-gray-700 border-gray-600 text-white"
                        placeholder="John"
                        required
                      />
                    </div>
                    <div>
                      <label className="text-sm text-gray-300 mb-2 block">
                        Last Name
                      </label>
                      <Input
                        name="lastName"
                        value={formData.lastName}
                        onChange={handleChange}
                        className="bg-gray-700 border-gray-600 text-white"
                        placeholder="Doe"
                        required
                      />
                    </div>
                  </div>
                  <div>
                    <label className="text-sm text-gray-300 mb-2 block">
                      Email
                    </label>
                    <Input
                      name="email"
                      type="email"
                      value={formData.email}
                      onChange={handleChange}
                      className="bg-gray-700 border-gray-600 text-white"
                      placeholder="john@example.com"
                      required
                    />
                  </div>
                  <div>
                    <label className="text-sm text-gray-300 mb-2 block">
                      Message
                    </label>
                    <Textarea
                      name="message"
                      value={formData.message}
                      onChange={handleChange}
                      className="bg-gray-700 border-gray-600 text-white h-32"
                      placeholder="Your message..."
                      required
                    />
                  </div>
                  <Button 
                    type="submit" 
                    className="w-full"
                    disabled={status.loading}
                  >
                    {status.loading ? 'Sending...' : 'Send Message'}
                  </Button>

                  {/* Status Messages */}
                  {status.error && (
                    <p className="text-red-500 text-sm">{status.error}</p>
                  )}
                  {status.success && (
                    <p className="text-green-500 text-sm">Message sent successfully!</p>
                  )}
                </form>
              </Card>
            </motion.div>

            {/* Contact Info & FAQ */}
            <div className="space-y-8">
            

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



const faqs = [
  {
    question: 'What is the CSTR Simulator?',
    answer: 'The CSTR Simulator is an interactive platform that bridges theory and practice in process control, helping students, engineers, and researchers deepen their understanding through real-world simulations.'
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
    answer: 'Yes, we provide technical support through email.'
  }
]

const teamMembers = [
  {
    name: 'Shahd Mohamed Alnajdi',

    emoji: '👩‍💻',
    linkedin: 'http://linkedin.com/in/shahd-alnajdi-287b4132a'
  },
  {
    name: 'Khlod Abd Allatif Matar',

    emoji: '👩‍🔬',
    linkedin: 'http://linkedin.com/in/khulood-hilal-32a5a8242'
  },
  {
    name: 'Jumana Mohamed Rashdan',

    emoji: '👩‍🎨',
    linkedin: 'http://linkedin.com/in/jumana-rashdan-bb63b824a'
  }
] 
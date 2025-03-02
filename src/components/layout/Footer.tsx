'use client'

import { motion } from 'framer-motion'
import Link from 'next/link'
import { Linkedin, Mail } from 'lucide-react'

export function Footer() {
  return (
    <footer className="bg-gray-900 border-t border-gray-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Brand Section */}
          <div className="space-y-4">
            <h3 className="text-xl font-bold">
              <span className="bg-gradient-to-r from-blue-500 to-purple-500 text-transparent bg-clip-text">
                Process
              </span>
              <span className="bg-gradient-to-r from-purple-500 to-blue-500 text-transparent bg-clip-text">
                DynX
              </span>
            </h3>
            <p className="text-gray-400 text-sm">
            An educational platform for understanding and experimenting with process control
            systems.
            </p>
            <div className="flex space-x-4">
              <a
                href="mailto:processdynx@gmail.com"
                className="text-gray-400 hover:text-white transition-colors"
              >
                <Mail className="w-5 h-5" />
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-sm font-semibold text-gray-300 uppercase tracking-wider mb-4">
              Quick Links
            </h3>
            <ul className="space-y-3">
              {quickLinks.map(link => (
                <li key={link.name}>
                  <Link
                    href={link.href}
                    className="text-gray-400 hover:text-white transition-colors"
                  >
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Team */}
          <div>
            <h3 className="text-sm font-semibold text-gray-300 uppercase tracking-wider mb-4">
              Managed by
            </h3>
            <ul className="space-y-3">
              {teamLinks.map(member => (
                <li key={member.name}>
                  <a
                    href={member.linkedin}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-gray-400 hover:text-white transition-colors inline-flex items-center gap-2"
                  >
                    {member.name}
                    <Linkedin className="w-4 h-4" />
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h3 className="text-sm font-semibold text-gray-300 uppercase tracking-wider mb-4">
              Contact
            </h3>
            <ul className="space-y-3 text-gray-400">
              <li>Kingdom of Bahrain</li>
              <li>University of Bahrain</li>
              <li>College of Engineering</li>

            </ul>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="mt-12 pt-8 border-t border-gray-800">
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.5 }}
            className="text-center text-gray-400 text-sm"
          >
            © {new Date().getFullYear()} ProcessDynX. All rights reserved.
          </motion.p>
        </div>
      </div>
    </footer>
  )
}

const quickLinks = [
  { name: 'Home', href: '/' },
  { name: 'About', href: '/about' },
  { name: 'Simulator', href: '/tuning' },
  { name: 'Contact', href: '/contact' }
]

const teamLinks = [
  {
    name: 'Dr. Bassam Alhamad',
    linkedin: 'https://www.linkedin.com/in/bassam-alhamad-25429b20'
  },
  {
    name: 'Mrs. Bintu Jasson',
    linkedin: 'https://www.linkedin.com/in/bintu-jasson-4a372b243'
  },
] 
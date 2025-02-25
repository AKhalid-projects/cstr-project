'use client'
import { useState } from 'react';
import { motion } from 'framer-motion';
import { FaLinkedin } from 'react-icons/fa';

export default function ContactPage() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: ''
  });

  const teamMembers = [
    {
      name: "Shahd Mohamed Alnajdi",
      role: "Team Member",
      linkedin: "http://linkedin.com/in/shahd-alnajdi-287b4132a"
    },
    {
      name: "Khlod Abd Allatif Matar",
      role: "Team Member",
      linkedin: "http://linkedin.com/in/khulood-hilal-32a5a8242"
    },
    {
      name: "Jumana Mohamed Rashdan",
      role: "Team Member",
      linkedin: "http://linkedin.com/in/jumana-rashdan-bb63b824a"
    }
  ];

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Add form submission logic here
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-900 to-gray-800">
      <main className="max-w-4xl mx-auto px-4 py-16">
        <div className="grid md:grid-cols-2 gap-12">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5 }}
          >
            <h1 className="text-4xl font-bold text-white mb-8">Contact Us</h1>
            
            <form onSubmit={handleSubmit} className="space-y-6">
              <div>
                <label htmlFor="name" className="block text-white mb-2">Name</label>
                <input
                  type="text"
                  id="name"
                  className="w-full px-4 py-2 rounded-lg bg-gray-800 text-white border border-gray-700"
                  value={formData.name}
                  onChange={(e) => setFormData({...formData, name: e.target.value})}
                />
              </div>
              
              <div>
                <label htmlFor="email" className="block text-white mb-2">Email</label>
                <input
                  type="email"
                  id="email"
                  className="w-full px-4 py-2 rounded-lg bg-gray-800 text-white border border-gray-700"
                  value={formData.email}
                  onChange={(e) => setFormData({...formData, email: e.target.value})}
                />
              </div>
              
              <div>
                <label htmlFor="message" className="block text-white mb-2">Message</label>
                <textarea
                  id="message"
                  rows={4}
                  className="w-full px-4 py-2 rounded-lg bg-gray-800 text-white border border-gray-700"
                  value={formData.message}
                  onChange={(e) => setFormData({...formData, message: e.target.value})}
                />
              </div>
              
              <button
                type="submit"
                className="bg-blue-600 hover:bg-blue-700 text-white font-semibold px-6 py-2 rounded-lg transition-colors"
              >
                Send Message
              </button>
            </form>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5 }}
            className="bg-gray-800 p-6 rounded-lg"
          >
            <h2 className="text-2xl font-semibold text-white mb-6">Our Team</h2>
            
            <div className="space-y-6">
              {teamMembers.map((member, index) => (
                <div key={index} className="flex items-center space-x-4">
                  <div className="w-16 h-16 bg-gray-700 rounded-full flex items-center justify-center">
                    <span className="text-2xl text-gray-400">
                      {member.name.charAt(0)}
                    </span>
                  </div>
                  <div>
                    <h3 className="text-white font-semibold">{member.name}</h3>
                    <p className="text-gray-400">{member.role}</p>
                    <div className="flex space-x-3 mt-2">
                      <a
                        href={member.linkedin}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-blue-400 hover:text-blue-300 transition-colors"
                      >
                        <FaLinkedin size={20} />
                      </a>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </motion.div>
        </div>
      </main>
    </div>
  );
} 
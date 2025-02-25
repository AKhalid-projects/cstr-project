'use client'
import { motion } from 'framer-motion';

export default function AboutPage() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-900 to-gray-800">
      <main className="max-w-4xl mx-auto px-4 py-16">
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5 }}
        >
          <h1 className="text-4xl font-bold text-white mb-8">About ProcessDynX</h1>
          
          <div className="space-y-8">
            <section className="bg-gray-800 p-6 rounded-lg">
              <h2 className="text-2xl font-semibold text-white mb-4">
                Welcome to ProcessDynX
              </h2>
              <div className="prose prose-invert">
                <p className="text-gray-300">
                  ProcessDynX is a web-based simulation platform designed for
                  visualizing and controlling a gravity-drained tank system. This interactive tool
                  enables users to explore fluid dynamics, control conversion, and process
                  automation in real-time, providing a hands-on learning experience in system
                  behavior and control strategies.
                </p>
              </div>
            </section>

            <section className="bg-gray-800 p-6 rounded-lg">
              <h2 className="text-2xl font-semibold text-white mb-4">
                Platform Capabilities
              </h2>
              <ul className="text-gray-300 space-y-2">
                <li>• Educational Resource - Enhances learning by providing a visual and
                interactive platform for students to understand and apply control strategies.</li>
                <li>• Practical Application - Offers industry operators a user-friendly tool for simulating
                and optimizing process control.</li>
                <li>• Flexibility - Allows for the implementation of various control strategies such as PID,
                feedforward, and system identification.</li>
                <li>• Real-Time Feedback - Users can adjust control parameters and immediately see
                the effects on the system, facilitating a deeper understanding of process control.</li>
              </ul>
            </section>

            <section className="bg-gray-800 p-6 rounded-lg">
              <h2 className="text-2xl font-semibold text-white mb-4">
                Technology Stack
              </h2>
              <div className="prose prose-invert">
                <p className="text-gray-300">
                  Built with modern web technologies including:
                </p>
                <ul className="text-gray-300">
                  <li>Next.js for the framework</li>
                  <li>Three.js for 3D visualization</li>
                  <li>Tailwind CSS for styling</li>
                  <li>Framer Motion for animations</li>
                </ul>
              </div>
            </section>

            <section className="bg-gray-800 p-6 rounded-lg">
              <h2 className="text-2xl font-semibold text-white mb-4">
                Purpose
              </h2>
              <p className="text-gray-300">
                ProcessDynX serves as a comprehensive tool for education and research,
                connecting theoretical concepts with practical applications in process control.
                Whether you're a student, engineer, or researcher, this platform provides an
                interactive environment to deepen your understanding of control systems and
                process dynamics through real-world simulations.
              </p>
            </section>
          </div>
        </motion.div>
      </main>
    </div>
  );
} 
'use client'
import Link from 'next/link';
import { motion } from 'framer-motion';

export default function HomePage() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-900 to-gray-800">
      <main className="max-w-6xl mx-auto px-4 py-16">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          <h1 className="text-5xl font-bold text-white mb-6">
            ProcessDynX
          </h1>
          <p className="text-xl text-gray-300 mb-8">
            An in-depth, practical, and engaging platform for teaching process control,
            empowering engineers with the knowledge and skills necessary for industry
            success.
          </p>
          
          <div className="grid md:grid-cols-2 gap-8 mb-12">
            <div className="bg-gray-800 p-6 rounded-lg">
              <h2 className="text-2xl font-semibold text-white mb-4">
                Educational Benefits
              </h2>
              <ul className="space-y-3 text-gray-300">
                <li>✓ Visual and interactive learning platform</li>
                <li>✓ Real-time system behavior analysis</li>
                <li>✓ Hands-on control strategy practice</li>
                <li>✓ Immediate feedback on parameter changes</li>
              </ul>
            </div>
            
            <div className="bg-gray-800 p-6 rounded-lg">
              <h2 className="text-2xl font-semibold text-white mb-4">
                Key Features
              </h2>
              <ul className="space-y-3 text-gray-300">
                <li>✓ Real-time 3D visualization</li>
                <li>✓ PID control implementation</li>
                <li>✓ System parameter tuning</li>
                <li>✓ Process dynamics simulation</li>
              </ul>
            </div>
          </div>

          <Link 
            href="/tuning"
            className="inline-block bg-blue-600 hover:bg-blue-700 text-white font-semibold px-8 py-3 rounded-lg transition-colors"
          >
            Try Simulation
          </Link>
        </motion.div>
      </main>
    </div>
  );
}

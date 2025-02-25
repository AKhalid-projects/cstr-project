export default function Footer() {
  return (
    <footer className="bg-gray-900 text-gray-400 py-8">
      <div className="max-w-7xl mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div>
            <h3 className="text-white font-semibold mb-4">About</h3>
            <p className="text-sm">
              CSTR System Simulation is an educational tool for understanding
              gravity-drained tank systems and process control.
            </p>
          </div>
          
          <div>
            <h3 className="text-white font-semibold mb-4">Quick Links</h3>
            <ul className="space-y-2 text-sm">
              <li>
                <a href="/about" className="hover:text-white transition-colors">
                  Documentation
                </a>
              </li>
              <li>
                <a href="/tuning" className="hover:text-white transition-colors">
                  Try Simulation
                </a>
              </li>
              <li>
                <a href="/contact" className="hover:text-white transition-colors">
                  Contact Us
                </a>
              </li>
            </ul>
          </div>
          
          <div>
            <h3 className="text-white font-semibold mb-4">Connect</h3>
            <p className="text-sm">
              Follow us for updates and educational content about process control
              and chemical engineering.
            </p>
          </div>
        </div>
        
        <div className="mt-8 pt-8 border-t border-gray-800 text-sm text-center">
          © {new Date().getFullYear()} CSTR System Simulation. All rights reserved.
        </div>
      </div>
    </footer>
  )
} 
'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'

const navigation = [
  { name: 'Home', href: '/' },
  { name: 'About', href: '/about' },
  { name: 'Contact', href: '/contact' },
  { name: 'Tuning', href: '/tuning' },
]

export default function Navbar() {
  const pathname = usePathname()

  return (
    <nav className="bg-gray-900/50 backdrop-blur-sm sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          <Link 
            href="/" 
            className="font-bold text-xl text-white hover:text-blue-400 transition-colors"
          >
            CSTR Simulation
          </Link>
          
          <div className="flex space-x-8">
            {navigation.map((item) => (
              <Link
                key={item.name}
                href={item.href}
                className={`${
                  pathname === item.href 
                    ? 'text-blue-400' 
                    : 'text-gray-300'
                } hover:text-white transition-colors`}
              >
                {item.name}
              </Link>
            ))}
          </div>
        </div>
      </div>
    </nav>
  )
} 
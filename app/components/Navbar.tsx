'use client'

import { useState } from 'react'
import Link from 'next/link'
import { Menu, X, Bell, MessageSquare, Sparkles } from 'lucide-react'

export default function Navbar() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)

  return (
    <nav className="bg-white shadow-lg sticky top-0 z-50 border-b-4 border-red-600">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-20">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-3 group">
            <div className="text-4xl transform group-hover:rotate-12 transition-transform">
              🇳🇵
            </div>
            <div>
              <div className="text-2xl font-bold bg-gradient-to-r from-red-600 via-orange-600 to-red-600 bg-clip-text text-transparent">
                DigitalSewa
              </div>
              <div className="text-xs text-gray-600 -mt-1">नेपालको प्लेटफर्म</div>
            </div>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center gap-8">
            <Link 
              href="/"
              className="font-semibold text-gray-700 hover:text-red-600 transition-colors relative group"
            >
              होम
              <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-red-600 group-hover:w-full transition-all"></span>
            </Link>
            <Link 
              href="/projects"
              className="font-semibold text-gray-700 hover:text-red-600 transition-colors relative group"
            >
              परियोजनाहरू
              <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-red-600 group-hover:w-full transition-all"></span>
            </Link>
            <Link 
              href="/freelancers"
              className="font-semibold text-gray-700 hover:text-red-600 transition-colors relative group"
            >
              फ्रीलान्सरहरू
              <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-red-600 group-hover:w-full transition-all"></span>
            </Link>
            <Link 
              href="/how-it-works"
              className="font-semibold text-gray-700 hover:text-red-600 transition-colors relative group"
            >
              कसरी काम गर्छ
              <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-red-600 group-hover:w-full transition-all"></span>
            </Link>
          </div>

          {/* Desktop Actions */}
          <div className="hidden md:flex items-center gap-4">
            <button className="p-2 text-gray-600 hover:text-red-600 transition-colors relative group">
              <Bell size={22} />
              <span className="absolute top-1 right-1 w-2 h-2 bg-red-600 rounded-full animate-pulse"></span>
            </button>
            <button className="p-2 text-gray-600 hover:text-red-600 transition-colors">
              <MessageSquare size={22} />
            </button>
            <button className="border-2 border-red-600 text-red-600 px-5 py-2.5 rounded-full font-bold hover:bg-red-50 transition-all hover:scale-105">
              लग इन
            </button>
            <button className="bg-gradient-to-r from-red-600 via-orange-600 to-red-600 text-white px-5 py-2.5 rounded-full font-bold hover:shadow-xl transition-all hover:scale-105 flex items-center gap-2">
              <Sparkles size={18} />
              काम पोस्ट गर्नुहोस्
            </button>
          </div>

          {/* Mobile Menu Button */}
          <button
            className="md:hidden p-2 text-gray-700"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          >
            {mobileMenuOpen ? <X size={28} /> : <Menu size={28} />}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      {mobileMenuOpen && (
        <div className="md:hidden border-t bg-gradient-to-br from-red-50 to-orange-50">
          <div className="px-4 py-6 space-y-4">
            <Link href="/" className="block font-semibold text-gray-700 hover:text-red-600 py-2">
              🏠 होम
            </Link>
            <Link href="/projects" className="block font-semibold text-gray-700 hover:text-red-600 py-2">
              📋 परियोजनाहरू
            </Link>
            <Link href="/freelancers" className="block font-semibold text-gray-700 hover:text-red-600 py-2">
              👥 फ्रीलान्सरहरू
            </Link>
            <button className="w-full border-2 border-red-600 text-red-600 px-5 py-3 rounded-full font-bold">
              लग इन
            </button>
            <button className="w-full bg-gradient-to-r from-red-600 to-orange-600 text-white px-5 py-3 rounded-full font-bold">
              काम पोस्ट गर्नुहोस्
            </button>
          </div>
        </div>
      )}
    </nav>
  )
}
import type { Metadata } from 'next'
import { Inter, Poppins } from 'next/font/google'
import './globals.css'
import { Noto_Sans_Devanagari } from "next/font/google";
import Navbar from './components/Navbar'
import AuthProvider from '@/components/providers/AuthProvider'

const inter = Inter({ subsets: ['latin'] })
const poppins = Poppins({ 
  weight: ['400', '500', '600', '700', '800'],
  subsets: ['latin'],
  variable: '--font-poppins'
})

export const metadata: Metadata = {
  title: 'DigitalSewa - Nepal\'s Creative Collaboration Platform',
  description: 'नेपालको क्रिएटिभ कोलाबोरेसन प्लेटफर्म - Find Work, Find Talent',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className={`${inter.className} ${poppins.variable} antialiased`}>
        <AuthProvider>
          <Navbar />
          {children}
        
        {/* Footer */}
        <footer className="bg-gradient-to-br from-gray-900 via-red-950 to-gray-900 text-white py-16 mt-20">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid md:grid-cols-4 gap-8 mb-12">
              <div>
                <h3 className="text-3xl font-bold mb-4 bg-gradient-to-r from-red-400 to-orange-400 bg-clip-text text-transparent">
                  DigitalSewa
                </h3>
                <p className="text-gray-400 mb-4">नेपालको क्रिएटिभ प्लेटफर्म</p>
                <p className="text-sm text-gray-500">Nepal's #1 Creative Marketplace</p>
              </div>
              <div>
                <h4 className="font-bold mb-4 text-red-400">ग्राहकहरूका लागि</h4>
                <ul className="space-y-2 text-gray-400">
                  <li><a href="#" className="hover:text-red-400 transition-colors">काम पोस्ट गर्नुहोस्</a></li>
                  <li><a href="#" className="hover:text-red-400 transition-colors">प्रतिभा खोज्नुहोस्</a></li>
                  <li><a href="#" className="hover:text-red-400 transition-colors">कसरी काम गर्छ</a></li>
                </ul>
              </div>
              <div>
                <h4 className="font-bold mb-4 text-red-400">फ्रीलान्सरहरूका लागि</h4>
                <ul className="space-y-2 text-gray-400">
                  <li><a href="#" className="hover:text-red-400 transition-colors">काम खोज्नुहोस्</a></li>
                  <li><a href="#" className="hover:text-red-400 transition-colors">प्रोफाइल बनाउनुहोस्</a></li>
                  <li><a href="#" className="hover:text-red-400 transition-colors">सफलताका कथाहरू</a></li>
                </ul>
              </div>
              <div>
                <h4 className="font-bold mb-4 text-red-400">सहायता</h4>
                <ul className="space-y-2 text-gray-400">
                  <li><a href="#" className="hover:text-red-400 transition-colors">सहायता केन्द्र</a></li>
                  <li><a href="#" className="hover:text-red-400 transition-colors">सम्पर्क गर्नुहोस्</a></li>
                  <li><a href="#" className="hover:text-red-400 transition-colors">सेवाका सर्तहरू</a></li>
                </ul>
              </div>
            </div>
            <div className="border-t border-gray-800 pt-8 text-center">
              <p className="text-gray-400">
                © 2025 DigitalSewa. Made with <span className="text-red-500">❤️</span> in Nepal 🇳🇵
              </p>
            </div>
          </div>
        </footer>
        </AuthProvider>
      </body>
    </html>
  )
}
'use client'

import { useState } from 'react'
import { Search, MapPin, Sparkles, TrendingUp, Users, Zap } from 'lucide-react'

export default function Hero() {
  const [searchQuery, setSearchQuery] = useState('')

  return (
    <section className="relative bg-gradient-to-br from-red-600 via-orange-600 to-red-700 text-white overflow-hidden">
      {/* Animated Background Elements */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute top-20 left-10 text-6xl opacity-20 animate-bounce">🕉️</div>
        <div className="absolute bottom-20 right-10 text-6xl opacity-20 animate-bounce animation-delay-2000">🙏</div>
        <div className="absolute top-1/2 left-1/4 text-4xl opacity-10 animate-pulse">🪔</div>
        <div className="absolute top-1/3 right-1/4 text-4xl opacity-10 animate-pulse animation-delay-2000">🎭</div>
        
        {/* Gradient Orbs */}
        <div className="absolute top-0 right-0 w-96 h-96 bg-orange-500 rounded-full mix-blend-multiply filter blur-3xl opacity-30 animate-blob"></div>
        <div className="absolute bottom-0 left-0 w-96 h-96 bg-red-500 rounded-full mix-blend-multiply filter blur-3xl opacity-30 animate-blob animation-delay-4000"></div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 md:py-32 relative z-10">
        <div className="text-center">
          {/* Main Heading */}
          <div className="mb-6">
            <div className="inline-flex items-center gap-2 bg-white/20 backdrop-blur-sm px-6 py-3 rounded-full mb-6 animate-pulse">
              <Sparkles className="text-yellow-300" size={20} />
              <span className="font-semibold text-yellow-100">Nepal's #1 Creative Platform</span>
            </div>
          </div>

          <h1 className="text-5xl md:text-7xl font-black mb-4 tracking-tight">
            <span className="block bg-gradient-to-r from-white via-yellow-100 to-white bg-clip-text text-transparent animate-pulse">
              DigitalSewa
            </span>
          </h1>
          
          <p className="text-2xl md:text-4xl font-bold mb-3 text-orange-100 nepali-text">
            नेपालको क्रिएटिभ कोलाबोरेसन प्लेटफर्म
          </p>
          
          <p className="text-lg md:text-xl mb-4 text-orange-200">
            Nepal's Creative Collaboration Platform
          </p>
          
          <p className="text-base md:text-lg mb-12 text-orange-100 max-w-3xl mx-auto">
            Find talented creatives or discover exciting projects. Build your portfolio, grow your network, earn money! 🚀
          </p>

          {/* Search Bar */}
          <div className="max-w-4xl mx-auto bg-white rounded-2xl shadow-2xl p-6 mb-12 transform hover:scale-105 transition-all">
            <div className="flex flex-col md:flex-row gap-4">
              <div className="flex-1 relative">
                <Search className="absolute left-4 top-4 text-gray-400" size={20} />
                <input
                  type="text"
                  placeholder="के खोज्दै हुनुहुन्छ? (What are you looking for?)"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full pl-12 pr-4 py-4 rounded-xl border-2 border-gray-200 text-gray-900 focus:outline-none focus:border-red-500 focus:ring-4 focus:ring-red-100 font-medium"
                />
              </div>
              <div className="flex gap-2">
                <select className="px-4 py-4 rounded-xl border-2 border-gray-200 text-gray-900 font-medium focus:outline-none focus:border-red-500 focus:ring-4 focus:ring-red-100">
                  <option>सबै श्रेणीहरू</option>
                  <option>डिजाइन</option>
                  <option>भिडियो</option>
                  <option>फोटोग्राफी</option>
                  <option>संगीत</option>
                  <option>वेब</option>
                </select>
                <button className="bg-gradient-to-r from-red-600 to-orange-600 hover:from-red-700 hover:to-orange-700 text-white px-8 py-4 rounded-xl font-bold transition-all hover:shadow-2xl hover:scale-105">
                  खोज्नुहोस् 🔍
                </button>
              </div>
            </div>
          </div>

          {/* Stats */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 max-w-5xl mx-auto">
            {[
              { 
                icon: <Zap className="w-8 h-8" />, 
                value: '500+', 
                label: 'सक्रिय परियोजनाहरू',
                labelEn: 'Active Projects',
                color: 'from-yellow-400 to-orange-400'
              },
              { 
                icon: <Users className="w-8 h-8" />, 
                value: '1,200+', 
                label: 'फ्रीलान्सरहरू',
                labelEn: 'Freelancers',
                color: 'from-green-400 to-emerald-400'
              },
              { 
                icon: <TrendingUp className="w-8 h-8" />, 
                value: '850+', 
                label: 'पूरा भएका काम',
                labelEn: 'Completed',
                color: 'from-blue-400 to-cyan-400'
              },
              { 
                icon: <Sparkles className="w-8 h-8" />, 
                value: '₨50L+', 
                label: 'कुल कमाई',
                labelEn: 'Total Earned',
                color: 'from-purple-400 to-pink-400'
              }
            ].map((stat, i) => (
              <div 
                key={i} 
                className="bg-white/10 backdrop-blur-md rounded-2xl p-6 hover:bg-white/20 transition-all hover:scale-110 transform cursor-pointer group"
              >
                <div className={`inline-flex items-center justify-center w-16 h-16 rounded-full bg-gradient-to-r ${stat.color} mb-3 group-hover:rotate-12 transition-transform`}>
                  {stat.icon}
                </div>
                <div className="text-4xl font-black mb-2">{stat.value}</div>
                <div className="text-sm font-bold text-orange-100 nepali-text">{stat.label}</div>
                <div className="text-xs text-orange-200">{stat.labelEn}</div>
              </div>
            ))}
          </div>

          {/* CTA Buttons */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center mt-12">
            <button className="group bg-white text-red-600 px-8 py-4 rounded-full text-lg font-bold hover:shadow-2xl transition-all hover:scale-110 flex items-center justify-center gap-2">
              <span className="text-2xl group-hover:rotate-12 transition-transform">🎨</span>
              म फ्रीलान्सर हुँ
            </button>
            <button className="group bg-gradient-to-r from-yellow-400 to-orange-400 text-gray-900 px-8 py-4 rounded-full text-lg font-bold hover:shadow-2xl transition-all hover:scale-110 flex items-center justify-center gap-2">
              <span className="text-2xl group-hover:rotate-12 transition-transform">💼</span>
              म काम खोज्दै छु
            </button>
          </div>
        </div>
      </div>
    </section>
  )
}
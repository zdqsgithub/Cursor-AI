'use client'

import React, { useState, useEffect } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { motion } from 'framer-motion'
import Navbar from '@/components/Navbar'

// Mock data for featured creators
const featuredCreators = [
  {
    id: 1,
    username: 'artisan_craft',
    avatar: '/images/avatar1.jpg',
    category: 'Art & Design',
    description: 'Digital painter creating fantasy worlds and characters',
    followers: 1245
  },
  {
    id: 2,
    username: 'tech_insider',
    avatar: '/images/avatar2.jpg',
    category: 'Technology',
    description: 'Sharing cutting-edge tech reviews and insider news',
    followers: 3210
  },
  {
    id: 3,
    username: 'fitness_journey',
    avatar: '/images/avatar3.jpg',
    category: 'Fitness',
    description: 'Personal trainer sharing workout routines and nutrition tips',
    followers: 4527
  },
  {
    id: 4,
    username: 'culinary_adventures',
    avatar: '/images/avatar4.jpg',
    category: 'Food',
    description: 'Chef exploring cuisines from around the world',
    followers: 1872
  }
]

// Mock testimonials
const testimonials = [
  {
    id: 1,
    text: "vAmicus has completely transformed how I monetize my content. I've been able to connect with fans on a deeper level and earn more doing what I love.",
    author: "Michelle K.",
    role: "Digital Artist"
  },
  {
    id: 2,
    text: "As a supporter, I love how vAmicus lets me directly support my favorite creators. The exclusive content is always worth it!",
    author: "Jason T.",
    role: "Content Supporter"
  },
  {
    id: 3,
    text: "The platform is so intuitive and makes managing my different content tiers effortless. My audience has grown significantly since joining.",
    author: "Sam L.",
    role: "Fitness Creator"
  }
]

export default function HomePage() {
  const [isScrolled, setIsScrolled] = useState(false)

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50)
    }
    
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1
      }
    }
  }

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: { y: 0, opacity: 1 }
  }

  return (
    <div className="min-h-screen bg-amber-50">
      <Navbar />
      
      {/* Hero Section */}
      <section className="relative overflow-hidden bg-gradient-to-r from-amber-50 to-amber-100 pt-24 pb-32">
        <div className="absolute inset-0 z-0 overflow-hidden">
          <div className="blob1 opacity-20"></div>
          <div className="blob2 opacity-20"></div>
        </div>
        <div className="container mx-auto px-4 relative z-10">
          <motion.div 
            className="max-w-4xl mx-auto text-center"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7 }}
          >
            <h1 className="text-4xl md:text-6xl font-bold mb-6 gradient-text leading-tight">
              Connect with Creators, Unlock Exclusive Content
            </h1>
            <p className="text-lg md:text-xl text-amber-800 mb-10 max-w-3xl mx-auto">
              Join vAmicus, the content platform where creators thrive and supporters get exclusive access to premium content from their favorite creators.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link href="/signup" className="btn-primary text-lg py-4 px-8">
                Start Creating
              </Link>
              <Link href="/discover" className="btn-secondary text-lg py-4 px-8">
                Discover Creators
              </Link>
            </div>
          </motion.div>
        </div>
      </section>
      
      {/* Featured Creators Section */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-4">
          <motion.div 
            className="text-center mb-16"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
          >
            <h2 className="text-3xl md:text-4xl font-bold gradient-text mb-4">Featured Creators</h2>
            <p className="text-amber-800 text-lg max-w-2xl mx-auto">
              Discover trending creators from various fields who are sharing amazing content with their supporters
            </p>
          </motion.div>
          
          <motion.div 
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8"
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
          >
            {featuredCreators.map((creator) => (
              <motion.div 
                key={creator.id}
                className="bg-amber-50 border border-amber-200 rounded-xl overflow-hidden shadow-sm hover:shadow-md transition-shadow duration-300"
                variants={itemVariants}
              >
                <div className="relative h-48 bg-amber-100">
                  <div className="absolute inset-0 flex items-center justify-center">
                    <span className="text-amber-700 text-5xl font-bold opacity-20">vA</span>
                  </div>
                </div>
                <div className="p-6 relative">
                  <div className="absolute -top-10 left-1/2 transform -translate-x-1/2 w-20 h-20 rounded-full bg-amber-100 border-4 border-white overflow-hidden flex items-center justify-center">
                    <span className="text-2xl font-bold text-amber-700">{creator.username.charAt(0).toUpperCase()}</span>
                  </div>
                  <div className="mt-10 text-center">
                    <span className="inline-block text-xs font-medium bg-amber-100 text-amber-800 rounded-full px-3 py-1 mb-2">{creator.category}</span>
                    <h3 className="text-lg font-bold text-amber-900">@{creator.username}</h3>
                    <p className="text-amber-700 text-sm mt-2">{creator.description}</p>
                    <div className="mt-4 flex justify-center">
                      <Link href={`/creators/${creator.id}`} className="text-primary-600 hover:text-primary-700 text-sm font-medium">
                        View Profile →
                      </Link>
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}
          </motion.div>
          
          <div className="text-center mt-12">
            <Link href="/discover" className="btn-secondary inline-block">
              Explore All Creators
            </Link>
          </div>
        </div>
      </section>
      
      {/* How It Works Section */}
      <section className="py-20 bg-amber-50">
        <div className="container mx-auto px-4">
          <motion.div 
            className="text-center mb-16"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
          >
            <h2 className="text-3xl md:text-4xl font-bold gradient-text mb-4">How It Works</h2>
            <p className="text-amber-800 text-lg max-w-2xl mx-auto">
              vAmicus provides a seamless platform for creators and supporters to connect
            </p>
          </motion.div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-10 max-w-5xl mx-auto">
            <motion.div 
              className="bg-white border border-amber-200 rounded-xl p-8 shadow-sm"
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.1 }}
            >
              <div className="w-14 h-14 bg-amber-100 rounded-full flex items-center justify-center text-amber-900 mb-6">
                <span className="text-2xl font-bold">1</span>
              </div>
              <h3 className="text-xl font-bold text-amber-900 mb-4">For Creators</h3>
              <ul className="space-y-4">
                <li className="flex items-start">
                  <svg className="w-5 h-5 text-green-600 mt-0.5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path>
                  </svg>
                  <span className="text-amber-800">Sign up and create your profile</span>
                </li>
                <li className="flex items-start">
                  <svg className="w-5 h-5 text-green-600 mt-0.5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path>
                  </svg>
                  <span className="text-amber-800">Set up subscription tiers and pricing</span>
                </li>
                <li className="flex items-start">
                  <svg className="w-5 h-5 text-green-600 mt-0.5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path>
                  </svg>
                  <span className="text-amber-800">Upload exclusive content for your supporters</span>
                </li>
                <li className="flex items-start">
                  <svg className="w-5 h-5 text-green-600 mt-0.5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path>
                  </svg>
                  <span className="text-amber-800">Earn revenue from your supporters' subscriptions</span>
                </li>
              </ul>
            </motion.div>
            
            <motion.div 
              className="bg-white border border-amber-200 rounded-xl p-8 shadow-sm"
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.2 }}
            >
              <div className="w-14 h-14 bg-amber-100 rounded-full flex items-center justify-center text-amber-900 mb-6">
                <span className="text-2xl font-bold">2</span>
              </div>
              <h3 className="text-xl font-bold text-amber-900 mb-4">For Supporters</h3>
              <ul className="space-y-4">
                <li className="flex items-start">
                  <svg className="w-5 h-5 text-green-600 mt-0.5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path>
                  </svg>
                  <span className="text-amber-800">Discover creators that match your interests</span>
                </li>
                <li className="flex items-start">
                  <svg className="w-5 h-5 text-green-600 mt-0.5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path>
                  </svg>
                  <span className="text-amber-800">Subscribe to your favorite creators</span>
                </li>
                <li className="flex items-start">
                  <svg className="w-5 h-5 text-green-600 mt-0.5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path>
                  </svg>
                  <span className="text-amber-800">Access exclusive content from your subscriptions</span>
                </li>
                <li className="flex items-start">
                  <svg className="w-5 h-5 text-green-600 mt-0.5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path>
                  </svg>
                  <span className="text-amber-800">Interact directly with creators through comments</span>
                </li>
              </ul>
            </motion.div>
          </div>
        </div>
      </section>
      
      {/* Testimonials Section */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-4">
          <motion.div 
            className="text-center mb-16"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
          >
            <h2 className="text-3xl md:text-4xl font-bold gradient-text mb-4">What Our Users Say</h2>
            <p className="text-amber-800 text-lg max-w-2xl mx-auto">
              Hear from creators and supporters who have found success on vAmicus
            </p>
          </motion.div>
          
          <motion.div 
            className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-5xl mx-auto"
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
          >
            {testimonials.map((testimonial) => (
              <motion.div 
                key={testimonial.id}
                className="bg-amber-50 border border-amber-200 rounded-xl p-6 shadow-sm"
                variants={itemVariants}
              >
                <div className="mb-4">
                  {[1, 2, 3, 4, 5].map((star) => (
                    <svg key={star} className="w-5 h-5 text-yellow-500 inline-block" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                      <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118l-2.8-2.034c-.783-.57-.38-1.81.588-1.81h3.462a1 1 0 00.95-.69l1.07-3.292z"></path>
                    </svg>
                  ))}
                </div>
                <p className="text-amber-800 mb-6 italic">"{testimonial.text}"</p>
                <div className="flex items-center">
                  <div className="w-10 h-10 bg-amber-200 rounded-full flex items-center justify-center text-amber-700 font-bold">
                    {testimonial.author.charAt(0)}
                  </div>
                  <div className="ml-3">
                    <p className="font-medium text-amber-900">{testimonial.author}</p>
                    <p className="text-xs text-amber-700">{testimonial.role}</p>
                  </div>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>
      
      {/* CTA Section */}
      <section className="py-20 bg-gradient-to-r from-amber-100 to-amber-50">
        <div className="container mx-auto px-4">
          <motion.div 
            className="max-w-3xl mx-auto text-center"
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
          >
            <h2 className="text-3xl md:text-4xl font-bold gradient-text mb-6">Ready to Start Your Creator Journey?</h2>
            <p className="text-amber-800 text-lg mb-10">
              Join thousands of creators who are earning directly from their passionate supporters. Sign up today and start monetizing your content.
            </p>
            <Link href="/signup" className="btn-primary text-lg py-4 px-10">
              Create Your Account
            </Link>
          </motion.div>
        </div>
      </section>
      
      {/* Footer */}
      <footer className="bg-amber-900 text-amber-100 py-16">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10">
            <div>
              <h3 className="text-2xl font-bold mb-6">vAmicus</h3>
              <p className="text-amber-200 mb-6">
                The content platform where creators thrive and supporters get exclusive access to premium content.
              </p>
              <div className="flex space-x-4">
                <a href="#" className="text-amber-200 hover:text-white transition-colors">
                  <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                    <path d="M22 12c0-5.523-4.477-10-10-10S2 6.477 2 12c0 4.991 3.657 9.128 8.438 9.878v-6.987h-2.54V12h2.54V9.797c0-2.506 1.492-3.89 3.777-3.89 1.094 0 2.238.195 2.238.195v2.46h-1.26c-1.243 0-1.63.771-1.63 1.562V12h2.773l-.443 2.89h-2.33v6.988C18.343 21.128 22 16.991 22 12z"></path>
                  </svg>
                </a>
                <a href="#" className="text-amber-200 hover:text-white transition-colors">
                  <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                    <path d="M23.953 4.57a10 10 0 01-2.825.775 4.958 4.958 0 002.163-2.723 10.03 10.03 0 01-3.127 1.184 4.92 4.92 0 00-8.384 4.482C7.69 8.095 4.067 6.13 1.64 3.162a4.822 4.822 0 00-.666 2.475c0 1.71.87 3.213 2.188 4.096a4.904 4.904 0 01-2.228-.616v.06a4.923 4.923 0 003.946 4.827 4.996 4.996 0 01-2.212.085 4.936 4.936 0 004.604 3.417 9.867 9.867 0 01-6.102 2.105c-.39 0-.779-.023-1.17-.067a13.995 13.995 0 007.557 2.209c9.053 0 13.998-7.496 13.998-13.985 0-.21 0-.42-.015-.63A9.935 9.935 0 0024 4.59z"></path>
                  </svg>
                </a>
                <a href="#" className="text-amber-200 hover:text-white transition-colors">
                  <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                    <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zM12 0C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.052.014 8.333 0 8.741 0 12c0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98C8.333 23.986 8.741 24 12 24c3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98C15.668.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 100 12.324 6.162 6.162 0 000-12.324zM12 16a4 4 0 110-8 4 4 0 010 8zm6.406-11.845a1.44 1.44 0 100 2.881 1.44 1.44 0 000-2.881z"></path>
                  </svg>
                </a>
              </div>
            </div>
            <div>
              <h4 className="text-lg font-semibold mb-4">Product</h4>
              <ul className="space-y-2">
                <li><a href="#" className="text-amber-200 hover:text-white transition-colors">Features</a></li>
                <li><a href="#" className="text-amber-200 hover:text-white transition-colors">Pricing</a></li>
                <li><a href="#" className="text-amber-200 hover:text-white transition-colors">For Creators</a></li>
                <li><a href="#" className="text-amber-200 hover:text-white transition-colors">For Supporters</a></li>
              </ul>
            </div>
            <div>
              <h4 className="text-lg font-semibold mb-4">Company</h4>
              <ul className="space-y-2">
                <li><a href="#" className="text-amber-200 hover:text-white transition-colors">About Us</a></li>
                <li><a href="#" className="text-amber-200 hover:text-white transition-colors">Careers</a></li>
                <li><a href="#" className="text-amber-200 hover:text-white transition-colors">Blog</a></li>
                <li><a href="#" className="text-amber-200 hover:text-white transition-colors">Contact</a></li>
              </ul>
            </div>
            <div>
              <h4 className="text-lg font-semibold mb-4">Resources</h4>
              <ul className="space-y-2">
                <li><a href="#" className="text-amber-200 hover:text-white transition-colors">Help Center</a></li>
                <li><a href="#" className="text-amber-200 hover:text-white transition-colors">Creator Guide</a></li>
                <li><a href="#" className="text-amber-200 hover:text-white transition-colors">Community</a></li>
                <li><a href="#" className="text-amber-200 hover:text-white transition-colors">Terms of Service</a></li>
                <li><a href="#" className="text-amber-200 hover:text-white transition-colors">Privacy Policy</a></li>
              </ul>
            </div>
          </div>
          <div className="border-t border-amber-800 mt-12 pt-8 text-center">
            <p className="text-amber-300">&copy; {new Date().getFullYear()} vAmicus. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  )
} 
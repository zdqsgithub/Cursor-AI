'use client'

import React, { useState, useEffect } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { motion } from 'framer-motion'
import Navbar from '@/components/Navbar'

interface Creator {
  id: string
  username: string
  profileImage: string
  bio: string
  subscriberCount: number
  contentCount: number
  tags?: string[]
  featured?: boolean
  previewImages?: string[]
  price?: number
  popularContent?: {
    title: string
    type: 'image' | 'video' | 'text' | 'audio'
    thumbnail: string
    likes: number
  }[]
}

export default function DiscoverPage() {
  const [creators, setCreators] = useState<Creator[]>([])
  const [loading, setLoading] = useState(true)
  const [searchTerm, setSearchTerm] = useState('')
  const [activeFilter, setActiveFilter] = useState('all')
  const [selectedTags, setSelectedTags] = useState<string[]>([])
  const [displayMode, setDisplayMode] = useState<'grid' | 'masonry'>('masonry')

  const allTags = ['Art', 'Music', 'Writing', 'Programming', 'Gaming', 'Design', 'Photography', 'Education', 'Fitness', 'Crypto']

  useEffect(() => {
    // Simulate loading data
    setTimeout(() => {
      const mockCreators: Creator[] = [
        {
          id: '1',
          username: 'artmaster',
          profileImage: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-1.2.1&auto=format&fit=crop&w=200&q=80',
          bio: 'Digital artist creating stunning visuals and NFT collections',
          subscriberCount: 1204,
          contentCount: 48,
          tags: ['Art', 'Design'],
          featured: true,
          price: 15.99,
          previewImages: [
            'https://images.unsplash.com/photo-1580927752452-89d86da3fa0a?ixlib=rb-1.2.1&auto=format&fit=crop&w=1470&q=80',
            'https://images.unsplash.com/photo-1615184697985-c9bde1b07da7?ixlib=rb-1.2.1&auto=format&fit=crop&w=1470&q=80',
            'https://images.unsplash.com/photo-1547891654-e66ed7ebb968?ixlib=rb-1.2.1&auto=format&fit=crop&w=1470&q=80'
          ],
          popularContent: [
            {
              title: 'Digital Art Masterclass',
              type: 'video' as const,
              thumbnail: 'https://images.unsplash.com/photo-1580927752452-89d86da3fa0a?ixlib=rb-1.2.1&auto=format&fit=crop&w=1470&q=80',
              likes: 342
            },
            {
              title: 'Latest NFT Collection',
              type: 'image' as const,
              thumbnail: 'https://images.unsplash.com/photo-1547891654-e66ed7ebb968?ixlib=rb-1.2.1&auto=format&fit=crop&w=1470&q=80',
              likes: 218
            }
          ]
        },
        {
          id: '2',
          username: 'musicproducer',
          profileImage: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?ixlib=rb-1.2.1&auto=format&fit=crop&w=200&q=80',
          bio: 'Electronic music producer sharing beats and tutorials',
          subscriberCount: 843,
          contentCount: 32,
          tags: ['Music'],
          featured: true,
          price: 12.99,
          previewImages: [
            'https://images.unsplash.com/photo-1511379938547-c1f69419868d?ixlib=rb-1.2.1&auto=format&fit=crop&w=1470&q=80',
            'https://images.unsplash.com/photo-1520166012586-2ce8dbae0c44?ixlib=rb-1.2.1&auto=format&fit=crop&w=1484&q=80',
            'https://images.unsplash.com/photo-1470225620780-dba8ba36b745?ixlib=rb-1.2.1&auto=format&fit=crop&w=1470&q=80'
          ],
          popularContent: [
            {
              title: 'New Beat Release',
              type: 'audio' as const,
              thumbnail: 'https://images.unsplash.com/photo-1511379938547-c1f69419868d?ixlib=rb-1.2.1&auto=format&fit=crop&w=1470&q=80',
              likes: 521
            }
          ]
        },
        {
          id: '3',
          username: 'techwriter',
          profileImage: 'https://images.unsplash.com/photo-1539571696357-5a69c17a67c6?ixlib=rb-1.2.1&auto=format&fit=crop&w=200&q=80',
          bio: 'Writing about the latest in technology and programming',
          subscriberCount: 562,
          contentCount: 25,
          tags: ['Writing', 'Programming'],
          featured: false,
          price: 9.99,
          previewImages: [
            'https://images.unsplash.com/photo-1486312338219-ce68d2c6f44d?ixlib=rb-1.2.1&auto=format&fit=crop&w=1472&q=80',
            'https://images.unsplash.com/photo-1461749280684-dccba630e2f6?ixlib=rb-1.2.1&auto=format&fit=crop&w=1469&q=80',
            'https://images.unsplash.com/photo-1498050108023-c5249f4df085?ixlib=rb-1.2.1&auto=format&fit=crop&w=1472&q=80'
          ]
        },
        {
          id: '4',
          username: 'gamestrategy',
          profileImage: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?ixlib=rb-1.2.1&auto=format&fit=crop&w=200&q=80',
          bio: 'Professional gamer sharing strategies and gameplay',
          subscriberCount: 1532,
          contentCount: 67,
          tags: ['Gaming'],
          featured: false,
          price: 19.99,
          previewImages: [
            'https://images.unsplash.com/photo-1493711662062-fa541adb3fc8?ixlib=rb-1.2.1&auto=format&fit=crop&w=1470&q=80',
            'https://images.unsplash.com/photo-1511512578047-dfb367046420?ixlib=rb-1.2.1&auto=format&fit=crop&w=1471&q=80',
            'https://images.unsplash.com/photo-1550745165-9bc0b252726f?ixlib=rb-1.2.1&auto=format&fit=crop&w=1470&q=80'
          ],
          popularContent: [
            {
              title: 'Ultimate Gaming Setup Tour',
              type: 'video' as const,
              thumbnail: 'https://images.unsplash.com/photo-1550745165-9bc0b252726f?ixlib=rb-1.2.1&auto=format&fit=crop&w=1470&q=80',
              likes: 876
            }
          ]
        },
        {
          id: '5',
          username: 'photoexpert',
          profileImage: 'https://images.unsplash.com/photo-1517841905240-472988babdf9?ixlib=rb-1.2.1&auto=format&fit=crop&w=200&q=80',
          bio: 'Photographer sharing stunning landscapes and portrait photography',
          subscriberCount: 976,
          contentCount: 89,
          tags: ['Photography'],
          featured: true,
          price: 14.99,
          previewImages: [
            'https://images.unsplash.com/photo-1500051638674-ff996a0ec29e?ixlib=rb-1.2.1&auto=format&fit=crop&w=1374&q=80',
            'https://images.unsplash.com/photo-1505158498176-0150297fbd7d?ixlib=rb-1.2.1&auto=format&fit=crop&w=1374&q=80',
            'https://images.unsplash.com/photo-1554080353-a576cf803bda?ixlib=rb-1.2.1&auto=format&fit=crop&w=1374&q=80'
          ],
          popularContent: [
            {
              title: 'Portrait Photography Masterclass',
              type: 'video' as const,
              thumbnail: 'https://images.unsplash.com/photo-1554080353-a576cf803bda?ixlib=rb-1.2.1&auto=format&fit=crop&w=1374&q=80',
              likes: 456
            }
          ]
        },
        {
          id: '6',
          username: 'codetutor',
          profileImage: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?ixlib=rb-1.2.1&auto=format&fit=crop&w=200&q=80',
          bio: 'Teaching coding and software development through practical projects',
          subscriberCount: 2154,
          contentCount: 103,
          tags: ['Programming', 'Education'],
          featured: false,
          price: 24.99,
          previewImages: [
            'https://images.unsplash.com/photo-1542831371-29b0f74f9713?ixlib=rb-1.2.1&auto=format&fit=crop&w=1470&q=80',
            'https://images.unsplash.com/photo-1517694712202-14dd9538aa97?ixlib=rb-1.2.1&auto=format&fit=crop&w=1470&q=80',
            'https://images.unsplash.com/photo-1571171637578-41bc2dd41cd2?ixlib=rb-1.2.1&auto=format&fit=crop&w=1470&q=80'
          ],
          popularContent: [
            {
              title: 'Full-Stack Development Bootcamp',
              type: 'video' as const,
              thumbnail: 'https://images.unsplash.com/photo-1542831371-29b0f74f9713?ixlib=rb-1.2.1&auto=format&fit=crop&w=1470&q=80',
              likes: 1243
            }
          ]
        },
        {
          id: '7',
          username: 'fitnesscoach',
          profileImage: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?ixlib=rb-1.2.1&auto=format&fit=crop&w=200&q=80',
          bio: 'Fitness instructor sharing workout routines and nutrition tips',
          subscriberCount: 3254,
          contentCount: 78,
          tags: ['Fitness'],
          featured: true,
          price: 19.99,
          previewImages: [
            'https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?ixlib=rb-1.2.1&auto=format&fit=crop&w=1470&q=80',
            'https://images.unsplash.com/photo-1517836357463-d25dfeac3438?ixlib=rb-1.2.1&auto=format&fit=crop&w=1470&q=80',
            'https://images.unsplash.com/photo-1583454110551-21f2fa2afe61?ixlib=rb-1.2.1&auto=format&fit=crop&w=1470&q=80'
          ]
        },
        {
          id: '8',
          username: 'cryptoanalyst',
          profileImage: 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?ixlib=rb-1.2.1&auto=format&fit=crop&w=200&q=80',
          bio: 'Cryptocurrency expert sharing market insights and investment strategies',
          subscriberCount: 1879,
          contentCount: 41,
          tags: ['Crypto', 'Education'],
          featured: false,
          price: 29.99,
          previewImages: [
            'https://images.unsplash.com/photo-1639762681057-408e52192e55?ixlib=rb-1.2.1&auto=format&fit=crop&w=1633&q=80',
            'https://images.unsplash.com/photo-1590283603385-17ffb3a7f29f?ixlib=rb-1.2.1&auto=format&fit=crop&w=1470&q=80',
            'https://images.unsplash.com/photo-1518544866330-97f715ba89bd?ixlib=rb-1.2.1&auto=format&fit=crop&w=1374&q=80'
          ]
        },
      ]
      setCreators(mockCreators)
      setLoading(false)
    }, 1500)
  }, [])

  const handleTagToggle = (tag: string) => {
    setSelectedTags(prev => 
      prev.includes(tag) 
        ? prev.filter(t => t !== tag) 
        : [...prev, tag]
    )
  }

  const filteredCreators = creators.filter(creator => {
    // Search filter
    const matchesSearch = creator.username.toLowerCase().includes(searchTerm.toLowerCase()) || 
                         creator.bio.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         creator.tags?.some(tag => tag.toLowerCase().includes(searchTerm.toLowerCase()))
    
    // Category filter                     
    const matchesFilter = activeFilter === 'all' || 
                         (activeFilter === 'featured' && creator.featured) ||
                         (creator.tags && selectedTags.length > 0 
                           ? creator.tags.some(tag => selectedTags.includes(tag))
                           : selectedTags.length === 0)
                         
    return matchesSearch && matchesFilter
  })

  const container = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1
      }
    }
  }

  const item = {
    hidden: { y: 20, opacity: 0 },
    show: { y: 0, opacity: 1, transition: { duration: 0.5 } }
  }

  const getRandomHeight = () => {
    // Assign random heights to create a masonry effect
    const heights = [300, 350, 400, 450, 500]
    return heights[Math.floor(Math.random() * heights.length)]
  }

  return (
    <>
      <Navbar />
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
        <motion.div 
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="text-center mb-10"
        >
          <h1 className="text-4xl font-extrabold gradient-text mb-4">Discover Amazing Creators</h1>
          <p className="text-xl text-amber-800 dark:text-amber-900 max-w-3xl mx-auto">
            Find and support talented creators sharing exceptional content in their fields
          </p>
        </motion.div>

        <div className="mb-8">
          <motion.div 
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3, delay: 0.2 }}
            className="flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0 md:space-x-4"
          >
            <div className="relative w-full md:w-96">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <svg className="h-5 w-5 text-amber-600" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                </svg>
              </div>
              <input
                type="text"
                placeholder="Search creators, tags, or content..."
                className="input-field pl-10"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
            
            <div className="flex items-center space-x-3">
              <div className="flex space-x-2">
                <button 
                  onClick={() => setActiveFilter('all')} 
                  className={`px-4 py-2 rounded-full transition-all ${
                    activeFilter === 'all' 
                      ? 'bg-primary-500 text-white' 
                      : 'bg-amber-100 dark:bg-amber-200 hover:bg-amber-200 dark:hover:bg-amber-300 text-amber-800'
                  }`}
                >
                  All
                </button>
                <button 
                  onClick={() => setActiveFilter('featured')} 
                  className={`px-4 py-2 rounded-full transition-all ${
                    activeFilter === 'featured' 
                      ? 'bg-primary-500 text-white' 
                      : 'bg-amber-100 dark:bg-amber-200 hover:bg-amber-200 dark:hover:bg-amber-300 text-amber-800'
                  }`}
                >
                  Featured
                </button>
              </div>

              <div className="flex items-center border-l border-amber-300 pl-3 space-x-2">
                <button 
                  onClick={() => setDisplayMode('grid')}
                  className={`p-2 rounded ${displayMode === 'grid' ? 'bg-amber-200 text-amber-900' : 'text-amber-700'}`}
                >
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2V6z" />
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2V6z" />
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2v-2z" />
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2v-2z" />
                  </svg>
                </button>
                <button 
                  onClick={() => setDisplayMode('masonry')}
                  className={`p-2 rounded ${displayMode === 'masonry' ? 'bg-amber-200 text-amber-900' : 'text-amber-700'}`}
                >
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 5a1 1 0 011-1h14a1 1 0 011 1v2a1 1 0 01-1 1H5a1 1 0 01-1-1V5z" />
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 13a1 1 0 011-1h6a1 1 0 011 1v6a1 1 0 01-1 1H5a1 1 0 01-1-1v-6z" />
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 13a1 1 0 011-1h2a1 1 0 011 1v6a1 1 0 01-1 1h-2a1 1 0 01-1-1v-6z" />
                  </svg>
                </button>
              </div>
            </div>
          </motion.div>
          
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.3, delay: 0.4 }}
            className="mt-4 flex flex-wrap gap-2"
          >
            {allTags.map((tag) => (
              <button
                key={tag}
                onClick={() => handleTagToggle(tag)}
                className={`px-3 py-1 text-sm rounded-full transition-all ${
                  selectedTags.includes(tag)
                    ? 'bg-secondary-500 text-white'
                    : 'bg-amber-100 dark:bg-amber-200 hover:bg-amber-200 dark:hover:bg-amber-300 text-amber-800'
                }`}
              >
                {tag}
              </button>
            ))}
          </motion.div>
        </div>

        {loading ? (
          <div className="flex justify-center items-center h-64">
            <div className="animate-pulse-slow flex flex-col items-center">
              <div className="w-16 h-16 border-4 border-primary-600 border-t-transparent rounded-full animate-spin"></div>
              <p className="mt-4 text-amber-800">Discovering creators...</p>
            </div>
          </div>
        ) : filteredCreators.length === 0 ? (
          <div className="text-center py-12">
            <svg className="mx-auto h-16 w-16 text-amber-400" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" />
            </svg>
            <h3 className="mt-4 text-lg font-medium text-amber-900">No creators found</h3>
            <p className="mt-2 text-amber-700">Try adjusting your search or filter to find what you're looking for.</p>
          </div>
        ) : (
          <>
            {displayMode === 'grid' ? (
              // Standard grid view
              <motion.div 
                variants={container}
                initial="hidden"
                animate="show"
                className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
              >
                {filteredCreators.map((creator) => (
                  <motion.div 
                    key={creator.id} 
                    variants={item}
                    className="creator-card card hover:shadow-xl relative group overflow-hidden"
                  >
                    <div className="absolute inset-0 bg-gradient-to-t from-black to-transparent opacity-0 group-hover:opacity-70 transition-opacity z-10"></div>
                    
                    <div className="flex items-center mb-4">
                      <div className="relative w-14 h-14 overflow-hidden rounded-full border-2 border-primary-500">
                        <Image
                          src={creator.profileImage}
                          alt={creator.username}
                          fill
                          className="object-cover"
                        />
                      </div>
                      <div className="ml-4">
                        <h3 className="text-lg font-semibold">{creator.username}</h3>
                        <div className="flex items-center space-x-2">
                          {creator.featured && (
                            <span className="bg-gradient-to-r from-amber-500 to-pink-500 text-white text-xs px-2 py-0.5 rounded-full">
                              Featured
                            </span>
                          )}
                          <div className="flex space-x-1">
                            {creator.tags?.slice(0, 2).map(tag => (
                              <span key={tag} className="text-xs text-gray-500 dark:text-gray-400">#{tag}</span>
                            ))}
                          </div>
                        </div>
                      </div>
                    </div>
                    
                    <p className="text-sm text-amber-800 dark:text-amber-900 mb-3 line-clamp-2">{creator.bio}</p>
                    
                    {creator.previewImages && (
                      <div className="grid grid-cols-3 gap-2 mb-4 h-36">
                        {creator.previewImages.slice(0, 3).map((image, index) => (
                          <div key={index} className="relative rounded-lg overflow-hidden h-full">
                            <Image
                              src={image}
                              alt={`${creator.username} preview ${index + 1}`}
                              fill
                              className="object-cover hover:scale-110 transition-transform duration-500"
                            />
                          </div>
                        ))}
                      </div>
                    )}
                    
                    <div className="flex justify-between text-sm">
                      <div className="flex items-center text-amber-700 dark:text-amber-800">
                        <svg className="h-4 w-4 mr-1" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z" />
                        </svg>
                        {creator.subscriberCount.toLocaleString()} subscribers
                      </div>
                      <div className="flex items-center text-amber-700 dark:text-amber-800">
                        <svg className="h-4 w-4 mr-1" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" />
                        </svg>
                        {creator.contentCount} contents
                      </div>
                    </div>
                    
                    <div className="mt-4 pt-4 border-t border-gray-200 dark:border-gray-700 flex justify-between items-center">
                      <div className="text-primary-600 dark:text-primary-400 font-semibold">
                        ${creator.price?.toFixed(2)}/month
                      </div>
                      <Link 
                        href={`/creators/${creator.id}`}
                        className="btn-primary py-2 px-4"
                      >
                        Subscribe
                      </Link>
                    </div>
                    
                    <Link 
                      href={`/creators/${creator.id}`}
                      className="absolute inset-0 z-20 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity"
                    >
                      <span className="btn-primary py-2 px-6">View Profile</span>
                    </Link>
                  </motion.div>
                ))}
              </motion.div>
            ) : (
              // Masonry layout (inspired by Xiaohongshu)
              <motion.div 
                variants={container}
                initial="hidden"
                animate="show"
                className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6"
              >
                {filteredCreators.map((creator) => {
                  // Compute random height for masonry effect
                  const cardHeight = creator.popularContent && creator.popularContent.length > 0 
                    ? 'auto' 
                    : `${getRandomHeight()}px`
                  
                  return (
                    <motion.div 
                      key={creator.id} 
                      variants={item}
                      className="creator-card card hover:shadow-xl relative group overflow-hidden"
                      style={{ minHeight: cardHeight }}
                    >
                      <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent opacity-0 group-hover:opacity-100 transition-opacity z-10"></div>
                      
                      {// Popular Content Preview - OnlyFans inspired
                      creator.popularContent && creator.popularContent.length > 0 ? (
                        <div className="relative h-64 mb-4 rounded-lg overflow-hidden">
                          <Image
                            src={creator.popularContent[0].thumbnail}
                            alt={creator.popularContent[0].title}
                            fill
                            className="object-cover"
                          />
                          
                          <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent"></div>
                          
                          <div className="absolute bottom-0 left-0 right-0 p-4">
                            <div className="flex items-center space-x-2 mb-1">
                              {creator.popularContent[0].type === 'video' && (
                                <svg className="h-5 w-5 text-white" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                                  <path d="M2 6a2 2 0 012-2h6a2 2 0 012 2v8a2 2 0 01-2 2H4a2 2 0 01-2-2V6zM14.553 7.106A1 1 0 0014 8v4a1 1 0 00.553.894l2 1A1 1 0 0018 13V7a1 1 0 00-1.447-.894l-2 1z"></path>
                                </svg>
                              )}
                              <h4 className="text-white font-medium truncate">{creator.popularContent[0].title}</h4>
                            </div>
                            <div className="flex items-center text-gray-200 text-sm">
                              <svg className="h-4 w-4 mr-1" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                                <path d="M2 10.5a1.5 1.5 0 113 0v6a1.5 1.5 0 01-3 0v-6zM6 10.333v5.43a2 2 0 001.106 1.79l.05.025A4 4 0 008.943 18h5.416a2 2 0 001.962-1.608l1.2-6A2 2 0 0015.56 8H12V4a2 2 0 00-2-2 1 1 0 00-1 1v.667a4 4 0 01-.8 2.4L6.8 7.933a4 4 0 00-.8 2.4z"></path>
                              </svg>
                              {creator.popularContent[0].likes} likes
                            </div>
                          </div>
                          
                          <div className="absolute top-4 right-4 bg-primary-500 text-white rounded-full px-2 py-1 text-xs font-semibold">
                            ${creator.price?.toFixed(2)}/mo
                          </div>
                        </div>
                      ) : (
                        // If no popular content, show a preview image
                        <div className="relative h-48 mb-4 rounded-lg overflow-hidden">
                          {creator.previewImages && creator.previewImages.length > 0 && (
                            <Image
                              src={creator.previewImages[0]}
                              alt={creator.username}
                              fill
                              className="object-cover"
                            />
                          )}
                          
                          <div className="absolute top-4 right-4 bg-primary-500 text-white rounded-full px-2 py-1 text-xs font-semibold">
                            ${creator.price?.toFixed(2)}/mo
                          </div>
                        </div>
                      )}
                      
                      <div className="flex items-center mb-3">
                        <div className="relative w-10 h-10 overflow-hidden rounded-full border-2 border-primary-500">
                          <Image
                            src={creator.profileImage}
                            alt={creator.username}
                            fill
                            className="object-cover"
                          />
                        </div>
                        <div className="ml-3">
                          <h3 className="text-base font-semibold">{creator.username}</h3>
                          <div className="flex items-center space-x-2 text-xs text-gray-500 dark:text-gray-400">
                            {creator.tags?.slice(0, 2).map(tag => (
                              <span key={tag}>#{tag}</span>
                            ))}
                            {creator.featured && (
                              <span className="text-amber-500">Featured</span>
                            )}
                          </div>
                        </div>
                      </div>
                      
                      <p className="text-sm text-amber-800 dark:text-amber-900 mb-3 line-clamp-2">{creator.bio}</p>
                      
                      <div className="flex justify-between text-xs">
                        <div className="flex items-center text-amber-700 dark:text-amber-800">
                          <svg className="h-3 w-3 mr-1" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z" />
                          </svg>
                          {creator.subscriberCount.toLocaleString()}
                        </div>
                        <div className="flex items-center text-amber-700 dark:text-amber-800">
                          <svg className="h-3 w-3 mr-1" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" />
                          </svg>
                          {creator.contentCount}
                        </div>
                      </div>
                      
                      <Link 
                        href={`/creators/${creator.id}`}
                        className="absolute inset-0 z-20 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity"
                      >
                        <span className="btn-primary py-2 px-6">Subscribe</span>
                      </Link>
                    </motion.div>
                  )
                })}
              </motion.div>
            )}
          
            <div className="text-center mt-10">
              <button className="btn-primary px-8 py-3">
                Load More Creators
              </button>
            </div>
          </>
        )}
      </div>
    </>
  )
} 
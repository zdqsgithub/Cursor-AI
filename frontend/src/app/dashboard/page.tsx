'use client'

import React, { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { useSelector } from 'react-redux'
import { RootState } from '@/redux/store'
import Link from 'next/link'
import Navbar from '@/components/Navbar'
import { motion } from 'framer-motion'

export default function DashboardPage() {
  const { user, isAuthenticated } = useSelector((state: RootState) => state.auth)
  const router = useRouter()
  const [isLoading, setIsLoading] = useState(true)
  const [stats, setStats] = useState({
    subscribers: 0,
    contentPublished: 0,
    earnings: 0
  })
  const [recentActivity, setRecentActivity] = useState<Array<{ id: string; type: string; title: string; date: string; amount?: number }>>([])
  const [activeTab, setActiveTab] = useState('overview')

  useEffect(() => {
    // Redirect if not authenticated or not a creator
    if (!isAuthenticated) {
      router.push('/login')
      return
    }

    if (user?.role !== 'CREATOR') {
      router.push('/discover')
      return
    }

    // Fetch dashboard data
    // This would be replaced with actual API calls
    const fetchDashboardData = async () => {
      // Simulate API call
      setTimeout(() => {
        setStats({
          subscribers: 156,
          contentPublished: 24,
          earnings: 1254.32
        })

        // Simulate fetching recent activity
        setRecentActivity([
          { id: '1', type: 'subscription', title: 'New Subscriber: johndoe', date: '2023-09-15', amount: 15.00 },
          { id: '2', type: 'content', title: 'Published: "Creating Digital Art"', date: '2023-09-12' },
          { id: '3', type: 'payment', title: 'Content Purchase: Tutorial Bundle', date: '2023-09-10', amount: 45.99 },
          { id: '4', type: 'subscription', title: 'New Subscriber: creative_mind', date: '2023-09-08', amount: 15.00 },
          { id: '5', type: 'content', title: 'Published: "Advanced Techniques"', date: '2023-09-05' },
        ])

        setIsLoading(false)
      }, 1000)
    }

    fetchDashboardData()
  }, [isAuthenticated, user, router])

  const fadeIn = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0 }
  }

  const container = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1
      }
    }
  }

  const getActivityIcon = (type: string) => {
    switch (type) {
      case 'subscription':
        return (
          <div className="w-10 h-10 bg-amber-100 rounded-full flex items-center justify-center text-primary-600">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
            </svg>
          </div>
        )
      case 'content':
        return (
          <div className="w-10 h-10 bg-amber-100 rounded-full flex items-center justify-center text-green-600">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
            </svg>
          </div>
        )
      case 'payment':
        return (
          <div className="w-10 h-10 bg-amber-100 rounded-full flex items-center justify-center text-orange-600">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
          </div>
        )
      default:
        return (
          <div className="w-10 h-10 bg-amber-100 rounded-full flex items-center justify-center text-amber-600">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
          </div>
        )
    }
  }

  if (!isAuthenticated || user?.role !== 'CREATOR') {
    return null
  }

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-amber-50">
        <div className="animate-pulse-slow flex flex-col items-center">
          <div className="w-16 h-16 border-4 border-primary-500 border-t-transparent rounded-full animate-spin"></div>
          <p className="mt-4 text-amber-800">Loading your dashboard...</p>
        </div>
      </div>
    )
  }

  return (
    <>
      <Navbar />
      <div className="min-h-screen bg-amber-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
          <motion.div 
            initial="hidden"
            animate="visible"
            variants={fadeIn}
            className="bg-white shadow-md rounded-xl p-6 mb-8 border border-amber-200"
          >
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-6">
              <div>
                <h1 className="text-2xl font-bold gradient-text">Welcome back, {user?.username || 'Creator'}!</h1>
                <p className="text-amber-800 mt-1">Here's what's happening with your content</p>
              </div>
              <div className="mt-4 sm:mt-0">
                <Link href="/content/create" className="btn-primary">
                  <span className="flex items-center">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
                    </svg>
                    Create New Content
                  </span>
                </Link>
              </div>
            </div>

            <div className="border-b border-amber-200">
              <nav className="-mb-px flex space-x-8">
                {['overview', 'content', 'subscribers', 'earnings'].map((tab) => (
                  <button
                    key={tab}
                    onClick={() => setActiveTab(tab)}
                    className={`${
                      activeTab === tab
                        ? 'border-primary-500 text-primary-600'
                        : 'border-transparent text-amber-700 hover:text-amber-900 hover:border-amber-300'
                    } whitespace-nowrap py-4 px-1 border-b-2 font-medium capitalize transition-colors duration-200`}
                  >
                    {tab}
                  </button>
                ))}
              </nav>
            </div>
          </motion.div>

          {activeTab === 'overview' && (
            <>
              <motion.div 
                initial="hidden"
                animate="visible"
                variants={container}
                className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mb-8"
              >
                <motion.div variants={fadeIn} className="bg-white border border-amber-200 p-6 rounded-xl shadow-sm hover:shadow-md transition-shadow duration-300">
                  <div className="flex items-center">
                    <div className="flex-shrink-0">
                      <div className="w-12 h-12 bg-amber-100 rounded-full flex items-center justify-center text-primary-600">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
                        </svg>
                      </div>
                    </div>
                    <div className="ml-5">
                      <p className="text-sm font-medium text-amber-700">Total Subscribers</p>
                      <div className="flex items-baseline">
                        <p className="text-3xl font-semibold text-amber-900">{stats.subscribers}</p>
                        <p className="ml-2 text-sm font-medium text-green-600">+12% this month</p>
                      </div>
                    </div>
                  </div>
                  <div className="mt-4">
                    <Link href="/subscribers" className="text-sm font-medium text-primary-600 hover:text-primary-700">
                      View all subscribers →
                    </Link>
                  </div>
                </motion.div>

                <motion.div variants={fadeIn} className="bg-white border border-amber-200 p-6 rounded-xl shadow-sm hover:shadow-md transition-shadow duration-300">
                  <div className="flex items-center">
                    <div className="flex-shrink-0">
                      <div className="w-12 h-12 bg-amber-100 rounded-full flex items-center justify-center text-green-600">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" />
                        </svg>
                      </div>
                    </div>
                    <div className="ml-5">
                      <p className="text-sm font-medium text-amber-700">Content Published</p>
                      <div className="flex items-baseline">
                        <p className="text-3xl font-semibold text-amber-900">{stats.contentPublished}</p>
                        <p className="ml-2 text-sm font-medium text-green-600">+3 this week</p>
                      </div>
                    </div>
                  </div>
                  <div className="mt-4">
                    <Link href="/content" className="text-sm font-medium text-primary-600 hover:text-primary-700">
                      Manage your content →
                    </Link>
                  </div>
                </motion.div>

                <motion.div variants={fadeIn} className="bg-white border border-amber-200 p-6 rounded-xl shadow-sm hover:shadow-md transition-shadow duration-300">
                  <div className="flex items-center">
                    <div className="flex-shrink-0">
                      <div className="w-12 h-12 bg-amber-100 rounded-full flex items-center justify-center text-orange-600">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                        </svg>
                      </div>
                    </div>
                    <div className="ml-5">
                      <p className="text-sm font-medium text-amber-700">Total Earnings</p>
                      <div className="flex items-baseline">
                        <p className="text-3xl font-semibold text-amber-900">${stats.earnings.toFixed(2)}</p>
                        <p className="ml-2 text-sm font-medium text-green-600">+8.2% this month</p>
                      </div>
                    </div>
                  </div>
                  <div className="mt-4">
                    <Link href="/earnings" className="text-sm font-medium text-primary-600 hover:text-primary-700">
                      View earnings details →
                    </Link>
                  </div>
                </motion.div>
              </motion.div>

              <motion.div initial="hidden" animate="visible" variants={fadeIn}>
                <div className="bg-white border border-amber-200 rounded-xl shadow-sm p-6 mb-8">
                  <h2 className="text-xl font-bold text-amber-900 mb-6">Recent Activity</h2>
                  <div className="space-y-4">
                    {recentActivity.map((activity) => (
                      <div key={activity.id} className="flex items-start border-b border-amber-100 pb-4">
                        {getActivityIcon(activity.type)}
                        <div className="ml-4 flex-1">
                          <div className="flex justify-between">
                            <p className="text-sm font-medium text-amber-900">{activity.title}</p>
                            {activity.amount && (
                              <span className="text-sm font-medium text-green-600">+${activity.amount.toFixed(2)}</span>
                            )}
                          </div>
                          <p className="text-xs text-amber-700 mt-1">{activity.date}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                  <div className="mt-6">
                    <Link href="/activity" className="text-sm font-medium text-primary-600 hover:text-primary-700">
                      View all activity →
                    </Link>
                  </div>
                </div>
              </motion.div>

              <motion.div 
                initial="hidden"
                animate="visible"
                variants={container}
                className="grid grid-cols-1 lg:grid-cols-2 gap-6"
              >
                <motion.div variants={fadeIn} className="bg-white border border-amber-200 rounded-xl shadow-sm p-6">
                  <h2 className="text-xl font-bold text-amber-900 mb-6">Quick Tips</h2>
                  <ul className="space-y-4">
                    <li className="flex items-start">
                      <div className="flex-shrink-0 w-8 h-8 bg-amber-100 rounded-full flex items-center justify-center text-primary-600 mr-3">
                        <span className="text-sm font-bold">1</span>
                      </div>
                      <div>
                        <p className="text-sm font-medium text-amber-900">Post regularly to keep your subscribers engaged</p>
                        <p className="text-xs text-amber-700 mt-1">Consistency is key to maintaining and growing your audience.</p>
                      </div>
                    </li>
                    <li className="flex items-start">
                      <div className="flex-shrink-0 w-8 h-8 bg-amber-100 rounded-full flex items-center justify-center text-primary-600 mr-3">
                        <span className="text-sm font-bold">2</span>
                      </div>
                      <div>
                        <p className="text-sm font-medium text-amber-900">Engage with your audience through comments</p>
                        <p className="text-xs text-amber-700 mt-1">Build a community by responding to comments and messages.</p>
                      </div>
                    </li>
                    <li className="flex items-start">
                      <div className="flex-shrink-0 w-8 h-8 bg-amber-100 rounded-full flex items-center justify-center text-primary-600 mr-3">
                        <span className="text-sm font-bold">3</span>
                      </div>
                      <div>
                        <p className="text-sm font-medium text-amber-900">Create diverse content tiers</p>
                        <p className="text-xs text-amber-700 mt-1">Offer different subscription options to attract a wider audience.</p>
                      </div>
                    </li>
                  </ul>
                </motion.div>

                <motion.div variants={fadeIn} className="bg-white border border-amber-200 rounded-xl shadow-sm p-6">
                  <h2 className="text-xl font-bold text-amber-900 mb-6">Goals</h2>
                  <div className="space-y-6">
                    <div>
                      <div className="flex justify-between mb-2">
                        <p className="text-sm font-medium text-amber-900">Subscriber Goal (200)</p>
                        <p className="text-sm font-medium text-amber-700">{stats.subscribers}/200</p>
                      </div>
                      <div className="w-full bg-amber-100 rounded-full h-2.5">
                        <div className="bg-primary-600 h-2.5 rounded-full" style={{ width: `${(stats.subscribers / 200) * 100}%` }}></div>
                      </div>
                    </div>
                    <div>
                      <div className="flex justify-between mb-2">
                        <p className="text-sm font-medium text-amber-900">Content Goal (30 posts)</p>
                        <p className="text-sm font-medium text-amber-700">{stats.contentPublished}/30</p>
                      </div>
                      <div className="w-full bg-amber-100 rounded-full h-2.5">
                        <div className="bg-green-600 h-2.5 rounded-full" style={{ width: `${(stats.contentPublished / 30) * 100}%` }}></div>
                      </div>
                    </div>
                    <div>
                      <div className="flex justify-between mb-2">
                        <p className="text-sm font-medium text-amber-900">Earnings Goal ($2000)</p>
                        <p className="text-sm font-medium text-amber-700">${stats.earnings.toFixed(2)}/2000</p>
                      </div>
                      <div className="w-full bg-amber-100 rounded-full h-2.5">
                        <div className="bg-orange-600 h-2.5 rounded-full" style={{ width: `${(stats.earnings / 2000) * 100}%` }}></div>
                      </div>
                    </div>
                  </div>
                </motion.div>
              </motion.div>
            </>
          )}

          {activeTab === 'content' && (
            <motion.div 
              initial="hidden"
              animate="visible"
              variants={fadeIn}
              className="bg-white border border-amber-200 rounded-xl shadow-sm p-6"
            >
              <h2 className="text-xl font-bold text-amber-900 mb-6">Your Content</h2>
              <p className="text-amber-800">Content management interface would go here.</p>
            </motion.div>
          )}

          {activeTab === 'subscribers' && (
            <motion.div 
              initial="hidden"
              animate="visible"
              variants={fadeIn}
              className="bg-white border border-amber-200 rounded-xl shadow-sm p-6"
            >
              <h2 className="text-xl font-bold text-amber-900 mb-6">Your Subscribers</h2>
              <p className="text-amber-800">Subscriber management interface would go here.</p>
            </motion.div>
          )}

          {activeTab === 'earnings' && (
            <motion.div 
              initial="hidden"
              animate="visible"
              variants={fadeIn}
              className="bg-white border border-amber-200 rounded-xl shadow-sm p-6"
            >
              <h2 className="text-xl font-bold text-amber-900 mb-6">Your Earnings</h2>
              <p className="text-amber-800">Earnings and payout interface would go here.</p>
            </motion.div>
          )}
        </div>
      </div>
    </>
  )
} 
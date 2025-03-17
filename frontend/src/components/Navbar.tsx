'use client'

import React, { useState, useEffect } from 'react'
import Link from 'next/link'
import { useRouter, usePathname } from 'next/navigation'
import { useSelector, useDispatch } from 'react-redux'
import { logout } from '@/redux/features/authSlice'
import { motion, AnimatePresence } from 'framer-motion'

export default function Navbar() {
  const { user, isAuthenticated } = useSelector((state: any) => state.auth)
  const dispatch = useDispatch()
  const router = useRouter()
  const pathname = usePathname()
  const [isScrolled, setIsScrolled] = useState(false)
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const [profileDropdownOpen, setProfileDropdownOpen] = useState(false)

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 10) {
        setIsScrolled(true)
      } else {
        setIsScrolled(false)
      }
    }

    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  const handleLogout = () => {
    localStorage.removeItem('token')
    dispatch(logout())
    router.push('/')
  }

  const navbarClasses = `
    fixed top-0 left-0 right-0 z-50 w-full 
    ${isScrolled ? 'bg-white/80 dark:bg-gray-900/80 shadow-md backdrop-blur-md' : 'bg-transparent'}
    transition-all duration-300 ease-in-out
  `

  return (
    <>
      <header 
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
          isScrolled 
            ? 'navbar-beige py-2 shadow-md' 
            : 'bg-transparent py-4'
        }`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between h-16 items-center">
            {/* Logo and brand */}
            <div className="flex-shrink-0 flex items-center">
              <Link href="/" className="text-2xl font-bold gradient-text">
                vAmicus
              </Link>
            </div>
            
            {/* Desktop Navigation */}
            <div className="hidden md:flex items-center space-x-4">
              <Link 
                href="/discover" 
                className={`navbar-link px-3 py-2 rounded-md text-sm font-medium transition-colors duration-200 ${
                  pathname === '/discover' 
                    ? 'text-primary-700 font-semibold' 
                    : 'text-amber-900 hover:text-primary-700'
                }`}
              >
                Discover
              </Link>
              
              {isAuthenticated && (
                <>
                  {user?.role === 'CREATOR' && (
                    <Link 
                      href="/dashboard" 
                      className={`navbar-link px-3 py-2 rounded-md text-sm font-medium transition-colors duration-200 ${
                        pathname === '/dashboard' 
                          ? 'text-primary-700 font-semibold' 
                          : 'text-amber-900 hover:text-primary-700'
                      }`}
                    >
                      Dashboard
                    </Link>
                  )}
                  <Link 
                    href="/library" 
                    className={`navbar-link px-3 py-2 rounded-md text-sm font-medium transition-colors duration-200 ${
                      pathname === '/library' 
                        ? 'text-primary-700 font-semibold' 
                        : 'text-amber-900 hover:text-primary-700'
                    }`}
                  >
                    My Library
                  </Link>
                </>
              )}

              <Link 
                href="/pricing" 
                className={`navbar-link px-3 py-2 rounded-md text-sm font-medium transition-colors duration-200 ${
                  pathname === '/pricing' 
                    ? 'text-primary-700 font-semibold' 
                    : 'text-amber-900 hover:text-primary-700'
                }`}
              >
                Pricing
              </Link>
            </div>
            
            {/* Authentication buttons or User menu */}
            <div className="flex items-center space-x-3">
              {!isAuthenticated ? (
                <>
                  <Link 
                    href="/login" 
                    className="text-amber-900 hover:text-primary-700 px-3 py-2 rounded-md text-sm font-medium transition-colors duration-200"
                  >
                    Login
                  </Link>
                  <Link href="/signup" className="btn-primary">
                    Sign Up
                  </Link>
                </>
              ) : (
                <div className="relative ml-3">
                  <div>
                    <button
                      onClick={() => setProfileDropdownOpen(!profileDropdownOpen)}
                      className="relative flex rounded-full bg-amber-100 p-1 text-sm focus:outline-none focus:ring-2 focus:ring-primary-600 focus:ring-offset-2"
                    >
                      <span className="sr-only">Open user menu</span>
                      <div className="h-8 w-8 rounded-full bg-gradient-to-r from-primary-600 to-secondary-600 flex items-center justify-center text-white font-medium">
                        {user?.username?.charAt(0).toUpperCase() || 'U'}
                      </div>
                    </button>
                  </div>
                  <AnimatePresence>
                    {profileDropdownOpen && (
                      <motion.div
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: 10 }}
                        transition={{ duration: 0.2 }}
                        className="absolute right-0 z-10 mt-2 w-48 origin-top-right rounded-md bg-amber-50 py-1 shadow-lg ring-1 ring-amber-200 focus:outline-none"
                      >
                        <div className="border-b border-amber-200 px-4 py-2">
                          <p className="text-sm font-medium text-amber-900">{user?.username || 'User'}</p>
                          <p className="text-xs text-amber-700 truncate">{user?.email || ''}</p>
                        </div>
                        <Link
                          href="/profile"
                          className="block px-4 py-2 text-sm text-amber-900 hover:bg-amber-200"
                          onClick={() => setProfileDropdownOpen(false)}
                        >
                          Your Profile
                        </Link>
                        <Link
                          href={user?.role === 'CREATOR' ? '/settings/creator' : '/settings/account'}
                          className="block px-4 py-2 text-sm text-amber-900 hover:bg-amber-200"
                          onClick={() => setProfileDropdownOpen(false)}
                        >
                          Settings
                        </Link>
                        <Link
                          href="/wallet"
                          className="block px-4 py-2 text-sm text-amber-900 hover:bg-amber-200"
                          onClick={() => setProfileDropdownOpen(false)}
                        >
                          Wallet
                        </Link>
                        <button
                          onClick={() => {
                            setProfileDropdownOpen(false)
                            handleLogout()
                          }}
                          className="block w-full text-left px-4 py-2 text-sm text-amber-900 hover:bg-amber-200"
                        >
                          Sign out
                        </button>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              )}
              
              {/* Mobile menu button */}
              <div className="md:hidden -mr-2 flex items-center">
                <button
                  onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                  className="inline-flex items-center justify-center p-2 rounded-md text-amber-800 hover:text-primary-700 hover:bg-amber-200 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-primary-600"
                >
                  <span className="sr-only">Open main menu</span>
                  {mobileMenuOpen ? (
                    <svg className="block h-6 w-6" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden="true">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
                    </svg>
                  ) : (
                    <svg className="block h-6 w-6" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden="true">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h16" />
                    </svg>
                  )}
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Mobile menu */}
        <AnimatePresence>
          {mobileMenuOpen && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              className="md:hidden bg-amber-50 shadow-lg border-t border-amber-200"
            >
              <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
                <Link
                  href="/discover"
                  className={`block px-3 py-2 rounded-md text-base font-medium ${
                    pathname === '/discover'
                      ? 'bg-primary-600 text-white'
                      : 'text-amber-900 hover:bg-amber-200'
                  }`}
                  onClick={() => setMobileMenuOpen(false)}
                >
                  Discover
                </Link>
                
                {isAuthenticated && (
                  <>
                    {user?.role === 'CREATOR' && (
                      <Link
                        href="/dashboard"
                        className={`block px-3 py-2 rounded-md text-base font-medium ${
                          pathname === '/dashboard'
                            ? 'bg-primary-600 text-white'
                            : 'text-amber-900 hover:bg-amber-200'
                        }`}
                        onClick={() => setMobileMenuOpen(false)}
                      >
                        Dashboard
                      </Link>
                    )}
                    <Link
                      href="/library"
                      className={`block px-3 py-2 rounded-md text-base font-medium ${
                        pathname === '/library'
                          ? 'bg-primary-600 text-white'
                          : 'text-amber-900 hover:bg-amber-200'
                      }`}
                      onClick={() => setMobileMenuOpen(false)}
                    >
                      My Library
                    </Link>
                  </>
                )}

                <Link
                  href="/pricing"
                  className={`block px-3 py-2 rounded-md text-base font-medium ${
                    pathname === '/pricing'
                      ? 'bg-primary-600 text-white'
                      : 'text-amber-900 hover:bg-amber-200'
                  }`}
                  onClick={() => setMobileMenuOpen(false)}
                >
                  Pricing
                </Link>
                
                {!isAuthenticated ? (
                  <div className="pt-4 flex flex-col space-y-2">
                    <Link
                      href="/login"
                      className="block w-full text-center px-3 py-2 rounded-md text-base font-medium text-amber-900 hover:bg-amber-200"
                      onClick={() => setMobileMenuOpen(false)}
                    >
                      Login
                    </Link>
                    <Link
                      href="/signup"
                      className="block w-full text-center px-3 py-2 rounded-md text-base font-medium bg-primary-600 text-white hover:bg-primary-700"
                      onClick={() => setMobileMenuOpen(false)}
                    >
                      Sign Up
                    </Link>
                  </div>
                ) : (
                  <div className="pt-4 border-t border-amber-200">
                    <div className="flex items-center px-5">
                      <div className="flex-shrink-0">
                        <div className="h-10 w-10 rounded-full bg-gradient-to-r from-primary-600 to-secondary-600 flex items-center justify-center text-white font-medium">
                          {user?.username?.charAt(0).toUpperCase() || 'U'}
                        </div>
                      </div>
                      <div className="ml-3">
                        <div className="text-base font-medium text-amber-900">{user?.username || 'User'}</div>
                        <div className="text-sm font-medium text-amber-700">{user?.email || ''}</div>
                      </div>
                    </div>
                    <div className="mt-3 space-y-1 px-2">
                      <Link
                        href="/profile"
                        className="block px-3 py-2 rounded-md text-base font-medium text-amber-900 hover:bg-amber-200"
                        onClick={() => setMobileMenuOpen(false)}
                      >
                        Your Profile
                      </Link>
                      <Link
                        href={user?.role === 'CREATOR' ? '/settings/creator' : '/settings/account'}
                        className="block px-3 py-2 rounded-md text-base font-medium text-amber-900 hover:bg-amber-200"
                        onClick={() => setMobileMenuOpen(false)}
                      >
                        Settings
                      </Link>
                      <Link
                        href="/wallet"
                        className="block px-3 py-2 rounded-md text-base font-medium text-amber-900 hover:bg-amber-200"
                        onClick={() => setMobileMenuOpen(false)}
                      >
                        Wallet
                      </Link>
                      <button
                        onClick={() => {
                          setMobileMenuOpen(false)
                          handleLogout()
                        }}
                        className="block w-full text-left px-3 py-2 rounded-md text-base font-medium text-amber-900 hover:bg-amber-200"
                      >
                        Sign out
                      </button>
                    </div>
                  </div>
                )}
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </header>
      {/* Spacer to prevent content from being hidden under the navbar */}
      <div className="h-16"></div>
    </>
  )
} 
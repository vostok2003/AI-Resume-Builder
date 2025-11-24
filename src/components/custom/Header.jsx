import React from 'react'
import { Button } from '../ui/button'
import { Link } from 'react-router-dom'
import { UserButton, useUser } from '@clerk/clerk-react'
import { Sparkles } from 'lucide-react'

const Header = () => {
  const {user,isSignedIn} = useUser();
  return (
    <div className="sticky top-0 z-50 glass-dark backdrop-blur-xl p-4 px-6 flex justify-between items-center shadow-lg">
      <Link to="/" className="flex items-center gap-2 hover:scale-105 transition-transform">
        <img src='/logo.svg' width={50} height={50} className="drop-shadow-lg"/>
        <div className="hidden sm:block">
          <h1 className="text-xl font-bold bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent">
            AI Resume Builder
          </h1>
        </div>
      </Link>

      {isSignedIn ?
        <div className='flex gap-3 items-center'>
          <Link to='/dashboard'>
            <Button className="gradient-primary text-white hover:opacity-90 rounded-full px-6 glow-hover">
              <Sparkles className="w-4 h-4 mr-2" />
              Dashboard
            </Button>
          </Link>
          
          <div className="glass rounded-full p-1">
            <UserButton />
          </div>
        </div>:
          <Link to={'/auth/sign-in'}>
            <Button className="gradient-primary text-white hover:opacity-90 rounded-full px-6 glow-hover">
              Get Started
            </Button>
          </Link>
        }
      
    </div>
  )
}

export default Header

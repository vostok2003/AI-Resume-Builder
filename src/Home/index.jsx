import Header from '@/components/custom/Header'
import { Button } from '@/components/ui/button'
import { ArrowRight, Sparkles, FileText, Zap, CheckCircle, Star } from 'lucide-react'
import { Link } from 'react-router-dom'
import React from 'react'

const Home = () => {
  return (
    <div className="min-h-screen">
      <Header/>
      
      {/* Hero Section with Animated Gradient */}
      <section className="relative animated-gradient min-h-[90vh] flex items-center justify-center overflow-hidden">
        {/* Floating Elements */}
        <div className="absolute top-20 left-10 w-72 h-72 bg-purple-300 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-blob"></div>
        <div className="absolute top-40 right-10 w-72 h-72 bg-yellow-300 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-blob animation-delay-2000"></div>
        <div className="absolute bottom-20 left-1/2 w-72 h-72 bg-pink-300 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-blob animation-delay-4000"></div>
        
        <div className="relative z-10 text-center px-4 max-w-5xl mx-auto">
          <div className="glass rounded-3xl p-12 backdrop-blur-xl">
            <div className="inline-flex items-center gap-2 bg-white/20 px-4 py-2 rounded-full mb-6">
              <Sparkles className="w-4 h-4 text-yellow-300" />
              <span className="text-sm font-medium text-white">AI-Powered Resume Builder</span>
            </div>
            
            <h1 className="text-5xl md:text-7xl font-bold text-white mb-6 leading-tight">
              Build Your Dream Resume in
              <span className="block bg-gradient-to-r from-yellow-300 via-pink-300 to-purple-300 bg-clip-text text-transparent">
                Minutes, Not Hours
              </span>
            </h1>
            
            <p className="text-xl md:text-2xl text-white/90 mb-8 max-w-3xl mx-auto">
              Create professional, ATS-friendly resumes with AI assistance. Stand out from the crowd and land your dream job.
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
              <Link to="/dashboard">
                <Button size="lg" className="bg-white text-purple-600 hover:bg-white/90 text-lg px-8 py-6 rounded-full glow-hover">
                  Get Started Free
                  <ArrowRight className="ml-2 w-5 h-5" />
                </Button>
              </Link>
              <Button size="lg" variant="outline" className="glass border-white/30 text-white hover:bg-white/10 text-lg px-8 py-6 rounded-full">
                View Examples
              </Button>
            </div>
            
            <div className="flex items-center justify-center gap-6 mt-8 text-white/80">
              <div className="flex items-center gap-2">
                <CheckCircle className="w-5 h-5 text-green-300" />
                <span>No Credit Card</span>
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle className="w-5 h-5 text-green-300" />
                <span>Free Forever</span>
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle className="w-5 h-5 text-green-300" />
                <span>AI Powered</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 px-4 bg-gradient-to-b from-gray-50 to-white">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
              Why Choose Our Resume Builder?
            </h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Everything you need to create a professional resume that gets you hired
            </p>
          </div>
          
          <div className="grid md:grid-cols-3 gap-8">
            {/* Feature 1 */}
            <div className="glass-dark rounded-2xl p-8 hover:scale-105 transition-transform duration-300 glow-hover">
              <div className="w-16 h-16 gradient-primary rounded-2xl flex items-center justify-center mb-6 float-animation">
                <Sparkles className="w-8 h-8 text-white" />
              </div>
              <h3 className="text-2xl font-bold text-gray-900 mb-4">AI-Powered Content</h3>
              <p className="text-gray-600">
                Let AI help you write compelling resume content that highlights your strengths and achievements.
              </p>
            </div>
            
            {/* Feature 2 */}
            <div className="glass-dark rounded-2xl p-8 hover:scale-105 transition-transform duration-300 glow-hover">
              <div className="w-16 h-16 gradient-secondary rounded-2xl flex items-center justify-center mb-6 float-animation" style={{animationDelay: '0.5s'}}>
                <FileText className="w-8 h-8 text-white" />
              </div>
              <h3 className="text-2xl font-bold text-gray-900 mb-4">Professional Templates</h3>
              <p className="text-gray-600">
                Choose from beautiful, ATS-friendly templates designed by professional recruiters.
              </p>
            </div>
            
            {/* Feature 3 */}
            <div className="glass-dark rounded-2xl p-8 hover:scale-105 transition-transform duration-300 glow-hover">
              <div className="w-16 h-16 gradient-success rounded-2xl flex items-center justify-center mb-6 float-animation" style={{animationDelay: '1s'}}>
                <Zap className="w-8 h-8 text-white" />
              </div>
              <h3 className="text-2xl font-bold text-gray-900 mb-4">Lightning Fast</h3>
              <p className="text-gray-600">
                Create and customize your resume in minutes with our intuitive drag-and-drop interface.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 px-4 gradient-cool">
        <div className="max-w-4xl mx-auto text-center">
          <div className="glass rounded-3xl p-12">
            <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">
              Ready to Build Your Future?
            </h2>
            <p className="text-xl text-white/90 mb-8">
              Join thousands of job seekers who landed their dream jobs with our AI resume builder
            </p>
            <Link to="/dashboard">
              <Button size="lg" className="bg-white text-purple-600 hover:bg-white/90 text-lg px-8 py-6 rounded-full glow-hover">
                Start Building Now
                <ArrowRight className="ml-2 w-5 h-5" />
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-900 text-white py-12 px-4">
        <div className="max-w-7xl mx-auto text-center">
          <p className="text-gray-400">© 2025 AI Resume Builder. All rights reserved.</p>
        </div>
      </footer>
    </div>
  )
}

export default Home

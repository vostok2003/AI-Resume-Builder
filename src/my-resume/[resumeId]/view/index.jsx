
import Header from '@/components/custom/Header'
import { Button } from '@/components/ui/button'
import { ResumeInfoContext } from '@/context/ResumeInfoContext'
import ResumePreview from '@/Dashboard/resume/[resumeID]/edit/components/ResumePreview'
import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import GlobalApi from './../../../../services/GlobalApi'
import { RWebShare } from 'react-web-share'
import { Download, Share2, CheckCircle, Sparkles, ArrowLeft } from 'lucide-react'
import { Link } from 'react-router-dom'

function ViewResume() {
    const [resumeInfo,setResumeInfo] = useState();
    const { resumeId } = useParams();

    useEffect(()=>{
        GetResumeInfo();
    },[]);

    const GetResumeInfo=()=>{
        GlobalApi.GetResumeById(resumeId).then(resp=>{
            console.log(resp.data.data);
            setResumeInfo(resp.data.data)
        })
    }

    const handleDownload=()=>{
        window.print();
    }
  return (
    
    <ResumeInfoContext.Provider value={{resumeInfo,setResumeInfo}}>
        <div id="no-print" className="min-h-screen gradient-cool">
            <Header/>
            
            {/* Hero Section */}
            <div className='relative py-16 px-4 overflow-hidden'>
                {/* Background elements */}
                <div className="absolute top-10 left-10 w-72 h-72 bg-purple-300 rounded-full mix-blend-multiply filter blur-xl opacity-10 animate-blob"></div>
                <div className="absolute top-10 right-10 w-72 h-72 bg-pink-300 rounded-full mix-blend-multiply filter blur-xl opacity-10 animate-blob animation-delay-2000"></div>
                
                <div className='relative z-10 max-w-4xl mx-auto text-center'>
                    <div className="glass rounded-3xl p-8 md:p-12 backdrop-blur-xl">
                        {/* Success Badge */}
                        <div className="inline-flex items-center gap-2 bg-green-500/20 px-4 py-2 rounded-full mb-6">
                            <CheckCircle className="w-5 h-5 text-green-300" />
                            <span className="text-sm font-medium text-green-300">Resume Ready!</span>
                        </div>
                        
                        <h1 className='text-3xl md:text-5xl font-bold text-white mb-4 leading-tight'>
                            Congrats! Your 
                            <span className="block bg-gradient-to-r from-yellow-300 via-pink-300 to-purple-300 bg-clip-text text-transparent">
                                AI-Powered Resume is Ready!
                            </span>
                        </h1>
                        
                        <p className='text-lg md:text-xl text-white/80 mb-8 max-w-2xl mx-auto'>
                            Your professional resume is ready to download. Share it with recruiters or download it for your job applications.
                        </p>
                        
                        {/* Action Buttons */}
                        <div className='flex flex-col sm:flex-row gap-4 justify-center items-center'>
                            <Button 
                                onClick={handleDownload}
                                size="lg"
                                className="gradient-primary text-white hover:opacity-90 text-lg px-8 py-6 rounded-full glow-hover w-full sm:w-auto"
                            >
                                <Download className="w-5 h-5 mr-2" />
                                Download Resume
                            </Button>
                            
                            <RWebShare
                                data={{
                                    text: `Check out ${resumeInfo?.firstName}'s professional resume!`,
                                    url: import.meta.env.VITE_BASE_URL+"/my-resume/"+resumeId+"/view",
                                    title: `${resumeInfo?.firstName} ${resumeInfo?.lastName} - Resume`,
                                }}
                                onClick={() => console.log("shared successfully!")}
                            >
                                <Button 
                                    size="lg"
                                    className="glass border-white/30 text-white hover:bg-white/20 text-lg px-8 py-6 rounded-full w-full sm:w-auto"
                                >
                                    <Share2 className="w-5 h-5 mr-2" />
                                    Share Resume
                                </Button>
                            </RWebShare>
                        </div>

                        {/* Back to Dashboard */}
                        <div className="mt-8">
                            <Link to="/dashboard">
                                <Button 
                                    variant="ghost" 
                                    className="text-white/80 hover:text-white hover:bg-white/10"
                                >
                                    <ArrowLeft className="w-4 h-4 mr-2" />
                                    Back to Dashboard
                                </Button>
                            </Link>
                        </div>
                    </div>
                </div>
            </div>

            {/* Features Section */}
            <div className="max-w-4xl mx-auto px-4 pb-16">
                <div className="grid md:grid-cols-3 gap-6">
                    <div className="glass rounded-2xl p-6 text-center">
                        <div className="w-12 h-12 gradient-primary rounded-xl flex items-center justify-center mx-auto mb-4">
                            <Download className="w-6 h-6 text-white" />
                        </div>
                        <h3 className="text-white font-semibold mb-2">Download Anytime</h3>
                        <p className="text-white/70 text-sm">Download your resume in PDF format whenever you need it</p>
                    </div>
                    
                    <div className="glass rounded-2xl p-6 text-center">
                        <div className="w-12 h-12 gradient-secondary rounded-xl flex items-center justify-center mx-auto mb-4">
                            <Share2 className="w-6 h-6 text-white" />
                        </div>
                        <h3 className="text-white font-semibold mb-2">Easy Sharing</h3>
                        <p className="text-white/70 text-sm">Share your resume link with recruiters and employers</p>
                    </div>
                    
                    <div className="glass rounded-2xl p-6 text-center">
                        <div className="w-12 h-12 gradient-success rounded-xl flex items-center justify-center mx-auto mb-4">
                            <Sparkles className="w-6 h-6 text-white" />
                        </div>
                        <h3 className="text-white font-semibold mb-2">AI-Powered</h3>
                        <p className="text-white/70 text-sm">Built with AI assistance for professional results</p>
                    </div>
                </div>
            </div>
        </div>

        {/* Resume Preview for Print */}
        <div id="print-area" className="bg-white">
            <ResumePreview/>
        </div>
      
    </ResumeInfoContext.Provider>
      
    
  )
}

export default ViewResume

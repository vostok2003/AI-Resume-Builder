import React, { useEffect, useState } from 'react'
import AddResume from './component/AddResume'
import { useUser } from '@clerk/clerk-react'
import GlobalApi from './../../services/GlobalApi'
import ResumeCardItem from './component/ResumeCardItem';
import { Sparkles, FileText } from 'lucide-react'

function Dashboard() {
  const {user}=useUser();
  const [resumeList,setResumeList]=useState([]);
  useEffect(()=>{
    user&&GetResumesList()
  },[user])

  const GetResumesList=()=>{
    GlobalApi.GetUserResumes(user?.primaryEmailAddress?.emailAddress)
    .then(resp=>{
      console.log(resp.data);
      setResumeList(resp.data.data)
    })
  }
  return (
    <div className="min-h-screen gradient-cool">
      {/* Floating background elements */}
      <div className="absolute top-20 left-10 w-72 h-72 bg-purple-300 rounded-full mix-blend-multiply filter blur-xl opacity-10 animate-blob"></div>
      <div className="absolute bottom-20 right-10 w-72 h-72 bg-pink-300 rounded-full mix-blend-multiply filter blur-xl opacity-10 animate-blob animation-delay-2000"></div>
      
      <div className="relative z-10 p-10 md:px-20 lg:px-32">
        {/* Header Section */}
        <div className="glass rounded-3xl p-8 mb-10">
          <div className="flex items-center gap-3 mb-4">
            <div className="w-12 h-12 gradient-primary rounded-xl flex items-center justify-center">
              <FileText className="w-6 h-6 text-white" />
            </div>
            <div>
              <h2 className="font-bold text-4xl text-white">My Resumes</h2>
              <p className="text-white/80 text-lg">Create and manage your professional resumes</p>
            </div>
          </div>
          
          <div className="flex items-center gap-2 mt-4">
            <Sparkles className="w-5 h-5 text-yellow-300" />
            <p className="text-white/90">Start creating your AI-powered resume for your next job role</p>
          </div>
        </div>

        {/* Resume Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-6">
          <AddResume/>
          {resumeList.length>0 && resumeList.map((resume,index)=>(
            <ResumeCardItem resume={resume} key={index} refreshData={GetResumesList}/>
          ))}
        </div>

        {/* Empty State */}
        {resumeList.length === 0 && (
          <div className="glass rounded-3xl p-12 text-center mt-10">
            <div className="w-20 h-20 gradient-secondary rounded-full flex items-center justify-center mx-auto mb-6">
              <FileText className="w-10 h-10 text-white" />
            </div>
            <h3 className="text-2xl font-bold text-white mb-2">No resumes yet</h3>
            <p className="text-white/80">Click the + button to create your first resume</p>
          </div>
        )}
      </div>
    </div>
  )
}

export default Dashboard

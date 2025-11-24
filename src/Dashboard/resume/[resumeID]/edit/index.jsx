import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import FormSection from './components/FormSection';
import ResumePreview from './components/ResumePreview';
import { ResumeInfoContext } from '@/context/ResumeInfoContext';
import Dummy from '@/data/Dummy';
import GlobalApi from './../../../../../services/GlobalApi'

function EditResume() {
    const {resumeID} = useParams();
    const [resumeInfo,setResumeInfo]=useState();
    useEffect(()=>{
        
        GetResumeInfo();
    },[])

    const GetResumeInfo=()=>{
        GlobalApi.GetResumeById(resumeID).then(resp=>{
          console.log(resp.data.data)
          setResumeInfo(resp.data.data)
        })
    }
  return (
    <ResumeInfoContext.Provider value={{resumeInfo,setResumeInfo}}>
    <div className="min-h-screen gradient-cool relative overflow-hidden">
      {/* Background elements */}
      <div className="absolute top-20 left-10 w-96 h-96 bg-purple-300 rounded-full mix-blend-multiply filter blur-xl opacity-10 animate-blob"></div>
      <div className="absolute bottom-20 right-10 w-96 h-96 bg-pink-300 rounded-full mix-blend-multiply filter blur-xl opacity-10 animate-blob animation-delay-2000"></div>
      
      <div className="relative z-10 grid grid-cols-1 lg:grid-cols-2 p-6 md:p-10 gap-6 md:gap-10 max-w-[1800px] mx-auto">
        <FormSection/>
        <ResumePreview/>
      </div>
    </div>
    </ResumeInfoContext.Provider>
  )
}

export default EditResume

import React, { useState } from 'react'
import PersonalDetail from './forms/PersonalDetail'
import { ArrowLeft, ArrowRight, Ghost, Home, LayoutGrid } from 'lucide-react'
import { Button } from '@/components/ui/button'
import Summary from './forms/Summary';
import Experience from './forms/Experience';
import Education from './forms/Education';
import Skills from './forms/Skills';
import { Link, Navigate, useParams } from 'react-router-dom';
import ThemeColor from './ThemeColor';

function FormSection() {
  const [activeFormIndex,setActiveFormIndex] = useState(1);
  const [enableNext,setEnableNext] = useState(false);
  const { resumeID } = useParams();

  return (
    <div className="space-y-6">
      {/* Navigation Header */}
      <div className='glass rounded-2xl p-4 flex justify-between items-center shadow-lg'>
        <div className="flex gap-3">
          <Link to="/dashboard">
            <Button className="glass border-white/30 text-white hover:bg-white/20">
              <Home className="w-4 h-4"/>
            </Button>
          </Link>
          <ThemeColor/>
        </div>
        
        <div className='flex gap-2 items-center'>
          <div className="hidden sm:flex items-center gap-2 text-white/80 text-sm mr-3">
            <span className="font-semibold text-white">Step {activeFormIndex}</span> of 5
          </div>
          {activeFormIndex>1 && 
            <Button className="glass border-white/30 text-white hover:bg-white/20" size="sm"
              onClick={()=>setActiveFormIndex(activeFormIndex-1)}
            ><ArrowLeft className="w-4 h-4"/> <span className="hidden sm:inline ml-1">Back</span></Button>}
          <Button className="gradient-primary text-white flex gap-2" size="sm"
            disabled={!enableNext}
            onClick={()=>setActiveFormIndex(activeFormIndex+1)}
          > <span className="hidden sm:inline">Next</span> <ArrowRight className="w-4 h-4"/></Button>
        </div>
      </div>

      {/* Progress Bar */}
      <div className="glass rounded-full p-1 overflow-hidden">
        <div 
          className="h-2 gradient-primary rounded-full transition-all duration-500"
          style={{width: `${(activeFormIndex / 5) * 100}%`}}
        ></div>
      </div>
      {/* personal detail */}
        { activeFormIndex==1 ?<PersonalDetail enabledNext={(v)=>setEnableNext(v)}/> :
            activeFormIndex==2 ?<Summary enabledNext={(v)=>setEnableNext(v)}/> : 
            activeFormIndex==3 ?<Experience enabledNext={(v)=>setEnableNext(v)}/> :
            activeFormIndex==4 ?<Education enabledNext={(v)=>setEnableNext(v)}/> :
            activeFormIndex==5 ?<Skills enabledNext={(v)=>setEnableNext(v)}/> :
            activeFormIndex==6 ?<Navigate to={'/my-resume/'+resumeID+'/view'}/>:
             null
        }
      
      

      

    </div>
  )
}

export default FormSection

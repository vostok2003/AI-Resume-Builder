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
    <div>
      <div className='flex justify-between item-center'>
        <div className="flex gap-5">
          <Link to="/dashboard">
            <Button variant="ghost"><Home/></Button>
          </Link>
          <ThemeColor/>
        </div>
        
        <div className='flex gap-2'>
          {activeFormIndex>1 && 
            <Button variant="ghost" size="sm"
              onClick={()=>setActiveFormIndex(activeFormIndex-1)}
            ><ArrowLeft/> </Button>}
          <Button className="flex gap-2" size="sm" variant="ghost"
            disabled={!enableNext}
            onClick={()=>setActiveFormIndex(activeFormIndex+1)}
          > Next <ArrowRight/></Button>
        </div>
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

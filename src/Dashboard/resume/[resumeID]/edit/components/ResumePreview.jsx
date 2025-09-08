import { ResumeInfoContext } from '@/context/ResumeInfoContext'
import React, { useContext } from 'react'
import PersonalDetailPreview from './preview/PersonalDetailPreview';
import SummaryPreview from './preview/SummaryPreview';
import ExperiencePreview from './preview/ExperiencePreview';
import EducationPreview from './preview/EducationPreview';
import SkillsPreview from './preview/SkillsPreview';

function ResumePreview() {
    const {resumeInfo,setResumeInfo}=useContext(ResumeInfoContext);
  return (
    <div className='shadow-lg h-full p-14 border-t-[20px] '
        style={{
            borderColor:resumeInfo?.themeColor
        }}
    >
      {/* personal details */}
        <PersonalDetailPreview resumeInfo={resumeInfo}/>
      {/* Summary */}
        <SummaryPreview resumeInfo={resumeInfo}/>
      {/* professional Experience */}
        <ExperiencePreview resumeInfo={resumeInfo}/>
      {/* education */}
        <EducationPreview resumeInfo={resumeInfo}/>
      {/* skills */}
        <SkillsPreview resumeInfo={resumeInfo}/>
    </div>
  )
}

export default ResumePreview

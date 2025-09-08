import { Button } from '@/components/ui/button'
import { Textarea } from '@/components/ui/textarea'
import { ResumeInfoContext } from '@/context/ResumeInfoContext'
import React, { useEffect, useState } from 'react'
import { useContext } from 'react'
import { useParams } from 'react-router-dom'
import GlobalApi from './../../../../../../../services/GlobalApi'
import { Brain, LoaderCircle } from 'lucide-react'
import { toast } from 'sonner'
import { AIChatSession } from './../../../../../../../services/AIModal'


const prompt ="Job title : { jobTitle }  depends on job title give me summary for my resume in 4-5 lines give in 1st person in json format with field experience level for fresher, mid level and experienced"
function Summary({enabledNext}) {
  const {resumeInfo,setResumeInfo}=useContext(ResumeInfoContext);
  const [summery,setSummary] = useState();
  const [loading,setLoading] = useState(false);
  const params = useParams();
  const [aiGeneratedSummeryList,setAiGeneratedSummeryList]=useState();


  useEffect(()=>{
    summery && setResumeInfo({
      ...resumeInfo,
      summery:summery
    })
  },[summery])

  const GenerateSummeryFromAI=async()=>{
    setLoading(true);
    const PROMPT = `Job title: ${resumeInfo.jobTitle}. 
    Based on this job title, generate a resume summary in 1st person, 
    4–5 lines, in JSON format with fields for fresher, midLevel, and experienced.`;   
    console.log(PROMPT);
    const result=await AIChatSession.sendMessage(PROMPT);
    const parsed = JSON.parse(result.response.text());
    console.log(parsed);

    // Convert object -> array
    const formatted = Object.entries(parsed.resumeSummary).map(([level, summary]) => ({
      experienceLevel: level,
      summery: summary
      }));

    setAiGeneratedSummeryList(formatted);
    setLoading(false);
  }
    const onSave=(e)=>{
    e.preventDefault();
    setLoading(true);
        const data={
          
            data: {
            summery:summery
          }
        }
    
        GlobalApi.UpdateResumeDetail(params?.resumeID,data).then(resp=>{
            console.log(resp);
            enabledNext(true);
            setLoading(false);
            toast("details updated")

        },(error)=>{
            setLoading(false);
        })
  }

  return (
    <div className="p-5 shadow-lg rounded-lg border-t-primary border-t-4 mt-10">
        <h2 className='font-bold text-lg'>Summary</h2>
        <p>Add Summary for your job title</p>

        <form className='mt-7' onSubmit={onSave}>
          <div className="flex justify-between items-end">
            <label>
              Add Summary
            </label>
            <Button variant="outline"  type="button" size="sm" className="border-primary text-primary flex gap-2"
              onClick={()=>GenerateSummeryFromAI()}
            > 
            <Brain className='h-4 w-4'/>
            Generate from AI</Button>
          </div>
          <Textarea className="mt-5" required
            onChange={(e)=>setSummary(e.target.value)}
          />
          <div className='mt-3 flex justify-end'>
                <Button variant='ghost' type="submit" disabled={loading}>
                {loading?<LoaderCircle className='animate-spin'/>:'Save'}
                </Button>
        </div>
        </form>
        
        {
          aiGeneratedSummeryList && <div>
            <h2 className='font-bold text-lg'>Suggestions</h2>
            { aiGeneratedSummeryList.map((item,index)=>(
              <div>
                <h2 className='font-bold my-1'>Level: {item?.experienceLevel}</h2>
                <p>{item?.summery}</p>
              </div>
            ))}
          </div>
        }
    </div>
  )
}

export default Summary

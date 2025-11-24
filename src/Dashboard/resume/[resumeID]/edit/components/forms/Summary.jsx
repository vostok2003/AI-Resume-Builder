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
    <div className="glass rounded-2xl p-6 md:p-8 shadow-2xl border-t-4 border-purple-400">
        <div className="flex items-center gap-3 mb-2">
          <div className="w-10 h-10 gradient-secondary rounded-xl flex items-center justify-center">
            <span className="text-white font-bold text-lg">2</span>
          </div>
          <h2 className='font-bold text-2xl text-white'>Summary</h2>
        </div>
        <p className="text-white/80 mb-6">Add a compelling summary for your job title</p>

        <form className='space-y-4' onSubmit={onSave}>
          <div className="flex flex-col sm:flex-row justify-between sm:items-end gap-3">
            <label className="text-sm font-semibold text-white">
              Professional Summary
            </label>
            <Button type="button" size="sm" className="gradient-success text-white flex gap-2 w-fit"
              onClick={()=>GenerateSummeryFromAI()}
              disabled={loading}
            > 
            <Brain className='h-4 w-4'/>
            {loading ? 'Generating...' : 'Generate with AI'}</Button>
          </div>
          <Textarea 
            className="glass border-white/30 text-white placeholder:text-gray-400 focus:border-purple-400 min-h-[120px]" 
            required
            onChange={(e)=>setSummary(e.target.value)}
            defaultValue={resumeInfo?.summery}
            placeholder="Write a brief summary about yourself and your career goals..."
          />
          <div className='flex justify-end'>
                <Button type="submit" disabled={loading} className="gradient-primary text-white px-6">
                {loading?<LoaderCircle className='animate-spin'/>:'Save & Continue'}
                </Button>
        </div>
        </form>
        
        {
          aiGeneratedSummeryList && <div className="mt-6 space-y-4">
            <h2 className='font-bold text-lg text-white flex items-center gap-2'>
              <Brain className="w-5 h-5 text-purple-300"/>
              AI Suggestions
            </h2>
            { aiGeneratedSummeryList.map((item,index)=>(
              <div key={index} className="glass-dark rounded-xl p-4 hover:bg-white/10 transition-colors cursor-pointer"
                onClick={()=>setSummary(item?.summery)}
              >
                <h3 className='font-bold text-purple-300 mb-2 text-sm uppercase'>
                  {item?.experienceLevel}
                </h3>
                <p className="text-white/90 text-sm leading-relaxed">{item?.summery}</p>
              </div>
            ))}
          </div>
        }
    </div>
  )
}

export default Summary

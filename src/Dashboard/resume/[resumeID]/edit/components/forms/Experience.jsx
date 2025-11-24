import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import React, { useEffect, useState } from 'react'
import RichTextEditor from '../RichTextEditor'
import { useContext } from 'react'
import { ResumeInfoContext } from '@/context/ResumeInfoContext'
import { LoaderCircle } from 'lucide-react'
import GlobalApi from './../../../../../../../services/GlobalApi'
import { useParams } from 'react-router-dom'
import { toast } from 'sonner'

const formField={
    title:'',
    companyName:'',
    city:'',
    state:'',
    startDate:'',
    endDate:'',
    workSummery:''
}
function Experience() {
    const [experienceList,setExperienceList] = useState([
        
            formField
        
    ])

    const {resumeInfo,setResumeInfo} = useContext(ResumeInfoContext);
    const [loading,setLoading] = useState(false);
    const params = useParams();

    const handleChange =(index,event)=>{
        const newEntries = experienceList.slice();
        const {name,value} = event.target;
        newEntries[index][name]=value;
        setExperienceList(newEntries);
    }

    useEffect(()=>{
        resumeInfo && setExperienceList(resumeInfo?.experience)
    },[])

    const AddNewExperience=()=>{
        setExperienceList([...experienceList,formField])
    }

    const RemoveExperience=()=>{
        setExperienceList(experienceList=>experienceList.slice(0,-1))
    }
    const handleRichTextEditor=(e,name,index)=>{
        const newEntries = experienceList.slice();
        newEntries[index][name]=e.target.value;
        setExperienceList(newEntries);
    }
    const onSave=()=>{
        setLoading(true)
        const data={
            data:{
                experience:experienceList.map(({id,...rest})=>rest)
            }
        }

        GlobalApi.UpdateResumeDetail(params.resumeID,data).then(resp=>{
            console.log(resp);
            setLoading(false);
            toast('details updated');
        },(error)=>{
            setLoading(false);
            toast('server error,please try again');
        })
    }

    useEffect(()=>{
        setResumeInfo({
            ...resumeInfo,
            experience:experienceList
        })
    },[experienceList])


  return (
    <div className="glass rounded-2xl p-6 md:p-8 shadow-2xl border-t-4 border-purple-400">
      <div className="flex items-center gap-3 mb-2">
        <div className="w-10 h-10 gradient-success rounded-xl flex items-center justify-center">
          <span className="text-white font-bold text-lg">3</span>
        </div>
        <h2 className='font-bold text-2xl text-white'>Professional Experience</h2>
      </div>
      <p className="text-white/80 mb-6">Add your previous job experience</p>
      <div className="space-y-6">
        {
            experienceList.map((item,index)=>(
                 <div key={index} className="glass-dark rounded-xl p-5 space-y-4">
                    <div className="flex items-center justify-between mb-3">
                      <h3 className="text-white font-semibold">Experience #{index + 1}</h3>
                    </div>
                    <div className='grid grid-cols-1 md:grid-cols-2 gap-4'>
                        <div>
                        <label className='text-sm font-semibold text-white mb-2 block'>Position Title</label>
                        <Input name="title" onChange={(event)=>handleChange(index,event)}
                            defaultValue={item?.title}
                            className="glass border-white/30 text-white placeholder:text-gray-400 focus:border-purple-400"
                            placeholder="Senior Developer"
                        />
                        </div>
                        <div>
                        <label className='text-sm font-semibold text-white mb-2 block'>Company Name</label>
                        <Input name="companyName" onChange={(event)=>handleChange(index,event)}
                            defaultValue={item?.companyName}
                            className="glass border-white/30 text-white placeholder:text-gray-400 focus:border-purple-400"
                            placeholder="Tech Corp"
                        />
                        </div>
                        <div>
                        <label className='text-sm font-semibold text-white mb-2 block'>City</label>
                        <Input name="city" onChange={(event)=>handleChange(index,event)}
                            defaultValue={item?.city}
                            className="glass border-white/30 text-white placeholder:text-gray-400 focus:border-purple-400"
                            placeholder="San Francisco"
                        />
                        </div>
                        <div>
                        <label className='text-sm font-semibold text-white mb-2 block'>State</label>
                        <Input name="state" onChange={(event)=>handleChange(index,event)}
                            defaultValue={item?.state}
                            className="glass border-white/30 text-white placeholder:text-gray-400 focus:border-purple-400"
                            placeholder="CA"
                        />
                        </div>
                        <div>
                        <label className='text-sm font-semibold text-white mb-2 block'>Start Date</label>
                        <Input type="date" name="startDate" onChange={(event)=>handleChange(index,event)}
                            defaultValue={item?.startDate}
                            className="glass border-white/30 text-white placeholder:text-gray-400 focus:border-purple-400"
                        />
                        </div>
                        <div>
                        <label className='text-sm font-semibold text-white mb-2 block'>End Date</label>
                        <Input type="date" name="endDate" onChange={(event)=>handleChange(index,event)}
                            defaultValue={item?.endDate}
                            className="glass border-white/30 text-white placeholder:text-gray-400 focus:border-purple-400"
                        />
                        </div>
                        <div className='md:col-span-2'>
                        <label className='text-sm font-semibold text-white mb-2 block'>Work Summary</label>
                        <RichTextEditor 
                        index={index}
                        onRichTextEditorChange={(event)=>handleRichTextEditor(event,'workSummery',index)}
                            defaultValue={item?.workSummery}
                         />
                        </div>
                    </div>
                 </div>))
        }
      </div>
      <div className='flex flex-col sm:flex-row justify-between gap-3 mt-6'>
        <div className='flex gap-2'>
            <Button className="glass border-white/30 text-white hover:bg-white/20" onClick={AddNewExperience}> 
              + Add Experience
            </Button>
            <Button className="glass border-white/30 text-white hover:bg-white/20" onClick={RemoveExperience}> 
              - Remove
            </Button>
        </div>
        
        <Button disabled={loading} onClick={()=>onSave()} className="gradient-primary text-white px-6">
            {loading ?<LoaderCircle className='animate-spin'/>:'Save & Continue'}
        </Button>
      </div>
    </div>
  )
}

export default Experience

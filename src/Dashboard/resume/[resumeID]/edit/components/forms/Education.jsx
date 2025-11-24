import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea'
import { ResumeInfoContext } from '@/context/ResumeInfoContext'
import { Loader, LoaderCircle, University } from 'lucide-react'
import React, { useContext, useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import { toast } from 'sonner'
import  GlobalApi from './../../../../../../../services/GlobalApi'

function Education() {
    const [educationalList,setEducationalList]= useState([
        {
            universityName:'',
            degree:'',
            major:'',
            startDate:'',
            endDate:'',
            description:''
        }
    ])
    const params=useParams();
    const [loading,setLoading]=useState(false);
    const {resumeInfo,setResumeInfo} = useContext(ResumeInfoContext);
    
    const handleChange=(event,index)=>{
        const newEntries = educationalList.slice();
        const {name,value} = event.target;
        newEntries[index][name]=value;
        setEducationalList(newEntries);
    }

    useEffect(()=>{
        resumeInfo && setEducationalList(resumeInfo?.education)
    },[])
    const AddNewEducation=()=>{
        setEducationalList([...educationalList,
            {
            universityName:'',
            degree:'',
            major:'',
            startDate:'',
            endDate:'',
            description:''
            }
        ])
    }
    const RemoveEducation=()=>{
        setEducationalList(educationalList=>educationalList.slice(0,-1))
    }
    const onSave=()=>{
        setLoading(true)
        const data={
            data:{
                education:educationalList.map(({id,...rest})=>rest)
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
            education:educationalList
        })
    },[educationalList])
  return (
    <div className="glass rounded-2xl p-6 md:p-8 shadow-2xl border-t-4 border-purple-400">
      <div className="flex items-center gap-3 mb-2">
        <div className="w-10 h-10 gradient-ocean rounded-xl flex items-center justify-center">
          <span className="text-white font-bold text-lg">4</span>
        </div>
        <h2 className='font-bold text-2xl text-white'>Education</h2>
      </div>
      <p className="text-white/80 mb-6">Add your educational details</p>

      <div className="space-y-6">
        {educationalList.map((item,index)=>(
            <div key={index} className="glass-dark rounded-xl p-5 space-y-4">
                <div className="flex items-center justify-between mb-3">
                  <h3 className="text-white font-semibold">Education #{index + 1}</h3>
                </div>
                <div className='grid grid-cols-1 md:grid-cols-2 gap-4'>
                    <div className='md:col-span-2'>
                        <label className='text-sm font-semibold text-white mb-2 block'>University Name</label>
                        <Input name="universityName" onChange={(e)=>handleChange(e,index)}
                            defaultValue={item?.universityName}
                            className="glass border-white/30 text-white placeholder:text-gray-400 focus:border-purple-400"
                            placeholder="Stanford University"
                        />
                    </div>
                    <div>
                        <label className='text-sm font-semibold text-white mb-2 block'>Degree</label>
                        <Input name="degree" onChange={(e)=>handleChange(e,index)}
                            defaultValue={item?.degree}
                            className="glass border-white/30 text-white placeholder:text-gray-400 focus:border-purple-400"
                            placeholder="Bachelor of Science"
                        />
                    </div>
                    <div>
                        <label className='text-sm font-semibold text-white mb-2 block'>Major</label>
                        <Input name="major" onChange={(e)=>handleChange(e,index)}
                            defaultValue={item?.major}
                            className="glass border-white/30 text-white placeholder:text-gray-400 focus:border-purple-400"
                            placeholder="Computer Science"
                        />
                    </div>
                    <div>
                        <label className='text-sm font-semibold text-white mb-2 block'>Start Date</label>
                        <Input type="date" name="startDate" onChange={(e)=>handleChange(e,index)}
                            defaultValue={item?.startDate}
                            className="glass border-white/30 text-white placeholder:text-gray-400 focus:border-purple-400"
                        />
                    </div>
                    <div>
                        <label className='text-sm font-semibold text-white mb-2 block'>End Date</label>
                        <Input type="date" name="endDate" onChange={(e)=>handleChange(e,index)}
                            defaultValue={item?.endDate}
                            className="glass border-white/30 text-white placeholder:text-gray-400 focus:border-purple-400"
                        />
                    </div>
                    <div className='md:col-span-2'>
                        <label className='text-sm font-semibold text-white mb-2 block'>Description</label>
                        <Textarea name="description" onChange={(e)=>handleChange(e,index)}
                            defaultValue={item?.description}
                            className="glass border-white/30 text-white placeholder:text-gray-400 focus:border-purple-400 min-h-[100px]"
                            placeholder="Describe your achievements, coursework, or activities..."
                        />
                    </div>
                </div>
            </div>
        ))}
      </div>
      <div className='flex flex-col sm:flex-row justify-between gap-3 mt-6'>
        <div className='flex gap-2'>
            <Button className="glass border-white/30 text-white hover:bg-white/20" onClick={AddNewEducation}> 
              + Add Education
            </Button>
            <Button className="glass border-white/30 text-white hover:bg-white/20" onClick={RemoveEducation}> 
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

export default Education

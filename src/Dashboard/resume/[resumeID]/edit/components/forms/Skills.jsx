import { Input } from '@/components/ui/input'
import React, { useEffect, useState } from 'react'
import { Rating } from '@smastrom/react-rating'

import '@smastrom/react-rating/style.css'
import { Button } from '@/components/ui/button'
import { LoaderCircle } from 'lucide-react'
import { useContext } from 'react'
import { ResumeInfoContext } from '@/context/ResumeInfoContext'
import { toast } from 'sonner'
import GlobalApi from './../../../../../../../services/GlobalApi'
import { useParams } from 'react-router-dom'

function Skills() {
    const [skillList,setSkillList]= useState([{
        name:'',
        rating:0
}])
    const [loading , setLoading] = useState(false);
    const {resumeInfo,setResumeInfo} = useContext(ResumeInfoContext);
    const params=useParams();

    const handleChange=(index,name,value)=>{
        const newEntries = skillList.slice();
        newEntries[index][name]=value;
        setSkillList(newEntries);
    }
    useEffect(()=>{
            resumeInfo && setSkillList(resumeInfo?.skills)
        },[])
    const AddNewSkills=()=>{
        setSkillList([...skillList,{
            name:'',
            rating:0
    }])
    }
    const RemoveSkills=()=>{
        setSkillList(skillList=>skillList.slice(0,-1))
    }
    const onSave=()=>{
        setLoading(true)
        const data={
            data:{
                skills:skillList.map(({id,...rest})=>rest)
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
            skills:skillList
        })
    },[skillList])
  return (
    <div className="glass rounded-2xl p-6 md:p-8 shadow-2xl border-t-4 border-purple-400">
      <div className="flex items-center gap-3 mb-2">
        <div className="w-10 h-10 gradient-warm rounded-xl flex items-center justify-center">
          <span className="text-white font-bold text-lg">5</span>
        </div>
        <h2 className='font-bold text-2xl text-white'>Skills</h2>
      </div>
      <p className="text-white/80 mb-6">Add your top professional key skills</p>

      <div className="space-y-4">
        {
            skillList.map((item,index)=>(
                <div key={index} className='glass-dark rounded-xl p-4 flex flex-col sm:flex-row justify-between gap-4 hover:bg-white/10 transition-colors'>
                    <div className="flex-1">
                        <label className="text-sm font-semibold text-white mb-2 block">Skill Name</label>
                        <Input 
                          className="glass border-white/30 text-white placeholder:text-gray-400 focus:border-purple-400" 
                          name='name' 
                          onChange={(e)=>handleChange(index,'name',e.target.value)} 
                          defaultValue={item?.name}
                          placeholder="e.g. JavaScript, React, Node.js"
                        />
                    </div>
                    <div className="flex flex-col items-start sm:items-end justify-center">
                        <label className="text-sm font-semibold text-white mb-2 block">Proficiency</label>
                        <Rating 
                          style={{ maxWidth: 125 }} 
                          value={item.rating} 
                          onChange={(v)=>handleChange(index,'rating',v)} 
                          defaultValue={item?.rating}
                        />
                    </div>
                </div>

            ))
        }
      </div>
      <div className='flex flex-col sm:flex-row justify-between gap-3 mt-6'>
        <div className='flex gap-2'>
            <Button className="glass border-white/30 text-white hover:bg-white/20" onClick={AddNewSkills}> 
              + Add Skill
            </Button>
            <Button className="glass border-white/30 text-white hover:bg-white/20" onClick={RemoveSkills}> 
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

export default Skills

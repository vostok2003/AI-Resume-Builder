import { Input } from '@/components/ui/input'
import React, { useEffect, useState } from 'react'
import { Rating } from '@smastrom/react-rating'

import '@smastrom/react-rating/style.css'
import { Button } from '@/components/ui/button'
import { LoaderCircle } from 'lucide-react'
import { useContext } from 'react'
import { ResumeInfoContext } from '@/context/ResumeInfoContext'
import { toast } from 'sonner'
import GlobalApi from './../../../../../../../services/globalApi'
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
    <div className="p-5 shadow-lg rounded-lg border-t-primary border-t-4 mt-10">
      <h2 className='font-bold text-lg'>Skills</h2>
      <p>Add your top Professional key skills</p>

      <div>
        {
            skillList.map((item,index)=>(
                <div className='flex justify-between border rounded-lg p-3 my-5 gap-2'>
                    <div>
                        <label>Name</label>
                        <Input className="w-full" name='name' onChange={(e)=>handleChange(index,'name',e.target.value)} 
                            defaultValue={item?.name}
                        />
                    </div>
                    <Rating style={{ maxWidth: 125 }} value={item.rating} onChange={(v)=>handleChange(index,'rating',v)} 
                            defaultValue={item?.rating}
                    />
                </div>

            ))
        }
      </div>
      <div className='flex justify-between'>
        <div className='flex gap-2'>
            <Button variant='outline' onClick={AddNewSkills}> + Add More Skills</Button>
            <Button variant='outline' onClick={RemoveSkills}> - Remove</Button>
        </div>
        
        <Button variant='outline' disabled={loading} onClick={()=>onSave()}>
            {loading ?<LoaderCircle className='animate-spin'/>:'Save'}
        </Button>
      </div>
    </div>
  )
}

export default Skills

import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { ResumeInfoContext } from '@/context/ResumeInfoContext'
import { LoaderCircle } from 'lucide-react';
import React, { useContext, useEffect, useState } from 'react'
import { useParams } from 'react-router-dom';
import GlobalApi from './../../../../../../../services/GlobalApi'
import { toast } from 'sonner';

function PersonalDetail({enabledNext}) {
    const params=useParams();
    const {resumeInfo,setResumeInfo} = useContext(ResumeInfoContext);
    const [formData,setFormData] = useState();
    const [loading,setLoading] = useState(false);

    useEffect(()=>{
        console.log(params)
    },[])
    const handleInputChange=(e)=>{
        enabledNext(false);
        const {name,value}=e.target;

        setFormData({
            ...formData,
            [name]:value
        })
        setResumeInfo({
            ...resumeInfo,
            [name]:value
        })
    }

    const onSave=(e)=>{
        e.preventDefault();
        setLoading(true);
        const data={
            data:formData
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
        <div className="w-10 h-10 gradient-primary rounded-xl flex items-center justify-center">
          <span className="text-white font-bold text-lg">1</span>
        </div>
        <h2 className='font-bold text-2xl text-white'>Personal Details</h2>
      </div>
      <p className="text-white/80 mb-6">Get started with your basic information</p>

      <form onSubmit={onSave}>
        <div className='grid grid-cols-1 md:grid-cols-2 gap-4'>
            <div>
                <label className='text-sm font-semibold text-white mb-2 block'>First Name</label>
                <Input name="firstName" required onChange={handleInputChange}
                    defaultValue={resumeInfo?.firstName}
                    className="glass border-white/30 text-white placeholder:text-gray-400 focus:border-purple-400"
                    placeholder="John"
                />
            </div>
            <div>
                <label className='text-sm font-semibold text-white mb-2 block'>Last Name</label>
                <Input name="lastName" required onChange={handleInputChange}
                    defaultValue={resumeInfo?.lastName}
                    className="glass border-white/30 text-white placeholder:text-gray-400 focus:border-purple-400"
                    placeholder="Doe"
                />
            </div>
            <div className="md:col-span-2"> 
                <label className='text-sm font-semibold text-white mb-2 block'>Job Title</label>
                <Input name="jobTitle" required onChange={handleInputChange}
                    defaultValue={resumeInfo?.jobTitle}
                    className="glass border-white/30 text-white placeholder:text-gray-400 focus:border-purple-400"
                    placeholder="Full Stack Developer"
                />
            </div>
            <div className='md:col-span-2'> 
                <label className='text-sm font-semibold text-white mb-2 block'>Address</label>
                <Input name="address" required onChange={handleInputChange}
                    defaultValue={resumeInfo?.address}
                    className="glass border-white/30 text-white placeholder:text-gray-400 focus:border-purple-400"
                    placeholder="123 Main St, City, State"
                />
            </div>
            <div>
                <label className='text-sm font-semibold text-white mb-2 block'>Phone</label>
                <Input name="phone" required onChange={handleInputChange}
                    defaultValue={resumeInfo?.phone}
                    className="glass border-white/30 text-white placeholder:text-gray-400 focus:border-purple-400"
                    placeholder="+1 (555) 123-4567"
                />
            </div>
            <div>
                <label className='text-sm font-semibold text-white mb-2 block'>Email</label>
                <Input name="email" required onChange={handleInputChange}
                    defaultValue={resumeInfo?.email}
                    className="glass border-white/30 text-white placeholder:text-gray-400 focus:border-purple-400"
                    placeholder="john@example.com"
                />
            </div>
            
        </div>
        <div className='mt-6 flex justify-end'>
                <Button type="submit" disabled={loading} className="gradient-primary text-white px-6">
                {loading?<LoaderCircle className='animate-spin'/>:'Save & Continue'}
                </Button>
        </div>
      </form>
    </div>
  )
}

export default PersonalDetail

import { Loader2, PlusSquare } from 'lucide-react'
import React, { useState } from 'react'
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Button } from '@/components/ui/button';
import { v4 as uuidv4} from 'uuid';
import { useUser } from '@clerk/clerk-react';
import GlobalApi from './../../../services/GlobalApi'
import { useNavigate } from 'react-router-dom';

function AddResume() {
  const [openDialog,setOpenDialog]=useState(false); 
  const [resumeTitle,setResumeTitle]=useState();
  const {user}=useUser();
  const [loading,setLoading]=useState(false);
  const navigate = useNavigate();

  const onCreate=async()=>{
    setLoading(true)
    const uuid=uuidv4();
    const data={
        data:{
            title:resumeTitle,
            resumeID:uuid,
            UserEmail:user?.primaryEmailAddress?.emailAddress,
            UserName:user?.fullName,
        }
    }
    GlobalApi.CreateNewResume(data)
    .then((res) => {
        console.log("Resume created:", res.data);
        if(res){
            setLoading(false);
            navigate('/dashboard/resume/'+res.data.data.documentId+'/edit')
        }
    })
    .catch((err) => {
        setLoading(false);
        console.error("Error creating resume:", err.response?.data || err);
    });
  }
  return (
    <div>
        <div className="glass rounded-2xl p-14 py-24 items-center flex justify-center h-[280px]
                        hover:scale-105 transition-all hover:shadow-2xl cursor-pointer border-2 border-dashed border-white/30
                        glow-hover group"
                        onClick={()=>setOpenDialog(true)}>
            <div className="text-center">
              <div className="w-16 h-16 gradient-primary rounded-2xl flex items-center justify-center mx-auto mb-3 group-hover:scale-110 transition-transform">
                <PlusSquare className="w-8 h-8 text-white"/>
              </div>
              <p className="text-white font-semibold">Create New Resume</p>
            </div>
        </div>
        <Dialog open={openDialog}>
            
            <DialogContent className="glass-dark border-white/20">
                <DialogHeader>
                    <DialogTitle className="text-2xl font-bold bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent">
                      Create New Resume
                    </DialogTitle>
                    <DialogDescription className="text-gray-300">
                        Add a title for your new resume
                        <Input 
                        className="my-4 glass border-white/30 text-white placeholder:text-gray-400 focus:border-purple-400" 
                        placeholder="Ex. Full Stack Developer Resume"
                        onChange={(e)=>setResumeTitle(e.target.value)}
                        />
                    </DialogDescription>
                    <div className="flex justify-end gap-3 mt-4">
                        
                        <Button variant="ghost" onClick={()=>setOpenDialog(false)} className="text-white hover:bg-white/10">
                         Cancel</Button>
                        <Button 
                        className="gradient-primary text-white"
                        disabled={!resumeTitle || loading}
                        onClick={()=>onCreate()}
                        >
                        {
                          loading?
                          <Loader2 className='animate-spin'/> :
                          'Create Resume' }    </Button>
                    </div>
                </DialogHeader>
            </DialogContent>
        </Dialog>
    </div>
  )
}

export default AddResume

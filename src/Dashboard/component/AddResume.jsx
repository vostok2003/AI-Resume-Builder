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
        <div className="p-14 py-24 border items-center flex justify-center bg-secondary rounded-lg h-[280px]
                        hover:scale-105 trasition-all hover:shadow-md cursor-pointer border-dashed"
                        onClick={()=>setOpenDialog(true)}>
            <PlusSquare/>
        </div>
        <Dialog open={openDialog}>
            
            <DialogContent>
                <DialogHeader>
                    <DialogTitle>Create New Resume</DialogTitle>
                    <DialogDescription>
                        Add a title for your new resume
                        <Input 
                        className="my-2" 
                        placeholder="Ex.Full Stack resume"
                        onChange={(e)=>setResumeTitle(e.target.value)}
                        />
                    </DialogDescription>
                    <div className="flex justify-end gap-5 mt-4">
                        
                        <Button variant="ghost" onClick={()=>setOpenDialog(false)}>
                         Cancel</Button>
                        <Button 
                        variant="secondary"
                        disabled={!resumeTitle || loading}
                        onClick={()=>onCreate()}
                        >
                        {
                          loading?
                          <Loader2 className='animate-spin'/> :
                          'Create' }    </Button>
                    </div>
                </DialogHeader>
            </DialogContent>
        </Dialog>
    </div>
  )
}

export default AddResume

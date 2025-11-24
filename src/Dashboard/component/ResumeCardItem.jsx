import { LoaderCircle, MoreVertical, Notebook } from 'lucide-react'
import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"

import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog"
import { toast } from 'sonner'

import GlobalApi from './../../../services/GlobalApi'

function ResumeCardItem({resume,refreshData}) {
  const navigation = useNavigate();
  const [openAlert,setOpenAlert]= useState(false);
  const [loading,setLoading] = useState(false);

  const onDelete=()=>{
    setLoading(true);
    GlobalApi.DeleteResumeById(resume.documentId).then(resp=>{
      console.log(resp);
      toast('Resume Deleted!')
      refreshData();
      setLoading(false);
      setOpenAlert(false);
    },(error)=>{
      toast('server error');
      setLoading(false);
    })
  }

  const gradients = [
    'gradient-primary',
    'gradient-secondary', 
    'gradient-success',
    'gradient-warm',
    'gradient-ocean',
    'gradient-forest',
    'gradient-sunset'
  ];
  
  const randomGradient = gradients[Math.floor(Math.random() * gradients.length)];

  return (
    <div className="group">
      <Link to={'/dashboard/resume/'+resume.documentId+'/edit'}>
        <div className={`glass rounded-2xl p-14 flex items-center justify-center h-[280px]
                        hover:scale-105 transition-all hover:shadow-2xl cursor-pointer 
                        border border-white/20 glow-hover relative overflow-hidden`}>
            <div className={`absolute inset-0 ${randomGradient} opacity-20 group-hover:opacity-30 transition-opacity`}></div>
            <img src="/cv.png" width={80} height={80} className="relative z-10 drop-shadow-lg group-hover:scale-110 transition-transform"/>
        </div>
      
      </Link>
      <div className='glass-dark border border-white/20 p-4 flex justify-between items-center rounded-b-2xl shadow-lg mt-2'
         style={{
          background: resume?.themeColor ? `linear-gradient(135deg, ${resume.themeColor}, ${resume.themeColor}dd)` : undefined
        }}>
        <h2 className='text-md font-semibold text-white truncate flex-1'>{resume.title}</h2>
        
        <DropdownMenu>
          <DropdownMenuTrigger className="hover:bg-white/20 rounded-full p-1 transition-colors">
            <MoreVertical className='h-5 w-5 cursor-pointer text-white'/>
          </DropdownMenuTrigger>
            <DropdownMenuContent className="glass-dark border-white/20">
              
            <DropdownMenuItem onClick={()=>navigation('/dashboard/resume/'+resume.documentId+'/edit')} className="text-white hover:bg-white/10">
            Edit</DropdownMenuItem>
            <DropdownMenuItem onClick={()=>navigation('/my-resume/'+resume.documentId+'/view')} className="text-white hover:bg-white/10">
            View</DropdownMenuItem>
            <DropdownMenuItem onClick={()=>navigation('/my-resume/'+resume.documentId+'/view')} className="text-white hover:bg-white/10">Download</DropdownMenuItem>
            <DropdownMenuItem onClick={()=>setOpenAlert(true)} className="text-red-400 hover:bg-red-500/10">Delete</DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>

        <AlertDialog open={openAlert}>
          
          <AlertDialogContent className="glass-dark border-white/20">
            <AlertDialogHeader>
              <AlertDialogTitle className="text-white text-xl">Are you absolutely sure?</AlertDialogTitle>
              <AlertDialogDescription className="text-gray-300">
                This action cannot be undone. This will permanently delete your resume
                  and remove your data from our servers.
              </AlertDialogDescription>
            </AlertDialogHeader>
            <AlertDialogFooter>
              <AlertDialogCancel onClick={()=>setOpenAlert(false)} className="glass border-white/30 text-white hover:bg-white/10">Cancel</AlertDialogCancel>
              <AlertDialogAction onClick={onDelete} disabled={loading} className="bg-red-500 hover:bg-red-600 text-white">
                {loading? <LoaderCircle className='animate-spin'/> : 'Delete'}
              </AlertDialogAction>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialog>
      </div>
    </div>
    
    
  )
}

export default ResumeCardItem

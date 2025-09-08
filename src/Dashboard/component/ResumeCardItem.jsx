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

  return (
    <div>
      <Link to={'/dashboard/resume/'+resume.documentId+'/edit'}>
        <div className='p-14 bg-secondary flex items-center justify-center h-[280px]
                        border border-primary rounded-lg
                        hover:scale-105 trasition-all hover:shadow-md shadow-primary cursor-pointer 
                        bg-gradient-to-b from-pink-180 via-purple-200 to-blue-200'>
            <img src="/cv.png" width={80} height={80}/>
        </div>
      
      </Link>
      <div className='border p-3 flex justify-between  text-white rounded-b-lg shadow-lg'
         style={{
          background:resume?.themeColor
        }}>
        <h2 className='text-md'>{resume.title}</h2>
        
        <DropdownMenu>
          <DropdownMenuTrigger>
            <MoreVertical className='h-4 w-4 cursor-pointer text-black'/>
          </DropdownMenuTrigger>
            <DropdownMenuContent>
              
            <DropdownMenuItem onClick={()=>navigation('/dashboard/resume/'+resume.documentId+'/edit')}>
            Edit</DropdownMenuItem>
            <DropdownMenuItem onClick={()=>navigation('/my-resume/'+resume.documentId+'/view')}>
            View</DropdownMenuItem>
            <DropdownMenuItem onClick={()=>navigation('/my-resume/'+resume.documentId+'/view')}>Download</DropdownMenuItem>
            <DropdownMenuItem onClick={()=>setOpenAlert(true)}>Delete</DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>

        <AlertDialog open={openAlert}>
          
          <AlertDialogContent>
            <AlertDialogHeader>
              <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
              <AlertDialogDescription>
                This action cannot be undone. This will permanently delete your account
                  and remove your data from our servers.
              </AlertDialogDescription>
            </AlertDialogHeader>
            <AlertDialogFooter>
              <AlertDialogCancel onClick={()=>setOpenAlert(false)}>Cancel</AlertDialogCancel>
              <AlertDialogAction onClick={onDelete} disabled={loading} className="text-black">
                {loading? <LoaderCircle className='animate-spin text-black'/> : 'Delete'}
              </AlertDialogAction>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialog>
      </div>
    </div>
    
    
  )
}

export default ResumeCardItem

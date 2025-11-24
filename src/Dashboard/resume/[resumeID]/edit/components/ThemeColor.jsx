import React, { useState } from 'react'
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover"
import { Button } from '@/components/ui/button'
import { LayoutGrid } from 'lucide-react'
import { useContext } from 'react'
import { ResumeInfoContext } from '@/context/ResumeInfoContext'
import { useParams } from 'react-router-dom'
import { toast } from 'sonner'
import GlobalApi from './../../../../../../services/GlobalApi'

function ThemeColor() {
    const colors=[
        "#FF5733", "#33FF57", "#3357FF", "#FF33A1", "#A133FF",
        "#33FFA1", "#FF7133", "#71FF33", "#7133FF", "#FF3371",
        "#33FF71", "#3371FF", "#A1FF33", "#33A1FF", "#FF5733",
        "#5733FF", "#33FF5A", "#5A33FF", "#FF335A", "#335AFF"
    ]

    const {resumeInfo,setResumeInfo}= useContext(ResumeInfoContext);
    const [selectedColor,setSelectedColor] = useState();
    const { resumeID } = useParams();
    const onColorSelect=(color)=>{
        setSelectedColor(color)
        setResumeInfo({
            ...resumeInfo,
            themeColor:color
        })


        const data={
            data:{
                themeColor:color
            }
        }
        GlobalApi.UpdateResumeDetail(resumeID,data).then(resp=>{
            console.log(resp);
            toast('Theme Color Updated')
        })
    }
  return (
    <Popover>
        <PopoverTrigger asChild>
            <Button className="glass border-white/30 text-white hover:bg-white/20 flex gap-2" size="sm">
              <LayoutGrid className="w-4 h-4"/> 
              <span className="hidden sm:inline">Theme</span>
            </Button>
        </PopoverTrigger>
        <PopoverContent className="glass-dark border-white/20 backdrop-blur-xl">
            <h2 className='mb-3 text-sm font-bold text-white flex items-center gap-2'>
              <LayoutGrid className="w-4 h-4"/>
              Select Theme Color
            </h2>
            <div className="grid grid-cols-5 gap-3">
                { colors.map((item,index)=>(
                <div
                key={index}
                onClick={()=>onColorSelect(item)}
                className={`h-8 w-8 rounded-lg cursor-pointer hover:scale-110 transition-transform border-2
                ${selectedColor==item ? 'border-white scale-110 shadow-lg' : 'border-white/30'}`}
                style={{
                    background:item
                }}
                >

                </div>
            ))}
            </div>
        </PopoverContent>
    </Popover>
  )
}

export default ThemeColor

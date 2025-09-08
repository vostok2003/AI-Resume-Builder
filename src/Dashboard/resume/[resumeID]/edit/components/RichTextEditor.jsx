import { Button } from '@/components/ui/button';
import { ResumeInfoContext } from '@/context/ResumeInfoContext';
import { Brain, Loader } from 'lucide-react';
import React, { useState } from 'react'
import { useContext } from 'react';
import { BtnBold, BtnBulletList, BtnClearFormatting, BtnItalic, BtnLink, BtnNumberedList, BtnStrikeThrough, BtnStyles, BtnUnderline, Editor, EditorProvider, HtmlButton, Separator, Toolbar } from 'react-simple-wysiwyg'
import { toast } from 'sonner';
import { AIChatSession } from './../../../../../../services/AIModal'

const prompt = 'Given the positionTitle: "{positionTitle}", return ONLY 5-7 concise bullet points in HTML list items (<li>...)</li>. ' +
  'Do NOT include any extra text, headings, JSON, backticks, or wrapper tags (no <ul>, no text before/after). ' +
  'Output must be plain HTML list items like: <li>Item 1</li><li>Item 2</li> ...'



function RichTextEditor({ onRichTextEditorChange ,index,defualtValue}) {
    const[value,setValue]=useState(defualtValue);
    const {resumeInfo,setResumeInfo}= useContext(ResumeInfoContext);
    const [loading, setLoading] = useState(false);

    const GenerateSummeryFromAI=async()=>{
        setLoading(true);
        if(!resumeInfo.experience[index].title){
            toast('please Add Position Title')
            return;
        }
        const PROMPT = prompt.replace('{positionTitle}',resumeInfo.experience[index].title);
        console.log(PROMPT);
        const result=await AIChatSession.sendMessage(PROMPT);
        const parsed = result.response.text();
        setValue(parsed.replace('[','').replace(']',''));
        
        setLoading(false);
    }


  return (
    <div>
        <div className='flex justify-between my-2'>
            <label className='text-xs'>Summery</label>
            <Button  variant='outline' size='sm' className='flex gap-2'
                onClick={GenerateSummeryFromAI}
            >
            {
                loading? <Loader className='animate-spin'/>:
                <>
                    <Brain/> Generate from AI
                </>
            }

            </Button>
        </div>
      <EditorProvider>
        <Editor value={value} onChange={(e)=>{
            setValue(e.target.value);
            onRichTextEditorChange(e)
        }}>
            <Toolbar>
                <BtnBold/>
                <BtnItalic/>
            
                <BtnUnderline/>
                <BtnStrikeThrough/>
                <Separator/>
                <BtnNumberedList/>
                <BtnBulletList/>
                <Separator/>
                <BtnLink/>
                <BtnClearFormatting/>
                <HtmlButton/>
                <Separator/>
                <BtnStyles/>


            </Toolbar>
        </Editor>
      </EditorProvider>
    </div>
  )
}

export default RichTextEditor

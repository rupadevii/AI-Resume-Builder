import { useEffect, useState } from 'react'
import axios from 'axios'
import { useInfo } from '../../context/InfoContext'
import Template1 from '../template1/Template1'
import Template2 from '../template2/Template2'
import Template3 from '../template3/Template3'
import { calculateCount, calculateTotalCount } from '../../utils/stats'
import { Sparkle, Sparkles } from 'lucide-react'
const URL = import.meta.env.VITE_BASE_URL

export default function AISection({template, setShow, show, aiResponse, setAiResponse}) {
    const [loading, setLoading] = useState(false)
    const {info} = useInfo()
    const [error, setError] = useState(null)

    useEffect(() => {
        setError(null)
    }, [info])
    
    async function refineResume(){
        try{
            setLoading(true)
            const totalCount = calculateTotalCount(info)
            const count = calculateCount(info)
        
            const currScore = Math.ceil((count/totalCount) * 100)

            if(currScore<75){
                setError("Your score is low. Your score must be greater than 75 for you to be able to enhance your resume using ai. Fill more details and try again.")
                return
            }

            const res = await axios.post(`/api/refine-resume`, {resumeData:info})
            setAiResponse(res.data.data)
            localStorage.setItem("ai_response", JSON.stringify(res.data.data))
            setShow(true)
        }catch(error){
            console.log(error)
            setError("Something went wrong...")
        }finally{
            setLoading(false)
        }

    }

    function handleClick(){
        refineResume()
    }

    if(loading || error){
        return (
            <div className='flex h-140 justify-center items-center bg-white border w-198'>
                {loading ? 
                // "Loading..."
                (
                    <div className="flex justify-center items-center">
                        <div className='absolute'>
                            <Sparkles size={14} />
                        </div>
                        <div className="animate-spin rounded-full h-8 w-8 border-2 border-slate-200 border-t-indigo-600 relative">
                        </div>
                    </div>
                )
                 : 
                (<div className='text-lg w-95 text-center'>{error}</div>)}
            </div>
        )
    }
    
    return (
        <section>
            {!show ? (
                <div className='flex h-140 justify-center items-center bg-white border w-198'>
                    <div className="w-115 flex justify-center flex-col items-center gap-3">
                        <h3 className="text-lg text-center">
                            Your resume has not been refined with AI yet. To get an enhanced version of your resume, click below
                        </h3>
                        <button onClick={handleClick} className="bg-black text-white px-4 py-2 rounded-md hover:bg-stone-600 text-lg flex gap-2 items-center">Enhance {<Sparkles size={18}/>}</button>
                    </div>
                </div>
            ) : (
                <div>
                    <div className='a4-print-container resume'>
                        {template==="template1" && (
                            <Template1 data={aiResponse}/>
                        )}
                        {template==="template2" && (
                            <Template2 data={aiResponse}/>
                        )}
                        {template==="template3" && (
                            <Template3 data={aiResponse}/>
                        )}
                    </div>
                </div>
            )}
        </section>
    )
}

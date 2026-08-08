import { useState } from "react"
import { useInfo } from "../../context/InfoContext"
import { Lightbulb, X } from "lucide-react"

export default function Skills() {
    const {info, setInfo} = useInfo()
    const [technical, setTechnical] = useState("")
    const [soft, setSoft] = useState("")
    const [tools, setTools] = useState("")

    function handleKeyDown(e){
        if(e.key === "Enter"){
            const {name, value} = e.target
            setInfo(prev => ({...prev, skills: {...prev.skills, [name] : [...prev.skills[name], value]}}))
            setTechnical("")
            setSoft("")
            setTools("")
        }
    }

    function deleteSkill(e, name, index){
        setInfo(prev => ({...prev, skills: {...prev.skills, [name] : prev.skills[name].filter((item, idx) => idx !== index)}}))

    }

    // console.log(info.skills)

    return (
        <section className='builder my-6 px-10 py-8 border-stone-500 rounded-lg shadow-2xl'>
            <div className='flex gap-3'>
                <Lightbulb />
                <p className='font-bold text-xl'>Skills</p>
            </div>
            
            <form className='px-2 py-6 relative' >    
                <div className='flex flex-col'>
                    <label htmlFor="name" className="text-stone-900 text-xs my-1">TECHNICAL SKILLS</label>
                    <input 
                        type="text" 
                        className='border rounded-md p-2 w-full'
                        name="technical"
                        placeholder='Type and press Enter'
                        onKeyDown={handleKeyDown}
                        onChange={(e) => setTechnical(e.target.value)}
                        value={technical}/>
                    <div className='flex my-2 gap-2 flex-wrap'>
                        {info.skills.technical.map((item, idx) => (
                            <div className='border-stone-400 rounded-md px-3 py-1 border flex items-center gap-1' key={idx}>
                                <span>{item}</span>
                                <span onClick={(e) => deleteSkill(e, "technical", idx)}><X size={14} /></span>
                            </div>
                        ))}
                    </div>
                </div>
                <div className='flex flex-col'>
                    <label htmlFor="email" className="text-stone-900 text-xs my-1">SOFT SKILLS</label>
                    <input 
                        type="text" 
                        className='border rounded-md p-2'
                        name="soft"
                        placeholder='Type and press Enter'
                        onKeyDown={handleKeyDown}
                        onChange={(e) => setSoft(e.target.value)}
                        value={soft}/>
                    <div className='flex my-2 gap-2 flex-wrap'>
                        {info.skills.soft.map((item, idx) => (
                            <div className='border-stone-400 rounded-md px-3 py-1 border flex items-center gap-1' key={idx}>
                                <span>{item}</span>
                                <span onClick={(e) => deleteSkill(e, "soft", idx)}><X size={14} /></span>
                            </div>
                        ))}
                    </div>
                </div>
                    
                <div className='flex flex-col'>
                    <label htmlFor="phone" className="text-stone-900 text-xs my-1">TOOLS AND TECHNOLOGIES</label>
                    <input 
                        type="text" className='border rounded-md p-2'
                        name="tools"
                        onKeyDown={handleKeyDown}
                        placeholder='Type and press Enter'
                        onChange={(e) => setTools(e.target.value)}
                        value={tools}/>
                    <div className='flex my-2 gap-2 flex-wrap'>
                        {info.skills.tools.map((item, idx) => (
                            <div className='border-stone-400 rounded-md px-3 py-1 border flex items-center gap-1' key={idx}>
                                <span>{item}</span>
                                <span onClick={(e) => deleteSkill(e, "tools", idx)}><X size={14} /></span>
                            </div>
                        ))}
                    </div>
                </div>
            </form>
        </section>
    )
}

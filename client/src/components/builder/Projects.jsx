import { useEffect, useState } from 'react'
import { useInfo } from '../../context/InfoContext'
import { ChevronDown, ChevronUp, FolderGit2, Plus, Trash2, X } from 'lucide-react'

export default function Projects() {
    const {info, setInfo} = useInfo()
    const [count, setCount] = useState(info.projects.length)
    const [show, setShow] = useState(new Array(count).fill(false))
    const [techStack, setTechStack] = useState("")

    useEffect(() => {
        // eslint-disable-next-line react-hooks/set-state-in-effect
        setShow(prev => ([...prev, false]));
    }, [count])

    function toggleDisplay(idx){
        console.log(idx)
        setShow(prev => prev.map((item, index) => index===idx ? !item : item))
    }
            
    function handleChange(e, index){
        const {name, value} = e.target
        
        if(name === "desc"){
            if(value.length > 200) return
        }

        setInfo(prev => ({...prev, projects: prev.projects.map((item, idx) => index === idx ? {...item, [name]: value}: item)}))
    }

    function handleKeyDown(e, index){

        if(e.key === "Enter"){
            setInfo(prev => ({...prev, projects: prev.projects.map((item, idx) => index === idx ? {...item, technologies: [...item.technologies, techStack]}: item)}))
            setTechStack("")
        }
    }
    
    function addProject(){
        setInfo(prev => ({...prev, projects: [...prev.projects, {
            title: "",
            desc: "",
            technologies: [],
            liveURL: "",
            githubURL: ""
        }]}))
    }

    function deleteTechStack(e, projectIndex, skillIdx){
        setInfo(prev => ({...prev, projects: prev.projects.map((item, index) => index === projectIndex ? {...item, technologies: item.technologies.filter((item, idx) => idx !== skillIdx)}: item)}))
    }

    function deleteProject(e, index){
        setCount(prev => prev-1)

        setInfo(prev => ({...prev, projects: prev.projects.filter((item, idx) => index!==idx)}))
    }

    return (
        <section className='builder my-6 px-12 py-8 border-stone-500 rounded-lg shadow-2xl'>
            <div className='flex gap-3'>
                <FolderGit2 />
                <p className='font-bold text-xl'>Projects</p>
            </div>
            <div className='my-5'>
                {info.projects.map((item, index) => (
                    <div className='my-3' key={index}>
                        <button onClick={() => toggleDisplay(index)} className='border rounded-md py-2 flex justify-between px-4 items-center w-full'>
                            <div className='flex gap-2 items-center'>
                                {show[index] ? (
                                    <ChevronUp size={18}/>
                                ) : (
                                    <ChevronDown size={18}/>
                                )}
                                {info.projects[index].title || "New Project"}
                            </div>
                            {index !== 0 && (
                            <div className='rounded-md hover:bg-stone-300 p-2 cursor-pointer' onClick={(e) => {
                                deleteProject(e, index)
                                e.stopPropagation()
                            }}>
                                <Trash2 size={16}/>
                            </div>
                            )}
                        </button>
                        {show[index] && (
                            <form className='border rounded-b-md border-stone-400 px-10 py-6'>
                            <div className='lg:flex-nowrap flex gap-4 mb-2 md:flex-wrap items-center'>
                                <div className='flex flex-col'>
                                    <label htmlFor="name" className="text-stone-500 text-xs mb-1">PROJECT TITLE</label>
                                    <input 
                                        type="text" 
                                        className='border rounded-md p-2 w-full'
                                        name="title"
                                        onChange={(e) => handleChange(e, index)}
                                        value={info.projects[index].title}/>
                                </div>
                                <div className='flex flex-col'>
                                    <label htmlFor="liveURL" className="text-stone-500 text-xs mb-1">LIVE URL</label>
                                    <input 
                                        type="text" 
                                        className='border rounded-md p-2 w-full'
                                        name="liveURL"
                                        onChange={(e) => handleChange(e, index)}
                                        value={info.projects[index].liveURL}/>
                                </div>
                            </div>
                            <div className='my-2'>
                                <div className='flex flex-col'>
                                    <label htmlFor="phone" className="text-stone-500 text-xs my-1">GITHUB URL</label>
                                    <input 
                                        type="text" className='border rounded-md p-2 lg:w-[48%] w-30'
                                        name="githubURL"
                                        onChange={(e) => handleChange(e, index)}
                                        value={info.projects[index].githubURL}/>
                                </div>   
                            </div>
                            <div className='my-2'>
                                <div className='flex flex-col'>
                                    <label htmlFor="technologies" className="text-stone-500 text-xs my-1">TECH STACK</label>
                                    <input 
                                        type="text" className='border rounded-md p-2 w-full'
                                        name="technologies"
                                        placeholder='Type and press Enter'
                                        onChange={(e) => setTechStack(e.target.value)}
                                        onKeyDown={(e) => handleKeyDown(e, index)}
                                        value={techStack}/>
                                    <div className='flex my-2 gap-2 w-100 flex-wrap'>
                                        {info.projects[index].technologies.map((item, idx) => (
                                            <div className='border-stone-400 rounded-md px-3 py-1 border flex items-center gap-1' key={idx}>
                                                <span>{item}</span>
                                                <span onClick={(e) => deleteTechStack(e, index, idx)}><X size={14} /></span>
                                            </div>
                                        ))}
                                    </div>
                                </div>
                            </div>
                            <div className='flex flex-col my-2'>
                                <div className='flex justify-between'>
                                    <label htmlFor="desc" className="text-stone-500 text-xs my-1">DESCRIPTION</label>
                                    <span className={`text-sm ${info.projects[index].desc.length <180 ? "text-yellow-600" : "text-red-500"}`}>{info.projects[index].desc.length}/200</span>
                                </div>
                                <textarea 
                                    rows="3" className='border rounded-md p-3'
                                    name="desc"
                                    onChange={(e) => handleChange(e, index)}
                                    value={info.projects[index].desc}></textarea>
                            </div>
                        </form>

                        )}
                    </div>
                ))}
            </div>
            
            <button 
             disabled={info.projects.length===3} onClick={addProject}
                className='w-full border border-stone-400 rounded-md px-3 py-2 flex items-center justify-center cursor-pointer hover:bg-stone-300 hover:border-black'><Plus size={18}/>Add</button>
           
        </section>
    )
}

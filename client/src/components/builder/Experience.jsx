import { BookOpenText, Plus, Trash2 } from 'lucide-react'
import { useInfo } from '../../context/InfoContext'

export default function Experience() {
    const {info, setInfo} = useInfo()
        
    function handleChange(e, index){
        const {name, value} = e.target
        
        if(name === "desc"){
            if(value.length > 200) return
        }
        
        if(name==="isCurrentCompany"){
            setInfo(prev => ({...prev, workExperience: prev.workExperience.map((item, idx) => index === idx ? {...item, isCurrentCompany: !item.isCurrentCompany} : item)}))
        }else{
            setInfo(prev => ({...prev, workExperience: prev.workExperience.map((item, idx) => index === idx ? {...item, [name]: value}: item)}))
        }

    }

    function addEducation(){
        setInfo(prev => ({...prev, workExperience: [...prev.workExperience, {
            companyName: "",
            startDate: "",
            endDate: "",
            designation: "",
            desc: "",
            isCurrentCompany: false
        }]}))
    }

    function deleteExperience(idx){
        setInfo(prev => ({...prev, workExperience: prev.workExperience.filter((item, index) => index !== idx)}))
    }

    return (
        <section className='builder my-6 px-10 py-8 border-stone-500 rounded-lg shadow-2xl'>
            <div className='flex gap-3'>
                <BookOpenText />
                <p className='font-bold text-xl'>Experience</p>
            </div>
            {info.workExperience.map((item, index) => (
                <form className='my-6 border rounded-md border-stone-500 px-10 py-6 relative' key={index}>
                    {index !== 0 && (
                        <div className='absolute right-3 top-3 rounded-md hover:bg-stone-300 p-2 cursor-pointer' onClick={() => deleteExperience(index)}>
                            <Trash2 size={16}/>
                        </div>
                    )}
                    <div className='flex gap-4 my-2'>
                        <div className='flex flex-col'>
                            <label htmlFor="email" className="text-stone-500 text-xs my-1">ROLE</label>
                            <input 
                                type="text" 
                                className='border rounded-md p-2 w-full'
                                name="designation"
                                onChange={(e) => handleChange(e, index)}
                                value={info.workExperience[index].designation}/>
                        </div>
                        <div className='flex flex-col'>
                            <label htmlFor="name" className="text-stone-500 text-xs my-1">COMPANY</label>
                            <input 
                                type="text" 
                                className='border rounded-md p-2 w-full'
                                name="companyName"
                                onChange={(e) => handleChange(e, index)}
                                value={info.workExperience[index].companyName}/>
                        </div>
                    </div>
                    <div className='flex gap-4 my-2 items-center flex-wrap'>
                        <div className='flex flex-col'>
                            <label htmlFor="phone" className="text-stone-500 text-xs my-1">START DATE</label>
                            <input 
                                type="month" className='border rounded-md p-2 w-35'
                                name="startDate"
                                onChange={(e) => handleChange(e, index)}
                                value={info.workExperience[index].startDate}/>
                        </div>
                        <div className='flex flex-col'>
                            <label htmlFor="location" className="text-stone-500 text-xs my-1">END DATE</label>
                            <input 
                                type="month" className='border rounded-md p-2 w-35'
                                name="endDate"
                                disabled={info.workExperience[index].isCurrentCompany}
                                onChange={(e) => handleChange(e, index)}
                                value={info.workExperience[index].endDate}/>
                        </div>
                        <div className='flex gap-2 justify-center'>
                            <input 
                                type="checkbox" className='border rounded-md p-2 h-5'
                                name="isCurrentCompany"
                                onChange={(e) => handleChange(e, index)}
                                checked={info.workExperience[index].isCurrentCompany}/>
                            <label htmlFor="location" className="text-stone-500 text-xs my-1">CURRENT COMPANY</label>
                        </div>
                    </div>
                    <div className='flex flex-col my-2'>
                        <div className='flex justify-between'>
                            <label htmlFor="desc" className="text-stone-500 text-xs my-1">DESCRIPTION</label>
                            <span className={`text-sm ${info.workExperience[index].desc.length <180 ? "text-yellow-600" : "text-red-500"}`}>{info.workExperience[index].desc.length}/200</span>
                        </div>
                        <textarea 
                            rows="3" className='border rounded-md p-3'
                            name="desc"
                            onChange={(e) => handleChange(e, index)}
                            value={info.workExperience[index].desc}></textarea>
                    </div>
            </form>
            ))}
            
            <button 
                disabled={info.workExperience.length===3} 
                onClick={addEducation} 
                className='w-full border border-stone-400 rounded-md px-3 py-2 flex items-center justify-center cursor-pointer hover:bg-stone-300 hover:border-black'>
                    <Plus size={18}/>Add
            </button>
           
        </section>
    )
}


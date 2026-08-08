import { BookOpenText, Plus, Trash2 } from 'lucide-react'
import { useInfo } from '../../context/InfoContext'

export default function Education() {
    const {info, setInfo} = useInfo()

    function handleChange(e, index){
        const {name, value} = e.target

        if(name === "cgpa" && isNaN(value)){
            return
        }

        setInfo(prev => ({...prev, education: prev.education.map((item, idx) => index === idx ? {...item, [name]: value}: item)}))
    }

    function addEducation(){
        setInfo(prev => ({...prev, education: [...prev.education, {
            school: "",
            degree: "",
            startDate: "",
            endDate: "",
            cgpa: "",
        }]}))
    }

    function deleteEducation(idx){
        setInfo(prev => ({...prev, education: prev.education.filter((item, index) => index !== idx)}))
    }

    return (
        <div className='builder my-6 px-10 py-8 border-stone-500 rounded-lg shadow-2xl'>
            <div className='flex gap-3'>
                <BookOpenText />
                <p className='font-bold text-xl'>Education</p>
            </div>
            {info.education.map((item, index) => (
                <form className='my-6 border rounded-md border-stone-500 px-10 py-6 relative' key={index}>
                    {index !== 0 && (
                        <div className='absolute right-3 top-3 rounded-md hover:bg-stone-300 p-2 cursor-pointer' onClick={() => deleteEducation(index)}>
                            <Trash2 size={16}/>
                        </div>
                    )}
                    <div className='flex gap-5 my-2'>
                        <div className='flex flex-col'>
                            <label htmlFor="name" className="text-stone-500 text-xs my-1">SCHOOL</label>
                            <input 
                                type="text" 
                                className='border rounded-md p-2 w-full'
                                name="school"
                                onChange={(e) => handleChange(e, index)}
                                value={info.education[index].school}/>
                        </div>
                        <div className='flex flex-col'>
                            <label htmlFor="email" className="text-stone-500 text-xs my-1">DEGREE/FIELD</label>
                            <input 
                                type="text" 
                                className='border rounded-md p-2 w-full'
                                name="degree"
                                onChange={(e) => handleChange(e, index)}
                                value={info.education[index].degree}/>
                        </div>
                    </div>
                    <div className='flex gap-4 my-2 flex-wrap'>
                        <div className='flex flex-col'>
                            <label htmlFor="phone" className="text-stone-500 text-xs my-1">START DATE</label>
                            <input 
                                type="month" className='border rounded-md p-2 w-35'
                                name="startDate"
                                onChange={(e) => handleChange(e, index)}
                                value={info.education[index].startDate}/>
                        </div>
                        <div className='flex flex-col'>
                            <label htmlFor="location" className="text-stone-500 text-xs my-1">END DATE</label>
                            <input 
                                type="month" className='border rounded-md p-2 w-35'
                                name="endDate"
                                onChange={(e) => handleChange(e, index)}
                                value={info.education[index].endDate}/>
                        </div>
                        <div className='flex flex-col'>
                            <label htmlFor="location" className="text-stone-500 text-xs my-1">CGPA</label>
                            <input 
                                type="text" className='border rounded-md p-2 w-35'
                                name="cgpa"
                                onChange={(e) => handleChange(e, index)}
                                value={info.education[index].cgpa}/>
                        </div>
                    </div>
            </form>
            ))}
            
            <button 
                disabled={info.education.length===3} 
                onClick={addEducation} 
                className='border border-stone-400 hover:bg-stone-300 hover:border-black rounded-md px-3 py-2 flex items-center justify-center cursor-pointer w-full'>
                    <Plus size={18}/>Add
            </button>
           
        </div>
    )
}


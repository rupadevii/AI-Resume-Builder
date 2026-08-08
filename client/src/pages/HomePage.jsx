import Button from '../components/ui/Button'
import { useInfo } from '../context/InfoContext'
import { useNavigate } from 'react-router-dom'
import template1 from '../assets/template1.png'
import template2 from '../assets/template2.png'
import template3 from '../assets/template3.png'

export default function HomePage(){
    const {info, setInfo} = useInfo()
    const navigate = useNavigate()

    function handleClick(type){
        setInfo(prev => ({...prev, resumeType: type}))
    }
    
    function chooseTemplate(type){
        navigate(`/build/${type}`)
    }

    return (
        <main className='flex h-screen justify-center items-center pt-8'>
            <section className='w-190 text-center flex items-center flex-col justify-center gap-4'>
                <div>
                    <h2 className='text-4xl font-extrabold'>Choose Resume Type</h2>
                    <div className='flex gap-4 my-6'>
                        <Button handleClick={handleClick} label="Beginner" isActive={info.resumeType === "Beginner"}/>
                        <Button handleClick={handleClick} label="Experienced" isActive={info.resumeType === "Experienced"}/>
                    </div>
                </div>
                <div>
                    <h2 className='text-4xl font-extrabold'>Choose Template</h2>
                    <div className='flex gap-6 my-4'>
                        <button className='flex my-2 p-5 capitalize shadow-lg cursor-pointer gap-3 items-center hover:bg-stone-400 text-xl' onClick={() => chooseTemplate("template1")}><img src={template1}/></button>
                        <button className='flex my-2 p-5 capitalize shadow-lg cursor-pointer gap-3 items-center hover:bg-stone-400 text-xl' onClick={() => chooseTemplate("template2")}><img src={template2}/></button>
                        <button className='flex my-2 p-5 capitalize shadow-lg cursor-pointer gap-3 items-center hover:bg-stone-400 text-xl' onClick={() => chooseTemplate("template3")}><img src={template3}/></button>
                    </div>
                </div>
            </section>
        </main>
    )
}

import { ArrowRight } from 'lucide-react'
import { Link } from 'react-router-dom'

export default function LandingPage() {
    return (
        <main className='flex h-screen justify-center items-center'>
            <section className='w-200 text-center flex items-center flex-col'>
                <h1 className='text-7xl font-extrabold'>Build a Resume That Gets Read.</h1>
                <p className='w-150 text-2xl my-3 text-stone-600'>Premium Design, AI-powered insights, and ATS optimized layouts to help you land your dream job faster.</p>
                <Link to="/home">
                    <button className='flex my-2 bg-black rounded-xl text-white py-4 px-5 capitalize shadow-lg cursor-pointer gap-3 items-center hover:bg-stone-800'>START BUILDING <ArrowRight size={16}/></button>
                </Link>
            </section>
        </main>
    )
}

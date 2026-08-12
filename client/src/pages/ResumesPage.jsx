import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom';
import api from '../services/api'
import { FileText, Plus } from 'lucide-react';
import ResumeCard from '../components/resumes/ResumeCard';

export default function ResumesPage() {
    const [resumes, setResumes] = useState([])
    const [loading, setLoading] = useState(false)
    const navigate = useNavigate()

    async function getResumes(){
        try {
            setLoading(true)
            const res = await api.get('/resumes')
            setResumes(res.data.resumes)            
        } catch (error) {
            console.log(error)
            setResumes([])
        } finally {
            setLoading(false)
        }
    }

    useEffect(() => {
        getResumes()
    }, []) 

    async function handleDelete(id){
        try{
            console.log("clicked")
            await api.delete(`/resumes/${id}`)
            setResumes(prev => prev.filter(item => item._id !== id))
        } catch (error) {
            console.log(error)
        }
    }

    if(loading){
        return (
            <main className="pt-24 px-12 flex justify-center">
                <div className="animate-spin rounded-full h-8 w-8 border-2 border-slate-200 border-t-black" />
            </main>
        )
    }

    return (
        <div className='pt-24 px-14 max-w-6xl mx-auto'>
            <div className="flex items-end justify-between mb-10 border-b border-black pb-6 pt-4">
                <div>
                    <h1 className='text-4xl'>Saved Resumes</h1>
                </div>
                <button
                    onClick={() => navigate('/build')}
                    className="bg-black text-white px-4 py-2 rounded-md hover:bg-stone-700 flex items-center gap-2"
                >
                    <Plus size={18} /> New Resume
                </button>
            </div>
            <div>
                {resumes.length === 0 ? (
                    <div className="flex flex-col items-center justify-center text-center gap-4 border border-dashed border-gray-300 rounded-md py-24">
                        <FileText size={32} className="text-gray-400" />
                        <div>
                            <p className="text-lg">You haven't created any resumes yet.</p>
                            <p className="text-gray-500 text-sm mt-1">Start one and it'll show up here.</p>
                        </div>
                        <button
                            onClick={() => navigate('/build')}
                            className="bg-black text-white px-4 py-2 rounded-md hover:bg-stone-700 mt-2"
                        >                           Create your first resume
                        </button>
                    </div>
                ) : (
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-7">
                        {resumes.map(resume => (
                            <ResumeCard key={resume._id} resume={resume} handleDelete={handleDelete} />
                        ))}
                    </div>
                )}
            </div>
        </div>
    )
}
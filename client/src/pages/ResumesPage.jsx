import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom';
import api from '../services/api'
import Alert from '../components/ui/Alert';

export default function ResumesPage() {
    const [resumes, setResumes] = useState([])
    const [loading, setLoading] = useState(false)
    const [error, setError] = useState(null)
    const navigate = useNavigate()

    async function getResumes(){
        try {
            setLoading(true)
            const res = await api.get('/resumes')
            setResumes(res.data.resumes)            
        } catch (error) {
            setError(error.message)
            console.log(error)
        } finally {
            setLoading(false)
        }
    }

    useEffect(() => {
        getResumes()
    }, []) 

    async function handleDelete(id){
        try{
            await api.delete(`/resumes/${id}`)
            setResumes(prev => prev.filter(item => item._id !== id))
        } catch (error) {
            console.log(error)
        }
    }

    if(error){
        return (
            <div className='pt-24'>Something went wrong...</div>
        )
    }

    return (
        <div className='pt-24 px-12'>
            <h1>Saved Resumes</h1>
            {loading ? (
                <div>
                    Loading...
                </div>
            ) : (
                <div>
                    {resumes.length === 0 ? (
                        <div className="text-center py-12">
                            <p>You haven't created any resumes yet.</p>
                            <button onClick={() => navigate('/build')}>Create your first resume</button>
                        </div>
                    ) : (
                        <>
                        {resumes.map(resume => (
                            <div className="border rounded-md p-4">
                                <h3>{resume.title || 'Untitled Resume'}</h3>
                                <p className="text-sm text-gray-500">
                                    Last updated: {new Date(resume.updatedAt).toLocaleDateString()}
                                </p>
                                <div className="flex gap-2 mt-3">
                                    <button onClick={() => navigate(`/build?id=${resume._id}&template=${resume.template}`)}>Open</button>
                                    <button onClick={() => handleDelete(resume._id)}>Delete</button>
                                </div>
                            </div>
                        ))}
                        </>
                    )}
                </div>
            )}
        </div>
    )
}

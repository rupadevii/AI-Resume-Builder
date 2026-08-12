import { Trash2 } from "lucide-react";
import { useNavigate } from "react-router-dom";
import Template1 from "../template1/Template1";
import Template2 from "../template2/Template2";
import Template3 from "../template3/Template3";

function ResumeCard({resume, setCurrResume, setModalIsOpen}){
    const navigate = useNavigate()

    function handleClick(){
        setCurrResume(resume._id)
        setModalIsOpen(true)
    }

    return (
        <div onClick={() => navigate(`/build?id=${resume._id}&template=${resume.template}`)} className="group relative bg-white border-2 border-black rounded-md cursor-pointer hover:-translate-y-0.5 ztransition-all duration-150">
            <div className="resume-card">
                <div className="resume card-preview">
                    {resume.template==="template1" && (
                        <Template1 data={resume.data}/>
                    )}
                    {resume.template==="template2" && (
                        <Template2 data={resume.data}/>
                    )}
                    {resume.template==="template3" && (
                        <Template3 data={resume.data}/>
                    )}
                </div>
            </div>
            <div className="p-4 border-t-2 bg-zinc-950">
                <h3 className="text-lg font-medium truncate pr-6 text-white">
                    {resume.title || 'Untitled Resume'}
                </h3>
                <p className="font-mono text-sm text-gray-500 mt-1">                 
                    updated {new Date(resume.updatedAt).toLocaleDateString()}
                </p>
                <div className="flex items-center justify-between mt-2">
                    <span className="text-xs uppercase tracking-wide text-gray-400">                     
                        {resume.template}
                    </span>
                    <button
                        onClick={(e) => {
                            e.stopPropagation()
                            handleClick()
                        }}
                        className="opacity-0 group-hover:opacity-100 transition-opacity p-1.5 rounded hover:bg-red-50 text-gray-400 hover:text-red-700"
                    >
                        <Trash2 size={16} />
                    </button>
                </div>
            </div>

        </div>
    )
}

export default ResumeCard
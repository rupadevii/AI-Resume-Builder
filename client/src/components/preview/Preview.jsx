import React, { Activity, useRef, useState } from 'react'
import { useReactToPrint } from 'react-to-print'
import { useInfo } from '../../context/InfoContext'
import PreviewPage from '../../pages/PreviewPage'
import Template1 from '../template1/Template1'
import AISection from './AISection'
import Template3 from '../template3/Template3'
import Template2 from '../template2/Template2'
import Modal from 'react-modal'
import { customStyles, templateModalStyles } from '../../utils/styles'
import { useSelector } from 'react-redux';
import api from '../../services/api';
import template1 from '../../assets/template1.png'
import template2 from '../../assets/template2.png'
import template3 from '../../assets/template3.png'

export default function Preview({template, setTemplate, resumeId, setResumeId}) {
    const {info, setInfo} = useInfo()
    const [isShowing, setIsShowing] = useState(false)
    const [showTemplateModal, setShowTemplateModal] = useState(false)
    const [aiResponse, setAiResponse] = useState({})
    const [show, setShow] = useState(false)
    const ref = useRef()
    const handlePrint = useReactToPrint({
        contentRef: ref,
        documentTitle: "Resume"
    })

    const [modalIsOpen, setIsOpen] = React.useState(false);
    const {isAuthenticated} = useSelector(state => state.auth)
    const [saving, setSaving] = useState(false)
    const [originalInfo, setOriginalInfo] = useState({})

    function openModal() {
        setIsOpen(true);
    }

    function closeModal() {
        setIsOpen(false);
    }

    function closeTemplateModal(){
        setShowTemplateModal(false)
    }

    function changeTemplate(item){
        setTemplate(item)
        closeTemplateModal()
    }

    async function saveResume(){
        try {
            setSaving(true)
            if(!resumeId){
                const res = await api.post('/resumes', {data: info, template})
                setResumeId(res.data.resume._id)
            }
            else{
                await api.patch(`/resumes/${resumeId}`, {data:info, template})
            }
        } catch (error) {
            console.log(error)
        } finally {
            setSaving(false)
        }
    }
    
    return (
        <div>
            <div className='mb-3 flex justify-between items-center'>
                <div className='flex gap-1 bg-gray-100 p-1 rounded-md'>
                    <div
                        onClick={() => setIsShowing(false)}
                        className={`px-4 py-1 rounded-md cursor-pointer text-sm font-medium transition-colors ${
                            !isShowing ? "bg-black text-white" : "text-gray-600 hover:bg-gray-200"
                        }`}
                    >
                        Preview
                    </div>
                    <div
                        onClick={() => setIsShowing(true)}
                        className={`px-4 py-1 rounded-md cursor-pointer text-sm font-medium transition-colors ${
                            isShowing ? "bg-black text-white" : "text-gray-600 hover:bg-gray-200"
                        }`}
                    >
                        AI
                    </div>
                </div>

                <div className='flex gap-5 items-center text-sm'>
                    {show && (
                        <>
                            <button
                                className="text-gray-600 hover:text-black hover:underline underline-offset-2 transition-colors"
                                onClick={openModal}
                            >
                                Compare
                            </button>
                            <button
                                className="flex items-center gap-1 px-3 py-1 rounded-md bg-black text-white font-medium hover:bg-gray-800 transition-colors"
                                onClick={() => setInfo(aiResponse)}
                            >
                                Use this
                            </button>
                            <span className="h-4 w-px bg-gray-300" />
                        </>
                    )}
                    <button
                        className="text-gray-600 hover:text-black hover:underline underline-offset-2 transition-colors"
                        onClick={() => setShowTemplateModal(true)}
                    >
                        Change Template
                    </button>
                    <button
                        disabled={!isAuthenticated}
                        className='border px-3 py-1 rounded-md font-medium disabled:bg-gray-200 disabled:text-gray-400 disabled:border-gray-200 disabled:cursor-not-allowed save-btn hover:bg-gray-200 transition-colors'
                        onClick={saveResume}
                    >
                        {saving ? "Saving..." : "Save"}
                    </button>
                    <button
                        onClick={handlePrint}
                        className='px-3 py-1 rounded-md font-medium text-white bg-red-700 hover:bg-red-800 transition-colors'
                    >
                        Export PDF
                    </button>
                </div>
            </div>
            
            <div ref={ref}>
                <Activity mode={!isShowing ? "visible" : "hidden"}>
                    <div className='a4-print-container resume'>
                        {template==="template1" && (
                            <Template1 data={info}/>
                        )}
                        {template==="template2" && (
                            <Template2 data={info}/>
                        )}
                        {template==="template3" && (
                            <Template3 data={info}/>
                        )}
                    </div>
                </Activity>
                <Activity mode={isShowing ? "visible" : "hidden"}>
                    <AISection 
                        template={template} 
                        show={show} 
                        setShow={setShow} 
                        aiResponse={aiResponse} 
                        setAiResponse={setAiResponse}
                        setOriginalInfo={setOriginalInfo}
                        />
                </Activity>

                <Modal
                    isOpen={modalIsOpen}
                    onRequestClose={closeModal}
                    style={customStyles}
                >
                    <PreviewPage aiResponse={aiResponse} template={template} originalInfo={originalInfo}/>
                </Modal>

                <Modal
                    isOpen={showTemplateModal}
                    onRequestClose={closeTemplateModal}
                    style={templateModalStyles}
                >
                    <div>
                        <h2 className='font-bold text-2xl text-center'>Choose Template</h2>
                        <div className='flex gap-6 my-4'>
                            <button className='flex my-2 p-5 capitalize shadow-lg cursor-pointer gap-3 items-center hover:bg-stone-400 text-xl' onClick={() => changeTemplate("template1")}><img src={template1} height="300" width="300"/></button>
                            <button className='flex my-2 p-5 capitalize shadow-lg cursor-pointer gap-3 items-center hover:bg-stone-400 text-xl' onClick={() => changeTemplate("template2")}><img src={template2} height="300" width="300"/></button>
                            <button className='flex my-2 p-5 capitalize shadow-lg cursor-pointer gap-3 items-center hover:bg-stone-400 text-xl' onClick={() => changeTemplate("template3")}><img src={template3} height="300" width="300"/></button>
                        </div>
                    </div>
                </Modal>
            </div>
        </div>
    )
}

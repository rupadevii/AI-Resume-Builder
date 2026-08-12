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
            <div className='mb-3 flex justify-between'>
                <div className='flex gap-1'>
                    <div onClick={() => setIsShowing(false)} className={`${!isShowing && "bg-black text-white"} px-4 py-1 rounded-md cursor-pointer hover:bg-black hover:text-white`}>Preview</div>
                    <div onClick={() => setIsShowing(true)} className={`${isShowing && "bg-black text-white"} px-3 py-1 rounded-md cursor-pointer hover:bg-black hover:text-white`}>AI</div>
                </div>
                <div className='flex gap-5 items-center'>
                    {show && (
                        <>
                        <button 
                            className="hover:underline underline-offset-2" 
                            onClick={openModal}>
                                Compare
                        </button>
                        <button
                            className=""
                            onClick={() => setInfo(aiResponse)}
                        >Use this</button>
                        </>
                    )}
                    <button 
                        className="hover:underline underline-offset-2" 
                        onClick={() => setShowTemplateModal(true)}>
                            Change Template
                    </button>
                    <button 
                        disabled={!isAuthenticated} 
                        className='border px-3 py-1 rounded-md disabled:bg-gray-200 disabled:text-gray-400 disabled:border-gray-200 disabled:cursor-not-allowed save-btn hover:bg-gray-200'
                        onClick={saveResume}
                    >
                        {saving ? "Saving..." : "Save"}
                    </button>
                    <button 
                        onClick={handlePrint} 
                        className='border-2 border-black px-3 py-1 text-white rounded-md mr-5 hover:bg-red-700 bg-red-800'>
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

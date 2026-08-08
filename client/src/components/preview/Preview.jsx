import React, { Activity, useRef, useState } from 'react'
import { useReactToPrint } from 'react-to-print'
import { useInfo } from '../../context/InfoContext'
import PreviewPage from '../../pages/PreviewPage'
import Template1 from '../template1/Template1'
import AISection from './AISection'
import Template3 from '../template3/Template3'
import Template2 from '../template2/Template2'
import Modal from 'react-modal'
import { customStyles } from '../../utils/styles'

export default function Preview({template}) {
    const {info} = useInfo()
    const [isShowing, setIsShowing] = useState(false)
    const [aiResponse, setAiResponse] = useState({})
    const [show, setShow] = useState(false)
    const ref = useRef()
    const handlePrint = useReactToPrint({
        contentRef: ref,
        documentTitle: "Resume"
    })

    const [modalIsOpen, setIsOpen] = React.useState(false);

    function openModal() {
        setIsOpen(true);
    }

    function closeModal() {
        setIsOpen(false);
    }
    
    return (
        <div>
            <div className='mb-3 flex justify-between'>
                <div className='flex gap-1'>
                    <div onClick={() => setIsShowing(false)} className={`${!isShowing && "bg-black text-white"} px-4 py-2 rounded-md cursor-pointer hover:bg-black hover:text-white`}>Preview</div>
                    <div onClick={() => setIsShowing(true)} className={`${isShowing && "bg-black text-white"} px-3 py-2 rounded-md cursor-pointer hover:bg-black hover:text-white`}>AI</div>
                </div>
                <div className='flex gap-5 items-center'>
                    {show && (
                        <button className="hover:underline underline-offset-2" onClick={openModal}>Compare</button>
                    )}
                    <button onClick={handlePrint} className='border-2 border-black px-3 py-2 text-white rounded-md mr-5 hover:bg-red-700 bg-red-800'>Export PDF</button>
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
                        setAiResponse={setAiResponse}/>
                </Activity>

                <Modal
                    isOpen={modalIsOpen}
                    onRequestClose={closeModal}
                    style={customStyles}
                >
                    <PreviewPage aiResponse={aiResponse} template={template}/>
                </Modal>
            </div>
        </div>
    )
}

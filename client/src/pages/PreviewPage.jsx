import { useInfo } from '../context/InfoContext'
import Template1 from '../components/template1/Template1'
import Template2 from '../components/template2/Template2'
import Template3 from '../components/template3/Template3'
import Diff from '../components/preview/Diff'
import DiffedPreview from '../components/preview/DiffedPreview'

export default function PreviewPage({template, aiResponse}) {
    const {info} = useInfo()

    return (
        <section className='preview-container px-8'>
            <div className='flex gap-6'>
                <div className='w-[50%] p-4'>
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

                <div className='w-[50%] p-4'>
                    {Object.keys(aiResponse).length ===0 ? (
                        <div>No Preview</div>
                    ): (
                    <div>
                        {/* {template==="template1" && (
                            <Template1 data={aiResponse}/>
                        )}
                        {template==="template2" && (
                            <Template2 data={aiResponse}/>
                        )}
                        {template==="template3" && (
                            <Template3 data={aiResponse}/>
                        )} */}
                        <DiffedPreview info={info} aiResponse={aiResponse} template={template}/>
                    </div> 
                    )}
                </div>
            </div>
        </section>
    )
}

import PersonalInfo from '../components/builder/PersonalInfo'
import Education from '../components/builder/Education'
import StatsScore from '../components/ui/StatsScore'
import Experience from '../components/builder/Experience'
import Projects from '../components/builder/Projects'
import Skills from '../components/builder/Skills'
import Preview from '../components/preview/Preview'
import { useInfo } from '../context/InfoContext'
import { useEffect, useState } from 'react'
import { calculateCount, calculateTotalCount } from '../utils/stats'
import { useParams } from 'react-router-dom'

export default function BuilderPage() {
    const [score, setScore] = useState(0)
    const {info} = useInfo()
    const {template} = useParams()

    useEffect(() => {
        const totalCount = calculateTotalCount(info)
        const count = calculateCount(info)
    
        const currScore = Math.ceil((count/totalCount) * 100)
        // eslint-disable-next-line react-hooks/set-state-in-effect
        setScore(currScore)
        
    }, [info])

    return (
        <main className='flex pt-24 flex-col md:flex-row'>
            <section className='form-section px-12 w-178 max-h-screen overflow-y-auto pb-10'>
                <StatsScore score={score}/>
                <PersonalInfo/>
                <Education/>
                {info.resumeType === "Experienced" && (
                    <Experience/>
                )}
                <Projects/>
                <Skills/>
            </section>
            <section className='resume-section max-h-screen overflow-y-auto pb-10'>
                <Preview template={template}/>
            </section>
        </main>
    )
}

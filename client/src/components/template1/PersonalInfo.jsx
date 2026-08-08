import { Github, Linkedin, Mail, MapPin, Phone } from 'lucide-react'

export default function PersonalInfo({data}) {
    return (
        <div>
            <div className='header flex flex-col items-center'>
                <h1>{data.personalInfo.name}</h1>
                <div className='container-row'>
                    {data.personalInfo.location && (
                        <div className='container'>
                            <MapPin size={14}/>
                            <h2>
                                {data.personalInfo.location}
                            </h2>
                        </div>
                    )}
                    {data.personalInfo.email && (
                        <div className='container'>
                            <Mail size={14}/>
                            <h2>
                                {data.personalInfo.email}
                            </h2>
                        </div>
                    )}
                    {data.personalInfo.phone && (
                        <div className='container'>
                            <Phone size={14}/>
                            <h2>
                                {data.personalInfo.phone}
                            </h2>
                        </div>
                    )}
                    {data.personalInfo.githubURL && (
                        <a href={data.personalInfo.githubURL}>
                            <div className='container'>
                                <Github size={14}/>
                                <h2>
                                    {data.personalInfo.githubURL.split("/")[3]}
                                </h2>
                            </div>
                        </a>
                    )}
                    {data.personalInfo.linkedInURL && (
                        <a href={data.personalInfo.linkedInURL}>
                            <div className='container'>
                                <Linkedin size={14}/>
                                <h2>
                                    {data.personalInfo.linkedInURL.split("/")[3]}
                                </h2>
                            </div>
                        </a>
                    )}
                </div>
            </div>
        </div>
    )
}

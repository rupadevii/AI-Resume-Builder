import { Github, Linkedin, Mail, MapPin, Phone } from 'lucide-react'

export default function PersonalInfo({data}) {
    return (
        <div className="text-center mb-3">
            <h1 className="text-[26px] font-bold tracking-tight">
                {data.personalInfo?.name}
            </h1>
            <div className="flex flex-wrap justify-center gap-x-4 gap-y-0.5 mt-1 text-[14px] text-stone-700">
                {data.personalInfo?.location && (
                    <span className="flex items-center gap-1">
                        <MapPin size={12}/> {data.personalInfo.location}
                    </span>
                )}
                {data.personalInfo?.email && (
                    <span className="flex items-center gap-1">
                        <Mail size={12}/> {data.personalInfo.email}
                    </span>
                )}
                {data.personalInfo?.phone && (
                    <span className="flex items-center gap-1">
                        <Phone size={12}/> {data.personalInfo.phone}
                    </span>
                )}
                {data.personalInfo?.githubURL && (
                    <a href={data.personalInfo.githubURL} className="flex items-center gap-1 hover:underline">
                        <Github size={12}/> {data.personalInfo.githubURL.split("/")[3]}
                    </a>
                )}
                {data.personalInfo?.linkedInURL && (
                    <a href={data.personalInfo.linkedInURL} className="flex items-center gap-1 hover:underline">
                        <Linkedin size={12}/> {data.personalInfo.linkedInURL.split("/")[3]}
                    </a>
                )}
            </div>
        </div>
    )
}
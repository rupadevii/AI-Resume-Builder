import { Github, Link } from 'lucide-react'

export default function Projects({data}) {
    return (
        <div className="flex flex-col gap-2">
            {data.projects?.map((item, index) => (
                <div key={index}>
                    <div className="flex justify-between items-start gap-3">
                        <p className="text-[14px]">
                            <span className="font-bold">{item.title}</span>
                            {item.technologies?.length > 0 && (
                                <span className="text-stone-700"><i> {"("+ item.technologies.join(", ")+")"}</i></span>
                            )}
                        </p>
                        <div className="flex gap-2 items-center shrink-0 mt-0.5">
                            {item.liveURL && (
                                <a href={item.liveURL}><Link size={13}/></a>
                            )}
                            {item.githubURL && (
                                <a href={item.githubURL}><Github size={13}/></a>
                            )}
                        </div>
                    </div>
                    <ul className="pl-4 mt-0.5">
                        {item.desc
                            .split("\n")
                            .flatMap(line => line.split(/(?<=[.!?])\s+/))
                            .filter(sentence => sentence.trim().length > 0)
                            .map((line, idx) => (
                                <li className="list-disc text-[14px] leading-[1.3]" key={idx}>
                                    {line.trim()}
                                </li>
                            ))
                        }
                    </ul>
                </div>
            ))}
        </div>
    )
}
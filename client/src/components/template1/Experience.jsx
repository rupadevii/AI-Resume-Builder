import { formatDate } from '../../utils/date.util'

export default function Experience({data}) {
    return (
        <div className="space-y-2.5">
            {data.workExperience?.map((item, index) => (
                <div key={index}>
                    <div className="flex justify-between items-baseline gap-4">
                        <div>
                            <h2 className="text-[14.0px] font-bold">{item.designation}</h2>
                            <p className="text-[12.5px] text-stone-700 italic">{item.companyName}</p>
                        </div>
                        <div className="text-[12px] text-stone-700 whitespace-nowrap shrink-0">
                            {item.startDate && <span>{formatDate(item.startDate)}</span>}
                            {item.endDate && <span> – {formatDate(item.endDate)}</span>}
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
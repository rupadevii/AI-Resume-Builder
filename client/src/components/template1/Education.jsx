import { formatDate } from '../../utils/date.util'

export default function Education({data}) {
    return (
        <div className="space-y-1.5">
            {data.education?.map((item, index) => (
                <div key={index} className="flex justify-between items-baseline gap-4">
                    <div>
                        <h2 className="text-[14px] font-bold">{item.degree}</h2>
                        <p className="text-[14px] italic text-stone-600">{item.school}</p>
                    </div>
                    <div className="flex flex-col items-end text-[13px] text-stone-600 shrink-0">
                        <p>
                            {item.startDate && <span>{formatDate(item.startDate)}</span>}
                            {item.endDate && <span> – {formatDate(item.endDate)}</span>}
                        </p>
                        {item.cgpa && <span className="font-bold text-black">{item.cgpa}</span>}
                    </div>
                </div>
            ))}
        </div>
    )
}
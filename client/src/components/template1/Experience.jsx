import { formatDate } from '../../utils/date.util'

export default function Experience({data}) {

    return (
        <>
            {data.workExperience.map((item, index) => (
                <div className='mb-2' key={index}>
                    <div className='flex justify-between'>
                        <div className='w-380'>
                            <h2 className='font-bold'>{item.designation}</h2>
                            <p className='text-stone-700 italic'>{item.companyName}</p>
                        </div>
                        <div className='text-sm w-100'>
                            {item.startDate && (
                                <span>{formatDate(item.startDate)}</span>
                            )}
                            {item.endDate && (
                                <span>- {formatDate(item.endDate)}</span>
                            )}
                        </div>
                    </div>
                            {/* <p className='text-sm whitespace-pre-wrap'>{item.desc}</p> */}
                    <div>
                        <ul className='pl-4'>
                            {item.desc.split("\n").slice(0).map((item, idx) => (
                                <li className='list-disc' key={idx}>{item}</li>
                            ))}
                        </ul>
                    </div>
                </div>
            ))}
        </>
    )
}

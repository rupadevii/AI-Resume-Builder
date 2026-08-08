import { formatDate } from '../../utils/date.util'

export default function Education({data}) {
    return (
        <>
            {data.education.map((item, index) => (
                <div key={index}>
                    <div className='flex justify-between'>
                        <div>
                        <h2 className='font-bold'>{item.degree}</h2>
                        <p className='italic'>{item.school}</p>
                        </div>
                        <div className='flex flex-col items-end w-40'>
                            <p>
                                {item.startDate && <span>{formatDate(item.startDate)}</span>}
                                {item.endDate && (
                                    <span> - {formatDate(item.endDate)}</span>
                                )}
                            </p>
                            <h2 className='font-bold'>{item.cgpa}</h2>
                        </div>
                    </div>
                </div>
            ))}
        </>
    )
}

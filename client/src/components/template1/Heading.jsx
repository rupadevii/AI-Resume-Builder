export default function Heading({label, className=''}) {
    return (
        <h1 className={`text-[15px] font-bold tracking-[0.11em] border-b-2 border-black pb-0.3 mb-2 mt-3 ${className}`}>
            {label}
        </h1>
    )
}

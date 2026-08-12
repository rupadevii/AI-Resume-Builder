export default function Skills({data}) {
    return (
        <div className="space-y-1">
            {data.skills?.technical?.length > 0 && (
                <p className="text-[14px] leading-[1.3]">
                    <span className="font-bold">Technical Skills: </span>
                    {data.skills.technical.join(", ")}
                </p>
            )}
            {data.skills?.soft?.length > 0 && (
                <p className="text-[14px] leading-[1.3]">
                    <span className="font-bold">Soft Skills: </span>
                    {data.skills.soft.join(", ")}
                </p>
            )}
            {data.skills?.tools?.length > 0 && (
                <p className="text-[14px] leading-[1.3]">
                    <span className="font-bold">Tools: </span>
                    {data.skills.tools.join(", ")}
                </p>
            )}
        </div>
    )
}
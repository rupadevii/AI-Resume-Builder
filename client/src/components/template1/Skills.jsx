export default function Skills({data}) {

    return (
        <ul>
            {data.skills.technical.length>0 && (
                <li><b>Technical Skills: </b>
                    {data.skills.technical.join(", ")}
                </li>
            )}
            {data.skills.soft.length>0 && (
                <li><b>Soft Skills: </b>
                    {data.skills.soft.join(", ")}
                </li>
            )}
            {data.skills.tools.length>0 && (
                <li><b>Tools : </b>
                    {data.skills.tools.join(", ")}
                </li>
            )}
        </ul>
    )
}

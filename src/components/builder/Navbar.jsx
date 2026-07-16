import { Link, useLocation } from "react-router-dom";
import { dummyData } from "../../data/dummy";
import { useInfo } from "../../context/InfoContext";

export default function Navbar() {
    const location = useLocation()
    const {setInfo, clearMockData} = useInfo()
    if(location.pathname==="/" || location.pathname==="/home") return null;

    function handleClick(){
        setInfo(dummyData)
    }

    return (
        <nav className='bg-zinc-950 z-100 text-white h-19 fixed w-full flex items-center px-30 justify-between'>
            <Link to="/home"><div className="text-lg">RESUME</div></Link>
            <div className="flex gap-5 items-center">
                <button onClick={handleClick} className="border border-white px-3 py-1 rounded-md hover:bg-stone-700">Fill Mock</button>
                <button onClick={clearMockData} className="border border-white px-3 py-1 rounded-md hover:bg-stone-700">Clear</button>
            </div>
        </nav>
    )
}

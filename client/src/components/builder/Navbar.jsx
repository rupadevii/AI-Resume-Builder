import { Link, useLocation } from "react-router-dom";
import { dummyData } from "../../data/dummy";
import { useInfo } from "../../context/InfoContext";
import { useDispatch, useSelector } from "react-redux";
import api from "../../services/api";
import { fetchUser } from "../../redux/features/authSlice";

export default function Navbar() {
    const location = useLocation()
    const {setInfo, clearMockData} = useInfo()
    const {isAuthenticated} = useSelector(state => state.auth)
    const dispatch = useDispatch()

    if(location.pathname==="/" || location.pathname==="/home" || location.pathname==="/signup" || location.pathname==="/login") return null;

    const isResumePage = location.pathname==="/resumes"

    function handleClick(){
        setInfo(dummyData)
    }

    async function logoutUser(){
        try{
            await api.post('/auth/logout', {})
            dispatch(fetchUser())
        }catch(error){
            console.log(error)
        }
    }

    return (
        <nav className='bg-zinc-950 z-100 text-white h-19 fixed w-full flex items-center pl-30 pr-10 justify-between'>
            <Link to="/home"><div className="text-lg">AI RESUME BUILDER</div></Link>
            <div className="flex gap-5 items-center">
                {!isResumePage && (
                    <>
                        <button onClick={handleClick} className="border border-white px-3 py-1 rounded-md hover:bg-stone-700">Fill Mock</button>
                        <button onClick={clearMockData} className="border border-white px-3 py-1 rounded-md hover:bg-stone-700">Clear</button>
                    </>
                )}
                {
                    isAuthenticated ? (
                        <ul className="list-style-none flex items-center gap-4">
                            {!isResumePage && (
                                <li className='rounded-sm px-3 py-1 gap-2 hover:bg-red-700 flex items-center hover:cursor-pointer border-white border'>
                                    <Link to="/resumes"><span className='mb-0'>My Resumes</span></Link>
                                </li>
                            )}
                            <li className='hover:underline underline-offset-2 hover:cursor-pointer' onClick={logoutUser}>Logout</li>
                        </ul>
                    ) : (
                        <li className='flex items-center gap-3'>
                            <Link to="/signup"><button className='hover:underline underline-offset-2'>Signup</button></Link>
                            <span>or</span>
                            <Link to="/login">
                            <button className='hover:underline underline-offset-2'>Login</button></Link>
                        </li>
                    )
                }
            </div>

        </nav>
    )
}

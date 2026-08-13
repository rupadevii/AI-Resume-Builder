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
                        <button
                            onClick={handleClick}
                            className="rounded-lg border border-white/15 bg-white/5 px-3 py-2 text-xs font-medium text-zinc-300 transition-all duration-200 hover:border-violet-400/40 hover:bg-violet-500/10 hover:text-white"
                        >
                            Fill Mock
                        </button>
                        <button
                            onClick={clearMockData}
                            className="rounded-lg border border-white/15 bg-white/5 px-3 py-2 text-xs font-medium text-zinc-300 transition-all duration-200 hover:border-red-400/40 hover:bg-red-500/10 hover:text-red-300"
                        >
                            Clear
                        </button>
                    </>
                )}
                {
                    isAuthenticated ? (
                        <ul className="list-style-none flex items-center gap-4">
                            {!isResumePage && (
                                <Link
                                    to="/resumes"
                                    className="rounded-lg border border-violet-400/30 bg-violet-500/10 px-3 py-2 text-sm font-medium text-violet-300 transition-all duration-200 hover:border-violet-400/60 hover:bg-violet-500/20 hover:text-violet-200"
                                    >
                                    My Resumes
                                </Link>
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


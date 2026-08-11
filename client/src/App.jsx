import { Route, Routes } from 'react-router-dom'
import LandingPage from './pages/LandingPage'
import HomePage from './pages/HomePage'
import BuilderPage from './pages/BuilderPage'
import Navbar from './components/builder/Navbar'
import Modal from 'react-modal';
import LoginPage from './pages/LoginPage';
import SignupPage from './pages/SignupPage';
import { useEffect } from 'react';
import { fetchUser } from './redux/features/authSlice';
import { useDispatch } from 'react-redux';
import ResumesPage from './pages/ResumesPage';

Modal.setAppElement('#root');

export default function App() {
    const dispatch = useDispatch()

    useEffect(() => {
        dispatch(fetchUser())
    })

    return (
        <>
            <Navbar/>
            <Routes>
                <Route path="/" element={<LandingPage/>}/>
                <Route path="/home" element={<HomePage/>}/>
                <Route path="/build" element={<BuilderPage/>}/>
                <Route path="/login" element={<LoginPage/>}/>
                <Route path="/signup" element={<SignupPage/>}/>
                <Route path="/resumes" element={<ResumesPage/>}/>
            </Routes>
        </>
    )
}

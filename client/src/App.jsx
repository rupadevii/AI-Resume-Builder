import { Route, Routes } from 'react-router-dom'
import LandingPage from './pages/LandingPage'
import HomePage from './pages/HomePage'
import BuilderPage from './pages/BuilderPage'
import Navbar from './components/builder/Navbar'
import Modal from 'react-modal';

Modal.setAppElement('#root');

export default function App() {
    return (
        <>
            <Navbar/>
            <Routes>
                <Route path="/" element={<LandingPage/>}/>
                <Route path="/home" element={<HomePage/>}/>
                <Route path="/build/:template" element={<BuilderPage/>}/>
            </Routes>
        </>
    )
}

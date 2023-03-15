import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import MainPage from "./pages/MainPage"
import Signup from './pages/Signup';


function App() {
    return (
        <Router>
            <Routes>
                <Route path="/" element={<MainPage />} />
                <Route path="/signup" element={<Signup />} />
            </Routes>
        </Router>
    )
};

export default App;


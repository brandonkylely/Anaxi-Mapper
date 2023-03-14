import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Main from "./pages/Main"
import Signup from './pages/Signup';


function App() {
    return (
        <Router>
            <Routes>
                <Route path="/" element={<Main />} />
                <Route path="/signup" element={<Signup />} />
            </Routes>
        </Router>
    )
};

export default App;
import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { AuthProvider } from './context/AuthContext';
import ProtectedRoute from './components/ProtectedRoute';
import DashBoard from './components/DashBoard';
import History from './components/History';
import Login from './components/Login';
import Signup from './components/Signup';

function App() {
    return (
        <AuthProvider>
            <Router>
                <Routes>
                    {/* Public Routes */}
                    <Route path="/login" element={<Login />} />
                    <Route path="/signup" element={<Signup />} />

                    {/* Protected Routes */}
                    <Route element={<ProtectedRoute />}>
                        <Route path="/" element={<DashBoard />} />
                        <Route path="/history" element={<History />} />
                    </Route>
                </Routes>
            </Router>
        </AuthProvider>
    );
}

export default App;
import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Login from './containers/Autherization/Login';
import MainPage from './containers/MainPage/MainPage';

const AppRoutes = () =>
{
    return (
        <Router>
            <Routes>
                <Route path='/' element={ <Login /> } />
                <Route path='/quotes' element={ <MainPage /> } />
            </Routes>
        </Router>
    )
}

export default AppRoutes;

import React from 'react';
import { Outlet } from 'react-router';
import Navbar from '../components/shared/Navbar/Navbar';

const MainLayout = () => {
    return (
        <div data-theme="light" className="flex flex-col min-h-screen">
            <Navbar></Navbar>
            <main className='grow'>
                <Outlet></Outlet>
            </main>
        </div>
    );
};

export default MainLayout;
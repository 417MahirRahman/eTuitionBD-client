import React from 'react';
import { Outlet } from 'react-router';
import Navbar from '../components/shared/Navbar/Navbar';
import Footer from '../components/shared/Footer/Footer';

const MainLayout = () => {
    return (
        <div data-theme="light" className="flex flex-col min-h-screen">
            <Navbar></Navbar>
            <main className='grow'>
                <Outlet></Outlet>
            </main>
            <Footer></Footer>
        </div>
    );
};

export default MainLayout;
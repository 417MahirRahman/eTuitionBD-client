import React from 'react';
import useRole from '../../hooks/useRole';

const Home = () => {
    const [role] = useRole()
    console.log("Role:",role)
    console.log("token:", localStorage.getItem("token"))
    return (
        <div>
            <h1>Hello I'm Home</h1>
        </div>
    );
};

export default Home;
import React, { useContext } from 'react';
import { useNavigate, Link } from "react-router-dom";
import logo from '../assets/job-seeker.png';
import { FaHome, FaBriefcase, FaInfoCircle, FaEnvelope, FaSignInAlt, FaUserPlus } from 'react-icons/fa';
import { MyUserContext, MyDispatchContext } from '../configs/Context';


const Header = () => {
    const user = useContext(MyUserContext);
    const dispatch = useContext(MyDispatchContext);
    const navigate = useNavigate();


    const handleNavigation = (path) => {
        navigate(path);
    };

    return (
        <header className="bg-green-700 flex fixed w-full top-0 z-50">
            <div className="w-[30%] flex items-center">
                <Link to='/'>
                    <div className="flex items-center ml-7">
                        <img src={logo} alt="Logo" className="h-12 w-12 mr-5" />
                        <h1 className="text-white text-3xl font-bold font-serif">DTT JOB</h1>
                    </div>
                </Link>
            </div>
            <div className="flex items-center ml-auto w-60%">
                <nav className="p-4 flex justify-between items-center mr-5">
                    <ul className="flex space-x-8">
                        <li className="text-center group">
                            <Link to="/" className="text-white group-hover:text-yellow-400">
                                <FaHome className="text-white group-hover:text-yellow-400 mx-auto" />
                                Home
                            </Link>
                        </li>
                        <li className="text-center group">
                            <Link to="/jobs" className="text-white group-hover:text-yellow-400">
                                <FaBriefcase className="text-white group-hover:text-yellow-400 mx-auto" />
                                Jobs
                            </Link>
                        </li>

                        <li className="text-center group">
                            <Link to="/about" className="text-white group-hover:text-yellow-400">
                                <FaInfoCircle className="text-white group-hover:text-yellow-400 mx-auto" />
                                About
                            </Link>
                        </li>
                        <li className="text-center group">
                            <Link to="/contact" className="text-white group-hover:text-yellow-400">
                                <FaEnvelope className="text-white group-hover:text-yellow-400 mx-auto" />
                                Contact
                            </Link>
                        </li>

                    </ul>
                </nav>
                <div className="h-10 w-px bg-gray-300 mx-2"></div>

                <Link to="/login" className="text-white hover:text-yellow-400">
                    <FaSignInAlt className="inline mr-1" /> Sign in
                </Link>
                <Link to="/register" className="text-white hover:text-yellow-400 mx-3 mr-7">
                    <FaUserPlus className="inline mr-1" /> Register
                </Link>

            </div>
        </header>
    );
};

export default Header;

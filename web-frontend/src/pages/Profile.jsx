import React from 'react';
import { motion as Motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';

const Profile = ({ user, setUser }) => {
    const navigate = useNavigate();

    // If no user, redirect or show message
    if (!user) {
        return (
            <div className="min-h-[60vh] flex items-center justify-center">
                <p className="text-lg text-gray-500 dark:text-gray-400">Please sign in to view your profile.</p>
            </div>
        );
    }

    const handleLogout = () => {
        setUser(null);
        localStorage.removeItem('edumantra_user');
        navigate('/');
    };

    const roleLabel = user.role ? user.role.charAt(0).toUpperCase() + user.role.slice(1) : 'User';
    const phoneValue = user.phone || user.phonenumber || 'Not provided';

    return (
        <div className="min-h-[70vh] py-20 px-4 bg-gray-50 dark:bg-slate-950">
            <div className="container max-w-3xl mx-auto">
                <Motion.div
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, ease: "easeOut" }}
                    className="bg-white dark:bg-slate-900 rounded-3xl shadow-xl border border-gray-100 dark:border-white/10 p-8 sm:p-12 relative overflow-hidden"
                >
                    {/* Background blob */}
                    <div className="absolute top-0 right-0 w-64 h-64 bg-secondary/5 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2 pointer-events-none" />

                    <div className="flex flex-col sm:flex-row items-center gap-8 border-b border-gray-100 dark:border-white/10 pb-8 mb-8 relative z-10">
                        <img src={user.avatar} alt="Profile" className="w-32 h-32 rounded-full ring-4 ring-secondary/20 shadow-lg bg-gray-50 dark:bg-slate-800" />
                        <div className="text-center sm:text-left">
                            <h1 className="text-3xl font-extrabold text-gray-800 dark:text-white mb-2">{user.name}</h1>
                            <span className="inline-block bg-secondary/10 text-secondary px-4 py-1.5 rounded-full text-sm font-semibold">{roleLabel} Account</span>
                        </div>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 mb-10 relative z-10">
                        <div className="bg-gray-50 dark:bg-slate-800 p-5 rounded-2xl border border-gray-100 dark:border-white/5">
                            <p className="text-sm text-gray-500 dark:text-gray-400 font-medium mb-1">Email Address</p>
                            <p className="text-lg font-semibold text-gray-800 dark:text-white">{user.email}</p>
                        </div>
                        <div className="bg-gray-50 dark:bg-slate-800 p-5 rounded-2xl border border-gray-100 dark:border-white/5">
                            <p className="text-sm text-gray-500 dark:text-gray-400 font-medium mb-1">Phone Number</p>
                            <p className="text-lg font-semibold text-gray-800 dark:text-white">{phoneValue}</p>
                        </div>
                        <div className="bg-gray-50 dark:bg-slate-800 p-5 rounded-2xl border border-gray-100 dark:border-white/5">
                            <p className="text-sm text-gray-500 dark:text-gray-400 font-medium mb-1">Enrolled Courses</p>
                            <p className="text-lg font-semibold text-gray-800 dark:text-white">0 (New Account)</p>
                        </div>
                        <div className="bg-gray-50 dark:bg-slate-800 p-5 rounded-2xl border border-gray-100 dark:border-white/5">
                            <p className="text-sm text-gray-500 dark:text-gray-400 font-medium mb-1">Join Date</p>
                            <p className="text-lg font-semibold text-gray-800 dark:text-white">Today</p>
                        </div>
                    </div>

                    <div className="flex justify-end gap-4 relative z-10">
                        <button
                            onClick={handleLogout}
                            className="px-6 py-2.5 rounded-xl border-2 border-red-100 dark:border-red-900/50 text-red-500 font-semibold hover:bg-red-50 dark:hover:bg-red-900/20 transition-all active:scale-95"
                        >
                            Log Out
                        </button>
                    </div>
                </Motion.div>
            </div>
        </div>
    );
};

export default Profile;

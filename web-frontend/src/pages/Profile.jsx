import React from 'react';
import { motion as Motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { HiAcademicCap, HiSparkles, HiShieldCheck } from 'react-icons/hi2';

const Profile = ({ user, setUser }) => {
    const navigate = useNavigate();

    if (!user) {
        return (
            <div className="min-h-[60vh] flex items-center justify-center bg-bg-page pt-20">
                <div className="bg-white p-8 rounded-2xl border border-border shadow-card text-center max-w-sm mx-4">
                    <p className="text-base text-txt-secondary font-medium mb-4">Please sign in to view your profile.</p>
                    <button onClick={() => navigate('/signin')} className="btn-primary py-2.5 px-6 text-sm">
                        Sign In Now
                    </button>
                </div>
            </div>
        );
    }

    const handleLogout = () => {
        setUser(null);
        localStorage.removeItem('edumantra_user');
        document.cookie = 'edumantra_user=; path=/; expires=Thu, 01 Jan 1970 00:00:00 GMT';
        navigate('/');
    };

    const roleLabel = user.role ? user.role.charAt(0).toUpperCase() + user.role.slice(1) : 'Student';
    const phoneValue = user.phone || user.phonenumber || 'Not provided';

    return (
        <div className="min-h-[80vh] pt-28 pb-20 px-4 bg-bg-page">

            <div className="container max-w-3xl mx-auto relative z-10">
                <Motion.div
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, ease: "easeOut" }}
                    className="bg-white rounded-2xl shadow-card-hover border border-border p-8 sm:p-12"
                >
                    <div className="flex flex-col sm:flex-row items-center gap-8 border-b border-border pb-8 mb-8 relative z-10">
                        <div className="relative">
                            <img src={user.avatar} alt="Profile" className="w-28 h-28 rounded-2xl ring-4 ring-brand-secondary/20 shadow-glass object-cover bg-bg-surfaceAlt" />
                            <div className="absolute -bottom-2 -right-2 w-7 h-7 rounded-lg bg-brand-primary text-brand-accentLight flex items-center justify-center text-sm shadow-glass-sm">
                                <HiShieldCheck />
                            </div>
                        </div>
                        <div className="text-center sm:text-left">
                            <div className="flex items-center justify-center sm:justify-start gap-2 mb-1">
                                <h1 className="text-2xl sm:text-3xl font-extrabold text-brand-primary">{user.name}</h1>
                            </div>
                            <span className="inline-flex items-center gap-1.5 bg-brand-secondary/10 text-brand-secondary px-3.5 py-1 rounded-full text-xs font-bold border border-brand-secondary/20">
                                <HiSparkles className="text-xs text-brand-accent" />
                                {roleLabel} Account
                            </span>
                        </div>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-5 mb-10 relative z-10">
                        <div className="bg-bg-surfaceAlt p-5 rounded-xl border border-border">
                            <p className="text-xs text-txt-secondary font-semibold mb-1">Email Address</p>
                            <p className="text-base font-bold text-brand-primary break-all">{user.email}</p>
                        </div>
                        <div className="bg-bg-surfaceAlt p-5 rounded-xl border border-border">
                            <p className="text-xs text-txt-secondary font-semibold mb-1">Contact Number</p>
                            <p className="text-base font-bold text-brand-primary">{phoneValue}</p>
                        </div>
                        <div className="bg-bg-surfaceAlt p-5 rounded-xl border border-border">
                            <p className="text-xs text-txt-secondary font-semibold mb-1">Enrolled Courses</p>
                            <p className="text-base font-bold text-brand-primary">WBCS / UPSC Comprehensive Track</p>
                        </div>
                        <div className="bg-bg-surfaceAlt p-5 rounded-xl border border-border">
                            <p className="text-xs text-txt-secondary font-semibold mb-1">Membership Status</p>
                            <p className="text-base font-bold text-status-success">Active Subscriber</p>
                        </div>
                    </div>

                    <div className="flex justify-end gap-4 relative z-10 pt-4 border-t border-border">
                        <button
                            onClick={handleLogout}
                            className="px-6 py-2.5 rounded-xl border border-status-error/30 text-status-error font-bold hover:bg-status-error/10 transition-all active:scale-95 text-sm"
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

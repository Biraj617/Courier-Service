import { Outlet, Navigate, Link, useLocation } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { Package, Monitor, LogOut, PlusCircle, Settings, Menu, X, Clock, MapPin } from 'lucide-react';
import { useState } from 'react';
import { logout } from '../store/authSlice';

const DashboardLayout = () => {
    const { isAuthenticated, user } = useSelector((state) => state.auth);
    const dispatch = useDispatch();
    const location = useLocation();
    const [sidebarOpen, setSidebarOpen] = useState(false);

    if (!isAuthenticated) {
        return <Navigate to="/login" replace />;
    }

    const handleLogout = () => {
        dispatch(logout());
    };

    const getNavLinks = () => {
        if (user.role === 'SuperAdmin') {
            return [
                { path: '/superadmin', icon: Monitor, label: 'Analytics' },
                { path: '/superadmin/users', icon: Settings, label: 'Manage Users' },
            ];
        } else if (user.role === 'Admin') {
            return [
                { path: '/admin', icon: Monitor, label: 'Dashboard' },
                { path: '/admin/parcels', icon: Package, label: 'Manage Parcels' },
            ];
        } else {
            return [
                { path: '/dashboard', icon: Monitor, label: 'Overview' },
                { path: '/dashboard/create', icon: PlusCircle, label: 'Send Parcel' },
                { path: '/dashboard/history', icon: Clock, label: 'History' },
            ];
        }
    };

    const navLinks = isAuthenticated && user ? getNavLinks() : [];

    return (
        <div className="min-h-screen bg-slate-50 flex font-sans">
            {/* Mobile sidebar overlay */}
            {sidebarOpen && (
                <div 
                    className="fixed inset-0 bg-slate-900/50 z-40 lg:hidden"
                    onClick={() => setSidebarOpen(false)}
                ></div>
            )}

            {/* Sidebar */}
            <aside className={`
                fixed top-0 left-0 z-50 h-screen w-72 bg-slate-900 text-white transition-transform duration-300 ease-in-out
                ${sidebarOpen ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'}
            `}>
                <div className="flex flex-col h-full">
                    {/* Sidebar Header */}
                    <div className="h-16 flex items-center justify-between px-6 border-b border-slate-800">
                        <Link to="/" className="flex items-center gap-2">
                            <Package className="h-6 w-6 text-blue-500" />
                            <span className="text-xl font-bold">NepalCourier</span>
                        </Link>
                        <button onClick={() => setSidebarOpen(false)} className="lg:hidden text-slate-400 hover:text-white">
                            <X className="h-5 w-5" />
                        </button>
                    </div>

                    {/* User Info */}
                    <div className="p-6 border-b border-slate-800">
                        <div className="flex items-center gap-3 mb-2">
                            <div className="h-10 w-10 rounded-full bg-blue-600 flex items-center justify-center text-lg font-bold">
                                {user?.firstName?.charAt(0)}
                            </div>
                            <div>
                                <p className="font-medium text-sm text-slate-200">{user?.firstName} {user?.lastName}</p>
                                <p className="text-xs text-blue-400">{user?.role}</p>
                            </div>
                        </div>
                    </div>

                    {/* Navigation */}
                    <nav className="flex-1 px-4 py-6 space-y-1 overflow-y-auto w-full">
                        {navLinks.map((link) => {
                            const Icon = link.icon;
                            const isActive = location.pathname === link.path;
                            return (
                                <Link
                                    key={link.path}
                                    to={link.path}
                                    onClick={() => setSidebarOpen(false)}
                                    className={`
                                        flex items-center px-4 py-3 text-sm font-medium rounded-xl transition-colors
                                        ${isActive 
                                            ? 'bg-blue-600 text-white shadow-md w-full block' 
                                            : 'text-slate-400 hover:bg-slate-800 hover:text-white w-full block'
                                        }
                                    `}
                                >
                                    <div className="flex items-center">
                                        <Icon className={`mr-3 h-5 w-5 ${isActive ? 'text-blue-200' : 'text-slate-500'}`} />
                                        {link.label}
                                    </div>
                                </Link>
                            );
                        })}
                    </nav>

                    {/* Footer / Logout */}
                    <div className="p-4 border-t border-slate-800">
                        <button 
                            onClick={handleLogout}
                            className="flex items-center w-full px-4 py-3 text-sm font-medium text-red-400 rounded-xl hover:bg-slate-800 transition-colors"
                        >
                            <LogOut className="mr-3 h-5 w-5 opacity-70" />
                            Log Out
                        </button>
                    </div>
                </div>
            </aside>

            {/* Main Content Area */}
            <div className="flex-1 flex flex-col min-w-0 lg:pl-72 transition-all">
                {/* Mobile Headerbar */}
                <header className="bg-white border-b border-slate-200 h-16 flex items-center justify-between px-4 lg:hidden sticky top-0 z-30">
                    <button 
                        onClick={() => setSidebarOpen(true)}
                        className="text-slate-500 hover:text-slate-700 bg-slate-50 p-2 rounded-lg"
                    >
                        <Menu className="h-6 w-6" />
                    </button>
                    <span className="font-medium text-slate-800">{user?.role} Dashboard</span>
                    <div className="w-10"></div> {/* Spacer for centering */}
                </header>

                <main className="flex-1 p-4 sm:p-6 lg:p-8 overflow-x-hidden">
                    <Outlet />
                </main>
            </div>
        </div>
    );
};

export default DashboardLayout;

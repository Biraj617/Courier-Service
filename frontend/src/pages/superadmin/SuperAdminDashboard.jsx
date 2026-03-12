import { useEffect, useState } from 'react';
import { Users, DollarSign, Package } from 'lucide-react';
import api from '../../services/api';

const SuperAdminDashboard = () => {
    const [analytics, setAnalytics] = useState({ totalUsers: 0, totalParcels: 0, totalRevenue: 0 });
    const [users, setUsers] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const [analyticsRes, usersRes] = await Promise.all([
                    api.get('/superadmin/analytics'),
                    api.get('/superadmin/users')
                ]);
                setAnalytics(analyticsRes.data);
                setUsers(usersRes.data);
            } catch (err) {
                console.error("SuperAdmin Data fetch failed", err);
            } finally {
                setLoading(false);
            }
        };
        fetchData();
    }, []);

    const promoteUser = async (userId, roleName) => {
        if (!window.confirm(`Promote user to ${roleName}?`)) return;
        try {
            await api.put(`/superadmin/users/${userId}/role`, { roleName });
            setUsers(users.map(u => u.id === userId ? { ...u, Role: { name: roleName } } : u));
        } catch (error) {
            console.error(error);
            alert('Failed to update user role');
        }
    };

    if (loading) return <div className="p-8 text-center text-slate-500 animate-pulse">Loading super admin dashboard...</div>;

    return (
        <div className="max-w-6xl mx-auto">
            <div className="mb-8">
                <h1 className="text-2xl font-bold text-slate-900">System Analytics</h1>
                <p className="text-slate-500">Super admin overview of platform metrics and users.</p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
                <div className="bg-gradient-to-br from-indigo-500 to-purple-600 rounded-2xl p-6 text-white shadow-lg">
                    <div className="flex justify-between items-start">
                        <div>
                            <p className="text-indigo-100 font-medium mb-1">Total Users</p>
                            <h3 className="text-4xl font-bold">{analytics.totalUsers}</h3>
                        </div>
                        <div className="bg-white/20 p-3 rounded-xl backdrop-blur-sm">
                            <Users className="h-6 w-6 text-white" />
                        </div>
                    </div>
                </div>
                
                <div className="bg-gradient-to-br from-blue-500 to-cyan-600 rounded-2xl p-6 text-white shadow-lg">
                    <div className="flex justify-between items-start">
                        <div>
                            <p className="text-blue-100 font-medium mb-1">Total Parcels</p>
                            <h3 className="text-4xl font-bold">{analytics.totalParcels}</h3>
                        </div>
                        <div className="bg-white/20 p-3 rounded-xl backdrop-blur-sm">
                            <Package className="h-6 w-6 text-white" />
                        </div>
                    </div>
                </div>

                <div className="bg-gradient-to-br from-emerald-500 to-teal-600 rounded-2xl p-6 text-white shadow-lg">
                    <div className="flex justify-between items-start">
                        <div>
                            <p className="text-emerald-100 font-medium mb-1">Total Revenue</p>
                            <h3 className="text-4xl font-bold">Rs. {analytics.totalRevenue}</h3>
                        </div>
                        <div className="bg-white/20 p-3 rounded-xl backdrop-blur-sm">
                            <DollarSign className="h-6 w-6 text-white" />
                        </div>
                    </div>
                </div>
            </div>

            <div className="bg-white rounded-2xl border border-slate-100 shadow-sm overflow-hidden">
                <div className="p-6 border-b border-slate-100">
                    <h2 className="text-lg font-bold text-slate-900">User Management</h2>
                </div>
                <div className="overflow-x-auto">
                    <table className="min-w-full divide-y divide-slate-100">
                        <thead className="bg-slate-50">
                            <tr>
                                <th className="px-6 py-3 text-left text-xs font-semibold text-slate-500 uppercase tracking-wider">Name</th>
                                <th className="px-6 py-3 text-left text-xs font-semibold text-slate-500 uppercase tracking-wider">Email</th>
                                <th className="px-6 py-3 text-left text-xs font-semibold text-slate-500 uppercase tracking-wider">Role</th>
                                <th className="px-6 py-3 text-left text-xs font-semibold text-slate-500 uppercase tracking-wider">Joined</th>
                                <th className="px-6 py-3 text-left text-xs font-semibold text-slate-500 uppercase tracking-wider">Action</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-slate-100 bg-white">
                            {users.map((u) => (
                                <tr key={u.id} className="hover:bg-slate-50 transition-colors">
                                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-slate-900">
                                        {u.firstName} {u.lastName}
                                    </td>
                                    <td className="px-6 py-4 whitespace-nowrap text-sm text-slate-500">
                                        {u.email}
                                    </td>
                                    <td className="px-6 py-4 whitespace-nowrap">
                                        <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full 
                                            ${u.Role?.name === 'SuperAdmin' ? 'bg-purple-100 text-purple-800' : 
                                              u.Role?.name === 'Admin' ? 'bg-blue-100 text-blue-800' : 
                                              'bg-slate-100 text-slate-800'}`}>
                                            {u.Role?.name || 'User'}
                                        </span>
                                    </td>
                                    <td className="px-6 py-4 whitespace-nowrap text-sm text-slate-500">
                                        {new Date(u.createdAt).toLocaleDateString()}
                                    </td>
                                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                                        {u.Role?.name === 'User' && (
                                            <button 
                                                onClick={() => promoteUser(u.id, 'Admin')}
                                                className="text-indigo-600 hover:text-indigo-900 mr-4"
                                            >
                                                Make Admin
                                            </button>
                                        )}
                                        {u.Role?.name !== 'SuperAdmin' && (
                                            <button 
                                                onClick={() => promoteUser(u.id, 'SuperAdmin')}
                                                className="text-purple-600 hover:text-purple-900"
                                            >
                                                Make SuperAdmin
                                            </button>
                                        )}
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
};

export default SuperAdminDashboard;

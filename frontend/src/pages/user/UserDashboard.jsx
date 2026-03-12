import { useEffect, useState } from 'react';
import { Package, Clock, Send } from 'lucide-react';
import { Link } from 'react-router-dom';
import api from '../../services/api';

const UserDashboard = () => {
    const [parcels, setParcels] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchParcels = async () => {
            try {
                const res = await api.get('/users/parcels/history');
                setParcels(res.data);
            } catch (err) {
                console.error("Failed to fetch parcels", err);
            } finally {
                setLoading(false);
            }
        };
        fetchParcels();
    }, []);

    const activeParcels = parcels.filter(p => !['Delivered', 'Cancelled'].includes(p.currentStatus));

    if (loading) return <div className="p-8 text-center text-slate-500 animate-pulse">Loading dashboard...</div>;

    return (
        <div className="max-w-5xl mx-auto">
            <div className="mb-8">
                <h1 className="text-2xl font-bold text-slate-900">Dashboard Overview</h1>
                <p className="text-slate-500">Welcome back! Here's what's happening with your parcels.</p>
            </div>

            {/* Quick Stats Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
                <div className="bg-white rounded-2xl p-6 border border-slate-100 shadow-sm flex items-center shadow-[0_4px_20px_-4px_rgba(0,0,0,0.05)]">
                    <div className="h-12 w-12 bg-blue-50 text-blue-600 rounded-xl flex items-center justify-center mr-4">
                        <Send className="h-6 w-6" />
                    </div>
                    <div>
                        <p className="text-sm font-medium text-slate-500">Total Sent</p>
                        <p className="text-2xl font-bold text-slate-900">{parcels.length}</p>
                    </div>
                </div>
                <div className="bg-white rounded-2xl p-6 border border-slate-100 shadow-sm flex items-center shadow-[0_4px_20px_-4px_rgba(0,0,0,0.05)]">
                    <div className="h-12 w-12 bg-emerald-50 text-emerald-600 rounded-xl flex items-center justify-center mr-4">
                        <Package className="h-6 w-6" />
                    </div>
                    <div>
                        <p className="text-sm font-medium text-slate-500">Active Parcels</p>
                        <p className="text-2xl font-bold text-slate-900">{activeParcels.length}</p>
                    </div>
                </div>
            </div>

            {/* Recent Activity */}
            <div className="bg-white rounded-2xl p-6 border border-slate-100 shadow-sm">
                <div className="flex justify-between items-center mb-6">
                    <h2 className="text-lg font-bold text-slate-900">Recent Parcels</h2>
                    <Link to="/dashboard/history" className="text-sm font-medium text-blue-600 hover:text-blue-700">View All</Link>
                </div>

                {parcels.length === 0 ? (
                    <div className="text-center py-12 border-2 border-dashed border-slate-200 rounded-xl">
                        <Package className="mx-auto h-12 w-12 text-slate-300 mb-3" />
                        <h3 className="text-sm font-medium text-slate-900">No parcels yet</h3>
                        <p className="mt-1 text-sm text-slate-500">Get started by sending your first parcel.</p>
                        <div className="mt-6">
                            <Link to="/dashboard/create" className="btn-primary inline-flex items-center">
                                <PlusCircle className="mr-2 h-4 w-4" /> Send Parcel
                            </Link>
                        </div>
                    </div>
                ) : (
                    <div className="overflow-x-auto">
                        <table className="min-w-full divide-y divide-slate-100">
                            <thead>
                                <tr>
                                    <th className="px-3 py-3 text-left text-xs font-medium text-slate-500 uppercase tracking-wider">Tracking / Date</th>
                                    <th className="px-3 py-3 text-left text-xs font-medium text-slate-500 uppercase tracking-wider">Receiver</th>
                                    <th className="px-3 py-3 text-left text-xs font-medium text-slate-500 uppercase tracking-wider">Status</th>
                                    <th className="px-3 py-3 text-right text-xs font-medium text-slate-500 uppercase tracking-wider">Amount</th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-slate-100">
                                {parcels.slice(0, 5).map((parcel) => (
                                    <tr key={parcel.id} className="hover:bg-slate-50 transition-colors">
                                        <td className="px-3 py-4 whitespace-nowrap">
                                            <div className="font-medium text-slate-900">{parcel.trackingNumber}</div>
                                            <div className="text-xs text-slate-500">{new Date(parcel.createdAt).toLocaleDateString()}</div>
                                        </td>
                                        <td className="px-3 py-4 whitespace-nowrap">
                                            <div className="text-sm text-slate-900">{parcel.receiverName}</div>
                                            <div className="text-xs text-slate-500">{parcel.receiverCity}</div>
                                        </td>
                                        <td className="px-3 py-4 whitespace-nowrap">
                                            <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full 
                                                ${parcel.currentStatus === 'Delivered' ? 'bg-emerald-100 text-emerald-800' : 
                                                  parcel.currentStatus === 'Out for Delivery' ? 'bg-blue-100 text-blue-800' : 
                                                  'bg-amber-100 text-amber-800'}`}>
                                                {parcel.currentStatus}
                                            </span>
                                        </td>
                                        <td className="px-3 py-4 whitespace-nowrap text-right text-sm font-medium">
                                            Rs. {parcel.deliveryCharge}
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                )}
            </div>
        </div>
    );
};

// Assuming PlusCircle might be missing if I copied from above blindly, I'll ensure it works without breaking or I'll add an icon.
import { PlusCircle } from 'lucide-react';

export default UserDashboard;

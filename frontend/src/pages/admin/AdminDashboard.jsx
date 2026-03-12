import { useEffect, useState } from 'react';
import { Package, Truck, CheckCircle, RefreshCcw } from 'lucide-react';
import api from '../../services/api';

const AdminDashboard = () => {
    const [parcels, setParcels] = useState([]);
    const [loading, setLoading] = useState(true);
    const [statusUpdate, setStatusUpdate] = useState({ id: null, status: '' });

    const fetchParcels = async () => {
        setLoading(true);
        try {
            const res = await api.get('/admin/parcels');
            setParcels(res.data);
        } catch (err) {
            console.error("Failed to fetch parcels for admin", err);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchParcels();
    }, []);

    const handleStatusUpdate = async (parcelId) => {
        if (!statusUpdate.status) return;
        try {
            await api.put(`/admin/parcels/${parcelId}/status`, {
                status: statusUpdate.status,
                notes: 'Status updated by Admin'
            });
            setStatusUpdate({ id: null, status: '' });
            fetchParcels(); // reload
        } catch (error) {
            console.error(error);
            alert('Failed to update status');
        }
    };

    if (loading && parcels.length === 0) return <div className="p-8 text-center text-slate-500 animate-pulse">Loading admin dashboard...</div>;

    const inTransit = parcels.filter(p => p.currentStatus === 'In Transit').length;
    const delivered = parcels.filter(p => p.currentStatus === 'Delivered').length;

    return (
        <div className="max-w-6xl mx-auto">
            <div className="flex justify-between items-end mb-8">
                <div>
                    <h1 className="text-2xl font-bold text-slate-900">Admin Dashboard</h1>
                    <p className="text-slate-500">Manage parcels and assign deliveries.</p>
                </div>
                <button onClick={fetchParcels} className="btn-secondary flex items-center gap-2">
                    <RefreshCcw className="h-4 w-4" /> Refresh
                </button>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 mb-8">
                <div className="bg-white rounded-2xl p-6 border border-slate-100 shadow-sm flex items-center">
                    <div className="h-12 w-12 bg-blue-50 text-blue-600 rounded-xl flex items-center justify-center mr-4">
                        <Package className="h-6 w-6" />
                    </div>
                    <div>
                        <p className="text-sm font-medium text-slate-500">Total Parcels</p>
                        <p className="text-2xl font-bold text-slate-900">{parcels.length}</p>
                    </div>
                </div>
                <div className="bg-white rounded-2xl p-6 border border-slate-100 shadow-sm flex items-center">
                    <div className="h-12 w-12 bg-amber-50 text-amber-600 rounded-xl flex items-center justify-center mr-4">
                        <Truck className="h-6 w-6" />
                    </div>
                    <div>
                        <p className="text-sm font-medium text-slate-500">In Transit</p>
                        <p className="text-2xl font-bold text-slate-900">{inTransit}</p>
                    </div>
                </div>
                <div className="bg-white rounded-2xl p-6 border border-slate-100 shadow-sm flex items-center">
                    <div className="h-12 w-12 bg-emerald-50 text-emerald-600 rounded-xl flex items-center justify-center mr-4">
                        <CheckCircle className="h-6 w-6" />
                    </div>
                    <div>
                        <p className="text-sm font-medium text-slate-500">Delivered</p>
                        <p className="text-2xl font-bold text-slate-900">{delivered}</p>
                    </div>
                </div>
            </div>

            <div className="bg-white rounded-2xl border border-slate-100 shadow-sm overflow-hidden">
                <div className="p-6 border-b border-slate-100">
                    <h2 className="text-lg font-bold text-slate-900">All Parcels</h2>
                </div>
                <div className="overflow-x-auto">
                    <table className="min-w-full divide-y divide-slate-100">
                        <thead className="bg-slate-50">
                            <tr>
                                <th className="px-6 py-3 text-left text-xs font-semibold text-slate-500 uppercase tracking-wider">Tracking No.</th>
                                <th className="px-6 py-3 text-left text-xs font-semibold text-slate-500 uppercase tracking-wider">Sender</th>
                                <th className="px-6 py-3 text-left text-xs font-semibold text-slate-500 uppercase tracking-wider">Receiver & City</th>
                                <th className="px-6 py-3 text-left text-xs font-semibold text-slate-500 uppercase tracking-wider">Status</th>
                                <th className="px-6 py-3 text-left text-xs font-semibold text-slate-500 uppercase tracking-wider">Action</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-slate-100 bg-white">
                            {parcels.map((parcel) => (
                                <tr key={parcel.id} className="hover:bg-slate-50 transition-colors">
                                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-slate-900">
                                        {parcel.trackingNumber}
                                    </td>
                                    <td className="px-6 py-4 whitespace-nowrap text-sm text-slate-500">
                                        {parcel.Sender ? `${parcel.Sender.firstName} ${parcel.Sender.lastName}` : `User ${parcel.senderId}`}
                                    </td>
                                    <td className="px-6 py-4 whitespace-nowrap text-sm text-slate-500">
                                        <div className="text-slate-900 font-medium">{parcel.receiverName}</div>
                                        <div>{parcel.receiverCity}</div>
                                    </td>
                                    <td className="px-6 py-4 whitespace-nowrap">
                                        <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full 
                                                ${parcel.currentStatus === 'Delivered' ? 'bg-emerald-100 text-emerald-800' : 
                                                  parcel.currentStatus === 'Out for Delivery' ? 'bg-blue-100 text-blue-800' : 
                                                  'bg-amber-100 text-amber-800'}`}>
                                            {parcel.currentStatus}
                                        </span>
                                    </td>
                                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                                        {statusUpdate.id === parcel.id ? (
                                            <div className="flex items-center gap-2">
                                                <select 
                                                    className="border border-slate-300 rounded px-2 py-1 text-sm outline-none"
                                                    value={statusUpdate.status}
                                                    onChange={(e) => setStatusUpdate({ ...statusUpdate, status: e.target.value })}
                                                >
                                                    <option value="">Select...</option>
                                                    <option value="Picked Up">Picked Up</option>
                                                    <option value="In Transit">In Transit</option>
                                                    <option value="Out for Delivery">Out for Delivery</option>
                                                    <option value="Delivered">Delivered</option>
                                                </select>
                                                <button onClick={() => handleStatusUpdate(parcel.id)} className="text-blue-600 hover:text-blue-900">Save</button>
                                                <button onClick={() => setStatusUpdate({ id: null, status: '' })} className="text-slate-400 hover:text-slate-600">Cancel</button>
                                            </div>
                                        ) : (
                                            <button 
                                                onClick={() => setStatusUpdate({ id: parcel.id, status: parcel.currentStatus })}
                                                className="text-blue-600 hover:text-blue-900"
                                                disabled={parcel.currentStatus === 'Delivered'}
                                            >
                                                Update Status
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

export default AdminDashboard;

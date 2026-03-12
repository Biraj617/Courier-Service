import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import api from '../../services/api';
import { User, MapPin, Scale, PlusCircle, ArrowRight, Loader2, Calendar } from 'lucide-react';

const CreateParcel = () => {
    const navigate = useNavigate();
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');
    const [formData, setFormData] = useState({
        receiverName: '',
        receiverPhone: '',
        receiverAddress: '',
        receiverCity: '',
        weight: '1',
        dimensions: '',
        declaredValue: '',
        pickupDate: '',
        pickupTimeSlot: '10:00 AM - 01:00 PM',
        pickupAddress: ''
    });

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        setError('');
        try {
            const res = await api.post('/users/parcels', formData);
            // Optionally redirect to payment page if you want real payment integration
            navigate('/dashboard', { state: { message: 'Parcel booked successfully! Tracking No: ' + res.data.trackingNumber } });
        } catch (err) {
            setError(err.response?.data?.message || 'Error booking parcel');
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="max-w-4xl mx-auto">
            <div className="mb-8">
                <h1 className="text-2xl font-bold text-slate-900">Book a Parcel</h1>
                <p className="text-slate-500">Provide the receiver and pickup details to schedule your shipment.</p>
            </div>

            {error && (
                <div className="mb-6 bg-red-50 text-red-600 text-sm p-4 rounded-xl border border-red-100">
                    {error}
                </div>
            )}

            <form onSubmit={handleSubmit} className="space-y-8">
                {/* Receiver Info */}
                <div className="bg-white p-6 rounded-2xl shadow-sm border border-slate-100">
                    <h2 className="text-lg font-bold text-slate-900 flex items-center mb-4">
                        <User className="h-5 w-5 mr-2 text-blue-500" /> Receiver Details
                    </h2>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div>
                            <label className="block text-sm font-medium text-slate-700 mb-1">Full Name</label>
                            <input name="receiverName" type="text" required onChange={handleChange} value={formData.receiverName}
                                className="w-full px-4 py-2 bg-slate-50 border border-slate-200 rounded-xl focus:ring-2 focus:ring-blue-500 outline-none transition-all" />
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-slate-700 mb-1">Phone Number</label>
                            <input name="receiverPhone" type="text" required onChange={handleChange} value={formData.receiverPhone}
                                className="w-full px-4 py-2 bg-slate-50 border border-slate-200 rounded-xl focus:ring-2 focus:ring-blue-500 outline-none transition-all" />
                        </div>
                        <div className="md:col-span-2">
                            <label className="block text-sm font-medium text-slate-700 mb-1">Detailed Address</label>
                            <input name="receiverAddress" type="text" required onChange={handleChange} value={formData.receiverAddress}
                                className="w-full px-4 py-2 bg-slate-50 border border-slate-200 rounded-xl focus:ring-2 focus:ring-blue-500 outline-none transition-all" />
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-slate-700 mb-1">City</label>
                            <input name="receiverCity" type="text" required onChange={handleChange} value={formData.receiverCity}
                                className="w-full px-4 py-2 bg-slate-50 border border-slate-200 rounded-xl focus:ring-2 focus:ring-blue-500 outline-none transition-all" />
                        </div>
                    </div>
                </div>

                {/* Parcel Info */}
                <div className="bg-white p-6 rounded-2xl shadow-sm border border-slate-100">
                    <h2 className="text-lg font-bold text-slate-900 flex items-center mb-4">
                        <Scale className="h-5 w-5 mr-2 text-blue-500" /> Parcel Details
                    </h2>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                        <div>
                            <label className="block text-sm font-medium text-slate-700 mb-1">Weight (KG)</label>
                            <input name="weight" type="number" step="0.1" required onChange={handleChange} value={formData.weight}
                                className="w-full px-4 py-2 bg-slate-50 border border-slate-200 rounded-xl focus:ring-2 focus:ring-blue-500 outline-none transition-all" />
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-slate-700 mb-1">Dimensions (L x W x H)</label>
                            <input name="dimensions" type="text" placeholder="e.g. 10x10x5 cm" onChange={handleChange} value={formData.dimensions}
                                className="w-full px-4 py-2 bg-slate-50 border border-slate-200 rounded-xl focus:ring-2 focus:ring-blue-500 outline-none transition-all" />
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-slate-700 mb-1">Declared Value (Rs)</label>
                            <input name="declaredValue" type="number" placeholder="Optional" onChange={handleChange} value={formData.declaredValue}
                                className="w-full px-4 py-2 bg-slate-50 border border-slate-200 rounded-xl focus:ring-2 focus:ring-blue-500 outline-none transition-all" />
                        </div>
                    </div>
                </div>

                {/* Pickup Info */}
                <div className="bg-white p-6 rounded-2xl shadow-sm border border-slate-100">
                    <h2 className="text-lg font-bold text-slate-900 flex items-center mb-4">
                        <Calendar className="h-5 w-5 mr-2 text-blue-500" /> Doorstep Pickup Details
                    </h2>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div className="md:col-span-2">
                            <label className="block text-sm font-medium text-slate-700 mb-1">Pickup Address</label>
                            <input name="pickupAddress" type="text" required placeholder="From where should we pick this up?" onChange={handleChange} value={formData.pickupAddress}
                                className="w-full px-4 py-2 bg-slate-50 border border-slate-200 rounded-xl focus:ring-2 focus:ring-blue-500 outline-none transition-all" />
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-slate-700 mb-1">Date</label>
                            <input name="pickupDate" type="date" required onChange={handleChange} value={formData.pickupDate}
                                className="w-full px-4 py-2 bg-slate-50 border border-slate-200 rounded-xl focus:ring-2 focus:ring-blue-500 outline-none transition-all" />
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-slate-700 mb-1">Time Slot</label>
                            <select name="pickupTimeSlot" onChange={handleChange} value={formData.pickupTimeSlot}
                                className="w-full px-4 py-2 bg-slate-50 border border-slate-200 rounded-xl focus:ring-2 focus:ring-blue-500 outline-none transition-all">
                                <option>10:00 AM - 01:00 PM</option>
                                <option>01:00 PM - 04:00 PM</option>
                                <option>04:00 PM - 07:00 PM</option>
                            </select>
                        </div>
                    </div>
                </div>

                <div className="flex justify-end">
                    <button type="submit" disabled={loading}
                        className="btn-primary py-3 px-8 text-lg w-full md:w-auto flex justify-center items-center gap-2">
                        {loading ? <Loader2 className="h-5 w-5 animate-spin" /> : <>Confirm Booking <ArrowRight className="h-5 w-5" /></>}
                    </button>
                </div>
            </form>
        </div>
    );
};

export default CreateParcel;

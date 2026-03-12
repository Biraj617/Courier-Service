import { PackageCheck, Zap, Globe, Shield } from 'lucide-react';
import { Link } from 'react-router-dom';

const Services = () => {
  return (
    <div className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h1 className="text-4xl font-extrabold text-slate-900 tracking-tight sm:text-5xl">Our Services & Pricing</h1>
          <p className="mt-4 text-xl text-slate-600 max-w-3xl mx-auto">
            Transparent pricing for everyone. Whether you're sending a gift to a friend or shipping hundreds of orders a day.
          </p>
        </div>

        {/* Services Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 mb-20">
          <div className="bg-slate-50 rounded-3xl p-8 border border-slate-100 relative overflow-hidden group hover:shadow-lg transition-all">
            <div className="absolute top-0 right-0 p-4 opacity-10 group-hover:opacity-20 transition-opacity">
              <PackageCheck className="h-48 w-48 text-blue-600" />
            </div>
            <div className="relative z-10">
              <span className="bg-blue-100 text-blue-800 text-sm font-semibold px-3 py-1 rounded-full mb-4 inline-block">Individual</span>
              <h3 className="text-3xl font-bold text-slate-900 mb-4">Standard Courier</h3>
              <p className="text-slate-600 mb-6 text-lg">Perfect for occasional shippers. Send parcels anywhere in Nepal with full tracking and doorstep pickup.</p>
              
              <div className="bg-white p-6 rounded-2xl shadow-sm mb-6 border border-slate-100">
                <div className="flex justify-between items-center mb-2">
                  <span className="text-slate-600 font-medium">Base Charge:</span>
                  <span className="text-xl font-bold text-slate-900">Rs. 100</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-slate-600 font-medium">Per Kg Charge:</span>
                  <span className="text-xl font-bold text-slate-900">Rs. 50</span>
                </div>
              </div>
              
              <ul className="space-y-3 mb-8">
                <li className="flex items-center text-slate-700"><Zap className="h-5 w-5 text-blue-500 mr-3" /> Next-day delivery in major cities</li>
                <li className="flex items-center text-slate-700"><Shield className="h-5 w-5 text-blue-500 mr-3" /> Basic damage protection up to Rs. 2000</li>
              </ul>
              <Link to="/register" className="btn-primary w-full text-center block py-3">Book Now</Link>
            </div>
          </div>

          <div className="bg-slate-900 rounded-3xl p-8 border border-slate-800 relative overflow-hidden group hover:shadow-2xl transition-all">
            <div className="absolute top-0 right-0 p-4 opacity-10 group-hover:opacity-20 transition-opacity">
              <Globe className="h-48 w-48 text-indigo-400" />
            </div>
            <div className="relative z-10">
              <span className="bg-indigo-500/20 text-indigo-300 border border-indigo-500/30 text-sm font-semibold px-3 py-1 rounded-full mb-4 inline-block">Business</span>
              <h3 className="text-3xl font-bold text-white mb-4">Wholesale Partner</h3>
              <p className="text-slate-300 mb-6 text-lg">Built for e-commerce and retailers. Bulk API access, discounted rates, and dedicated account manager.</p>
              
              <div className="bg-slate-800 p-6 rounded-2xl mb-6 border border-slate-700">
                <div className="flex justify-between items-center mb-2">
                  <span className="text-slate-300 font-medium">Monthly Minimum:</span>
                  <span className="text-xl font-bold text-white">50 parcels</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-slate-300 font-medium">Discount Rate:</span>
                  <span className="text-xl font-bold text-emerald-400">Up to 30% off</span>
                </div>
              </div>
              
              <ul className="space-y-3 mb-8">
                <li className="flex items-center text-slate-300"><Zap className="h-5 w-5 text-indigo-400 mr-3" /> Bulk CSV upload & API Access</li>
                <li className="flex items-center text-slate-300"><Shield className="h-5 w-5 text-indigo-400 mr-3" /> Priority support & extended insurance</li>
              </ul>
              <Link to="/contact" className="btn-primary w-full text-center block py-3 bg-indigo-600 hover:bg-indigo-500 border-none">Contact Sales</Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Services;

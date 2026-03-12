import { Outlet, Link } from 'react-router-dom';
import { Package, Menu, X, LogIn } from 'lucide-react';
import { useState } from 'react';

const MainLayout = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <div className="min-h-screen flex flex-col font-sans">
      {/* Navbar */}
      <header className="bg-white/80 backdrop-blur-md border-b border-gray-200 sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between h-16 items-center">
            {/* Logo */}
            <div className="flex-shrink-0 flex items-center">
              <Link to="/" className="flex items-center gap-2 group">
                <div className="bg-[#b03131] p-2 rounded-xl group-hover:bg-[#8a2626] transition-colors shadow-sm">
                  <Package className="h-6 w-6 text-white" />
                </div>
                <span className="text-xl font-bold text-[#b03131]">
                  NepalCourier
                </span>
              </Link>
            </div>

            {/* Desktop Navigation */}
            <nav className="hidden md:flex space-x-8 items-center">
              <Link to="/" className="text-gray-600 hover:text-[#b03131] font-medium transition-colors">Home</Link>
              <Link to="/services" className="text-gray-600 hover:text-[#b03131] font-medium transition-colors">Services</Link>
              <Link to="/contact" className="text-gray-600 hover:text-[#b03131] font-medium transition-colors">Contact</Link>
              <div className="h-6 w-px bg-gray-200"></div>
              <Link to="/login" className="flex items-center gap-2 text-gray-600 hover:text-[#b03131] font-medium transition-colors">
                <LogIn className="h-4 w-4" />
                Login
              </Link>
              <Link to="/register" className="bg-[#333333] hover:bg-black text-white px-5 py-2 rounded-lg font-medium transition-colors">
                Book a Parcel
              </Link>
            </nav>

            {/* Mobile menu button */}
            <div className="md:hidden flex items-center">
              <button 
                onClick={() => setIsMenuOpen(!isMenuOpen)}
                className="text-gray-500 hover:text-gray-700 p-2"
              >
                {isMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
              </button>
            </div>
          </div>
        </div>

        {/* Mobile Navigation */}
        {isMenuOpen && (
          <div className="md:hidden bg-white border-b border-gray-200 px-4 pt-2 pb-4 space-y-1 shadow-lg">
            <Link to="/" className="block px-3 py-2 rounded-md text-base font-medium text-gray-700 hover:text-[#b03131] hover:bg-gray-50">Home</Link>
            <Link to="/services" className="block px-3 py-2 rounded-md text-base font-medium text-gray-700 hover:text-[#b03131] hover:bg-gray-50">Services</Link>
            <Link to="/contact" className="block px-3 py-2 rounded-md text-base font-medium text-gray-700 hover:text-[#b03131] hover:bg-gray-50">Contact</Link>
            <div className="border-t border-gray-100 my-2 pt-2">
              <Link to="/login" className="block px-3 py-2 rounded-md text-base font-medium text-gray-700 hover:text-[#b03131] hover:bg-gray-50">Login</Link>
              <Link to="/register" className="block px-3 py-2 mt-2 text-center rounded-md text-base font-medium bg-[#333333] text-white hover:bg-black">Book a Parcel</Link>
            </div>
          </div>
        )}
      </header>

      {/* Main Content */}
      <main className="flex-grow">
        <Outlet />
      </main>

      {/* Footer */}
      <footer className="bg-[#1a1a1a] border-t-4 border-[#b03131] pt-12 pb-8">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-8">
            <div className="col-span-1 md:col-span-2">
              <Link to="/" className="flex items-center gap-2 mb-4">
                <div className="bg-[#b03131] p-1.5 rounded-lg">
                  <Package className="h-5 w-5 text-white" />
                </div>
                <span className="text-xl font-bold text-white">NepalCourier</span>
              </Link>
              <p className="text-gray-400 max-w-sm">
                Modernizing logistics in Nepal. Book parcels online, schedule doorstep pickups, and track your shipments in real-time.
              </p>
            </div>
            <div>
              <h3 className="text-sm font-semibold text-gray-200 tracking-wider uppercase mb-4">Quick Links</h3>
              <ul className="space-y-2">
                <li><Link to="/" className="text-gray-400 hover:text-[#b03131] transition-colors">Home</Link></li>
                <li><Link to="/services" className="text-gray-400 hover:text-[#b03131] transition-colors">Services</Link></li>
                <li><Link to="/contact" className="text-gray-400 hover:text-[#b03131] transition-colors">Contact Us</Link></li>
                <li><Link to="/track" className="text-gray-400 hover:text-[#b03131] transition-colors">Track Parcel</Link></li>
              </ul>
            </div>
            <div>
              <h3 className="text-sm font-semibold text-gray-200 tracking-wider uppercase mb-4">Legal</h3>
              <ul className="space-y-2">
                <li><Link to="/privacy" className="text-gray-400 hover:text-[#b03131] transition-colors">Privacy Policy</Link></li>
                <li><Link to="/terms" className="text-gray-400 hover:text-[#b03131] transition-colors">Terms of Service</Link></li>
              </ul>
            </div>
          </div>
          <div className="border-t border-[#333333] pt-8 flex flex-col md:flex-row justify-between items-center">
            <p className="text-gray-500 text-sm">
              &copy; {new Date().getFullYear()} NepalCourier. All rights reserved.
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default MainLayout;

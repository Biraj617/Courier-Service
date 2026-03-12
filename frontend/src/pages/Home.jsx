import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { 
  Search, ArrowRight, ThumbsUp, Target, Rocket, 
  UserPlus, Box, MapPin, CheckCircle, 
  ShoppingBag, User, Briefcase, 
  Truck, Clock, ShieldCheck, ChevronDown
} from "lucide-react";

export default function Home() {
  const [openFaq, setOpenFaq] = useState(null);
  const [trackingNumber, setTrackingNumber] = useState('');
  const navigate = useNavigate();

  const handleTrack = (e) => {
    e.preventDefault();
    if (trackingNumber.trim()) {
      navigate(`/track/${trackingNumber}`);
    }
  };

  const faqs = [
    {
      q: "How do I track my parcel?",
      a: "Simply enter your tracking number in the 'Track' section at the top of the page. You will get real-time updates on your parcel's location.",
    },
    {
      q: "Do you offer doorstep pickup?",
      a: "Yes! You can schedule a pickup from your home or office, and our delivery agents will collect the parcel at your preferred time.",
    },
    {
      q: "How long does delivery take?",
      a: "Delivery times depend on the destination. Local deliveries usually take 24 hours, while long-distance shipments might take up to 2-3 business days.",
    },
    {
      q: "What payment methods do you accept?",
      a: "We accept secure digital payments like eSewa and Khalti, as well as Cash on Delivery for your convenience.",
    },
  ];

  return (
    <div className="min-h-screen bg-gray-50">

      {/* ── HERO SECTION ── */}
      <section className="w-full px-4 sm:px-6 md:px-16 pt-6 sm:pt-10 pb-6 flex flex-col items-center text-center">
        <div className="w-full max-w-5xl rounded-2xl bg-[#e5e7eb] p-6 sm:p-8 md:p-12 flex flex-col items-center gap-5">
          <span className="inline-block bg-gray-300 text-black text-xs font-semibold uppercase tracking-widest px-4 py-1.5 rounded-full">
            Fast & Reliable
          </span>
          
          <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold leading-tight text-[#1a1a1a]">
            Send Parcels Across Nepal, <br />
            <span className="italic text-[#b03131]">Without Leaving Home</span>
          </h1>
          
          <p className="text-sm sm:text-base text-gray-600 leading-relaxed max-w-2xl mx-auto">
            Book online, schedule a doorstep pickup, and track your shipments in real-time. Forget paper forms and long queues.
          </p>

          <div className="flex flex-col sm:flex-row items-center gap-3 w-full justify-center mt-2">
            <Link
              to="/register"
              className="bg-[#333333] rounded-full text-white px-8 py-3 text-sm font-medium hover:bg-black transition-colors"
            >
              Get Started for Free
            </Link>
            <Link
              to="/services"
              className="text-sm text-gray-600 hover:text-gray-900 underline underline-offset-2 transition-colors"
            >
              View Pricing →
            </Link>
          </div>

          {/* ── TRACKING WIDGET ── */}
          <div className="w-full max-w-xl mt-6">
            <form onSubmit={handleTrack} className="flex flex-col sm:flex-row items-center gap-2">
              <div className="relative flex-grow w-full">
                <Search className="absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-400" />
                <input
                  type="text"
                  placeholder="Enter tracking number (e.g. NP12345)"
                  className="w-full pl-12 pr-4 py-3 sm:py-4 rounded-xl border border-gray-300 focus:outline-none focus:ring-2 focus:ring-[#b03131] bg-white"
                  value={trackingNumber}
                  onChange={(e) => setTrackingNumber(e.target.value)}
                />
              </div>
              <button 
                type="submit" 
                className="w-full sm:w-auto px-6 py-3 sm:py-4 bg-[#b03131] hover:bg-[#8a2626] text-white rounded-xl font-semibold transition-colors flex items-center justify-center gap-2 whitespace-nowrap"
              >
                Track <ArrowRight className="h-4 w-4" />
              </button>
            </form>
          </div>
        </div>
      </section>

      {/* ── TRUSTED BY ── */}
      <section className="bg-white py-10 sm:py-14 md:py-16 px-4 sm:px-8">
        <div className="max-w-5xl mx-auto">
          <h2 className="text-xl sm:text-2xl md:text-3xl lg:text-4xl font-bold text-center text-[#1a1a1a] mb-8 sm:mb-12">
            Trusted by <span className="text-[#b03131]">5,000+ Businesses</span> Across Nepal
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 text-center">
            {[
              {
                icon: <ThumbsUp className="h-6 w-6 text-[#b03131]" />,
                stat: "99% On-Time",
                desc: "We deliver within the committed timeframe safely.",
              },
              {
                icon: <Target className="h-6 w-6 text-[#b03131]" />,
                stat: "10,000+ Parcels",
                desc: "Safely delivered to homes and offices across the nation.",
              },
              {
                icon: <Rocket className="h-6 w-6 text-[#b03131]" />,
                stat: "3x Faster",
                desc: "Booking and pickup takes minutes instead of hours.",
              },
            ].map((item, i) => (
              <div key={i} className="flex flex-col items-center px-4 py-4 sm:py-0">
                <div className="w-12 h-12 sm:w-16 sm:h-16 rounded-full bg-[#fce8e8] flex items-center justify-center mb-4">
                  {item.icon}
                </div>
                <p className="text-base sm:text-lg font-bold text-[#333333] mb-2">{item.stat}</p>
                <p className="text-xs sm:text-sm text-gray-500 leading-relaxed max-w-xs">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── HOW IT WORKS ── */}
      <section className="relative py-14 sm:py-16 md:py-20 px-4 sm:px-6 md:px-16 overflow-hidden">
        <div className="absolute inset-x-0 top-0 h-1/2 bg-[#333333] z-0" />
        <div className="absolute inset-x-0 bottom-0 h-1/2 bg-gray-50 z-0" />

        <div className="relative z-10 max-w-6xl mx-auto">
          <div className="text-center mb-10 sm:mb-14">
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-white mb-3">
              How it works
            </h2>
            <p className="text-xs sm:text-sm text-gray-300 max-w-md mx-auto px-2">
              Send your parcel anywhere in 4 simple steps.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 sm:gap-6">
            {[
              {
                num: "1",
                icon: <UserPlus className="h-8 w-8 text-[#b03131]" />,
                title: "Sign up",
                desc: "Create an account in seconds to manage all your deliveries easily.",
              },
              {
                num: "2",
                icon: <Box className="h-8 w-8 text-[#b03131]" />,
                title: "Book Parcel",
                desc: "Enter the delivery details and select a convenient pickup time.",
              },
              {
                num: "3",
                icon: <MapPin className="h-8 w-8 text-[#b03131]" />,
                title: "We Pick Up",
                desc: "Our agent arrives at your doorstep to pick up the parcel securely.",
              },
              {
                num: "4",
                icon: <CheckCircle className="h-8 w-8 text-[#b03131]" />,
                title: "Delivered",
                desc: "Track the courier live until it reaches its final destination safely.",
              },
            ].map((step, i) => (
              <div
                key={i}
                className="bg-white rounded-2xl shadow-md p-5 sm:p-6 flex flex-col items-center text-center relative mt-6 border border-gray-100"
              >
                <div className="absolute -top-5 w-10 h-10 rounded-full bg-[#fce8e8] border-2 border-[#b03131] flex items-center justify-center">
                  <span className="text-sm font-bold text-[#b03131]">{step.num}</span>
                </div>
                <div className="mb-4 mt-2">{step.icon}</div>
                <h3 className="text-sm font-bold text-[#1a1a1a] mb-2">{step.title}</h3>
                <p className="text-xs text-gray-500 leading-relaxed">{step.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── BUILT FOR YOU ── */}
      <section className="bg-gray-50 py-12 sm:py-16 md:py-20 px-4 sm:px-6 md:px-16">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-8 sm:mb-12 md:mb-14">
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-[#1a1a1a]">Built For Everyone</h2>
            <div className="w-16 h-1 bg-[#b03131] mx-auto mt-3 rounded-full" />
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
            {[
              {
                icon: <User className="h-6 w-6 text-[#b03131]" />,
                title: "Individuals",
                tag: "Gifts & Returns",
                desc: "Sending a gift to family or returning an online order? We make one-off deliveries hassle-free.",
              },
              {
                icon: <ShoppingBag className="h-6 w-6 text-[#b03131]" />,
                title: "E-Commerce",
                tag: "Sellers",
                desc: "Small businesses can use our bulk shipment features to send multiple orders with ease.",
              },
              {
                icon: <Briefcase className="h-6 w-6 text-[#b03131]" />,
                title: "Corporate",
                tag: "Offices",
                desc: "Need to send important documents safely between offices? Trust our premium delivery network.",
              },
            ].map((a, i) => (
              <div
                key={i}
                className="bg-white border border-gray-200 rounded-2xl p-6 flex flex-col items-start hover:shadow-md transition-shadow"
              >
                <div className="w-12 h-12 rounded-full bg-[#fce8e8] flex items-center justify-center mb-4">
                  {a.icon}
                </div>
                <div className="flex items-center gap-2 mb-2">
                  <h3 className="text-base font-bold text-[#1a1a1a]">{a.title}</h3>
                  <span className="text-[10px] font-semibold uppercase tracking-wider text-[#b03131] bg-[#fce8e8] px-2 py-0.5 rounded-full border border-[#f5c6c6]">
                    {a.tag}
                  </span>
                </div>
                <p className="text-sm text-gray-500 leading-relaxed">{a.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── FEATURES PREVIEW ── */}
      <section className="bg-white py-12 sm:py-16 md:py-20 px-4 sm:px-6 md:px-16">
        <div className="max-w-6xl mx-auto text-center">
          <span className="inline-block bg-[#fce8e8] text-[#b03131] text-xs font-semibold uppercase tracking-widest px-4 py-1.5 rounded-full mb-3 border border-[#f5c6c6]">
            Features
          </span>
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-[#1a1a1a] mb-12">
            Why Choose Us?
          </h2>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
            {[
              {
                icon: <Truck className="h-8 w-8 text-[#b03131]" />,
                title: "Nationwide Coverage",
                desc: "We deliver to both major cities and remote areas across Nepal.",
                color: "bg-[#b03131]"
              },
              {
                icon: <Clock className="h-8 w-8 text-[#333333]" />,
                title: "24/7 Tracking",
                desc: "Always know where your package is with our live tracking system.",
                color: "bg-[#333333]"
              },
              {
                icon: <ShieldCheck className="h-8 w-8 text-gray-500" />,
                title: "Secure Handling",
                desc: "Your parcels are insured and handled with the utmost care.",
                color: "bg-gray-400"
              },
            ].map((feature, i) => (
              <div key={i} className="bg-gray-50 rounded-2xl overflow-hidden border border-gray-200 hover:-translate-y-1 transition-transform">
                <div className={`${feature.color} h-1 w-full`} />
                <div className="p-6">
                  <div className="w-14 h-14 rounded-full bg-white shadow-sm flex items-center justify-center mx-auto mb-4 border border-gray-100">
                    {feature.icon}
                  </div>
                  <h3 className="text-base font-bold text-[#1a1a1a] mb-2">{feature.title}</h3>
                  <p className="text-sm text-gray-500">{feature.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── FAQ ── */}
      <section className="bg-[#e5e7eb] py-12 sm:py-16 md:py-20 px-4 sm:px-6 md:px-16">
        <div className="max-w-6xl mx-auto flex flex-col md:flex-row gap-8 md:gap-16">
          <div className="md:w-1/3">
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-[#1a1a1a] mb-4">
              Frequently<br />Asked<br />Questions
            </h2>
            <p className="text-sm text-gray-600 mb-2">Need more answers?</p>
            <a href="mailto:support@courier.com" className="text-sm font-semibold text-[#b03131] hover:underline">
              Contact our support team
            </a>
          </div>

          <div className="flex-1">
            {faqs.map((faq, i) => (
              <div key={i} className="border border-gray-200 bg-white rounded-xl mb-3 px-5 shadow-sm">
                <div
                  onClick={() => setOpenFaq(openFaq === i ? null : i)}
                  className="flex justify-between items-center py-4 cursor-pointer"
                >
                  <span className="text-base font-medium text-[#1a1a1a] pr-4">{faq.q}</span>
                  <ChevronDown className={`h-5 w-5 text-gray-500 transition-transform ${openFaq === i ? "rotate-180" : ""}`} />
                </div>
                {openFaq === i && (
                  <div className="pb-4">
                    <p className="text-sm text-gray-600 leading-relaxed">{faq.a}</p>
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── CTA BANNER ── */}
      <section className="bg-white px-4 sm:px-6 md:px-16 py-8 sm:py-10">
        <div className="max-w-6xl mx-auto rounded-3xl bg-[#333333] border-t-4 border-[#b03131] text-center py-12 px-6 shadow-xl">
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-white mb-4">
            Ready to send your first parcel?
          </h2>
          <p className="text-sm sm:text-base text-gray-300 mb-8 max-w-lg mx-auto">
            Join thousands of satisfied users who trust our transparent, fast, and secure delivery network.
          </p>
          <div className="flex flex-col sm:flex-row justify-center gap-4">
            <Link to="/register" className="bg-[#b03131] text-white px-8 py-3 rounded-full font-bold hover:bg-[#8a2626] transition-colors shadow-lg">
              Create Free Account
            </Link>
          </div>
        </div>
      </section>
      
    </div>
  );
}

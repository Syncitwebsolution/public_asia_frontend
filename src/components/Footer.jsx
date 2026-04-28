import React from 'react'
import { Facebook, Twitter, Youtube, Instagram } from "lucide-react";
import { Link } from 'react-router-dom';
import logoImg from '../assets/IMG_3084.JPG.jpeg';

const Footer = () => {
  return (
    <footer className="bg-gray-950 text-gray-300 mt-12 border-t border-gray-800">
      
      {/* Top Section */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-10 lg:py-16 grid grid-cols-2 md:grid-cols-4 gap-10 w-full">
        
        {/* Brand */}
        <div className="col-span-2 md:col-span-1">
          <img src={logoImg} alt="Public Asia" className="h-14 w-auto mb-6 grayscale brightness-200" />
          <h2 className="text-2xl font-black text-white mb-4 tracking-tighter">
            PUBLIC<span className="text-red-600">ASIA</span>
          </h2>
          <p className="text-sm leading-relaxed text-gray-400 font-medium">
            भारत और दुनिया की ताज़ा खबरें, वीडियो, और विश्लेषण —
            सबसे पहले, सबसे भरोसेमंद। निष्पक्ष पत्रकारिता का नया ठिकाना।
          </p>
        </div>

        {/* News Links */}
        <div className="col-span-1">
          <h3 className="text-xs font-black text-white uppercase tracking-widest mb-6 border-l-2 border-red-600 pl-3">
            न्यूज़
          </h3>
          <ul className="space-y-3 text-sm font-medium">
            <li><Link to="/category/देश" className="hover:text-red-500 transition-colors">देश</Link></li>
            <li><Link to="/category/विदेश" className="hover:text-red-500 transition-colors">विदेश</Link></li>
            <li><Link to="/category/राजनीति" className="hover:text-red-500 transition-colors">राजनीति</Link></li>
            <li><Link to="/category/खेल" className="hover:text-red-500 transition-colors">खेल</Link></li>
            <li><Link to="/category/मनोरंजन" className="hover:text-red-500 transition-colors">मनोरंजन</Link></li>
          </ul>
        </div>

        {/* Useful Links */}
        <div className="col-span-1">
          <h3 className="text-xs font-black text-white uppercase tracking-widest mb-6 border-l-2 border-red-600 pl-3">
            लिंक
          </h3>
          <ul className="space-y-3 text-sm font-medium">
            <li><Link to="/about" className="hover:text-red-500 transition-colors">हमारे बारे में</Link></li>
            <li><Link to="/contact" className="hover:text-red-500 transition-colors">संपर्क करें</Link></li>
            <li><Link to="/privacy" className="hover:text-red-500 transition-colors">गोपनीयता नीति</Link></li>
            <li><Link to="/terms" className="hover:text-red-500 transition-colors">नियम और शर्तें</Link></li>
          </ul>
        </div>

        {/* Social */}
        <div className="col-span-2 md:col-span-1">
          <h3 className="text-xs font-black text-white uppercase tracking-widest mb-6 border-l-2 border-red-600 pl-3">
            Social Media
          </h3>
          <div className="flex gap-4">
            {[ 
              { Icon: Facebook, name: "Facebook", href: "https://facebook.com" },
              { Icon: Twitter, name: "Twitter", href: "https://twitter.com" },
              { Icon: Youtube, name: "Youtube", href: "https://youtube.com" },
              { Icon: Instagram, name: "Instagram", href: "https://instagram.com" }
            ].map(({ Icon, name, href }, idx) => (
              <a key={idx} href={href} target="_blank" rel="noopener noreferrer" className="w-10 h-10 rounded-full bg-gray-900 flex items-center justify-center hover:bg-red-600 hover:text-white transition-all duration-300 shadow-lg">
                <Icon size={18} />
              </a>
            ))}
          </div>
          <p className="text-[10px] text-gray-500 mt-6 font-bold uppercase tracking-widest">Connect with us 24/7</p>
        </div>

      </div>

      {/* Bottom Bar */}
      <div className="border-t border-gray-900 bg-black/40">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 py-6 flex flex-col sm:flex-row justify-between items-center gap-4 text-xs font-bold text-gray-500 uppercase tracking-wider">
          <p>© {new Date().getFullYear()} Public Asia. All rights reserved.</p>
          <div className="flex gap-6">
            <Link to="/about" className="hover:text-white transition-colors">About</Link>
            <Link to="/privacy" className="hover:text-white transition-colors">Privacy</Link>
            <Link to="/terms" className="hover:text-white transition-colors">Terms</Link>
          </div>
        </div>
      </div>

    </footer>
  )
}

export default Footer

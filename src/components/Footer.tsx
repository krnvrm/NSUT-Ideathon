import React from 'react';
import { Building2, Mail, Phone, MapPin } from 'lucide-react';

const Footer: React.FC = () => {
  return (
    <footer className="bg-gray-900 text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div className="col-span-1 md:col-span-2">
            <div className="flex items-center space-x-2 mb-4">
              <Building2 className="h-8 w-8 text-blue-400" />
              <span className="font-bold text-xl">Delhi MSME Ascend</span>
            </div>
            <p className="text-gray-300 mb-4">
              Empowering Delhi's MSMEs with access to finance, markets, and technology. 
              Your gateway to sustainable business growth and success.
            </p>
            <div className="flex space-x-4">
              <div className="flex items-center space-x-2">
                <Mail className="h-4 w-4 text-green-400" />
                <span className="text-sm">info@delhimsmeascend.gov.in</span>
              </div>
            </div>
          </div>

          <div>
            <h3 className="font-semibold text-lg mb-4">Quick Links</h3>
            <ul className="space-y-2">
              <li><a href="/finance" className="text-gray-300 hover:text-white transition-colors">Finance Hub</a></li>
              <li><a href="/market-linkage" className="text-gray-300 hover:text-white transition-colors">Market Linkage</a></li>
              <li><a href="/technology" className="text-gray-300 hover:text-white transition-colors">Technology Hub</a></li>
              <li><a href="/about" className="text-gray-300 hover:text-white transition-colors">About Us</a></li>
            </ul>
          </div>

          <div>
            <h3 className="font-semibold text-lg mb-4">Contact Info</h3>
            <div className="space-y-2">
              <div className="flex items-center space-x-2">
                <Phone className="h-4 w-4 text-green-400" />
                <span className="text-sm">+91-11-2345-6789</span>
              </div>
              <div className="flex items-center space-x-2">
                <MapPin className="h-4 w-4 text-green-400" />
                <span className="text-sm">Delhi Secretariat, New Delhi</span>
              </div>
            </div>
          </div>
        </div>

        <div className="border-t border-gray-800 mt-8 pt-8 text-center">
          <p className="text-gray-300">
            © 2025 Delhi MSME Ascend. All rights reserved. | Government of NCT of Delhi
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
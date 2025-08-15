import React from 'react';
import { Facebook, Twitter, Instagram, Linkedin } from 'lucide-react';

const Footer = () => {
  return (
    <footer className="bg-white border-t py-12 mt-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Logo and Description */}
          <div className="col-span-1 md:col-span-1">
            <div className="flex items-center space-x-2 mb-4">
              <div className="bg-blue-600 rounded-lg p-2">
                <div className="w-6 h-6 bg-white rounded opacity-90"></div>
              </div>
              <span className="text-xl font-semibold text-gray-900">CampusZone</span>
            </div>
            <p className="text-gray-600 text-sm">
              Your one-stop platform for campus life, resources, and community.
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="font-semibold text-gray-900 mb-4">Quick Links</h3>
            <ul className="space-y-2">
              <li><a href="#" className="text-gray-600 hover:text-blue-600 text-sm transition-colors">About Us</a></li>
              <li><a href="#" className="text-gray-600 hover:text-blue-600 text-sm transition-colors">Contact</a></li>
              <li><a href="#" className="text-gray-600 hover:text-blue-600 text-sm transition-colors">Privacy Policy</a></li>
              <li><a href="#" className="text-gray-600 hover:text-blue-600 text-sm transition-colors">Terms of Use</a></li>
            </ul>
          </div>

          {/* Resources */}
          <div>
            <h3 className="font-semibold text-gray-900 mb-4">Resources</h3>
            <ul className="space-y-2">
              <li><a href="#" className="text-gray-600 hover:text-blue-600 text-sm transition-colors">Help Center</a></li>
              <li><a href="#" className="text-gray-600 hover:text-blue-600 text-sm transition-colors">Student Guide</a></li>
              <li><a href="#" className="text-gray-600 hover:text-blue-600 text-sm transition-colors">FAQs</a></li>
              <li><a href="#" className="text-gray-600 hover:text-blue-600 text-sm transition-colors">Support</a></li>
            </ul>
          </div>

          {/* Connect */}
          <div>
            <h3 className="font-semibold text-gray-900 mb-4">Connect</h3>
            <div className="flex space-x-3">
              <Facebook className="w-5 h-5 text-gray-400 hover:text-blue-600 cursor-pointer transition-colors" />
              <Twitter className="w-5 h-5 text-gray-400 hover:text-blue-400 cursor-pointer transition-colors" />
              <Instagram className="w-5 h-5 text-gray-400 hover:text-pink-600 cursor-pointer transition-colors" />
              <Linkedin className="w-5 h-5 text-gray-400 hover:text-blue-700 cursor-pointer transition-colors" />
            </div>
          </div>
        </div>

        <div className="border-t mt-8 pt-8 text-center">
          <p className="text-sm text-gray-600">© 2024 Campus Zone. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;

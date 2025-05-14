import React from 'react';
import { Link } from 'react-router-dom';
import { PawPrint, Instagram, Facebook, Twitter, Mail, Phone, MapPin } from 'lucide-react';

const Footer: React.FC = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-gray-900 text-white pt-12 pb-6">
      <div className="container-custom">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-8">
          {/* Logo and About */}
          <div>
            <Link to="/" className="flex items-center mb-4">
              <PawPrint className="h-7 w-7 text-primary-400" />
              <span className="ml-2 text-xl font-bold text-white">PawMates</span>
            </Link>
            <p className="text-gray-400 mb-4">
              Connecting loving homes with pets in need. Our mission is to find the perfect match for every pet and human.
            </p>
            <div className="flex space-x-4">
              <a href="#" className="text-gray-400 hover:text-primary-400 transition-colors">
                <Instagram className="h-5 w-5" />
              </a>
              <a href="#" className="text-gray-400 hover:text-primary-400 transition-colors">
                <Facebook className="h-5 w-5" />
              </a>
              <a href="#" className="text-gray-400 hover:text-primary-400 transition-colors">
                <Twitter className="h-5 w-5" />
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-lg font-semibold mb-4 text-white">Quick Links</h3>
            <ul className="space-y-2">
              <li>
                <Link to="/pets" className="text-gray-400 hover:text-primary-400 transition-colors">
                  Find a Pet
                </Link>
              </li>
              <li>
                <Link to="/adopt" className="text-gray-400 hover:text-primary-400 transition-colors">
                  Adoption Process
                </Link>
              </li>
              <li>
                <Link to="/volunteer" className="text-gray-400 hover:text-primary-400 transition-colors">
                  Volunteer
                </Link>
              </li>
              <li>
                <Link to="/donate" className="text-gray-400 hover:text-primary-400 transition-colors">
                  Donate
                </Link>
              </li>
              <li>
                <Link to="/events" className="text-gray-400 hover:text-primary-400 transition-colors">
                  Events
                </Link>
              </li>
            </ul>
          </div>

          {/* Resources */}
          <div>
            <h3 className="text-lg font-semibold mb-4 text-white">Resources</h3>
            <ul className="space-y-2">
              <li>
                <Link to="/care-guides" className="text-gray-400 hover:text-primary-400 transition-colors">
                  Pet Care Guides
                </Link>
              </li>
              <li>
                <Link to="/blog" className="text-gray-400 hover:text-primary-400 transition-colors">
                  Blog
                </Link>
              </li>
              <li>
                <Link to="/faqs" className="text-gray-400 hover:text-primary-400 transition-colors">
                  FAQs
                </Link>
              </li>
              <li>
                <Link to="/success-stories" className="text-gray-400 hover:text-primary-400 transition-colors">
                  Success Stories
                </Link>
              </li>
              <li>
                <Link to="/resources" className="text-gray-400 hover:text-primary-400 transition-colors">
                  Pet Resources
                </Link>
              </li>
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h3 className="text-lg font-semibold mb-4 text-white">Contact Us</h3>
            <ul className="space-y-2">
              <li className="flex items-start">
                <MapPin className="h-5 w-5 text-primary-400 mt-0.5 mr-2 flex-shrink-0" />
                <span className="text-gray-400">
                  123 Pet Haven Lane<br />San Francisco, CA 94110
                </span>
              </li>
              <li className="flex items-center">
                <Phone className="h-5 w-5 text-primary-400 mr-2 flex-shrink-0" />
                <a href="tel:+14155551234" className="text-gray-400 hover:text-primary-400 transition-colors">
                  (415) 555-1234
                </a>
              </li>
              <li className="flex items-center">
                <Mail className="h-5 w-5 text-primary-400 mr-2 flex-shrink-0" />
                <a href="mailto:info@pawmates.com" className="text-gray-400 hover:text-primary-400 transition-colors">
                  info@pawmates.com
                </a>
              </li>
            </ul>
          </div>
        </div>

        <div className="pt-6 border-t border-gray-800 text-center text-gray-500 text-sm">
          <p>© {currentYear} PawMates. All rights reserved.</p>
          <div className="mt-2 space-x-4">
            <Link to="/privacy" className="hover:text-primary-400 transition-colors">
              Privacy Policy
            </Link>
            <Link to="/terms" className="hover:text-primary-400 transition-colors">
              Terms of Service
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
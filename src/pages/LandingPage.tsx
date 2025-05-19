import React from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { Stethoscope, ShieldCheck, ClipboardCheck, ActivitySquare, Users } from 'lucide-react';
import Button from '../components/ui/Button';

const LandingPage: React.FC = () => {
  return (
    <div className="min-h-screen flex flex-col">
      {/* Header */}
      <header className="bg-white shadow-sm sticky top-0 z-10">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center py-4">
            <div className="flex items-center">
              <Stethoscope className="h-8 w-8 text-primary-600" />
              <span className="ml-2 text-xl font-bold text-primary-600">Unified Surgery System</span>
            </div>
            <div className="flex space-x-4">
              <Link to="/login">
                <Button variant="outline">Log in</Button>
              </Link>
              <Link to="/login">
                <Button>Get Started</Button>
              </Link>
            </div>
          </div>
        </div>
      </header>

      {/* Hero section */}
      <section className="bg-gradient-to-r from-primary-600 to-primary-700 text-white py-16 sm:py-24">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
            >
              <h1 className="text-4xl sm:text-5xl font-bold leading-tight mb-6">
                Streamline Your Surgical Planning Process
              </h1>
              <p className="text-lg sm:text-xl mb-8 text-blue-100">
                A comprehensive platform for managing surgical procedures, materials, and quotes in one place.
              </p>
              <div className="flex flex-wrap gap-4">
                <Link to="/login">
                  <Button 
                    className="bg-white text-primary-600 hover:bg-blue-50 font-semibold text-base px-6 py-3"
                  >
                    Get Started
                  </Button>
                </Link>
                <Button 
                  variant="outline"
                  className="border-white text-white hover:bg-primary-500 font-semibold text-base px-6 py-3"
                >
                  Learn More
                </Button>
              </div>
            </motion.div>
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="hidden md:block"
            >
              <div className="bg-white rounded-lg shadow-xl p-6 transform rotate-1">
                <div className="flex items-center mb-4">
                  <div className="w-3 h-3 bg-red-500 rounded-full mr-2"></div>
                  <div className="w-3 h-3 bg-yellow-500 rounded-full mr-2"></div>
                  <div className="w-3 h-3 bg-green-500 rounded-full"></div>
                </div>
                <div className="border rounded p-4 mb-4 bg-neutral-50">
                  <h3 className="font-medium text-neutral-800 mb-2">New Quote Request</h3>
                  <div className="space-y-2">
                    <div className="flex justify-between">
                      <span className="text-sm text-neutral-500">Patient ID:</span>
                      <span className="text-sm text-neutral-800">PT-28401</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-sm text-neutral-500">Procedure:</span>
                      <span className="text-sm text-neutral-800">Knee Arthroscopy</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-sm text-neutral-500">Surgeon:</span>
                      <span className="text-sm text-neutral-800">Dr. Johnson</span>
                    </div>
                  </div>
                </div>
                <div className="flex justify-end">
                  <div className="bg-primary-600 text-white text-sm px-3 py-1 rounded">Approve</div>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Features section */}
      <section className="py-16 sm:py-24 bg-white">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl sm:text-4xl font-bold text-neutral-800 mb-4">Comprehensive Surgery Management</h2>
            <p className="text-lg text-neutral-600 max-w-3xl mx-auto">
              Our platform provides everything you need to manage surgical procedures from planning to execution.
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            <motion.div 
              whileHover={{ y: -8 }}
              className="bg-white rounded-xl shadow-md p-6 border border-neutral-100"
            >
              <div className="bg-primary-50 w-12 h-12 rounded-full flex items-center justify-center mb-4">
                <Users className="h-6 w-6 text-primary-600" />
              </div>
              <h3 className="text-xl font-semibold text-neutral-800 mb-2">Medical Team Management</h3>
              <p className="text-neutral-600">
                Register and manage your entire medical team, including doctors and support staff.
              </p>
            </motion.div>
            
            <motion.div 
              whileHover={{ y: -8 }}
              className="bg-white rounded-xl shadow-md p-6 border border-neutral-100"
            >
              <div className="bg-secondary-50 w-12 h-12 rounded-full flex items-center justify-center mb-4">
                <ShieldCheck className="h-6 w-6 text-secondary-600" />
              </div>
              <h3 className="text-xl font-semibold text-neutral-800 mb-2">Materials Inventory</h3>
              <p className="text-neutral-600">
                Track surgical materials (OPME) with detailed information and availability.
              </p>
            </motion.div>
            
            <motion.div 
              whileHover={{ y: -8 }}
              className="bg-white rounded-xl shadow-md p-6 border border-neutral-100"
            >
              <div className="bg-accent-50 w-12 h-12 rounded-full flex items-center justify-center mb-4">
                <ClipboardCheck className="h-6 w-6 text-accent-600" />
              </div>
              <h3 className="text-xl font-semibold text-neutral-800 mb-2">Quote Management</h3>
              <p className="text-neutral-600">
                Create detailed quotes for procedures with cost breakdowns for patients.
              </p>
            </motion.div>
            
            <motion.div 
              whileHover={{ y: -8 }}
              className="bg-white rounded-xl shadow-md p-6 border border-neutral-100"
            >
              <div className="bg-primary-50 w-12 h-12 rounded-full flex items-center justify-center mb-4">
                <ActivitySquare className="h-6 w-6 text-primary-600" />
              </div>
              <h3 className="text-xl font-semibold text-neutral-800 mb-2">Procedure Library</h3>
              <p className="text-neutral-600">
                Maintain a comprehensive library of surgical procedures with detailed information.
              </p>
            </motion.div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="bg-neutral-50 py-16 sm:py-20">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="bg-gradient-to-r from-primary-600 to-primary-700 rounded-2xl shadow-xl overflow-hidden">
            <div className="px-6 py-12 sm:p-16 md:max-w-3xl">
              <h2 className="text-3xl sm:text-4xl font-bold text-white mb-6">
                Ready to transform your surgical practice?
              </h2>
              <p className="text-lg text-blue-100 mb-8">
                Join thousands of medical professionals who use our platform to streamline their surgical planning and management.
              </p>
              <Link to="/login">
                <Button 
                  className="bg-white text-primary-600 hover:bg-blue-50 font-semibold text-base px-6 py-3"
                >
                  Get Started Today
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-neutral-800 text-neutral-300 py-12">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <div>
              <div className="flex items-center mb-4">
                <Stethoscope className="h-6 w-6 text-primary-400" />
                <span className="ml-2 text-lg font-bold text-white">Unified Surgery System</span>
              </div>
              <p className="text-sm">
                Comprehensive surgical planning and management platform for healthcare professionals.
              </p>
            </div>
            
            <div>
              <h3 className="text-white font-semibold mb-4">Platform</h3>
              <ul className="space-y-2 text-sm">
                <li><a href="#" className="hover:text-white">Features</a></li>
                <li><a href="#" className="hover:text-white">Pricing</a></li>
                <li><a href="#" className="hover:text-white">Security</a></li>
                <li><a href="#" className="hover:text-white">Integrations</a></li>
              </ul>
            </div>
            
            <div>
              <h3 className="text-white font-semibold mb-4">Resources</h3>
              <ul className="space-y-2 text-sm">
                <li><a href="#" className="hover:text-white">Documentation</a></li>
                <li><a href="#" className="hover:text-white">Guides</a></li>
                <li><a href="#" className="hover:text-white">Support</a></li>
                <li><a href="#" className="hover:text-white">API</a></li>
              </ul>
            </div>
            
            <div>
              <h3 className="text-white font-semibold mb-4">Company</h3>
              <ul className="space-y-2 text-sm">
                <li><a href="#" className="hover:text-white">About</a></li>
                <li><a href="#" className="hover:text-white">Blog</a></li>
                <li><a href="#" className="hover:text-white">Careers</a></li>
                <li><a href="#" className="hover:text-white">Contact</a></li>
              </ul>
            </div>
          </div>
          
          <div className="mt-12 pt-8 border-t border-neutral-700 text-sm text-neutral-400">
            <div className="flex flex-col md:flex-row justify-between items-center">
              <p>&copy; 2025 Unified Surgery System. All rights reserved.</p>
              <div className="flex space-x-6 mt-4 md:mt-0">
                <a href="#" className="hover:text-white">Terms</a>
                <a href="#" className="hover:text-white">Privacy</a>
                <a href="#" className="hover:text-white">Cookies</a>
              </div>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default LandingPage;
import React from 'react';
import { motion } from 'framer-motion';
import { FileText, Clock, CheckCircle, AlertCircle, ArrowRight } from 'lucide-react';
import PatientLayout from '../../components/layouts/PatientLayout';
import Card from '../../components/ui/Card';
import Button from '../../components/ui/Button';
import { useAuth } from '../../hooks/useAuth';

const PatientDashboard: React.FC = () => {
  const { user } = useAuth();

  const quotes = [
    { 
      id: 'Q1001', 
      procedure: 'Hip Replacement', 
      doctor: 'Dr. John Williams',
      requestDate: '2025-03-20', 
      status: 'approved',
      estimatedCost: '$12,500',
    },
    { 
      id: 'Q1002', 
      procedure: 'Physical Therapy Sessions (10)', 
      doctor: 'Dr. Sarah Johnson',
      requestDate: '2025-03-15', 
      status: 'pending',
      estimatedCost: 'Awaiting response',
    }
  ];

  return (
    <PatientLayout title="Patient Dashboard">
      <div className="space-y-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4 }}
        >
          <div className="flex flex-col md:flex-row items-start md:items-center justify-between mb-6">
            <div>
              <h2 className="text-2xl font-bold text-neutral-800">Welcome, {user?.name}</h2>
              <p className="text-neutral-500">Here's an overview of your surgical quotes and procedures</p>
            </div>
            <Button icon={<FileText size={16} />} className="mt-4 md:mt-0">
              Request New Quote
            </Button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3, delay: 0.1 }}
            >
              <Card className="h-full">
                <div className="flex items-center">
                  <div className="bg-primary-100 p-3 rounded-full mr-4">
                    <FileText className="w-6 h-6 text-primary-600" />
                  </div>
                  <div>
                    <h3 className="text-neutral-500 text-sm">Total Quotes</h3>
                    <p className="text-2xl font-bold text-neutral-800">2</p>
                  </div>
                </div>
              </Card>
            </motion.div>
            
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3, delay: 0.2 }}
            >
              <Card className="h-full">
                <div className="flex items-center">
                  <div className="bg-yellow-100 p-3 rounded-full mr-4">
                    <Clock className="w-6 h-6 text-yellow-600" />
                  </div>
                  <div>
                    <h3 className="text-neutral-500 text-sm">Pending Quotes</h3>
                    <p className="text-2xl font-bold text-neutral-800">1</p>
                  </div>
                </div>
              </Card>
            </motion.div>
            
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3, delay: 0.3 }}
            >
              <Card className="h-full">
                <div className="flex items-center">
                  <div className="bg-green-100 p-3 rounded-full mr-4">
                    <CheckCircle className="w-6 h-6 text-green-600" />
                  </div>
                  <div>
                    <h3 className="text-neutral-500 text-sm">Approved Quotes</h3>
                    <p className="text-2xl font-bold text-neutral-800">1</p>
                  </div>
                </div>
              </Card>
            </motion.div>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4, delay: 0.2 }}
        >
          <Card
            title="Your Quote Requests"
            subtitle="Review your submitted quote requests"
          >
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="border-b border-neutral-200">
                    <th className="px-4 py-2 text-left text-xs font-medium text-neutral-500 uppercase tracking-wider">
                      Quote ID
                    </th>
                    <th className="px-4 py-2 text-left text-xs font-medium text-neutral-500 uppercase tracking-wider">
                      Procedure
                    </th>
                    <th className="px-4 py-2 text-left text-xs font-medium text-neutral-500 uppercase tracking-wider">
                      Doctor
                    </th>
                    <th className="px-4 py-2 text-left text-xs font-medium text-neutral-500 uppercase tracking-wider">
                      Request Date
                    </th>
                    <th className="px-4 py-2 text-left text-xs font-medium text-neutral-500 uppercase tracking-wider">
                      Status
                    </th>
                    <th className="px-4 py-2 text-left text-xs font-medium text-neutral-500 uppercase tracking-wider">
                      Est. Cost
                    </th>
                    <th className="px-4 py-2 text-left text-xs font-medium text-neutral-500 uppercase tracking-wider">
                      Actions
                    </th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-neutral-200">
                  {quotes.map((quote) => (
                    <tr key={quote.id} className="hover:bg-neutral-50">
                      <td className="px-4 py-3 text-sm text-neutral-800">
                        {quote.id}
                      </td>
                      <td className="px-4 py-3 text-sm text-neutral-800">
                        {quote.procedure}
                      </td>
                      <td className="px-4 py-3 text-sm text-neutral-800">
                        {quote.doctor}
                      </td>
                      <td className="px-4 py-3 text-sm text-neutral-500">
                        {quote.requestDate}
                      </td>
                      <td className="px-4 py-3 text-sm">
                        <span
                          className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium
                            ${
                              quote.status === 'pending'
                                ? 'bg-yellow-100 text-yellow-800'
                                : quote.status === 'approved'
                                ? 'bg-green-100 text-green-800'
                                : 'bg-red-100 text-red-800'
                            }
                          `}
                        >
                          {quote.status}
                        </span>
                      </td>
                      <td className="px-4 py-3 text-sm text-neutral-800">
                        {quote.estimatedCost}
                      </td>
                      <td className="px-4 py-3 text-sm">
                        <Button
                          variant="outline"
                          size="sm"
                          icon={<ArrowRight size={14} />}
                          iconPosition="right"
                        >
                          View
                        </Button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </Card>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4, delay: 0.3 }}
          >
            <Card title="Upcoming Procedure">
              <div className="bg-primary-50 p-4 rounded-lg">
                <h3 className="font-semibold text-primary-800 text-lg">Hip Replacement</h3>
                <div className="mt-2 space-y-2">
                  <div className="flex justify-between">
                    <span className="text-sm text-primary-600">Date:</span>
                    <span className="text-sm font-medium text-primary-900">May 15, 2025</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-sm text-primary-600">Time:</span>
                    <span className="text-sm font-medium text-primary-900">10:00 AM</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-sm text-primary-600">Location:</span>
                    <span className="text-sm font-medium text-primary-900">Memorial Hospital</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-sm text-primary-600">Surgeon:</span>
                    <span className="text-sm font-medium text-primary-900">Dr. John Williams</span>
                  </div>
                </div>
                <div className="mt-4">
                  <Button size="sm" className="w-full">View Details</Button>
                </div>
              </div>
            </Card>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4, delay: 0.4 }}
          >
            <Card title="Pre-Surgery Instructions">
              <div className="space-y-3">
                <div className="flex items-start">
                  <div className="flex-shrink-0 mt-0.5">
                    <div className="bg-primary-100 w-6 h-6 rounded-full flex items-center justify-center">
                      <span className="text-xs font-medium text-primary-800">1</span>
                    </div>
                  </div>
                  <div className="ml-3">
                    <p className="text-sm font-medium text-neutral-800">Fasting Requirements</p>
                    <p className="text-xs text-neutral-600">No food or drink after midnight before surgery</p>
                  </div>
                </div>
                
                <div className="flex items-start">
                  <div className="flex-shrink-0 mt-0.5">
                    <div className="bg-primary-100 w-6 h-6 rounded-full flex items-center justify-center">
                      <span className="text-xs font-medium text-primary-800">2</span>
                    </div>
                  </div>
                  <div className="ml-3">
                    <p className="text-sm font-medium text-neutral-800">Medication Management</p>
                    <p className="text-xs text-neutral-600">Follow doctor's instructions for all medications</p>
                  </div>
                </div>
                
                <div className="flex items-start">
                  <div className="flex-shrink-0 mt-0.5">
                    <div className="bg-primary-100 w-6 h-6 rounded-full flex items-center justify-center">
                      <span className="text-xs font-medium text-primary-800">3</span>
                    </div>
                  </div>
                  <div className="ml-3">
                    <p className="text-sm font-medium text-neutral-800">Arrival Time</p>
                    <p className="text-xs text-neutral-600">Arrive 2 hours before scheduled surgery time</p>
                  </div>
                </div>
                
                <div className="flex items-start">
                  <div className="flex-shrink-0 mt-0.5">
                    <div className="bg-primary-100 w-6 h-6 rounded-full flex items-center justify-center">
                      <span className="text-xs font-medium text-primary-800">4</span>
                    </div>
                  </div>
                  <div className="ml-3">
                    <p className="text-sm font-medium text-neutral-800">Arrangements</p>
                    <p className="text-xs text-neutral-600">Arrange for transportation home after surgery</p>
                  </div>
                </div>
              </div>
              <div className="mt-4">
                <Button variant="outline" size="sm" className="w-full">View Complete Instructions</Button>
              </div>
            </Card>
          </motion.div>
        </div>
      </div>
    </PatientLayout>
  );
};

export default PatientDashboard;
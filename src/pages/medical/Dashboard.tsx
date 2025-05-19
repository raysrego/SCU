import React from 'react';
import { motion } from 'framer-motion';
import { Calendar, Users, Package, Clipboard, TrendingUp, Clock } from 'lucide-react';
import MedicalLayout from '../../components/layouts/MedicalLayout';
import Card from '../../components/ui/Card';
import { useAuth } from '../../hooks/useAuth';

const MedicalDashboard: React.FC = () => {
  const { user } = useAuth();

  const recentQuotes = [
    { id: 'Q1001', patient: 'John Smith', procedure: 'Hip Replacement', date: '2025-04-12', status: 'pending' },
    { id: 'Q1002', patient: 'Maria Garcia', procedure: 'Knee Arthroscopy', date: '2025-04-10', status: 'estimated' },
    { id: 'Q1003', patient: 'Robert Lee', procedure: 'Cataract Surgery', date: '2025-04-08', status: 'approved' },
    { id: 'Q1004', patient: 'Sarah Johnson', procedure: 'Gallbladder Removal', date: '2025-04-07', status: 'rejected' },
  ];

  const stats = [
    { title: 'Pending Quotes', value: 12, icon: <Clock className="w-6 h-6 text-primary-500" />, change: '+2 this week' },
    { title: 'Medical Team', value: 8, icon: <Users className="w-6 h-6 text-secondary-500" />, change: 'Active members' },
    { title: 'Materials', value: 156, icon: <Package className="w-6 h-6 text-accent-600" />, change: '12 low stock' },
    { title: 'Procedures', value: 42, icon: <Clipboard className="w-6 h-6 text-success-500" />, change: 'Registered' },
  ];

  const chartContainer = React.useRef<HTMLDivElement>(null);

  return (
    <MedicalLayout title="Dashboard">
      <div className="space-y-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4 }}
        >
          <div className="flex items-center mb-6">
            <h2 className="text-2xl font-bold text-neutral-800">Welcome back, {user?.name}</h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {stats.map((stat, index) => (
              <motion.div
                key={stat.title}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3, delay: index * 0.1 }}
              >
                <Card className="h-full">
                  <div className="flex items-center">
                    <div className="mr-4">
                      {stat.icon}
                    </div>
                    <div>
                      <h3 className="text-neutral-500 text-sm">{stat.title}</h3>
                      <div className="flex items-baseline">
                        <p className="text-2xl font-bold text-neutral-800">{stat.value}</p>
                        <span className="ml-2 text-xs text-neutral-500">{stat.change}</span>
                      </div>
                    </div>
                  </div>
                </Card>
              </motion.div>
            ))}
          </div>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4, delay: 0.2 }}
            className="lg:col-span-2"
          >
            <Card
              title="Quote Requests"
              subtitle="Last 30 days"
              actions={
                <button className="text-sm text-primary-600 hover:text-primary-700">
                  View All
                </button>
              }
            >
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead>
                    <tr className="border-b border-neutral-200">
                      <th className="px-4 py-2 text-left text-xs font-medium text-neutral-500 uppercase tracking-wider">
                        Quote ID
                      </th>
                      <th className="px-4 py-2 text-left text-xs font-medium text-neutral-500 uppercase tracking-wider">
                        Patient
                      </th>
                      <th className="px-4 py-2 text-left text-xs font-medium text-neutral-500 uppercase tracking-wider">
                        Procedure
                      </th>
                      <th className="px-4 py-2 text-left text-xs font-medium text-neutral-500 uppercase tracking-wider">
                        Date
                      </th>
                      <th className="px-4 py-2 text-left text-xs font-medium text-neutral-500 uppercase tracking-wider">
                        Status
                      </th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-neutral-200">
                    {recentQuotes.map((quote) => (
                      <tr key={quote.id} className="hover:bg-neutral-50">
                        <td className="px-4 py-3 text-sm text-neutral-800">
                          {quote.id}
                        </td>
                        <td className="px-4 py-3 text-sm text-neutral-800">
                          {quote.patient}
                        </td>
                        <td className="px-4 py-3 text-sm text-neutral-800">
                          {quote.procedure}
                        </td>
                        <td className="px-4 py-3 text-sm text-neutral-500">
                          {quote.date}
                        </td>
                        <td className="px-4 py-3 text-sm">
                          <span
                            className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium
                              ${
                                quote.status === 'pending'
                                  ? 'bg-yellow-100 text-yellow-800'
                                  : quote.status === 'estimated'
                                  ? 'bg-blue-100 text-blue-800'
                                  : quote.status === 'approved'
                                  ? 'bg-green-100 text-green-800'
                                  : 'bg-red-100 text-red-800'
                              }
                            `}
                          >
                            {quote.status}
                          </span>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </Card>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4, delay: 0.3 }}
          >
            <Card
              title="Upcoming Procedures"
              actions={
                <button className="text-sm text-primary-600 hover:text-primary-700">
                  View Calendar
                </button>
              }
            >
              <div className="space-y-4">
                <div className="flex items-center p-3 bg-primary-50 rounded-md">
                  <Calendar className="h-10 w-10 text-primary-500 mr-3" />
                  <div>
                    <p className="font-medium text-primary-700">Knee Replacement</p>
                    <p className="text-sm text-primary-600">Today, 10:00 AM</p>
                  </div>
                </div>
                
                <div className="flex items-center p-3 bg-neutral-50 rounded-md">
                  <Calendar className="h-10 w-10 text-neutral-500 mr-3" />
                  <div>
                    <p className="font-medium text-neutral-700">Appendectomy</p>
                    <p className="text-sm text-neutral-500">Tomorrow, 2:30 PM</p>
                  </div>
                </div>
                
                <div className="flex items-center p-3 bg-neutral-50 rounded-md">
                  <Calendar className="h-10 w-10 text-neutral-500 mr-3" />
                  <div>
                    <p className="font-medium text-neutral-700">Cataract Surgery</p>
                    <p className="text-sm text-neutral-500">Apr 15, 9:15 AM</p>
                  </div>
                </div>
                
                <div className="flex items-center p-3 bg-neutral-50 rounded-md">
                  <Calendar className="h-10 w-10 text-neutral-500 mr-3" />
                  <div>
                    <p className="font-medium text-neutral-700">Tonsillectomy</p>
                    <p className="text-sm text-neutral-500">Apr 18, 11:00 AM</p>
                  </div>
                </div>
              </div>
            </Card>
          </motion.div>
        </div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4, delay: 0.4 }}
        >
          <Card title="Recent Activity">
            <div className="space-y-4">
              <div className="relative pl-6 pb-4 border-l-2 border-primary-200">
                <div className="absolute -left-[9px] top-0 w-4 h-4 rounded-full bg-primary-500"></div>
                <p className="text-sm text-neutral-800 font-medium">Quote response submitted</p>
                <p className="text-xs text-neutral-500">Maria Garcia's knee arthroscopy quote was responded to with an estimate.</p>
                <p className="text-xs text-neutral-400 mt-1">Today, 10:42 AM</p>
              </div>
              
              <div className="relative pl-6 pb-4 border-l-2 border-secondary-200">
                <div className="absolute -left-[9px] top-0 w-4 h-4 rounded-full bg-secondary-500"></div>
                <p className="text-sm text-neutral-800 font-medium">New material registered</p>
                <p className="text-xs text-neutral-500">Surgical staples from Johnson Medical were added to the inventory.</p>
                <p className="text-xs text-neutral-400 mt-1">Yesterday, 3:15 PM</p>
              </div>
              
              <div className="relative pl-6 pb-4 border-l-2 border-accent-200">
                <div className="absolute -left-[9px] top-0 w-4 h-4 rounded-full bg-accent-500"></div>
                <p className="text-sm text-neutral-800 font-medium">New quote request</p>
                <p className="text-xs text-neutral-500">Robert Lee submitted a new quote request for cataract surgery.</p>
                <p className="text-xs text-neutral-400 mt-1">Yesterday, 11:30 AM</p>
              </div>
              
              <div className="relative pl-6 border-l-2 border-neutral-200">
                <div className="absolute -left-[9px] top-0 w-4 h-4 rounded-full bg-neutral-400"></div>
                <p className="text-sm text-neutral-800 font-medium">New team member</p>
                <p className="text-xs text-neutral-500">Dr. Emily Chen was added as an anesthesiologist.</p>
                <p className="text-xs text-neutral-400 mt-1">Apr 10, 9:00 AM</p>
              </div>
            </div>
          </Card>
        </motion.div>
      </div>
    </MedicalLayout>
  );
};

export default MedicalDashboard;
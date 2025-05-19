import React from 'react';
import { motion } from 'framer-motion';
import { useForm } from 'react-hook-form';
import { Users, UserPlus, Trash2 } from 'lucide-react';
import MedicalLayout from '../../components/layouts/MedicalLayout';
import Card from '../../components/ui/Card';
import Input from '../../components/ui/Input';
import Button from '../../components/ui/Button';
import Select from '../../components/ui/Select';
import { toastStore } from '../../components/ui/Toaster';
import { MedicalTeamMember } from '../../models/types';

const RegisterMedicalTeam: React.FC = () => {
  const [teamMembers, setTeamMembers] = React.useState<MedicalTeamMember[]>([
    {
      id: '1',
      name: 'Dr. Jane Smith',
      role: 'doctor',
      specialization: 'Orthopedic Surgery',
      email: 'jane.smith@example.com',
      phone: '(555) 123-4567',
      license: 'MED12345',
      createdAt: new Date('2024-12-10')
    },
    {
      id: '2',
      name: 'Michael Johnson',
      role: 'secretary',
      specialization: 'Patient Coordination',
      email: 'michael.j@example.com',
      phone: '(555) 987-6543',
      createdAt: new Date('2025-01-15')
    },
    {
      id: '3',
      name: 'Dr. David Lee',
      role: 'anesthesiologist',
      specialization: 'General Anesthesia',
      email: 'david.lee@example.com',
      phone: '(555) 456-7890',
      license: 'ANES7890',
      createdAt: new Date('2025-02-23')
    }
  ]);

  const { register, handleSubmit, reset, formState: { errors } } = useForm<Omit<MedicalTeamMember, 'id' | 'createdAt'>>();

  const onSubmit = (data: Omit<MedicalTeamMember, 'id' | 'createdAt'>) => {
    const newMember: MedicalTeamMember = {
      ...data,
      id: Math.random().toString(36).substring(2, 9),
      createdAt: new Date()
    };
    
    setTeamMembers([...teamMembers, newMember]);
    toastStore.success({ title: 'Team member added successfully' });
    reset();
  };

  const handleDelete = (id: string) => {
    setTeamMembers(teamMembers.filter(member => member.id !== id));
    toastStore.info({ title: 'Team member removed' });
  };

  const roleOptions = [
    { value: 'doctor', label: 'Doctor' },
    { value: 'secretary', label: 'Secretary' },
    { value: 'anesthesiologist', label: 'Anesthesiologist' },
    { value: 'nurse', label: 'Nurse' }
  ];

  return (
    <MedicalLayout title="Medical Team Management">
      <div className="space-y-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4 }}
        >
          <Card
            title="Add New Team Member"
            subtitle="Register a new medical team member"
          >
            <form onSubmit={handleSubmit(onSubmit)}>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <Input
                  label="Full Name"
                  placeholder="Enter full name"
                  error={errors.name?.message}
                  {...register('name', { 
                    required: 'Name is required' 
                  })}
                />
                
                <Select
                  label="Role"
                  options={roleOptions}
                  error={errors.role?.message}
                  {...register('role', { 
                    required: 'Role is required' 
                  })}
                />
                
                <Input
                  label="Specialization"
                  placeholder="Enter specialization"
                  error={errors.specialization?.message}
                  {...register('specialization', { 
                    required: 'Specialization is required' 
                  })}
                />
                
                <Input
                  label="Email"
                  type="email"
                  placeholder="Enter email address"
                  error={errors.email?.message}
                  {...register('email', { 
                    required: 'Email is required',
                    pattern: {
                      value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                      message: 'Invalid email address'
                    }
                  })}
                />
                
                <Input
                  label="Phone Number"
                  placeholder="Enter phone number"
                  error={errors.phone?.message}
                  {...register('phone', { 
                    required: 'Phone number is required' 
                  })}
                />
                
                <Input
                  label="License Number (if applicable)"
                  placeholder="Enter license number"
                  error={errors.license?.message}
                  {...register('license')}
                />
              </div>
              
              <div className="mt-6 flex justify-end">
                <Button
                  type="submit"
                  icon={<UserPlus size={18} />}
                >
                  Add Team Member
                </Button>
              </div>
            </form>
          </Card>
        </motion.div>
        
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4, delay: 0.2 }}
        >
          <Card
            title="Medical Team Members"
            subtitle={`Total: ${teamMembers.length} members`}
            actions={
              <div className="flex items-center">
                <Users size={18} className="text-neutral-500 mr-2" />
                <span className="text-sm text-neutral-600">Active Team</span>
              </div>
            }
          >
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="border-b border-neutral-200">
                    <th className="px-4 py-2 text-left text-xs font-medium text-neutral-500 uppercase tracking-wider">
                      Name
                    </th>
                    <th className="px-4 py-2 text-left text-xs font-medium text-neutral-500 uppercase tracking-wider">
                      Role
                    </th>
                    <th className="px-4 py-2 text-left text-xs font-medium text-neutral-500 uppercase tracking-wider">
                      Specialization
                    </th>
                    <th className="px-4 py-2 text-left text-xs font-medium text-neutral-500 uppercase tracking-wider">
                      Contact
                    </th>
                    <th className="px-4 py-2 text-left text-xs font-medium text-neutral-500 uppercase tracking-wider">
                      License
                    </th>
                    <th className="px-4 py-2 text-left text-xs font-medium text-neutral-500 uppercase tracking-wider">
                      Actions
                    </th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-neutral-200">
                  {teamMembers.map((member) => (
                    <tr key={member.id} className="hover:bg-neutral-50">
                      <td className="px-4 py-3 text-sm text-neutral-800 font-medium">
                        {member.name}
                      </td>
                      <td className="px-4 py-3 text-sm text-neutral-800">
                        <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium
                          ${
                            member.role === 'doctor'
                              ? 'bg-primary-100 text-primary-800'
                              : member.role === 'anesthesiologist'
                              ? 'bg-secondary-100 text-secondary-800'
                              : member.role === 'nurse'
                              ? 'bg-green-100 text-green-800'
                              : 'bg-neutral-100 text-neutral-800'
                          }
                        `}>
                          {member.role.charAt(0).toUpperCase() + member.role.slice(1)}
                        </span>
                      </td>
                      <td className="px-4 py-3 text-sm text-neutral-800">
                        {member.specialization}
                      </td>
                      <td className="px-4 py-3 text-sm text-neutral-500">
                        <div>{member.email}</div>
                        <div>{member.phone}</div>
                      </td>
                      <td className="px-4 py-3 text-sm text-neutral-500">
                        {member.license || '-'}
                      </td>
                      <td className="px-4 py-3 text-sm">
                        <Button
                          variant="ghost"
                          size="sm"
                          className="text-error-500 hover:text-error-700 hover:bg-error-50"
                          onClick={() => handleDelete(member.id)}
                          icon={<Trash2 size={16} />}
                        >
                          Remove
                        </Button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </Card>
        </motion.div>
      </div>
    </MedicalLayout>
  );
};

export default RegisterMedicalTeam;
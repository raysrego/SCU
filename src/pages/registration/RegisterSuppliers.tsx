import React from 'react';
import { motion } from 'framer-motion';
import { useForm } from 'react-hook-form';
import { Truck, Plus, Trash2, Package } from 'lucide-react';
import MedicalLayout from '../../components/layouts/MedicalLayout';
import Card from '../../components/ui/Card';
import Input from '../../components/ui/Input';
import Button from '../../components/ui/Button';
import { toastStore } from '../../components/ui/Toaster';
import { Supplier } from '../../models/types';

const RegisterSuppliers: React.FC = () => {
  const [suppliers, setSuppliers] = React.useState<Supplier[]>([
    {
      id: '1',
      name: 'Johnson Medical Supplies',
      contactName: 'Robert Johnson',
      email: 'robert.j@johnsonmedical.com',
      phone: '(555) 123-4567',
      address: '123 Medical Drive, Suite 100, Boston, MA 02108',
      materials: ['1', '3', '5'],
      preferredPaymentTerms: 'Net 30',
      createdAt: new Date('2025-01-15')
    },
    {
      id: '2',
      name: 'MedTech Instruments',
      contactName: 'Sarah Williams',
      email: 'sarah.w@medtech.com',
      phone: '(555) 987-6543',
      address: '456 Innovation Way, Chicago, IL 60601',
      materials: ['2', '4', '6'],
      preferredPaymentTerms: 'Net 45',
      createdAt: new Date('2025-02-01')
    },
    {
      id: '3',
      name: 'Surgical Innovations Inc.',
      contactName: 'Michael Chen',
      email: 'm.chen@surgicalinnovations.com',
      phone: '(555) 456-7890',
      address: '789 Healthcare Blvd, San Francisco, CA 94105',
      materials: ['7', '8', '9'],
      preferredPaymentTerms: 'Net 60',
      createdAt: new Date('2025-02-15')
    }
  ]);

  const { register, handleSubmit, reset, formState: { errors } } = useForm<Omit<Supplier, 'id' | 'createdAt'>>();

  const onSubmit = (data: Omit<Supplier, 'id' | 'createdAt'>) => {
    const newSupplier: Supplier = {
      ...data,
      id: Math.random().toString(36).substring(2, 9),
      materials: Array.isArray(data.materials) ? data.materials : [data.materials],
      createdAt: new Date()
    };
    
    setSuppliers([...suppliers, newSupplier]);
    toastStore.success({ title: 'Supplier added successfully' });
    reset();
  };

  const handleDelete = (id: string) => {
    setSuppliers(suppliers.filter(supplier => supplier.id !== id));
    toastStore.info({ title: 'Supplier removed' });
  };

  return (
    <MedicalLayout title="Supplier Management">
      <div className="space-y-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4 }}
        >
          <Card
            title="Add New Supplier"
            subtitle="Register a new medical supplies provider"
          >
            <form onSubmit={handleSubmit(onSubmit)}>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <Input
                  label="Company Name"
                  placeholder="Enter company name"
                  error={errors.name?.message}
                  {...register('name', { 
                    required: 'Company name is required' 
                  })}
                />
                
                <Input
                  label="Contact Person"
                  placeholder="Enter contact person's name"
                  error={errors.contactName?.message}
                  {...register('contactName', { 
                    required: 'Contact person is required' 
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
                
                <div className="md:col-span-2">
                  <Input
                    label="Address"
                    placeholder="Enter complete address"
                    error={errors.address?.message}
                    {...register('address', { 
                      required: 'Address is required' 
                    })}
                  />
                </div>
                
                <Input
                  label="Preferred Payment Terms"
                  placeholder="e.g., Net 30, Net 45"
                  error={errors.preferredPaymentTerms?.message}
                  {...register('preferredPaymentTerms', { 
                    required: 'Payment terms are required' 
                  })}
                />
                
                <Input
                  label="Materials Supplied"
                  placeholder="Enter material IDs (comma-separated)"
                  error={errors.materials?.message as string}
                  {...register('materials', { 
                    required: 'At least one material must be specified',
                    setValueAs: (value: string) => value.split(',').map(id => id.trim())
                  })}
                />
              </div>
              
              <div className="mt-6 flex justify-end">
                <Button
                  type="submit"
                  icon={<Plus size={18} />}
                >
                  Add Supplier
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
            title="Registered Suppliers"
            subtitle={`Total: ${suppliers.length} suppliers`}
            actions={
              <div className="flex items-center">
                <Truck size={18} className="text-neutral-500 mr-2" />
                <span className="text-sm text-neutral-600">Suppliers List</span>
              </div>
            }
          >
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="border-b border-neutral-200">
                    <th className="px-4 py-2 text-left text-xs font-medium text-neutral-500 uppercase tracking-wider">
                      Company
                    </th>
                    <th className="px-4 py-2 text-left text-xs font-medium text-neutral-500 uppercase tracking-wider">
                      Contact
                    </th>
                    <th className="px-4 py-2 text-left text-xs font-medium text-neutral-500 uppercase tracking-wider">
                      Address
                    </th>
                    <th className="px-4 py-2 text-left text-xs font-medium text-neutral-500 uppercase tracking-wider">
                      Payment Terms
                    </th>
                    <th className="px-4 py-2 text-left text-xs font-medium text-neutral-500 uppercase tracking-wider">
                      Materials
                    </th>
                    <th className="px-4 py-2 text-left text-xs font-medium text-neutral-500 uppercase tracking-wider">
                      Actions
                    </th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-neutral-200">
                  {suppliers.map((supplier) => (
                    <tr key={supplier.id} className="hover:bg-neutral-50">
                      <td className="px-4 py-3">
                        <div className="text-sm font-medium text-neutral-800">{supplier.name}</div>
                        <div className="text-xs text-neutral-500">ID: {supplier.id}</div>
                      </td>
                      <td className="px-4 py-3">
                        <div className="text-sm text-neutral-800">{supplier.contactName}</div>
                        <div className="text-xs text-neutral-500">{supplier.email}</div>
                        <div className="text-xs text-neutral-500">{supplier.phone}</div>
                      </td>
                      <td className="px-4 py-3 text-sm text-neutral-600">
                        {supplier.address}
                      </td>
                      <td className="px-4 py-3 text-sm">
                        <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-primary-100 text-primary-800">
                          {supplier.preferredPaymentTerms}
                        </span>
                      </td>
                      <td className="px-4 py-3">
                        <div className="flex flex-wrap gap-1">
                          {supplier.materials.map((materialId) => (
                            <span
                              key={materialId}
                              className="inline-flex items-center px-2 py-0.5 rounded text-xs font-medium bg-neutral-100 text-neutral-800"
                            >
                              <Package size={12} className="mr-1" />
                              {materialId}
                            </span>
                          ))}
                        </div>
                      </td>
                      <td className="px-4 py-3 text-sm">
                        <Button
                          variant="ghost"
                          size="sm"
                          className="text-error-500 hover:text-error-700 hover:bg-error-50"
                          onClick={() => handleDelete(supplier.id)}
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

export default RegisterSuppliers;
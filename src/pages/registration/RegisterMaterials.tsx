import React from 'react';
import { motion } from 'framer-motion';
import { useForm } from 'react-hook-form';
import { Package, Plus, Trash2, Edit } from 'lucide-react';
import MedicalLayout from '../../components/layouts/MedicalLayout';
import Card from '../../components/ui/Card';
import Input from '../../components/ui/Input';
import Button from '../../components/ui/Button';
import Select from '../../components/ui/Select';
import { toastStore } from '../../components/ui/Toaster';
import { SurgicalMaterial } from '../../models/types';

const RegisterMaterials: React.FC = () => {
  const [materials, setMaterials] = React.useState<SurgicalMaterial[]>([
    {
      id: '1',
      name: 'Titanium Hip Implant',
      description: 'High-grade titanium hip replacement implant',
      category: 'Orthopedic',
      supplierIds: ['1', '3'],
      unitPrice: 2500,
      stockQuantity: 15,
      requiredApproval: true,
      createdAt: new Date('2025-01-05')
    },
    {
      id: '2',
      name: 'Surgical Stapler',
      description: 'Disposable linear surgical stapler',
      category: 'General Surgery',
      supplierIds: ['2'],
      unitPrice: 350,
      stockQuantity: 42,
      requiredApproval: false,
      createdAt: new Date('2025-02-12')
    },
    {
      id: '3',
      name: 'Absorbable Sutures',
      description: 'Pack of 12 absorbable sutures',
      category: 'General Surgery',
      supplierIds: ['1', '2'],
      unitPrice: 75,
      stockQuantity: 120,
      requiredApproval: false,
      createdAt: new Date('2025-03-01')
    }
  ]);

  const [editingId, setEditingId] = React.useState<string | null>(null);
  
  const { register, handleSubmit, reset, setValue, formState: { errors } } = useForm<Omit<SurgicalMaterial, 'id' | 'createdAt'>>();

  const onSubmit = (data: Omit<SurgicalMaterial, 'id' | 'createdAt'>) => {
    const formattedData = {
      ...data,
      unitPrice: Number(data.unitPrice),
      stockQuantity: Number(data.stockQuantity),
      supplierIds: Array.isArray(data.supplierIds) ? data.supplierIds : [data.supplierIds],
      requiredApproval: Boolean(data.requiredApproval)
    };
    
    if (editingId) {
      setMaterials(materials.map(material => 
        material.id === editingId ? 
          { ...formattedData, id: editingId, createdAt: material.createdAt } : 
          material
      ));
      toastStore.success({ title: 'Material updated successfully' });
      setEditingId(null);
    } else {
      const newMaterial: SurgicalMaterial = {
        ...formattedData,
        id: Math.random().toString(36).substring(2, 9),
        createdAt: new Date()
      };
      setMaterials([...materials, newMaterial]);
      toastStore.success({ title: 'Material added successfully' });
    }
    
    reset();
  };

  const handleEdit = (id: string) => {
    const material = materials.find(m => m.id === id);
    if (material) {
      setValue('name', material.name);
      setValue('description', material.description);
      setValue('category', material.category);
      setValue('supplierIds', material.supplierIds);
      setValue('unitPrice', material.unitPrice);
      setValue('stockQuantity', material.stockQuantity);
      setValue('requiredApproval', material.requiredApproval);
      setEditingId(id);
    }
  };

  const handleDelete = (id: string) => {
    setMaterials(materials.filter(material => material.id !== id));
    toastStore.info({ title: 'Material removed' });
    if (editingId === id) {
      setEditingId(null);
      reset();
    }
  };

  const handleCancel = () => {
    setEditingId(null);
    reset();
  };

  const categoryOptions = [
    { value: 'Orthopedic', label: 'Orthopedic' },
    { value: 'Cardiovascular', label: 'Cardiovascular' },
    { value: 'Neurological', label: 'Neurological' },
    { value: 'General Surgery', label: 'General Surgery' },
    { value: 'Ophthalmology', label: 'Ophthalmology' },
    { value: 'Otolaryngology', label: 'Otolaryngology' },
    { value: 'Urology', label: 'Urology' },
    { value: 'Gynecology', label: 'Gynecology' },
    { value: 'Plastic Surgery', label: 'Plastic Surgery' }
  ];

  const supplierOptions = [
    { value: '1', label: 'Johnson Medical Supplies' },
    { value: '2', label: 'MedTech Instruments' },
    { value: '3', label: 'Surgical Innovations Inc.' }
  ];

  return (
    <MedicalLayout title="Surgical Materials Management">
      <div className="space-y-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4 }}
        >
          <Card
            title={editingId ? "Edit Material" : "Add New Material"}
            subtitle={editingId ? "Update material information" : "Register a new surgical material"}
          >
            <form onSubmit={handleSubmit(onSubmit)}>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <Input
                  label="Material Name"
                  placeholder="Enter material name"
                  error={errors.name?.message}
                  {...register('name', { 
                    required: 'Name is required' 
                  })}
                />
                
                <Select
                  label="Category"
                  options={categoryOptions}
                  error={errors.category?.message}
                  {...register('category', { 
                    required: 'Category is required' 
                  })}
                />
                
                <div className="md:col-span-2">
                  <Input
                    label="Description"
                    placeholder="Enter material description"
                    error={errors.description?.message}
                    {...register('description', { 
                      required: 'Description is required' 
                    })}
                  />
                </div>
                
                <Select
                  label="Supplier"
                  options={supplierOptions}
                  error={errors.supplierIds?.message as string}
                  {...register('supplierIds', { 
                    required: 'Supplier is required' 
                  })}
                />
                
                <Input
                  label="Unit Price ($)"
                  type="number"
                  placeholder="Enter unit price"
                  error={errors.unitPrice?.message}
                  {...register('unitPrice', { 
                    required: 'Unit price is required',
                    min: { value: 0, message: 'Price must be positive' }
                  })}
                />
                
                <Input
                  label="Stock Quantity"
                  type="number"
                  placeholder="Enter stock quantity"
                  error={errors.stockQuantity?.message}
                  {...register('stockQuantity', { 
                    required: 'Stock quantity is required',
                    min: { value: 0, message: 'Quantity must be positive' }
                  })}
                />
                
                <div className="flex items-center space-x-2 mt-2">
                  <input
                    type="checkbox"
                    id="requiredApproval"
                    className="h-4 w-4 text-primary-600 focus:ring-primary-500 border-neutral-300 rounded"
                    {...register('requiredApproval')}
                  />
                  <label htmlFor="requiredApproval" className="ml-2 block text-sm text-neutral-700">
                    Requires special approval for use
                  </label>
                </div>
              </div>
              
              <div className="mt-6 flex justify-end space-x-3">
                {editingId && (
                  <Button
                    type="button"
                    variant="outline"
                    onClick={handleCancel}
                  >
                    Cancel
                  </Button>
                )}
                <Button
                  type="submit"
                  icon={editingId ? <Edit size={18} /> : <Plus size={18} />}
                >
                  {editingId ? 'Update Material' : 'Add Material'}
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
            title="Surgical Materials Inventory"
            subtitle={`Total: ${materials.length} items`}
            actions={
              <div className="flex items-center">
                <Package size={18} className="text-neutral-500 mr-2" />
                <span className="text-sm text-neutral-600">Inventory</span>
              </div>
            }
          >
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="border-b border-neutral-200">
                    <th className="px-4 py-2 text-left text-xs font-medium text-neutral-500 uppercase tracking-wider">
                      Material
                    </th>
                    <th className="px-4 py-2 text-left text-xs font-medium text-neutral-500 uppercase tracking-wider">
                      Category
                    </th>
                    <th className="px-4 py-2 text-left text-xs font-medium text-neutral-500 uppercase tracking-wider">
                      Price
                    </th>
                    <th className="px-4 py-2 text-left text-xs font-medium text-neutral-500 uppercase tracking-wider">
                      Stock
                    </th>
                    <th className="px-4 py-2 text-left text-xs font-medium text-neutral-500 uppercase tracking-wider">
                      Status
                    </th>
                    <th className="px-4 py-2 text-left text-xs font-medium text-neutral-500 uppercase tracking-wider">
                      Actions
                    </th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-neutral-200">
                  {materials.map((material) => (
                    <tr key={material.id} className={`hover:bg-neutral-50 ${editingId === material.id ? 'bg-primary-50' : ''}`}>
                      <td className="px-4 py-3">
                        <div className="text-sm font-medium text-neutral-800">{material.name}</div>
                        <div className="text-xs text-neutral-500">{material.description}</div>
                      </td>
                      <td className="px-4 py-3 text-sm text-neutral-800">
                        {material.category}
                      </td>
                      <td className="px-4 py-3 text-sm text-neutral-800">
                        ${material.unitPrice.toLocaleString()}
                      </td>
                      <td className="px-4 py-3 text-sm text-neutral-800">
                        {material.stockQuantity}
                      </td>
                      <td className="px-4 py-3 text-sm">
                        <div className="flex items-center">
                          <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium
                            ${
                              material.stockQuantity === 0
                                ? 'bg-red-100 text-red-800'
                                : material.stockQuantity < 10
                                ? 'bg-yellow-100 text-yellow-800'
                                : 'bg-green-100 text-green-800'
                            }
                          `}>
                            {material.stockQuantity === 0 ? 'Out of Stock' : 
                             material.stockQuantity < 10 ? 'Low Stock' : 'In Stock'}
                          </span>
                          {material.requiredApproval && (
                            <span className="ml-2 inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-neutral-100 text-neutral-800">
                              Approval Required
                            </span>
                          )}
                        </div>
                      </td>
                      <td className="px-4 py-3 text-sm">
                        <div className="flex space-x-2">
                          <Button
                            variant="ghost"
                            size="sm"
                            className="text-primary-600 hover:text-primary-800 hover:bg-primary-50"
                            onClick={() => handleEdit(material.id)}
                            icon={<Edit size={16} />}
                          >
                            Edit
                          </Button>
                          <Button
                            variant="ghost"
                            size="sm"
                            className="text-error-500 hover:text-error-700 hover:bg-error-50"
                            onClick={() => handleDelete(material.id)}
                            icon={<Trash2 size={16} />}
                          >
                            Delete
                          </Button>
                        </div>
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

export default RegisterMaterials;
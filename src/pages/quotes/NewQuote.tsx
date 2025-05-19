import React from 'react';
import { motion } from 'framer-motion';
import { useForm } from 'react-hook-form';
import { FileText, Plus, AlertCircle } from 'lucide-react';
import MedicalLayout from '../../components/layouts/MedicalLayout';
import Card from '../../components/ui/Card';
import Input from '../../components/ui/Input';
import Select from '../../components/ui/Select';
import Button from '../../components/ui/Button';
import { toastStore } from '../../components/ui/Toaster';
import { QuoteRequest, PatientInfo, GuardianInfo } from '../../models/types';

const NewQuote: React.FC = () => {
  const [isMinor, setIsMinor] = React.useState(false);
  const { register, handleSubmit, watch, formState: { errors } } = useForm<QuoteRequest & { patientAge: number }>();

  // Mock data for dropdowns
  const procedures = [
    { value: 'proc1', label: 'Hip Replacement' },
    { value: 'proc2', label: 'Knee Arthroscopy' },
    { value: 'proc3', label: 'Cataract Surgery' },
  ];

  const materials = [
    { value: 'mat1', label: 'Titanium Hip Implant' },
    { value: 'mat2', label: 'Surgical Stapler' },
    { value: 'mat3', label: 'Absorbable Sutures' },
  ];

  const medicalTeam = [
    { value: 'doc1', label: 'Dr. Jane Smith - Orthopedic Surgeon' },
    { value: 'doc2', label: 'Dr. David Lee - Anesthesiologist' },
    { value: 'doc3', label: 'Michael Johnson - Surgical Assistant' },
  ];

  const comorbidities = [
    { value: 'diabetes', label: 'Diabetes' },
    { value: 'hypertension', label: 'Hypertension' },
    { value: 'heart_disease', label: 'Heart Disease' },
    { value: 'asthma', label: 'Asthma' },
  ];

  const onSubmit = (data: QuoteRequest & { patientAge: number }) => {
    // Handle form submission
    console.log(data);
    toastStore.success({ 
      title: 'Quote request submitted',
      message: 'The medical team will review your request shortly.'
    });
  };

  // Watch the age field to determine if guardian info is needed
  React.useEffect(() => {
    const subscription = watch((value, { name }) => {
      if (name === 'patientAge') {
        setIsMinor(Number(value.patientAge) < 18);
      }
    });
    return () => subscription.unsubscribe();
  }, [watch]);

  return (
    <MedicalLayout title="New Quote Request">
      <div className="space-y-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4 }}
        >
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
            {/* Patient Information */}
            <Card
              title="Patient Information"
              subtitle="Enter the patient's personal details"
              icon={<FileText className="w-5 h-5 text-primary-500" />}
            >
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <Input
                  label="Full Name"
                  placeholder="Enter patient's full name"
                  error={errors.patientInfo?.name?.message}
                  {...register('patientInfo.name', { required: 'Patient name is required' })}
                />
                
                <Input
                  label="Age"
                  type="number"
                  placeholder="Enter patient's age"
                  error={errors.patientAge?.message}
                  {...register('patientAge', {
                    required: 'Age is required',
                    min: { value: 0, message: 'Age must be positive' }
                  })}
                />
                
                <Select
                  label="Gender"
                  options={[
                    { value: 'male', label: 'Male' },
                    { value: 'female', label: 'Female' },
                    { value: 'other', label: 'Other' }
                  ]}
                  error={errors.patientInfo?.gender?.message}
                  {...register('patientInfo.gender', { required: 'Gender is required' })}
                />
                
                <Input
                  label="Contact Number"
                  placeholder="Enter contact number"
                  error={errors.patientInfo?.contactNumber?.message}
                  {...register('patientInfo.contactNumber', { required: 'Contact number is required' })}
                />
                
                <Input
                  label="Email"
                  type="email"
                  placeholder="Enter email address"
                  error={errors.patientInfo?.email?.message}
                  {...register('patientInfo.email', {
                    required: 'Email is required',
                    pattern: {
                      value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                      message: 'Invalid email address'
                    }
                  })}
                />
                
                <div className="md:col-span-2">
                  <Input
                    label="Address"
                    placeholder="Enter complete address"
                    error={errors.patientInfo?.address?.message}
                    {...register('patientInfo.address', { required: 'Address is required' })}
                  />
                </div>
              </div>
            </Card>

            {/* Guardian Information (if patient is minor) */}
            {isMinor && (
              <motion.div
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: 'auto' }}
                exit={{ opacity: 0, height: 0 }}
                transition={{ duration: 0.3 }}
              >
                <Card
                  title="Guardian Information"
                  subtitle="Required for patients under 18"
                  icon={<AlertCircle className="w-5 h-5 text-warning-500" />}
                >
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <Input
                      label="Guardian Name"
                      placeholder="Enter guardian's full name"
                      error={errors.patientInfo?.guardianInfo?.name?.message}
                      {...register('patientInfo.guardianInfo.name', { 
                        required: isMinor ? 'Guardian name is required' : false 
                      })}
                    />
                    
                    <Input
                      label="Relationship to Patient"
                      placeholder="e.g., Parent, Legal Guardian"
                      error={errors.patientInfo?.guardianInfo?.relationship?.message}
                      {...register('patientInfo.guardianInfo.relationship', {
                        required: isMinor ? 'Relationship is required' : false
                      })}
                    />
                    
                    <Input
                      label="Guardian Contact Number"
                      placeholder="Enter contact number"
                      error={errors.patientInfo?.guardianInfo?.contactNumber?.message}
                      {...register('patientInfo.guardianInfo.contactNumber', {
                        required: isMinor ? 'Guardian contact number is required' : false
                      })}
                    />
                    
                    <Input
                      label="Guardian Email"
                      type="email"
                      placeholder="Enter email address"
                      error={errors.patientInfo?.guardianInfo?.email?.message}
                      {...register('patientInfo.guardianInfo.email', {
                        required: isMinor ? 'Guardian email is required' : false,
                        pattern: {
                          value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                          message: 'Invalid email address'
                        }
                      })}
                    />
                  </div>
                </Card>
              </motion.div>
            )}

            {/* Procedure Information */}
            <Card
              title="Procedure Details"
              subtitle="Select the surgical procedure and required materials"
            >
              <div className="space-y-6">
                <Select
                  label="Surgical Procedure"
                  options={procedures}
                  error={errors.procedureId?.message}
                  {...register('procedureId', { required: 'Procedure is required' })}
                />
                
                <div>
                  <label className="block text-sm font-medium text-neutral-700 mb-2">
                    Required Materials
                  </label>
                  <div className="space-y-3">
                    {materials.map((material) => (
                      <div key={material.value} className="flex items-center space-x-3">
                        <input
                          type="checkbox"
                          id={material.value}
                          className="h-4 w-4 text-primary-600 focus:ring-primary-500 border-neutral-300 rounded"
                          {...register('materials')}
                        />
                        <label htmlFor={material.value} className="text-sm text-neutral-700">
                          {material.label}
                        </label>
                        <Input
                          type="number"
                          placeholder="Quantity"
                          className="w-24"
                          min="1"
                        />
                      </div>
                    ))}
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-neutral-700 mb-2">
                    Medical Team
                  </label>
                  <div className="space-y-3">
                    {medicalTeam.map((member) => (
                      <div key={member.value} className="flex items-center space-x-3">
                        <input
                          type="checkbox"
                          id={member.value}
                          className="h-4 w-4 text-primary-600 focus:ring-primary-500 border-neutral-300 rounded"
                          {...register('medicalTeam')}
                        />
                        <label htmlFor={member.value} className="text-sm text-neutral-700">
                          {member.label}
                        </label>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="flex items-center space-x-3">
                  <input
                    type="checkbox"
                    id="hospitalAnesthesiologist"
                    className="h-4 w-4 text-primary-600 focus:ring-primary-500 border-neutral-300 rounded"
                    {...register('hospitalAnesthesiologist')}
                  />
                  <label htmlFor="hospitalAnesthesiologist" className="text-sm text-neutral-700">
                    Use hospital anesthesiologist
                  </label>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <Input
                    label="Surgery Duration (hours)"
                    type="number"
                    min="0.5"
                    step="0.5"
                    placeholder="Enter estimated duration"
                    error={errors.durationHours?.message}
                    {...register('durationHours', { 
                      required: 'Duration is required',
                      min: { value: 0.5, message: 'Duration must be at least 30 minutes' }
                    })}
                  />
                  
                  <Input
                    label="Blood Bags Needed"
                    type="number"
                    min="0"
                    placeholder="Enter number of blood bags"
                    error={errors.bloodBagsNeeded?.message}
                    {...register('bloodBagsNeeded', {
                      required: 'Number of blood bags is required',
                      min: { value: 0, message: 'Cannot be negative' }
                    })}
                  />
                </div>
              </div>
            </Card>

            {/* Medical History */}
            <Card
              title="Medical History"
              subtitle="Patient's medical background and conditions"
            >
              <div className="space-y-6">
                <div>
                  <label className="block text-sm font-medium text-neutral-700 mb-2">
                    Comorbidities
                  </label>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                    {comorbidities.map((condition) => (
                      <div key={condition.value} className="flex items-center space-x-3">
                        <input
                          type="checkbox"
                          id={condition.value}
                          className="h-4 w-4 text-primary-600 focus:ring-primary-500 border-neutral-300 rounded"
                          {...register('comorbidities')}
                        />
                        <label htmlFor={condition.value} className="text-sm text-neutral-700">
                          {condition.label}
                        </label>
                      </div>
                    ))}
                  </div>
                </div>

                <div>
                  <label htmlFor="medicalHistory" className="block text-sm font-medium text-neutral-700 mb-2">
                    Medical History Notes
                  </label>
                  <textarea
                    id="medicalHistory"
                    rows={4}
                    className="mt-1 block w-full rounded-md border-neutral-300 shadow-sm focus:ring-primary-500 focus:border-primary-500"
                    placeholder="Enter any relevant medical history"
                    {...register('patientInfo.medicalHistory')}
                  />
                </div>

                <div>
                  <label htmlFor="additionalNotes" className="block text-sm font-medium text-neutral-700 mb-2">
                    Additional Notes
                  </label>
                  <textarea
                    id="additionalNotes"
                    rows={4}
                    className="mt-1 block w-full rounded-md border-neutral-300 shadow-sm focus:ring-primary-500 focus:border-primary-500"
                    placeholder="Enter any additional notes or special requirements"
                    {...register('additionalNotes')}
                  />
                </div>
              </div>
            </Card>

            <div className="flex justify-end space-x-4">
              <Button
                type="button"
                variant="outline"
              >
                Save as Draft
              </Button>
              <Button
                type="submit"
                icon={<Plus size={18} />}
              >
                Submit Quote Request
              </Button>
            </div>
          </form>
        </motion.div>
      </div>
    </MedicalLayout>
  );
};

export default NewQuote;

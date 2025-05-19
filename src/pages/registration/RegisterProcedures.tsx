import React from 'react';
import { Card } from '../../components/ui/Card';
import { Button } from '../../components/ui/Button';
import { Input } from '../../components/ui/Input';
import { Select } from '../../components/ui/Select';
import MedicalLayout from '../../components/layouts/MedicalLayout';

export default function RegisterProcedures() {
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Handle form submission
  };

  return (
    <MedicalLayout>
      <div className="max-w-4xl mx-auto p-6">
        <h1 className="text-3xl font-bold text-gray-900 mb-8">Register Medical Procedures</h1>
        
        <Card className="p-6">
          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="space-y-4">
              <div>
                <label htmlFor="name" className="block text-sm font-medium text-gray-700">
                  Procedure Name
                </label>
                <Input
                  id="name"
                  type="text"
                  placeholder="Enter procedure name"
                  className="mt-1"
                />
              </div>

              <div>
                <label htmlFor="category" className="block text-sm font-medium text-gray-700">
                  Category
                </label>
                <Select
                  id="category"
                  className="mt-1"
                >
                  <option value="">Select a category</option>
                  <option value="surgical">Surgical</option>
                  <option value="diagnostic">Diagnostic</option>
                  <option value="therapeutic">Therapeutic</option>
                  <option value="preventive">Preventive</option>
                </Select>
              </div>

              <div>
                <label htmlFor="description" className="block text-sm font-medium text-gray-700">
                  Description
                </label>
                <textarea
                  id="description"
                  rows={4}
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                  placeholder="Enter procedure description"
                />
              </div>

              <div>
                <label htmlFor="duration" className="block text-sm font-medium text-gray-700">
                  Estimated Duration (minutes)
                </label>
                <Input
                  id="duration"
                  type="number"
                  min="0"
                  placeholder="Enter estimated duration"
                  className="mt-1"
                />
              </div>

              <div>
                <label htmlFor="requirements" className="block text-sm font-medium text-gray-700">
                  Special Requirements
                </label>
                <textarea
                  id="requirements"
                  rows={3}
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                  placeholder="Enter any special requirements or preparations needed"
                />
              </div>
            </div>

            <div className="flex justify-end space-x-4">
              <Button type="button" variant="outline">
                Cancel
              </Button>
              <Button type="submit">
                Register Procedure
              </Button>
            </div>
          </form>
        </Card>
      </div>
    </MedicalLayout>
  );
}
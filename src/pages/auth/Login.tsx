import React, { useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { motion } from 'framer-motion';
import { useForm } from 'react-hook-form';
import { Stethoscope, User, AtSign, Lock } from 'lucide-react';
import { useAuth } from '../../hooks/useAuth';
import Button from '../../components/ui/Button';
import Input from '../../components/ui/Input';
import Card from '../../components/ui/Card';
import { toastStore } from '../../components/ui/Toaster';

type UserRole = 'medical' | 'patient';

interface LoginFormData {
  email: string;
  password: string;
}

const Login: React.FC = () => {
  const { login } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  const [selectedRole, setSelectedRole] = useState<UserRole>('medical');
  const [isLoading, setIsLoading] = useState(false);
  
  const from = (location.state as any)?.from?.pathname || `/${selectedRole}/dashboard`;
  
  const { register, handleSubmit, formState: { errors } } = useForm<LoginFormData>();
  
  const onSubmit = async (data: LoginFormData) => {
    setIsLoading(true);
    try {
      await login(data.email, data.password, selectedRole);
      toastStore.success({ title: 'Login successful' });
      navigate(from, { replace: true });
    } catch (error) {
      toastStore.error({ title: 'Login failed', message: 'Invalid email or password' });
    } finally {
      setIsLoading(false);
    }
  };
  
  return (
    <div className="min-h-screen flex flex-col justify-center items-center bg-gradient-to-br from-primary-50 to-secondary-50 p-4">
      <motion.div 
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.3 }}
        className="w-full max-w-md"
      >
        <div className="flex justify-center mb-8">
          <div className="flex items-center">
            <Stethoscope className="h-10 w-10 text-primary-600" />
            <span className="ml-2 text-2xl font-bold text-primary-600">Unified Surgery System</span>
          </div>
        </div>
        
        <Card>
          <div className="text-center mb-6">
            <h2 className="text-2xl font-bold text-neutral-800">Sign In</h2>
            <p className="text-neutral-500">Access your account</p>
          </div>
          
          <div className="flex mb-6 border rounded-lg overflow-hidden">
            <button
              type="button"
              className={`flex-1 py-3 text-center font-medium ${
                selectedRole === 'medical'
                  ? 'bg-primary-600 text-white'
                  : 'bg-white text-neutral-500 hover:bg-neutral-50'
              }`}
              onClick={() => setSelectedRole('medical')}
            >
              <div className="flex justify-center items-center">
                <Stethoscope size={18} className="mr-2" />
                Medical Team
              </div>
            </button>
            <button
              type="button"
              className={`flex-1 py-3 text-center font-medium ${
                selectedRole === 'patient'
                  ? 'bg-primary-600 text-white'
                  : 'bg-white text-neutral-500 hover:bg-neutral-50'
              }`}
              onClick={() => setSelectedRole('patient')}
            >
              <div className="flex justify-center items-center">
                <User size={18} className="mr-2" />
                Patient
              </div>
            </button>
          </div>
          
          <form onSubmit={handleSubmit(onSubmit)}>
            <div className="space-y-4">
              <Input
                label="Email"
                type="email"
                placeholder="Enter your email"
                icon={<AtSign size={18} />}
                error={errors.email?.message}
                {...register('email', {
                  required: 'Email is required',
                  pattern: {
                    value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                    message: 'Invalid email address',
                  },
                })}
              />
              
              <Input
                label="Password"
                type="password"
                placeholder="Enter your password"
                icon={<Lock size={18} />}
                error={errors.password?.message}
                {...register('password', {
                  required: 'Password is required',
                  minLength: {
                    value: 6,
                    message: 'Password must be at least 6 characters',
                  },
                })}
              />
            </div>
            
            <Button
              type="submit"
              className="w-full mt-6"
              loading={isLoading}
            >
              Sign In
            </Button>
          </form>
          
          <div className="mt-6 pt-4 border-t border-neutral-200 text-center text-sm text-neutral-500">
            <p>For demonstration purposes, any email and password (6+ chars) will work</p>
          </div>
        </Card>
      </motion.div>
    </div>
  );
};

export default Login;
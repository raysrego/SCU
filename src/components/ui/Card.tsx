import React from 'react';
import { motion } from 'framer-motion';

interface CardProps {
  title?: string;
  subtitle?: string;
  actions?: React.ReactNode;
  children: React.ReactNode;
  className?: string;
  bordered?: boolean;
  hoverable?: boolean;
}

const Card: React.FC<CardProps> = ({
  title,
  subtitle,
  actions,
  children,
  className = '',
  bordered = true,
  hoverable = false,
}) => {
  return (
    <motion.div
      whileHover={hoverable ? { y: -4, boxShadow: '0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05)' } : {}}
      transition={{ duration: 0.2 }}
      className={`
        bg-white rounded-lg overflow-hidden shadow-md
        ${bordered ? 'border border-neutral-200' : ''}
        ${hoverable ? 'transition-all duration-200' : ''}
        ${className}
      `}
    >
      {(title || actions) && (
        <div className="px-6 py-4 border-b border-neutral-200 flex justify-between items-center">
          <div>
            {title && <h3 className="text-lg font-semibold text-neutral-800">{title}</h3>}
            {subtitle && <p className="text-sm text-neutral-500">{subtitle}</p>}
          </div>
          {actions && <div className="flex items-center space-x-2">{actions}</div>}
        </div>
      )}
      <div className="p-6">{children}</div>
    </motion.div>
  );
};

export default Card;
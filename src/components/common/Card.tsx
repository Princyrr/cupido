import React from 'react';
import { clsx } from 'clsx';

interface CardProps {
  children: React.ReactNode;
  className?: string;
  onClick?: () => void;
  hoverable?: boolean;
}

const Card: React.FC<CardProps> = ({ 
  children, 
  className, 
  onClick,
  hoverable = false,
}) => {
  return (
    <div 
      className={clsx(
        'bg-white rounded-xl shadow-md overflow-hidden',
        {
          'transition-transform duration-200 hover:-translate-y-1 hover:shadow-lg cursor-pointer': hoverable,
        },
        className
      )}
      onClick={onClick}
    >
      {children}
    </div>
  );
};

export const CardHeader: React.FC<{ className?: string; children: React.ReactNode }> = ({ 
  className, 
  children 
}) => {
  return <div className={clsx('p-4 border-b', className)}>{children}</div>;
};

export const CardContent: React.FC<{ className?: string; children: React.ReactNode }> = ({ 
  className, 
  children 
}) => {
  return <div className={clsx('p-4', className)}>{children}</div>;
};

export const CardFooter: React.FC<{ className?: string; children: React.ReactNode }> = ({ 
  className, 
  children 
}) => {
  return <div className={clsx('p-4 border-t bg-gray-50', className)}>{children}</div>;
};

export default Card;
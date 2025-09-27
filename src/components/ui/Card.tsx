import React from 'react';

interface CardProps {
  children: React.ReactNode;
  className?: string;
  padding?: boolean;
}

export const Card: React.FC<CardProps> = ({
  children,
  className = '',
  padding = true
}) => {
  const paddingClass = padding ? 'p-4 sm:p-6' : '';

  return (
    <div className={`gradient-bg-card rounded-2xl shadow-lg border border-gray-100 mobile-card hover-lift max-w-full overflow-hidden mobile-card-spacing mobile-text smooth-transition ${paddingClass} ${className}`}>
      {children}
    </div>
  );
};

interface CardHeaderProps {
  children: React.ReactNode;
  className?: string;
}

export const CardHeader: React.FC<CardHeaderProps> = ({
  children,
  className = ''
}) => {
  return (
    <div className={`mb-4 pb-2 border-b border-gray-100 ${className}`}>
      {children}
    </div>
  );
};

interface CardTitleProps {
  children: React.ReactNode;
  className?: string;
}

export const CardTitle: React.FC<CardTitleProps> = ({
  children,
  className = ''
}) => {
  return (
    <h2 className={`text-lg font-semibold text-gray-800 mobile-title ${className}`}>
      {children}
    </h2>
  );
};
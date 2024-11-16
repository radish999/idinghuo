
// packages/ui/src/Card/index.tsx
import React from 'react';
import { Card as MuiCard, CardContent, CardHeader, CardProps as MuiCardProps } from '@mui/material';
import { cn } from '../utils';

interface CardProps extends MuiCardProps {
  title?: React.ReactNode;
  subtitle?: React.ReactNode;
  className?: string;
  contentClassName?: string;
}

export const Card = ({
  title,
  subtitle,
  children,
  className,
  contentClassName,
  ...props
}: CardProps) => {
  return (
    <MuiCard
      className={cn('rounded-xl shadow-lg overflow-hidden', className)}
      {...props}
    >
      {(title || subtitle) && (
        <CardHeader
          title={title}
          subheader={subtitle}
          className="bg-gray-50"
        />
      )}
      <CardContent className={cn('p-6', contentClassName)}>
        {children}
      </CardContent>
    </MuiCard>
  );
};
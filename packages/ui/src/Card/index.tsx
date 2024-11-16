import React from 'react';
import { Card as MuiCard, CardContent, CardHeader } from '@mui/material';
import { cn } from '../utils';

interface CardProps {
  title?: React.ReactNode;
  children?: React.ReactNode;
  className?: string;
}

export const Card: React.FC<CardProps> = ({
  title,
  children,
  className
}) => {
  return (
    <MuiCard className={cn('rounded-lg shadow', className)}>
      {title && <CardHeader title={title} />}
      <CardContent>{children}</CardContent>
    </MuiCard>
  );
};
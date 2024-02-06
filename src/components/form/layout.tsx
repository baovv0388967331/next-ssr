'use client';

import clsx from 'clsx';
import { ReactNode } from 'react';

export type FormLayoutProps = {
  children: ReactNode;
  className?: string;
  orientation?: 'vertical' | 'horizontal';
  label?: {
    title?: string;
    required?: boolean;
    className?: string;
    colon?: boolean;
  };
};

export const FormLayout = ({ children, orientation, className, label }: FormLayoutProps) => {
  return (
    <div
      className={clsx('flex gap-2', {
        'flex-col': orientation === 'vertical',
        className: !!className,
      })}
    >
      <div className={clsx('flex h-8 items-center', label?.className)}>
        {label?.title && <span className="break-all">{label.title}</span>}
        {label?.required && <span className="ml-1 text-error text-[#ff4d4f]">{'*'}</span>}
      </div>
      {children}
    </div>
  );
};

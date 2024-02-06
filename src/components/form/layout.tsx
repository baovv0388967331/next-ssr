import { ReactNode } from 'react';

import clsx from 'clsx';

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
        'items-center': orientation === 'horizontal',
        className: !!className,
      })}
    >
      <div className={clsx('flex', label?.className)}>
        {label?.title && <span className="break-all">{label.title}</span>}
        {label?.required && <span className="ml-1 text-error">{'*'}</span>}
      </div>
      {children}
    </div>
  );
};

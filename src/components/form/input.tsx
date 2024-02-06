'use client';

import { Input, InputProps, InputRef } from 'antd';
import clsx from 'clsx';
import { forwardRef } from 'react';
import { FieldError } from 'react-hook-form';

type Props = {
  className?: string;
  error?: FieldError;
} & InputProps;

export const FormInput = forwardRef<InputRef, Props>(({ className, error, ...props }: Props, ref) => {
  const status = error ? 'error' : '';

  return (
    <div className={clsx('flex flex-col gap-1', className)}>
      <Input ref={ref} status={status} {...props} />
      <span className="text-xs text-[#ff4d4f]">{error?.message}</span>
    </div>
  );
});

FormInput.displayName = 'FormInput';

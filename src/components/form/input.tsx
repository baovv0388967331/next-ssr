'use client';

import { forwardRef } from 'react';

import { Input, InputProps, InputRef } from 'antd';

type Props = InputProps & {
  className?: string;
};

export const FormInput = forwardRef<InputRef, Props>(({ className, ...props }: Props, ref) => {
  return <Input ref={ref} className={className} {...props} />;
});

FormInput.displayName = 'FormInput';

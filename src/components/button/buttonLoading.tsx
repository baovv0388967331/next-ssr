'use client';

import { Button, ButtonProps } from 'antd';
import { memo, ReactNode } from 'react';

import { useLoading } from '@/providers';

type Props = Omit<ButtonProps, 'loading'> & {
  loading: string;
  children?: ReactNode;
};

const ButtonLoadingComponent = ({ loading, children, ...rest }: Props) => {
  const { getLoading } = useLoading();

  return (
    <Button loading={getLoading(loading)} {...rest}>
      {children}
    </Button>
  );
};

export const ButtonLoading = memo(ButtonLoadingComponent);

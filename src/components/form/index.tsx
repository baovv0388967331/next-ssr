import { ReactNode } from 'react';

import { FormControl } from './control';
import { FormInput } from './input';
import { FormLayout } from './layout';

type Props = {
  children: ReactNode;
  onSubmit?: () => void;
  className?: string;
};

export const Form = ({ children, ...props }: Props) => {
  return <form {...props}>{children}</form>;
};

Form.Control = FormControl;
Form.Input = FormInput;
Form.Layout = FormLayout;

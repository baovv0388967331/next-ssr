import { ReactNode } from 'react';

import { FormController } from './controller';
import { FormInput } from './input';
import { FormLayout } from './layout';

type Props = {
  children: ReactNode;
  onSubmit?: () => void;
  className?: string;
};

const Form = ({ children, ...props }: Props) => {
  return <form {...props}>{children}</form>;
};

Form.Control = FormController;
Form.Input = FormInput;
Form.Layout = FormLayout;

export { Form, FormController, FormInput, FormLayout };

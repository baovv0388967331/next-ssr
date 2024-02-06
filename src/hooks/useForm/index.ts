import { yupResolver } from '@hookform/resolvers/yup';
import { Controller, FieldValues, Resolver, useForm as useFormRoot, UseFormProps } from 'react-hook-form';

import * as Yup from 'yup';

type SchemaType<TF extends FieldValues> = {
  schema?: Yup.ObjectSchema<TF> | ReturnType<typeof Yup.lazy<Yup.ObjectSchema<TF>>>;
};

const useForm = <TF extends FieldValues = FieldValues, TC = unknown>({
  schema,
  ...props
}: UseFormProps<TF, TC> & SchemaType<TF>) => {
  let validateResolver: unknown | undefined = undefined;
  if (schema) {
    validateResolver = yupResolver(schema);
  }
  return useFormRoot<TF, TC>({
    ...props,
    mode: 'onBlur',
    reValidateMode: 'onBlur',
    resolver: validateResolver as Resolver<TF, TC>,
  });
};

export { Controller, useForm };

import { yupResolver } from '@hookform/resolvers/yup';
import { Controller, FieldValues, Resolver, useForm as useFormRoot, UseFormProps } from 'react-hook-form';
import * as Yup from 'yup';

type SchemaType = {
  schema?: unknown;
};

type FormProps<TF extends FieldValues = FieldValues, TC = unknown> = UseFormProps<TF, TC> & SchemaType;

const useForm = <TF extends FieldValues = FieldValues, TC = unknown>({ schema, ...props }: FormProps<TF, TC>) => {
  const validateResolver: unknown | undefined = schema ? yupResolver(schema as Yup.ObjectSchema<TF>) : undefined;

  return useFormRoot<TF, TC>({
    ...props,
    mode: 'onBlur',
    reValidateMode: 'onBlur',
    resolver: validateResolver as Resolver<TF>,
  });
};

export { Controller, useForm };

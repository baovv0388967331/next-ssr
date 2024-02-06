import { ReactElement } from 'react';
import {
  Controller,
  FieldError,
  FieldPath,
  FieldPathValue,
  FieldValues,
  Noop,
  UseControllerProps,
} from 'react-hook-form';

type RenderProps<TF extends FieldValues = FieldValues, TN extends FieldPath<TF> = FieldPath<TF>> = {
  render: ({
    onChange,
    onBlur,
    value,
    error,
  }: {
    onChange: (...event: unknown[]) => void;
    onBlur: Noop;
    value: FieldPathValue<TF, TN>;
    error?: FieldError;
  }) => ReactElement;
};

export const FormControl = <TF extends FieldValues = FieldValues, TN extends FieldPath<TF> = FieldPath<TF>>({
  render,
  ...props
}: UseControllerProps<TF, TN> & RenderProps<TF, TN>) => {
  return <Controller render={({ field, fieldState }) => render({ ...field, error: fieldState.error })} {...props} />;
};

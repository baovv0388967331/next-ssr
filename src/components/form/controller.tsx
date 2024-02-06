import { Controller, ControllerProps, FieldPath, FieldValues } from 'react-hook-form';

export const FormController = <
  TFieldValues extends FieldValues = FieldValues,
  TName extends FieldPath<TFieldValues> = FieldPath<TFieldValues>,
>({
  render,
  ...props
}: ControllerProps<TFieldValues, TName>) => {
  return <Controller render={render} {...props} />;
};

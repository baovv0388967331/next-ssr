import * as Yup from 'yup';

export type ShapeType<TF> = Partial<Record<keyof TF, Yup.AnySchema>>;

export const getShape = <TF extends Yup.ObjectShape>(value: TF) => {
  return Yup.object().shape<TF>(value);
};

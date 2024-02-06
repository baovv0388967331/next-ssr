import { Form } from '@/components/form';
import { useForm } from '@/hooks/useForm';

import { Button } from 'antd';

import { AuthFormState } from '../declare';
// import { getResolver } from '../validate';

type Props = {
  isPending: boolean;
  onLogin: (value: AuthFormState) => void;
};

const LoginForm = ({ isPending, onLogin }: Props) => {
  const { control, handleSubmit } = useForm<AuthFormState>({
    defaultValues: {
      email: '',
      password: '',
    },
  });

  return (
    <Form onSubmit={handleSubmit(onLogin)} className="flex flex-col items-center gap-4 mt-10">
      <Form.Control
        name="email"
        control={control}
        render={({ field }) => (
          <Form.Layout label={{ title: 'Email', className: 'w-20' }}>
            <Form.Input status="error" variant="outlined" className="w-64" {...field} />
          </Form.Layout>
        )}
      />

      <Form.Control
        name="password"
        control={control}
        render={({ field }) => (
          <Form.Layout label={{ title: 'Password', className: 'w-20' }}>
            <Form.Input variant="outlined" className="w-64" {...field} />
          </Form.Layout>
        )}
      />

      <Button htmlType="submit" className="w-64" loading={isPending}>
        On submit
      </Button>
    </Form>
  );
};

LoginForm.whyDidYouRender = true;
export default LoginForm;

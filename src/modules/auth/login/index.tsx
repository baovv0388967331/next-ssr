'use client';

import { LoginFormComponent } from './components/loginForm';
import { useLogic } from './logics/useLogic';

export const Index = () => {
  const { onLogin } = useLogic();

  return (
    <div className="flex items-center justify-center h-screen bg-gray-100">
      <LoginFormComponent onLogin={onLogin} />
    </div>
  );
};

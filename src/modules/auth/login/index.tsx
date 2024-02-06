'use client';
import React from 'react';

import { Modal } from 'antd';

import LoginForm from './components/loginForm';
import { useLogic } from './logics/useLogic';

const ModalInsert = React.memo(({ isOpen }: { isOpen: boolean }) => {
  return (
    <Modal title="Title" open={isOpen}>
      <p>modal</p>
    </Modal>
  );
});

ModalInsert.displayName = 'ModalInsert';

export const Index = () => {
  const { onLogin, isPending } = useLogic();

  return (
    <div>
      <LoginForm isPending={isPending} onLogin={onLogin} />
      <ModalInsert isOpen={false} />
    </div>
  );
};

import { message as AntdMessage, Modal as AntdModal } from 'antd';
import { MessageInstance } from 'antd/es/message/interface';
import { HookAPI } from 'antd/es/modal/useModal';
import { createContext, useContext } from 'react';

type TransportContext = {
  message: MessageInstance;
  modal: HookAPI;
};

const TransportContext = createContext<TransportContext>({} as TransportContext);

export const TransportProvider = ({ children }: { children: React.ReactNode }) => {
  const [message, messageHolder] = AntdMessage.useMessage();
  const [modal, modalHolder] = AntdModal.useModal();

  return (
    <TransportContext.Provider value={{ message, modal }}>
      {messageHolder}
      {modalHolder}
      {children}
    </TransportContext.Provider>
  );
};

export const useTransport = () => {
  return useContext(TransportContext);
};

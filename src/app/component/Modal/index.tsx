import React, { useState } from 'react';
import ModalContext, { PositionComponent } from '../../../context/ModalContext';
import { StyledModal } from '@styled/Modal';

const ModalProvider: React.FC<React.PropsWithChildren> = (props) => {
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const [position, setPosition] = useState<PositionComponent | undefined>();
  const [component, setComponent] = useState<React.ReactNode | null>(null);
  const open = (props: React.ReactNode, position?: PositionComponent) => {
    setIsOpen(true);
    setComponent(props);
    setPosition(position);
  };
  const close = () => {
    setIsOpen(false);
    setComponent(null);
  };
  return (
    <ModalContext.Provider value={{ open, close }}>
      <StyledModal show={isOpen} position={position}>
        <div onClick={() => close()} className="modal-back"></div>
        {isOpen && <div className="modal-content">{component}</div>}
      </StyledModal>
      {props.children}
    </ModalContext.Provider>
  );
};

export default ModalProvider;

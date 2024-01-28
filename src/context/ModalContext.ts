import React, { createContext } from 'react';

export type PositionComponent = 'center' | 'top' | 'bottom' | 'right' | 'left';

function provideComponent(
  props: React.ReactNode,
  position?: PositionComponent,
) {}
function noop() {}

interface ModalContextInterface {
  open: (props: React.ReactNode, position?: PositionComponent) => void;
  close: Function;
}

const ModalContext = createContext<ModalContextInterface | null>({
  open: provideComponent,
  close: noop,
});

export default ModalContext;

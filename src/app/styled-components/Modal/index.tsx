import { PositionComponent } from '@/context/ModalContext';
import styled from 'styled-components';

export const StyledModal = styled.div<{
  show: boolean;
  position?: PositionComponent;
}>`
  position: relative;
  display: ${({ show }) => (show ? 'block' : 'none')};
  .modal-back {
    position: fixed;
    width: 100%;
    height: 100%;
    background: rgba(0, 0, 0, 0.5);
    z-index: 10001;
  }
  .modal-content {
    position: fixed;
    z-index: 10002;
    ${({ position }) => {
      switch (position) {
        case 'center':
          return `
            top: 50%;
            left: 50%;
            transform: translate(-50%, -50%);;
          `;
        case 'top':
          return 'top: 0;';
        case 'bottom':
          return 'bottom: 0;';
        case 'right':
          return 'right: 0;';
        case 'left':
          return 'left: 0;';
        default:
          return `
            top: 50%;
            left: 50%;
            transform:translate(-50%, -50%);;
          `;
      }
    }}
  }
`;

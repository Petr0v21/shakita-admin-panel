import { Button, ButtonListItem } from '@/app/styled-components/Button';
import { InputComponentChildren } from '@/app/styled-components/Input';
import { QRcodeButtonStyled } from '@app/styled-components/QRcode';
import QRcodeScaner from '@component/QRcode';
import QRIcon from '@images/QR.svg';
import ModalContext from '@/context/ModalContext';
import { bonusService } from '@/shared/services/bonusService';
import React, { useContext, useState } from 'react';
import { useNavigate } from 'react-router';
import { toast } from 'react-toastify';

const BonusTicketPage: React.FC = () => {
  const [code, setCode] = useState<string>('');
  const modalContext = useContext(ModalContext);
  const navigate = useNavigate();
  const QRcodeHandler = (value: string) => {
    navigate('/bonus-ticket/' + value);
    modalContext?.close();
  };
  return (
    <div>
      <h2>Bonus Ticket</h2>
      <div
        style={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          gap: '1em',
        }}
      >
        <div
          style={{
            display: 'flex',
            width: 320,
            justifyContent: 'space-between',
            alignItems: 'center',
          }}
        >
          <h3>Input code</h3>
          <ButtonListItem onClick={() => navigate('create')}>
            <span>Add +</span>
          </ButtonListItem>
        </div>
        <InputComponentChildren hasValue={!!code} labelText="code">
          <input
            type="text"
            placeholder="code"
            autoComplete="off"
            value={code ?? ''}
            name="activeTill"
            onChange={(event) => setCode(event.target.value)}
          />
        </InputComponentChildren>
        <Button
          onClick={async () => {
            if (code.length) {
              await bonusService.getTicket({ code }).then((res: any) => {
                if (res) {
                  navigate(code);
                } else {
                  toast('Invalid code', { type: 'error' });
                }
              });
            }
          }}
        >
          <span>Search</span>
        </Button>
        <QRcodeButtonStyled
          onClick={() =>
            modalContext?.open(<QRcodeScaner handler={QRcodeHandler} />)
          }
        >
          <span>Scan QR-code</span>
          <img src={QRIcon} alt="QR icon" />
        </QRcodeButtonStyled>
      </div>
    </div>
  );
};

export default BonusTicketPage;

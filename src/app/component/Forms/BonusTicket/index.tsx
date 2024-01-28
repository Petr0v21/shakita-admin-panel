import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { Button } from '../../../styled-components/Button';
import { InputComponentChildren } from '../../../styled-components/Input';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import { DropDownComponentChildren } from '@/app/styled-components/Select';
import { StyledForm } from '@/app/styled-components/Form';
import { SpanComponent } from '@/app/styled-components/Span';
import { toast } from 'react-toastify';
import {
  Bonus,
  BonusTicketType,
  BonusTicketWholeType,
  User,
} from '../../../../generated/types';
import { bonusService } from '../../../../shared/services/bonusService';
import { userService } from '@/shared/services/userService';
import Item from '../../List/Item';

const schema = yup
  .object({
    code: yup.string().required(),
    isActive: yup.boolean().required(),
    activeTill: yup.string().optional().nullable(),
  })
  .required();

const FormBonusTicket: (props: {
  type: 'CREATE' | 'UPDATE';
}) => React.JSX.Element = ({ type }) => {
  const { code, ...params } = useParams();
  const [bonuses, setBonuses] = useState<Bonus[]>([]);
  const [users, setUsers] = useState<User[]>([]);
  const [bonusTicket, setBonusTicket] = useState<BonusTicketWholeType>({
    id: '',
    code: '',
    ticketType: BonusTicketType.Disposable,
    isActive: false,
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  });
  const {
    register,
    handleSubmit,
    setError,
    formState: { errors },
  } = useForm({
    mode: 'onChange',
    resolver: yupResolver(schema),
    values: { ...bonusTicket },
  });
  useEffect(() => {
    console.log(params);
    if (code && type === 'UPDATE') {
      bonusService.getTicket({ code }).then((res: any) => {
        console.log(res);
        if (res) {
          setBonusTicket({
            ...res,
          });
        }
      });
    }
  }, []);

  const validtionForm = () => {
    let status = true;
    if (
      bonusTicket.activeTill &&
      isNaN(Number(new Date(bonusTicket.activeTill)))
    ) {
      setError('activeTill', { message: 'Invalid date' });
      status = false;
    }
    if (!bonusTicket.user || !bonusTicket.bonus) {
      status = false;
      toast('Add bonus and user', { type: 'warning' });
    }
    return status;
  };

  const sendForm = async (props: typeof schema.__outputType) => {
    console.log('bonusTicket form body', { ...bonusTicket });
    if (validtionForm()) {
      if (code && type === 'UPDATE') {
        return await bonusService
          .updateBonusTicket({ ...bonusTicket })
          .then((res) => {
            console.log('res', res);
            if (res) {
              toast('BonusTicket updated successfully', { type: 'success' });
            } else {
              toast('Error during updating bonusTicket', { type: 'error' });
            }
          });
      }
      return await bonusService
        .createBonusTicket({
          ...bonusTicket,
          bonusId: bonusTicket.bonus!.id,
          userId: bonusTicket.user!.id,
        })
        .then((res) => {
          console.log('res', res);
          if (res) {
            toast('BonusTicket created successfully', { type: 'success' });
          } else {
            toast('Error during creating bonusTicket', { type: 'error' });
          }
        });
    }
  };

  return (
    <>
      <h2>Bonus Ticket</h2>
      <div className="open-page">
        <StyledForm
          style={{
            display: 'flex',
            flexDirection: 'row',
            gap: '4em',
            flexWrap: 'wrap',
          }}
        >
          <form onSubmit={handleSubmit(sendForm)}>
            <div
              className="form-column"
              style={{
                gap: '4em',
                paddingTop: '2em',
                width: '100%',
              }}
            >
              <div className="main-info">
                <SpanComponent
                  priority="main"
                  text={`ID: ${bonusTicket.id.length ? bonusTicket.id : ' - '}`}
                  withCopy={!!bonusTicket.id}
                  value={bonusTicket.id}
                />
                <SpanComponent
                  priority="main"
                  text={`User ID: ${
                    bonusTicket.user?.id.length ? bonusTicket.user?.id : ' - '
                  }`}
                  withCopy={!!bonusTicket.user?.id}
                  value={bonusTicket.user?.id ?? ''}
                  url={
                    bonusTicket.user?.id
                      ? `/accounts/${bonusTicket.user?.id}`
                      : undefined
                  }
                />
                <SpanComponent
                  priority="main"
                  text={`Bonus ID: ${
                    bonusTicket.bonus?.id.length ? bonusTicket.bonus?.id : ' - '
                  }`}
                  withCopy={!!bonusTicket.bonus?.id}
                  value={bonusTicket.bonus?.id ?? ''}
                  url={
                    bonusTicket.bonus?.id
                      ? `/bonus/${bonusTicket.bonus?.id}`
                      : undefined
                  }
                />
                <SpanComponent
                  text={`createdAt: ${
                    bonusTicket.createdAt
                      ?.toString()
                      .replace('T', ' ')
                      .slice(0, 19) ?? ' - '
                  }`}
                  value={
                    bonusTicket.createdAt
                      ?.toString()
                      .replace('T', ' ')
                      .slice(0, 19) ?? ' - '
                  }
                />
                <SpanComponent
                  text={`updatedAt: ${
                    bonusTicket.createdAt
                      ?.toString()
                      .replace('T', ' ')
                      .slice(0, 19) ?? ' - '
                  }`}
                  value={
                    bonusTicket.createdAt
                      ?.toString()
                      .replace('T', ' ')
                      .slice(0, 19) ?? ' - '
                  }
                />
              </div>
            </div>
            <div className="form-container-bonus">
              <div className="form-column">
                {type === 'UPDATE' || bonusTicket.user ? (
                  <InputComponentChildren readOnly hasValue labelText="user">
                    <input
                      type="text"
                      placeholder="user"
                      autoComplete="off"
                      readOnly
                      value={bonusTicket.user?.name ?? ''}
                      name="user"
                    />
                  </InputComponentChildren>
                ) : (
                  <DropDownComponentChildren hasValue labelText="user">
                    <input
                      type="text"
                      placeholder="example@gmail.com/@telegram"
                      name="user"
                      autoComplete="off"
                      // value={users.contact}
                      onChange={async (event) => {
                        if (event.target.value.length > 3) {
                          await userService
                            .find({ contact: event.target.value })
                            .then((res: any) => {
                              if (res) {
                                setUsers(res);
                              }
                            });
                        }
                      }}
                    />
                    <div className="drop-down-content">
                      {users.map((item) => (
                        <span
                          onClick={() =>
                            setBonusTicket({ ...bonusTicket, user: item })
                          }
                        >
                          {item.name}
                        </span>
                      ))}
                    </div>
                  </DropDownComponentChildren>
                )}
                {type === 'UPDATE' || bonusTicket.bonus ? (
                  <InputComponentChildren readOnly hasValue labelText="bonus">
                    <input
                      type="text"
                      placeholder="bonus"
                      autoComplete="off"
                      readOnly
                      value={bonusTicket.bonus?.asset ?? ''}
                      name="bonus"
                    />
                  </InputComponentChildren>
                ) : (
                  <DropDownComponentChildren hasValue labelText="bonus">
                    <input
                      type="text"
                      placeholder="personal"
                      name="bonus"
                      autoComplete="off"
                      onChange={async (event) => {
                        if (event.target.value.length > 3) {
                          bonusService
                            .findBonusBy({ asset: event.target.value })
                            .then((res: any) => {
                              if (res) {
                                setBonuses(res);
                              }
                            });
                        }
                      }}
                    />
                    <div className="drop-down-content">
                      {bonuses.map((item) => (
                        <span
                          onClick={() =>
                            setBonusTicket({ ...bonusTicket, bonus: item })
                          }
                        >
                          {item.asset} {item.level?.slice(0, 1)}
                        </span>
                      ))}
                    </div>
                  </DropDownComponentChildren>
                )}
                {bonusTicket.bonus?.level && (
                  <InputComponentChildren readOnly hasValue labelText="level">
                    <input
                      type="text"
                      placeholder="level"
                      autoComplete="off"
                      readOnly
                      value={bonusTicket.bonus?.level ?? ''}
                      name="level"
                    />
                  </InputComponentChildren>
                )}
              </div>
              <div className="form-column">
                <div className="form-column">
                  <InputComponentChildren
                    invalid={!!errors?.activeTill}
                    errorMessage={errors.activeTill?.message}
                    hasValue={!!bonusTicket.activeTill}
                    labelText="activeTill"
                  >
                    <input
                      type="text"
                      placeholder="activeTill"
                      autoComplete="off"
                      value={bonusTicket.activeTill ?? ''}
                      {...register('activeTill', {
                        onChange(event: React.SyntheticEvent<Element, Event>) {
                          const target = event.target as HTMLInputElement;
                          setBonusTicket({
                            ...bonusTicket,
                            activeTill: target.value,
                          });
                        },
                        value: bonusTicket.activeTill ?? '',
                      })}
                      name="activeTill"
                    />
                  </InputComponentChildren>
                  <InputComponentChildren
                    invalid={!!errors?.code}
                    errorMessage={errors.code?.message}
                    hasValue={!!bonusTicket.code}
                    labelText="code"
                  >
                    <input
                      type="text"
                      placeholder="code"
                      autoComplete="off"
                      value={bonusTicket.code ?? ''}
                      {...register('code', {
                        onChange(event: React.SyntheticEvent<Element, Event>) {
                          const target = event.target as HTMLInputElement;
                          setBonusTicket({
                            ...bonusTicket,
                            code: target.value,
                          });
                        },
                        value: bonusTicket.code ?? '',
                      })}
                      name="code"
                    />
                  </InputComponentChildren>
                </div>
                <div className="form-column">
                  <DropDownComponentChildren
                    hasValue={!!bonusTicket.ticketType}
                    labelText="ticketType"
                    readOnly
                  >
                    <input
                      type="text"
                      placeholder="ticketType"
                      name="ticketType"
                      autoComplete="off"
                      value={bonusTicket.ticketType}
                      readOnly
                    />
                    <div className="drop-down-content">
                      <span>{''}</span>
                      <span
                        onClick={() =>
                          setBonusTicket({
                            ...bonusTicket,
                            ticketType: BonusTicketType.Const,
                          })
                        }
                      >
                        {BonusTicketType.Const}
                      </span>
                      <span
                        onClick={() =>
                          setBonusTicket({
                            ...bonusTicket,
                            ticketType: BonusTicketType.Disposable,
                          })
                        }
                      >
                        {BonusTicketType.Disposable}
                      </span>
                    </div>
                  </DropDownComponentChildren>
                  <DropDownComponentChildren
                    hasValue={
                      bonusTicket.isActive !== undefined &&
                      bonusTicket.isActive !== null
                    }
                    labelText="isActive"
                    readOnly
                  >
                    <input
                      type="text"
                      placeholder="isActive"
                      name="isActive"
                      autoComplete="off"
                      value={bonusTicket.isActive ? 'Active' : 'Disactive'}
                      readOnly
                    />
                    <div className="drop-down-content">
                      <span>{''}</span>
                      <span
                        onClick={() =>
                          setBonusTicket({
                            ...bonusTicket,
                            isActive: true,
                          })
                        }
                      >
                        Active
                      </span>
                      <span
                        onClick={() =>
                          setBonusTicket({
                            ...bonusTicket,
                            isActive: false,
                          })
                        }
                      >
                        Disactive
                      </span>
                    </div>
                  </DropDownComponentChildren>
                </div>
              </div>
            </div>
            <Button style={{ background: '' }}>
              <span>{type}</span>
            </Button>
          </form>
        </StyledForm>
      </div>
      {type === 'UPDATE' && (
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
          }}
        >
          <Button
            style={{
              background: '#45a948',
            }}
            onClick={() => {
              if (bonusTicket.user?.id) {
                bonusService
                  .activeBonusTicket({
                    bonusTicketId: bonusTicket.id,
                    userId: bonusTicket.user?.id,
                  })
                  .then((res: any) => {
                    if (res?.success) {
                      toast('This Ticket activated ticket', {
                        type: 'success',
                      });
                    } else {
                      toast('This Ticket you can`t activate', {
                        type: 'error',
                      });
                    }
                  });
              } else {
                toast('This Ticket you can`t activate', { type: 'error' });
              }
            }}
          >
            <span>Use Ticket</span>
          </Button>
          <Button
            onClick={() => {
              bonusService.disActiveBonusTicket({ id: bonusTicket.id });
            }}
          >
            <span>Block</span>
          </Button>
        </div>
      )}
    </>
  );
};

export default FormBonusTicket;

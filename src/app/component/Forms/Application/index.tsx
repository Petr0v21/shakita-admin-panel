import { observer } from 'mobx-react-lite';
import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import store from '../../../../stores/bookingStore';
import { Button } from '../../../styled-components/Button';
import { InputComponentChildren } from '../../../styled-components/Input';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import { ApplicationStatus, UserRole } from '@/generated/types';
import { DropDownComponentChildren } from '@/app/styled-components/Select';
import { StyledForm } from '@/app/styled-components/Form';
import { SpanComponent } from '@/app/styled-components/Span';
import { ApplicationDBType } from '../../../../types';
import Draw from '@component/Draw';
import { toast } from 'react-toastify';

const phoneRegExp =
  /^[\+]?[(]?[0-9]{3}[)]?[-\s\.]?[0-9]{3}[-\s\.]?[0-9]{4,6}$/im;

const schema = yup
  .object({
    email: yup.string().email().required(),
    date: yup.string().required().min(19),
    name: yup.string().required().min(3),
    phone: yup.string().optional().nullable(),
    telegram: yup.string().optional().nullable(),
    instagram: yup.string().optional().nullable(),
    place: yup.string().optional(),
  })
  .required();

const FormUser: (props: { type: 'CREATE' | 'UPDATE' }) => React.JSX.Element = ({
  type,
}) => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [application, setApplication] = useState<ApplicationDBType>({
    id: '',
    email: '',
    date: new Date(new Date().setSeconds(0))
      .toISOString()
      .replace('T', ' ')
      .slice(0, 19),
    enable_notification: true,
    name: '',
    place: '',
    status: ApplicationStatus.Approved,
  });
  const {
    register,
    handleSubmit,
    reset,
    setError,
    formState: { errors },
  } = useForm({
    mode: 'onChange',
    resolver: yupResolver(schema),
    values: { ...application },
  });
  useEffect(() => {
    if (id && type === 'UPDATE') {
      store.findOne(id).then((res: any) => {
        if (res) {
          setApplication({
            ...res,
            date: res.date.replace('T', ' ').slice(0, 19),
          });
        }
      });
    }
  }, []);

  const validtionForm = () => {
    let status = true;
    if (
      application.date.length !== 19 ||
      isNaN(Number(new Date(application.date)))
    ) {
      setError('date', {
        message: 'date must be like 2023-11-24 11:00:00',
      });
      status = false;
    }
    if (!application.place || application.place.length == 0) {
      setError('place', {
        message: 'place is required',
      });
      status = false;
    }
    return status;
  };

  const sendForm = async (props: typeof schema.__outputType) => {
    if (validtionForm()) {
      if (id && type === 'UPDATE') {
        return await store.update({ ...application }).then((res) => {
          if (res) {
            toast('Application updated successfully', { type: 'success' });
          } else {
            toast('Error during updating application', { type: 'error' });
          }
        });
      }
      return await store.book({ ...application }).then((res) => {
        if (res) {
          toast('Application created successfully', { type: 'success' });
        } else {
          toast('Error during creating application', { type: 'error' });
        }
      });
    }
  };

  return (
    <>
      <h3>Application</h3>
      <div className="open-page">
        <StyledForm
          style={{
            display: 'flex',
            flexDirection: 'row',
            gap: '4em',
            flexWrap: 'wrap',
          }}
        >
          <div
            className="form-column"
            style={{
              gap: '4em',
              paddingTop: '2em',
            }}
          >
            <div className="main-info">
              <SpanComponent
                priority="main"
                text={`ID: ${application.id.length ? application.id : ' - '}`}
                withCopy={!!application.id}
                value={application.id}
              />
              <SpanComponent
                priority="main"
                text={`User: ${application.user?.id ?? ' - '}`}
                withCopy={!!application.user?.id}
                value={application.user?.id ?? ''}
                url={
                  application.user?.id
                    ? `/accounts/${application.user?.id}`
                    : undefined
                }
              />
              <SpanComponent
                text={`createdAt: ${
                  application.createdAt
                    ?.toString()
                    .replace('T', ' ')
                    .slice(0, 19) ?? ' - '
                }`}
                value={
                  application.createdAt
                    ?.toString()
                    .replace('T', ' ')
                    .slice(0, 19) ?? ' - '
                }
              />
              <SpanComponent
                text={`updatedAt: ${
                  application.createdAt
                    ?.toString()
                    .replace('T', ' ')
                    .slice(0, 19) ?? ' - '
                }`}
                value={
                  application.createdAt
                    ?.toString()
                    .replace('T', ' ')
                    .slice(0, 19) ?? ' - '
                }
              />
            </div>
            <Draw
              tablesChoosed={application.place}
              choseHandler={(place: string) => {
                setApplication({
                  ...application,
                  place,
                });
              }}
            />
          </div>
          <form onSubmit={handleSubmit(sendForm)}>
            <div className="form-column">
              <div className="form-column">
                <InputComponentChildren
                  invalid={!!errors?.date}
                  errorMessage={errors.date?.message}
                  hasValue={!!application.date}
                  labelText="date"
                >
                  <input
                    type="text"
                    placeholder="date"
                    autoComplete="off"
                    value={application.date ?? ''}
                    {...register('date', {
                      onChange(event: React.SyntheticEvent<Element, Event>) {
                        const target = event.target as HTMLInputElement;
                        setApplication({
                          ...application,
                          date: target.value,
                        });
                      },
                      value: application.date ?? '',
                    })}
                    name="date"
                  />
                </InputComponentChildren>
                <DropDownComponentChildren
                  hasValue={!!application.status}
                  labelText="status"
                  readOnly
                >
                  <input
                    type="text"
                    placeholder="status"
                    name="status"
                    autoComplete="off"
                    value={application.status?.toString() ?? ''}
                    readOnly
                  />
                  <div className="drop-down-content">
                    <span
                      onClick={() =>
                        setApplication({
                          ...application,
                          status: ApplicationStatus.Approved,
                        })
                      }
                    >
                      {ApplicationStatus.Approved}
                    </span>
                    <span
                      onClick={() =>
                        setApplication({
                          ...application,
                          status: ApplicationStatus.Pending,
                        })
                      }
                    >
                      {ApplicationStatus.Pending}
                    </span>
                    <span
                      onClick={() =>
                        setApplication({
                          ...application,
                          status: ApplicationStatus.Rejected,
                        })
                      }
                    >
                      {ApplicationStatus.Rejected}
                    </span>
                  </div>
                </DropDownComponentChildren>
                <DropDownComponentChildren
                  hasValue={
                    application.place !== null ||
                    application.place !== undefined
                  }
                  invalid={!!errors?.place}
                  errorMessage={errors.place?.message}
                  labelText="place"
                  readOnly
                >
                  <input
                    type="text"
                    placeholder="place"
                    name="place"
                    autoComplete="off"
                    value={application.place}
                    readOnly
                  />
                  <div className="drop-down-content">
                    <span
                      onClick={() =>
                        setApplication({
                          ...application,
                          place: 'test1',
                        })
                      }
                    >
                      {'test1'}
                    </span>
                    <span
                      onClick={() =>
                        setApplication({
                          ...application,
                          place: 'test2',
                        })
                      }
                    >
                      {'test2'}
                    </span>
                    <span
                      onClick={() =>
                        setApplication({
                          ...application,
                          place: 'test3',
                        })
                      }
                    >
                      {'test3'}
                    </span>
                  </div>
                </DropDownComponentChildren>
                <DropDownComponentChildren
                  hasValue={
                    application.enable_notification !== null ||
                    application.enable_notification !== undefined
                  }
                  labelText="Notification"
                  readOnly
                >
                  <input
                    type="text"
                    placeholder="Notification"
                    name="notification"
                    autoComplete="off"
                    value={application.enable_notification ? 'Yes' : 'No'}
                    readOnly
                  />
                  <div className="drop-down-content">
                    <span>{''}</span>
                    <span
                      onClick={() =>
                        setApplication({
                          ...application,
                          enable_notification: true,
                        })
                      }
                    >
                      Yes
                    </span>
                    <span
                      onClick={() =>
                        setApplication({
                          ...application,
                          enable_notification: false,
                        })
                      }
                    >
                      No
                    </span>
                  </div>
                </DropDownComponentChildren>
              </div>
              <div className="form-column">
                <InputComponentChildren
                  invalid={!!errors?.email}
                  errorMessage={errors.email?.message}
                  hasValue={!!application.email}
                  labelText="email"
                >
                  <input
                    type="text"
                    placeholder="email"
                    autoComplete="off"
                    value={application.email ?? ''}
                    {...register('email', {
                      onChange(event: React.SyntheticEvent<Element, Event>) {
                        const target = event.target as HTMLInputElement;
                        setApplication({
                          ...application,
                          email: target.value,
                        });
                      },
                      value: application.email ?? '',
                    })}
                    name="email"
                  />
                </InputComponentChildren>
                <InputComponentChildren
                  invalid={!!errors?.name}
                  errorMessage={errors.name?.message}
                  hasValue={!!application.name}
                  labelText="name"
                >
                  <input
                    type="text"
                    placeholder="name"
                    autoComplete="off"
                    value={application.name ?? ''}
                    {...register('name', {
                      onChange(event: React.SyntheticEvent<Element, Event>) {
                        const target = event.target as HTMLInputElement;
                        setApplication({
                          ...application,
                          name: target.value,
                        });
                      },
                      value: application.name ?? '',
                    })}
                    name="name"
                  />
                </InputComponentChildren>
                <InputComponentChildren
                  invalid={!!errors?.phone}
                  errorMessage={errors.phone?.message}
                  hasValue={!!application.phone}
                  labelText="phone"
                >
                  <input
                    type="text"
                    placeholder="phone"
                    autoComplete="off"
                    value={application.phone ?? ''}
                    {...register('phone', {
                      onChange(event: React.SyntheticEvent<Element, Event>) {
                        const target = event.target as HTMLInputElement;
                        setApplication({
                          ...application,
                          phone: target.value,
                        });
                      },
                      value: application.phone ?? '',
                    })}
                    name="phone"
                  />
                </InputComponentChildren>
                <InputComponentChildren
                  invalid={!!errors?.telegram}
                  errorMessage={errors.telegram?.message}
                  hasValue={!!application.telegram}
                  labelText="telegram"
                >
                  <input
                    type="text"
                    placeholder="telegram"
                    autoComplete="off"
                    value={application.telegram ?? ''}
                    {...register('telegram', {
                      onChange(event: React.SyntheticEvent<Element, Event>) {
                        const target = event.target as HTMLInputElement;
                        setApplication({
                          ...application,
                          telegram: target.value,
                        });
                      },
                      value: application.telegram ?? '',
                    })}
                    name="telegram"
                  />
                </InputComponentChildren>
                <InputComponentChildren
                  invalid={!!errors?.instagram}
                  errorMessage={errors.instagram?.message}
                  hasValue={!!application.instagram}
                  labelText="instagram"
                >
                  <input
                    type="text"
                    placeholder="instagram"
                    autoComplete="off"
                    value={application.instagram ?? ''}
                    {...register('instagram', {
                      onChange(event: React.SyntheticEvent<Element, Event>) {
                        const target = event.target as HTMLInputElement;
                        setApplication({
                          ...application,
                          instagram: target.value,
                        });
                      },
                      value: application.instagram ?? '',
                    })}
                    name="instagram"
                  />
                </InputComponentChildren>
              </div>
              <InputComponentChildren
                hasValue={!!application.description}
                labelText="description"
              >
                <textarea
                  placeholder="description"
                  autoComplete="off"
                  value={application.description ?? ''}
                  name="description"
                  onChange={(event) => {
                    setApplication({
                      ...application,
                      description: event.target.value,
                    });
                  }}
                />
              </InputComponentChildren>
            </div>
            <Button>
              <span>{type}</span>
            </Button>
          </form>
        </StyledForm>
      </div>
    </>
  );
};

export default observer(FormUser);

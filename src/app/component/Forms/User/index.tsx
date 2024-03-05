import { observer } from 'mobx-react-lite';
import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import store from '../../../../stores/userStore';
// import CheckBoxComponet from '../../../styled-components/SmallChecks';
import { Button } from '../../../styled-components/Button';
import { InputComponentChildren } from '../../../styled-components/Input';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import DefaultAvatar from '@images/DefaultAvatar.svg';
import * as yup from 'yup';
import { AccountDBType } from '@/types';
import { ApplicationStatus, UserRole } from '@/generated/types';
import { DropDownComponentChildren } from '@/app/styled-components/Select';
import { StyledForm } from '@/app/styled-components/Form';
import { SpanComponent } from '@/app/styled-components/Span';
import { StyledPill } from '@/app/styled-components/Pill';
import { toast } from 'react-toastify';

const phoneRegExp =
  /^[\+]?[(]?[0-9]{3}[)]?[-\s\.]?[0-9]{3}[-\s\.]?[0-9]{4,6}$/im;

const schema = yup
  .object({
    email: yup.string().email().required(),
    name: yup.string().optional().min(3).nullable(),
    telegram: yup.string().optional().nullable(),
    instagram: yup.string().optional().nullable(),
    password: yup.string().min(6).optional().nullable(),
    phone: yup.string().optional().nullable(),
  })
  .required();

const FormUser: (props: { type: 'CREATE' | 'UPDATE' }) => React.JSX.Element = ({
  type,
}) => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [user, setUser] = useState<AccountDBType>({
    id: '',
    email: '',
    role: UserRole.User,
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
    values: user,
  });
  useEffect(() => {
    if (id && type === 'UPDATE') {
      store.findOne({ id }).then((res: any) => {
        if (res) {
          setUser(res);
        }
      });
    }
  }, []);
  const sendForm = async (props: typeof schema.__outputType) => {
    if (id && type === 'UPDATE') {
      const result = await store.update({ ...user, id });
      if (result) {
        toast('User updated successfully', { type: 'success' });
      } else {
        toast('Error during user update', { type: 'error' });
      }
    }
    if (user.password && user.password.length > 6) {
      const result = await store.create({
        ...props,
        password: user.password,
        role: user.role,
      });
      if (result) {
        toast('User created successfully', { type: 'success' });
      } else {
        toast('Error during creating user', { type: 'error' });
      }
    } else {
      setError('password', {
        message: 'password is a required field',
      });
    }
    return;
  };
  return (
    <div className="open-page">
      <StyledForm>
        <h3>User Form</h3>
        {type === 'UPDATE' && (
          <div className="main-info">
            <SpanComponent
              priority="main"
              text={`ID: ${user.id}`}
              withCopy
              value={user.id}
            />
            <SpanComponent
              text={`createdAt: ${user.createdAt
                ?.toString()
                .replace('T', ' ')
                .slice(0, 19)}`}
              value={
                user.createdAt?.toString().replace('T', ' ').slice(0, 19) ?? ''
              }
            />
            <SpanComponent
              text={`updatedAt: ${user.createdAt
                ?.toString()
                .replace('T', ' ')
                .slice(0, 19)}`}
              value={
                user.updatedAt?.toString().replace('T', ' ').slice(0, 19) ?? ''
              }
            />
          </div>
        )}
        <form onSubmit={handleSubmit(sendForm)}>
          <div className="form-row">
            <div className="conteiner-file-input">
              <img alt="dow" src={user.picture ?? DefaultAvatar} />
              <input
                type="file"
                accept="image/png, image/jpeg"
                id="actual-btn-1"
                hidden
                onChange={async (event) => {
                  store.uploadImage(event);
                }}
              />
              <label htmlFor="actual-btn-1"></label>
            </div>
            <div className="form-column">
              <InputComponentChildren
                invalid={!!errors?.name}
                errorMessage={errors.name?.message}
                hasValue={!!user.name}
                labelText="name"
              >
                <input
                  type="text"
                  placeholder="name"
                  autoComplete="off"
                  value={user.name ?? ''}
                  {...register('name', {
                    onChange(event: React.SyntheticEvent<Element, Event>) {
                      const target = event.target as HTMLInputElement;
                      setUser({
                        ...user,
                        name: target.value,
                      });
                    },
                    value: user.name ?? '',
                  })}
                  name="name"
                />
              </InputComponentChildren>
              <InputComponentChildren
                invalid={!!errors?.email}
                errorMessage={errors.email?.message}
                hasValue={!!user.email}
                labelText="email"
                readOnly={type === 'UPDATE'}
              >
                <input
                  type="text"
                  placeholder="email"
                  autoComplete="off"
                  value={user.email}
                  readOnly={type === 'UPDATE'}
                  {...register('email', {
                    onChange(event: React.SyntheticEvent<Element, Event>) {
                      const target = event.target as HTMLInputElement;
                      setUser({
                        ...user,
                        email: target.value,
                      });
                    },
                    value: user.email ?? '',
                  })}
                  name="email"
                />
              </InputComponentChildren>
            </div>
          </div>
          {type === 'CREATE' && (
            <InputComponentChildren
              invalid={!!errors?.password}
              errorMessage={errors.password?.message}
              hasValue={!!user.password}
              labelText="password"
            >
              <input
                type="text"
                placeholder="password"
                autoComplete="off"
                value={user.password ?? ''}
                {...register('password', {
                  onChange(event: React.SyntheticEvent<Element, Event>) {
                    const target = event.target as HTMLInputElement;
                    setUser({
                      ...user,
                      password: target.value,
                    });
                  },
                  value: user.password ?? '',
                })}
                name="password"
              />
            </InputComponentChildren>
          )}
          <div className="form-row">
            <div className="form-column">
              <InputComponentChildren
                invalid={!!errors?.phone}
                errorMessage={errors.phone?.message}
                hasValue={!!user.phone}
                labelText="phone"
              >
                <input
                  type="text"
                  placeholder="phone"
                  autoComplete="off"
                  value={user.phone ?? ''}
                  {...register('phone', {
                    onChange(event: React.SyntheticEvent<Element, Event>) {
                      const target = event.target as HTMLInputElement;
                      setUser({
                        ...user,
                        phone: target.value,
                      });
                    },
                    value: user.phone ?? '',
                  })}
                  name="phone"
                />
              </InputComponentChildren>
              <InputComponentChildren
                invalid={!!errors?.telegram}
                errorMessage={errors.telegram?.message}
                hasValue={!!user.telegram}
                labelText="telegram"
              >
                <input
                  type="text"
                  placeholder="telegram"
                  autoComplete="off"
                  value={user.telegram ?? ''}
                  {...register('telegram', {
                    onChange(event: React.SyntheticEvent<Element, Event>) {
                      const target = event.target as HTMLInputElement;
                      setUser({
                        ...user,
                        telegram: target.value,
                      });
                    },
                    value: user.telegram ?? '',
                  })}
                  name="telegram"
                />
              </InputComponentChildren>
              <InputComponentChildren
                invalid={!!errors?.instagram}
                errorMessage={errors.instagram?.message}
                hasValue={!!user.instagram}
                labelText="instagram"
              >
                <input
                  type="text"
                  placeholder="instagram"
                  autoComplete="off"
                  value={user.instagram ?? ''}
                  {...register('instagram', {
                    onChange(event: React.SyntheticEvent<Element, Event>) {
                      const target = event.target as HTMLInputElement;
                      setUser({
                        ...user,
                        instagram: target.value,
                      });
                    },
                    value: user.instagram ?? '',
                  })}
                  name="instagram"
                />
              </InputComponentChildren>
            </div>
            <div className="form-column">
              <DropDownComponentChildren
                hasValue={!!user.role}
                labelText="role"
                readOnly
              >
                <input
                  type="text"
                  placeholder="role"
                  name="role"
                  autoComplete="off"
                  value={user.role?.toString() ?? ''}
                  readOnly
                />
                <div className="drop-down-content">
                  <span
                    onClick={() =>
                      setUser({
                        ...user,
                        role: UserRole.User,
                      })
                    }
                  >
                    {UserRole.User}
                  </span>
                  <span
                    onClick={() =>
                      setUser({
                        ...user,
                        role: UserRole.Admin,
                      })
                    }
                  >
                    {UserRole.Admin}
                  </span>
                  <span
                    onClick={() =>
                      setUser({
                        ...user,
                        role: UserRole.Manager,
                      })
                    }
                  >
                    {UserRole.Manager}
                  </span>
                  <span
                    onClick={() =>
                      setUser({
                        ...user,
                        role: UserRole.SuperManager,
                      })
                    }
                  >
                    {UserRole.SuperManager}
                  </span>
                  <span
                    onClick={() =>
                      setUser({
                        ...user,
                        role: UserRole.Analyt,
                      })
                    }
                  >
                    {UserRole.Analyt}
                  </span>
                  <span
                    onClick={() =>
                      setUser({
                        ...user,
                        role: UserRole.Blocked,
                      })
                    }
                  >
                    {UserRole.Blocked}
                  </span>
                </div>
              </DropDownComponentChildren>
              <DropDownComponentChildren
                hasValue={
                  user.enable_notifications !== null ||
                  user.enable_notifications !== undefined
                }
                labelText="Notification"
                readOnly
              >
                <input
                  type="text"
                  placeholder="Notification"
                  name="notification"
                  autoComplete="off"
                  value={user.enable_notifications ? 'Yes' : 'No'}
                  readOnly
                />
                <div className="drop-down-content">
                  <span
                    onClick={() =>
                      setUser({
                        ...user,
                        enable_notifications: undefined,
                      })
                    }
                  >
                    {''}
                  </span>
                  <span
                    onClick={() =>
                      setUser({
                        ...user,
                        enable_notifications: true,
                      })
                    }
                  >
                    Yes
                  </span>
                  <span
                    onClick={() =>
                      setUser({
                        ...user,
                        enable_notifications: false,
                      })
                    }
                  >
                    No
                  </span>
                </div>
              </DropDownComponentChildren>
              <DropDownComponentChildren
                hasValue={
                  user.isFullAuth !== null || user.isFullAuth !== undefined
                }
                labelText="Verification"
                readOnly
              >
                <input
                  type="text"
                  placeholder="Verification"
                  name="verification"
                  autoComplete="off"
                  value={user.isFullAuth ? 'Yes' : 'No'}
                  readOnly
                />
                <div className="drop-down-content">
                  <span
                    onClick={() =>
                      setUser({
                        ...user,
                        isFullAuth: undefined,
                      })
                    }
                  >
                    {''}
                  </span>
                  <span
                    onClick={() =>
                      setUser({
                        ...user,
                        isFullAuth: true,
                      })
                    }
                  >
                    Yes
                  </span>
                  <span
                    onClick={() =>
                      setUser({
                        ...user,
                        isFullAuth: true,
                      })
                    }
                  >
                    No
                  </span>
                </div>
              </DropDownComponentChildren>
            </div>
          </div>
          <Button>
            <span>{type}</span>
          </Button>
        </form>
      </StyledForm>
      <div className="secondery-user-info">
        <h3>History</h3>
        <div className="history">
          {user.applications && user.applications.length ? (
            user.applications.slice(0, 5).map((application) => {
              let color = 'red';
              switch (application.status) {
                case ApplicationStatus.Approved:
                  color = 'rgba(52, 182, 88, 0.9)';
                  break;
                case ApplicationStatus.Pending:
                  color = 'rgba(255, 199, 0, 0.9)';
                  break;
                case ApplicationStatus.Rejected:
                  color = 'rgba(255, 0, 0, 0.9)';
                  break;
              }
              return (
                <StyledPill
                  // background={color}
                  onClick={() => navigate('/applications/' + application.id)}
                  key={'history' + application.id}
                >
                  <div className="content">
                    <h4>
                      {application.date
                        .toString()
                        .replace('T', ' ')
                        .slice(0, 19)}
                    </h4>
                    <span>{application.place}</span>
                    <span
                      style={{
                        textAlign: 'end',
                        color: color,
                        fontSize: '12px',
                        fontWeight: '700',
                      }}
                    >
                      {application.status}
                    </span>
                  </div>
                </StyledPill>
              );
            })
          ) : (
            <SpanComponent text="Empty list!!!" value="" />
          )}
        </div>
        <div className="history"></div>
      </div>
    </div>
  );
};

export default observer(FormUser);

import { observer } from 'mobx-react-lite';
import React, { useContext, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import store from '../../../../stores/authStore';
import CheckBoxComponet from '../../../styled-components/SmallChecks';
import { Button } from '../../../styled-components/Button';
import { InputComponentChildren } from '../../../styled-components/Input';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import AuthContext from '@/context/AuthContext';
import { toast } from 'react-toastify';

type FormValues = {
  name: string;
  email: string;
  phone: string;
  password: string;
  confirm_password: string;
};

const phoneRegExp =
  /^[\+]?[(]?[0-9]{3}[)]?[-\s\.]?[0-9]{3}[-\s\.]?[0-9]{4,6}$/im;

const schema = yup
  .object({
    email: yup.string().email().required(),
    name: yup.string().min(3).required(),
    password: yup.string().required().min(6),
    confirm_password: yup
      .string()
      .required()
      .min(6)
      .test('passwords-match', 'Passwords must match', function (value) {
        return this.parent.password === value;
      }),
    phone: yup
      .string()
      .required()
      .matches(phoneRegExp, 'Phone number is not valid'),
  })
  .required();

const FormSignUp: React.FC = (props) => {
  const navigate = useNavigate();
  const auth = useContext(AuthContext);
  const [checked, setChecked] = useState(false);
  const [eye, setEye] = useState({
    password: false,
    confirm_password: false,
  });
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<FormValues>({ mode: 'onChange', resolver: yupResolver(schema) });

  const sendForm = async (props: FormValues) => {
    const result = await store.signUp();
    if (result) {
      reset();
      store.cleanForm();
      return toast('User created successfully', { type: 'success' });
    }
    toast('Error during registration', { type: 'error' });
  };
  return (
    <form onSubmit={handleSubmit(sendForm)}>
      <h2>Sign Up</h2>
      <InputComponentChildren
        hasValue={!!store.authFormState.name}
        invalid={!!errors.name?.message}
        labelText="name*"
        errorMessage={errors.name?.message}
      >
        <input
          type="text"
          autoComplete="off"
          {...register('name', {
            onChange(event: React.SyntheticEvent<Element, Event>) {
              const target = event.target as HTMLInputElement;
              store.addField(target.value, target.name);
            },
            value: store.authFormState.name,
          })}
          name="name"
        />
      </InputComponentChildren>
      <InputComponentChildren
        hasValue={!!store.authFormState.email}
        invalid={!!errors.email?.message}
        labelText="email*"
        errorMessage={errors.email?.message}
      >
        <input
          type="text"
          placeholder="email"
          autoComplete="off"
          {...register('email', {
            onChange(event: React.SyntheticEvent<Element, Event>) {
              const target = event.target as HTMLInputElement;
              store.addField(target.value, target.name);
            },
            value: store.authFormState.email,
          })}
          name="email"
        />
      </InputComponentChildren>
      <InputComponentChildren
        hasValue={!!store.authFormState.phone}
        invalid={!!errors.phone?.message}
        labelText="phone*"
        errorMessage={errors.phone?.message}
      >
        <input
          type="text"
          placeholder="phone"
          autoComplete="off"
          {...register('phone', {
            onChange(event: React.SyntheticEvent<Element, Event>) {
              const target = event.target as HTMLInputElement;
              store.addField(target.value, target.name);
            },
            value: store.authFormState.phone,
          })}
          name="phone"
        />
      </InputComponentChildren>
      <InputComponentChildren
        hasValue={!!store.authFormState.password}
        invalid={!!errors.password?.message}
        labelText="password*"
        errorMessage={errors.password?.message}
        eye={eye.password}
        eyeHandler={() => {
          setEye({ ...eye, password: !eye.password });
        }}
      >
        <input
          type={eye.password ? 'text' : 'password'}
          placeholder="password"
          autoComplete="off"
          {...register('password', {
            onChange(event: React.SyntheticEvent<Element, Event>) {
              const target = event.target as HTMLInputElement;
              store.addField(target.value, target.name);
            },
            value: store.authFormState.password,
          })}
          name="password"
        />
      </InputComponentChildren>
      <InputComponentChildren
        hasValue={!!store.authFormState.confirm_password}
        invalid={!!errors.confirm_password?.message}
        labelText="confirm_password*"
        errorMessage={errors.confirm_password?.message}
        eye={eye.confirm_password}
        eyeHandler={() => {
          setEye({ ...eye, confirm_password: !eye.confirm_password });
        }}
      >
        <input
          type={eye.confirm_password ? 'text' : 'password'}
          placeholder="confirm_password"
          autoComplete="off"
          onPaste={(e) => {
            e.preventDefault();
            return false;
          }}
          onCopy={(e) => {
            e.preventDefault();
            return false;
          }}
          {...register('confirm_password', {
            onChange(event: React.SyntheticEvent<Element, Event>) {
              const target = event.target as HTMLInputElement;
              store.addField(target.value, target.name);
            },
            value: store.authFormState.confirm_password,
          })}
          name="confirm_password"
        />
      </InputComponentChildren>
      <div className="checkbox">
        <CheckBoxComponet size="medium" effect="bounce">
          <input
            type="checkbox"
            name="enable_notification"
            checked={checked}
            onChange={(event) => setChecked(event.target.checked)}
          />
        </CheckBoxComponet>
        <label>Agree with Politic Information</label>
      </div>
      <Button disabled={!checked}>
        <span>Зарегестрируватся</span>
      </Button>
    </form>
  );
};

export default observer(FormSignUp);

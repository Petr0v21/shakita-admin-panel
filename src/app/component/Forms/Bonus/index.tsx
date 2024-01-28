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
  BonusLevelType,
  BonusValueType,
} from '../../../../generated/types';
import { bonusService } from '../../../../shared/services/bonusService';

const schema = yup
  .object({
    count: yup.number().required(),
    asset: yup.string().required().min(3),
    description: yup.string().required(),
    isActive: yup.boolean().required(),
    condition: yup.number().optional().nullable(),
  })
  .required();

const FormBonus: (props: {
  type: 'CREATE' | 'UPDATE';
}) => React.JSX.Element = ({ type }) => {
  const { id } = useParams();
  const [bonus, setBonus] = useState<Bonus>({
    id: '',
    asset: '',
    count: 1,
    description: '',
    isActive: false,
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
    valueType: BonusValueType.Point,
  });
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    mode: 'onChange',
    resolver: yupResolver(schema),
    values: { ...bonus },
  });
  useEffect(() => {
    if (id && type === 'UPDATE') {
      bonusService.findBonusBy({ id }).then((res: any) => {
        console.log(res);
        if (res?.length) {
          setBonus({
            ...res[0],
          });
        }
      });
    }
  }, []);

  const sendForm = async (props: typeof schema.__outputType) => {
    console.log('bonus form body', { ...bonus });
    if (id && type === 'UPDATE') {
      return await bonusService.updateBonus({ ...bonus }).then((res) => {
        console.log('res', res);
        if (res) {
          toast('Bonus updated successfully', { type: 'success' });
        } else {
          toast('Error during updating bonus', { type: 'error' });
        }
      });
    }
    return await bonusService.createBonus({ ...bonus }).then((res) => {
      console.log('res', res);
      if (res) {
        toast('Bonus created successfully', { type: 'success' });
      } else {
        toast('Error during creating bonus', { type: 'error' });
      }
    });
  };

  return (
    <>
      <h2>Bonus</h2>
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
              className="form-container-bonus"
              // style={{
              //   display: 'flex',
              //   alignItems: 'flex-end',
              //   gap: '4em',
              // }}
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
                    text={`ID: ${bonus.id.length ? bonus.id : ' - '}`}
                    withCopy={!!bonus.id}
                    value={bonus.id}
                  />
                  <SpanComponent
                    text={`createdAt: ${
                      bonus.createdAt
                        ?.toString()
                        .replace('T', ' ')
                        .slice(0, 19) ?? ' - '
                    }`}
                    value={
                      bonus.createdAt
                        ?.toString()
                        .replace('T', ' ')
                        .slice(0, 19) ?? ' - '
                    }
                  />
                  <SpanComponent
                    text={`updatedAt: ${
                      bonus.createdAt
                        ?.toString()
                        .replace('T', ' ')
                        .slice(0, 19) ?? ' - '
                    }`}
                    value={
                      bonus.createdAt
                        ?.toString()
                        .replace('T', ' ')
                        .slice(0, 19) ?? ' - '
                    }
                  />
                </div>
                <div className="form-column">
                  <DropDownComponentChildren
                    hasValue={
                      bonus.isActive !== undefined && bonus.isActive !== null
                    }
                    labelText="isActive"
                    readOnly
                  >
                    <input
                      type="text"
                      placeholder="isActive"
                      name="isActive"
                      autoComplete="off"
                      value={bonus.isActive ? 'Active' : 'Disactive'}
                      readOnly
                    />
                    <div className="drop-down-content">
                      <span>{''}</span>
                      <span
                        onClick={() =>
                          setBonus({
                            ...bonus,
                            isActive: true,
                          })
                        }
                      >
                        Active
                      </span>
                      <span
                        onClick={() =>
                          setBonus({
                            ...bonus,
                            isActive: false,
                          })
                        }
                      >
                        Disactive
                      </span>
                    </div>
                  </DropDownComponentChildren>
                  <DropDownComponentChildren
                    hasValue={!!bonus.level}
                    labelText="level"
                    readOnly
                  >
                    <input
                      type="text"
                      placeholder="level"
                      name="level"
                      autoComplete="off"
                      value={bonus.level ?? ''}
                      readOnly
                    />
                    <div className="drop-down-content">
                      <span
                        onClick={() =>
                          setBonus({
                            ...bonus,
                            level: BonusLevelType.Junior,
                          })
                        }
                      >
                        {BonusLevelType.Junior}
                      </span>
                      <span
                        onClick={() =>
                          setBonus({
                            ...bonus,
                            level: BonusLevelType.Middle,
                          })
                        }
                      >
                        {BonusLevelType.Middle}
                      </span>
                      <span
                        onClick={() =>
                          setBonus({
                            ...bonus,
                            level: BonusLevelType.Senior,
                          })
                        }
                      >
                        {BonusLevelType.Senior}
                      </span>
                    </div>
                  </DropDownComponentChildren>
                  <InputComponentChildren
                    invalid={!!errors?.condition}
                    errorMessage={errors.condition?.message}
                    hasValue={!!bonus.condition || bonus.condition === 0}
                    labelText="condition"
                  >
                    <input
                      type="text"
                      placeholder="condition"
                      autoComplete="off"
                      value={bonus.condition ?? ''}
                      {...register('condition', {
                        onChange(event: React.SyntheticEvent<Element, Event>) {
                          const target = event.target as HTMLInputElement;
                          setBonus({
                            ...bonus,
                            condition: isNaN(Number(target.value))
                              ? bonus.count
                              : Number(target.value),
                          });
                        },
                        value: bonus.condition,
                      })}
                      name="condition"
                    />
                  </InputComponentChildren>
                </div>
              </div>

              <div className="form-column">
                <div className="form-column">
                  <InputComponentChildren
                    invalid={!!errors?.count}
                    errorMessage={errors.count?.message}
                    hasValue={!!bonus.count || bonus.count === 0}
                    labelText="count"
                  >
                    <input
                      type="text"
                      placeholder="count"
                      autoComplete="off"
                      value={bonus.count ?? ''}
                      {...register('count', {
                        onChange(event: React.SyntheticEvent<Element, Event>) {
                          const target = event.target as HTMLInputElement;
                          setBonus({
                            ...bonus,
                            count: isNaN(Number(target.value))
                              ? bonus.count
                              : Number(target.value),
                          });
                        },
                        value: bonus.count ?? '',
                      })}
                      name="count"
                    />
                  </InputComponentChildren>
                  <DropDownComponentChildren
                    hasValue={!!bonus.valueType}
                    labelText="valueType"
                    readOnly
                  >
                    <input
                      type="text"
                      placeholder="valueType"
                      name="valueType"
                      autoComplete="off"
                      value={bonus.valueType ?? ''}
                      readOnly
                    />
                    <div className="drop-down-content">
                      <span>{''}</span>
                      <span
                        onClick={() =>
                          setBonus({
                            ...bonus,
                            valueType: BonusValueType.Percent,
                          })
                        }
                      >
                        {BonusValueType.Percent}
                      </span>
                      <span
                        onClick={() =>
                          setBonus({
                            ...bonus,
                            valueType: BonusValueType.Point,
                          })
                        }
                      >
                        {BonusValueType.Point}
                      </span>
                    </div>
                  </DropDownComponentChildren>
                </div>
                <div className="form-column">
                  <InputComponentChildren
                    invalid={!!errors?.asset}
                    errorMessage={errors.asset?.message}
                    hasValue={!!bonus.asset}
                    labelText="asset"
                  >
                    <input
                      type="text"
                      placeholder="asset"
                      autoComplete="off"
                      value={bonus.asset ?? ''}
                      {...register('asset', {
                        onChange(event: React.SyntheticEvent<Element, Event>) {
                          const target = event.target as HTMLInputElement;
                          setBonus({
                            ...bonus,
                            asset: target.value,
                          });
                        },
                        value: bonus.asset ?? '',
                      })}
                      name="asset"
                    />
                  </InputComponentChildren>
                  <InputComponentChildren
                    invalid={!!errors?.description}
                    errorMessage={errors.description?.message}
                    hasValue={!!bonus.description}
                    labelText="description"
                  >
                    <textarea
                      placeholder="description"
                      autoComplete="off"
                      value={bonus.description ?? ''}
                      name="count"
                      onChange={(event) => {
                        setBonus({
                          ...bonus,
                          description: event.target.value,
                        });
                      }}
                    />
                  </InputComponentChildren>
                </div>
              </div>
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

export default FormBonus;

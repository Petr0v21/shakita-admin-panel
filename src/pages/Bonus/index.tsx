import React, { useEffect, useRef, useState } from 'react';
import Item from '@component/List/Item';
import { Button, ButtonListItem } from '@/app/styled-components/Button';
import { useNavigate } from 'react-router';
import { Styledlist } from '@/app/styled-components/List';
import { InputComponentChildren } from '@/app/styled-components/Input';
import { DropDownComponentChildren } from '@/app/styled-components/Select';
import { bonusService } from '../../shared/services/bonusService';
import {
  Bonus,
  BonusValueType,
  QueryFindBonusArgs,
} from '../../generated/types';
import { StyledListPage } from '@/app/styled-components/ListPage';

const BonusPage: React.FC = () => {
  const [list, setList] = useState<Bonus[]>([]);
  const [show, setShow] = useState<boolean>(false);
  const [filter, setFilter] = useState<QueryFindBonusArgs>({
    isActive: true,
  });
  const navigate = useNavigate();
  const getList = (withFilter?: boolean) => {
    bonusService
      .findBonusBy({
        ...filter,
        skip: withFilter ? 0 : list.length,
      })
      .then((res) => {
        if (res) {
          setList(withFilter ? (res as Bonus[]) : list.concat(res as Bonus[]));
        }
      });
  };
  const setFilterValue = (props: QueryFindBonusArgs) => {
    setFilter(props);
  };
  const observerTarget = useRef(null);

  useEffect(() => {
    if (show) {
      getList();
      setShow(false);
    }
  }, [show]);

  useEffect(() => {
    getList(true);
  }, [filter]);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting) {
          setShow(true);
        }
      },
      { threshold: 1 },
    );

    if (observerTarget.current) {
      observer.observe(observerTarget.current);
    }

    return () => {
      if (observerTarget.current) {
        observer.unobserve(observerTarget.current);
      }
    };
  }, [observerTarget]);
  return (
    <StyledListPage>
      <h3>Bonus Page</h3>
      <div className="list-filter">
        <InputComponentChildren hasValue={!!filter.id} labelText="id">
          <input
            type="text"
            placeholder="ID"
            name="id"
            value={filter.id ?? ''}
            autoComplete="off"
            onChange={(event) => {
              if (event.target.value.length > 1) {
                setFilterValue({
                  id: event.target.value.length
                    ? event.target.value
                    : undefined,
                });
              } else {
                setFilterValue({
                  ...filter,
                  id: event.target.value.length
                    ? event.target.value
                    : undefined,
                });
              }
            }}
          />
        </InputComponentChildren>
        <InputComponentChildren hasValue={!!filter.asset} labelText="asset">
          <input
            type="text"
            placeholder="asset"
            name="asset"
            autoComplete="off"
            value={filter.asset ?? ''}
            onChange={(event) => {
              if (event.target.value.length > 1) {
                setFilterValue({
                  asset: event.target.value.length
                    ? event.target.value
                    : undefined,
                });
              } else {
                setFilterValue({
                  ...filter,
                  id: undefined,
                  asset: event.target.value.length
                    ? event.target.value
                    : undefined,
                });
              }
            }}
          />
        </InputComponentChildren>
        <DropDownComponentChildren
          hasValue={filter.isActive !== undefined && filter.isActive !== null}
          labelText="isActive"
          readOnly
        >
          <input
            type="text"
            placeholder="isActive"
            name="isActive"
            autoComplete="off"
            value={filter.isActive?.toString() ?? ''}
            readOnly
          />
          <div className="drop-down-content">
            <span
              onClick={() =>
                setFilterValue({
                  ...filter,
                  id: undefined,
                  isActive: undefined,
                })
              }
            >
              {''}
            </span>
            <span
              onClick={() =>
                setFilterValue({
                  ...filter,
                  id: undefined,
                  isActive: true,
                })
              }
            >
              {'Active'}
            </span>
            <span
              onClick={() =>
                setFilterValue({
                  ...filter,
                  id: undefined,
                  isActive: false,
                })
              }
            >
              {'Disactive'}
            </span>
          </div>
        </DropDownComponentChildren>
        <DropDownComponentChildren
          hasValue={filter.valueType !== undefined && filter.valueType !== null}
          labelText="valueType"
          readOnly
        >
          <input
            type="text"
            placeholder="valueType"
            name="valueType"
            autoComplete="off"
            value={filter.valueType?.toString() ?? ''}
            readOnly
          />
          <div className="drop-down-content">
            <span
              onClick={() =>
                setFilterValue({
                  ...filter,
                  id: undefined,
                  valueType: undefined,
                })
              }
            >
              {''}
            </span>
            <span
              onClick={() =>
                setFilterValue({
                  ...filter,
                  id: undefined,
                  valueType: BonusValueType.Point,
                })
              }
            >
              {'Point'}
            </span>
            <span
              onClick={() =>
                setFilterValue({
                  ...filter,
                  id: undefined,
                  valueType: BonusValueType.Percent,
                })
              }
            >
              {'Percent'}
            </span>
          </div>
        </DropDownComponentChildren>
      </div>
      <Styledlist>
        <Item values={['id', 'asset', 'level']} isHeader>
          <ButtonListItem onClick={() => navigate('create')}>
            <span>Add +</span>
          </ButtonListItem>
        </Item>
        <div className="list-content">
          {list.map((item) => (
            <Item
              values={[item.id, item.asset, item.level ?? '-']}
              id={item.id}
              key={item.id}
            >
              <ButtonListItem onClick={() => navigate(item.id)}>
                <span>OPEN</span>
              </ButtonListItem>
            </Item>
          ))}
          <div ref={observerTarget} />
        </div>
      </Styledlist>
    </StyledListPage>
  );
};

export default BonusPage;

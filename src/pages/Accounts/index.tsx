import React, { useEffect, useRef, useState } from 'react';
import store from '../../stores/userStore';
import { AccountDBType } from '@/types';
import Item from '@component/List/Item';
import { ButtonListItem } from '@/app/styled-components/Button';
import { useNavigate } from 'react-router';
import { Styledlist } from '@/app/styled-components/List';
import { QueryFindUsersArgs, UserRole } from '@/generated/types';
import { InputComponentChildren } from '@/app/styled-components/Input';
import { DropDownComponentChildren } from '@/app/styled-components/Select';
import { toast } from 'react-toastify';
import { StyledListPage } from '@/app/styled-components/ListPage';

const AccountsPage: React.FC = () => {
  const [list, setList] = useState<AccountDBType[]>([]);
  const [show, setShow] = useState<boolean>(false);
  const [filter, setFilter] = useState<QueryFindUsersArgs>({
    role: UserRole.User,
  });
  const navigate = useNavigate();
  const getList = (withFilter?: boolean) => {
    store
      .find({
        ...filter,
        skip: withFilter ? 0 : list.length,
      })
      .then((res) => {
        if (res) {
          setList(
            withFilter
              ? (res as AccountDBType[])
              : list.concat(res as AccountDBType[]),
          );
        }
      });
  };
  const setFilterValue = (props: QueryFindUsersArgs) => {
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
      <h3>Account Page</h3>
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
        <InputComponentChildren hasValue={!!filter.contact} labelText="contact">
          <input
            type="text"
            placeholder="contact"
            name="contact"
            autoComplete="off"
            value={filter.contact ?? ''}
            onChange={(event) => {
              if (event.target.value.length > 1) {
                setFilterValue({
                  contact: event.target.value.length
                    ? event.target.value
                    : undefined,
                });
              } else {
                setFilterValue({
                  ...filter,
                  id: undefined,
                  contact: event.target.value.length
                    ? event.target.value
                    : undefined,
                });
              }
            }}
          />
        </InputComponentChildren>
        <InputComponentChildren hasValue={!!filter.name} labelText="name">
          <input
            type="text"
            placeholder="name"
            name="name"
            autoComplete="off"
            value={filter.name ?? ''}
            onChange={(event) => {
              setFilterValue({
                ...filter,
                id: undefined,
                name: event.target.value.length
                  ? event.target.value
                  : undefined,
              });
            }}
          />
        </InputComponentChildren>
        <DropDownComponentChildren
          hasValue={!!filter.role}
          labelText="role"
          readOnly
        >
          <input
            type="text"
            placeholder="role"
            name="role"
            autoComplete="off"
            value={filter.role?.toString() ?? ''}
            readOnly
          />
          <div className="drop-down-content">
            <span
              onClick={() =>
                setFilterValue({
                  ...filter,
                  id: undefined,
                  role: undefined,
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
                  role: UserRole.User,
                })
              }
            >
              {UserRole.User}
            </span>
            <span
              onClick={() =>
                setFilterValue({
                  ...filter,
                  id: undefined,
                  role: UserRole.Admin,
                })
              }
            >
              {UserRole.Admin}
            </span>
            <span
              onClick={() =>
                setFilterValue({
                  ...filter,
                  id: undefined,
                  role: UserRole.Manager,
                })
              }
            >
              {UserRole.Manager}
            </span>
            <span
              onClick={() =>
                setFilterValue({
                  ...filter,
                  id: undefined,
                  role: UserRole.SuperManager,
                })
              }
            >
              {UserRole.SuperManager}
            </span>
            <span
              onClick={() =>
                setFilterValue({
                  ...filter,
                  id: undefined,
                  role: UserRole.Analyt,
                })
              }
            >
              {UserRole.Analyt}
            </span>
            <span
              onClick={() =>
                setFilterValue({
                  ...filter,
                  id: undefined,
                  role: UserRole.Blocked,
                })
              }
            >
              {UserRole.Blocked}
            </span>
          </div>
        </DropDownComponentChildren>
      </div>
      <Styledlist>
        <Item values={['id', 'email', 'name']} isHeader>
          <ButtonListItem onClick={() => navigate('create')}>
            <span>Add +</span>
          </ButtonListItem>
        </Item>
        <div className="list-content">
          {list.map((item) => (
            <Item
              values={[
                item.id,
                item.email ?? item.phone ?? item.telegram ?? 'empty',
                item.name ?? 'user',
              ]}
              id={item.id}
              key={item.id}
            >
              <ButtonListItem onClick={() => navigate(item.id)}>
                <span>OPEN</span>
              </ButtonListItem>
              <ButtonListItem
                style={{
                  background: 'rgba(253, 48, 48, 1)',
                }}
                onClick={() => {
                  if (
                    confirm(`Are you sure you want to block ${item.email}?`)
                  ) {
                    store.delete(item.id).then((res) => {
                      if (res) {
                        toast('User blocked successfully', { type: 'success' });
                        getList(true);
                      } else {
                        toast('Error during blocking user', { type: 'error' });
                      }
                    });
                  }
                }}
              >
                <span>BLOCK</span>
              </ButtonListItem>
            </Item>
          ))}
          <div ref={observerTarget} />
        </div>
      </Styledlist>
    </StyledListPage>
  );
};

export default AccountsPage;

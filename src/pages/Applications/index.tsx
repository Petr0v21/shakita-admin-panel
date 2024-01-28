import React, { useEffect, useRef, useState } from 'react';
import store from '../../stores/bookingStore';
import { useNavigate } from 'react-router';
import { ApplicationFilter, ApplicationDBType } from '@/types';
import { Button, ButtonListItem } from '@/app/styled-components/Button';
import Item from '@/app/component/List/Item';
import { Styledlist } from '@/app/styled-components/List';
import { ApplicationStatus } from '@/generated/types';
import { InputComponentChildren } from '@/app/styled-components/Input';
import { DropDownComponentChildren } from '@/app/styled-components/Select';
import { StyledListPage } from '@/app/styled-components/ListPage';
import { toast } from 'react-toastify';

const ApplicationsPage = () => {
  const [list, setList] = useState<ApplicationDBType[]>([]);
  const [show, setShow] = useState<boolean>(false);
  const [filter, setFilter] = useState<ApplicationFilter>({
    status: ApplicationStatus.Pending,
    date_from: new Date(),
    date_to: new Date(new Date().setFullYear(new Date().getFullYear() + 1)),
  });
  const navigate = useNavigate();

  const getList = (withFilter?: boolean) => {
    store
      .findBy({
        ...filter,
        skip: withFilter ? 0 : list.length,
      })
      .then((res) => {
        if (res) {
          console.log(res);
          setList(
            withFilter
              ? (res as ApplicationDBType[])
              : list.concat(res as ApplicationDBType[]),
          );
        }
      });
  };
  const setFilterValue = (props: ApplicationFilter) => {
    setFilter(props);
  };
  const observerTarget = useRef(null);

  useEffect(() => {
    console.log('filter', { ...filter });
    getList(true);
  }, [filter]);

  useEffect(() => {
    if (show) {
      console.log('show filter', { ...filter });
      getList();
      setShow(false);
    }
  }, [show]);

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
      <h3>Application Page</h3>
      <div className="list-filter">
        <InputComponentChildren hasValue={!!filter.id} labelText="id">
          <input
            type="text"
            placeholder="ID"
            name="id"
            autoComplete="off"
            value={filter.id ?? ''}
            onChange={(event) => {
              (document.getElementById('date_to') as HTMLInputElement).value =
                '';
              (document.getElementById('date_from') as HTMLInputElement).value =
                '';
              setFilterValue({
                id: event.target.value.length ? event.target.value : undefined,
              });
            }}
          />
        </InputComponentChildren>
        <InputComponentChildren
          hasValue={!!filter.date_from}
          labelText="date_from"
        >
          <input
            type="text"
            placeholder="date_from"
            id="date_from"
            name="date_from"
            autoComplete="off"
            defaultValue={filter.date_from?.toISOString().split('T')[0]}
            onChange={(event) =>
              setFilterValue({
                ...filter,
                id: undefined,
                date_from: event.target.value.length
                  ? new Date(event.target.value)
                  : undefined,
              })
            }
          />
        </InputComponentChildren>
        <InputComponentChildren hasValue={!!filter.date_to} labelText="date_to">
          <input
            type="text"
            placeholder="date_to"
            name="date_to"
            id="date_to"
            autoComplete="off"
            defaultValue={filter.date_to?.toISOString().split('T')[0]}
            onChange={(event) =>
              setFilterValue({
                ...filter,
                id: undefined,
                date_to: event.target.value.length
                  ? new Date(event.target.value)
                  : undefined,
              })
            }
          />
        </InputComponentChildren>
        <DropDownComponentChildren
          hasValue={!!filter.status}
          labelText="status"
          readOnly
        >
          <input
            type="text"
            placeholder="status"
            name="status"
            autoComplete="off"
            value={filter.status ?? ''}
            readOnly
          />
          <div
            className="drop-down-content"
            onClick={() => console.log('test')}
          >
            <span
              onClick={() =>
                setFilterValue({
                  ...filter,
                  id: undefined,
                  status: ApplicationStatus.Approved,
                })
              }
            >
              {ApplicationStatus.Approved}
            </span>
            <span
              onClick={() =>
                setFilterValue({
                  ...filter,
                  id: undefined,
                  status: ApplicationStatus.Pending,
                })
              }
            >
              {ApplicationStatus.Pending}
            </span>
            <span
              onClick={() =>
                setFilterValue({
                  ...filter,
                  id: undefined,
                  status: ApplicationStatus.Rejected,
                })
              }
            >
              {ApplicationStatus.Rejected}
            </span>
          </div>
        </DropDownComponentChildren>
        <DropDownComponentChildren
          hasValue={!!filter.place}
          labelText="place"
          readOnly
        >
          <input
            type="text"
            placeholder="place"
            name="place"
            autoComplete="off"
            value={filter.place ?? ''}
            readOnly
          />
          <div className="drop-down-content">
            <span
              onClick={() =>
                setFilterValue({
                  ...filter,
                  place: undefined,
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
                  place: 'test1',
                })
              }
            >
              {'test1'}
            </span>
            <span
              onClick={() =>
                setFilterValue({
                  ...filter,
                  id: undefined,
                  place: 'test2',
                })
              }
            >
              {'test2'}
            </span>
            <span
              onClick={() =>
                setFilterValue({
                  ...filter,
                  id: undefined,
                  place: 'test3',
                })
              }
            >
              {'test3'}
            </span>
          </div>
        </DropDownComponentChildren>
      </div>
      <Styledlist>
        <Item values={['date', 'place', 'name']} isHeader>
          <ButtonListItem onClick={() => navigate('create')}>
            <span>Add +</span>
          </ButtonListItem>
        </Item>
        <div className="list-content">
          {list.map((item) => (
            <Item
              values={[
                item.date!.toString().replace('T', ' ').slice(0, 16),
                item.place,
                item.name,
              ]}
              id={item.id}
              key={item.id + item.date!.toString() + item.name}
            >
              <ButtonListItem onClick={() => navigate(item.id)}>
                <span>OPEN</span>
              </ButtonListItem>
              <ButtonListItem
                style={{
                  background: 'rgb(12 119 42)',
                  border: '1px solid rgb(39 215 89)',
                }}
                onClick={() => {
                  if (confirm('Are you sure?')) {
                    console.log('APPROVE', item.id);
                    store
                      .updateStatus(item.id, ApplicationStatus.Approved)
                      .then((res: any) => {
                        if (res) {
                          toast('Application approved successfully', {
                            type: 'success',
                          });
                          getList(true);
                        } else {
                          toast('Error during approving application', {
                            type: 'error',
                          });
                        }
                      });
                  }
                }}
              >
                <span>APPROVE</span>
              </ButtonListItem>
              <ButtonListItem
                style={{
                  background: 'rgba(253, 48, 48, 1)',
                }}
                onClick={() => {
                  if (
                    confirm(
                      `Are you sure you want to reject ${item.id} - ${item.name} on ${item.date}?`,
                    )
                  ) {
                    store
                      .updateStatus(item.id, ApplicationStatus.Rejected)
                      .then((res: any) => {
                        if (res) {
                          toast('Application rejected successfully', {
                            type: 'success',
                          });
                          getList(true);
                        } else {
                          toast('Error during rejecting application', {
                            type: 'error',
                          });
                        }
                      });
                  }
                }}
              >
                <span>REJECT</span>
              </ButtonListItem>
            </Item>
          ))}
          <div ref={observerTarget} />
        </div>
      </Styledlist>
    </StyledListPage>
  );
};

export default ApplicationsPage;

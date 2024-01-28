import React, { useEffect, useState } from 'react';
import Pie from '../../app/component/Dashboard/Pie';
import { LineComponent } from '../../app/component/Dashboard/Line';
import {
  StatisticActualBar,
  StatisticGeneralBar,
} from '../../app/component/Dashboard/Bar';
import { DashboardStyled } from '../../app/styled-components/Dashboard';
import { analyticsService } from '@services/analyticsService';
import {
  AnalyticsActualDataType,
  AnalyticsAllDataType,
  AnalyticsAllHistoryDataType,
} from '@/types';

const Dashboard: React.FC = () => {
  const [pieState, setPieState] = useState<number[]>([]);
  const [actualAnalyticsState, setActualAnalyticsState] =
    useState<AnalyticsActualDataType>({
      applications: 0,
      users: 0,
      average: {
        applications: '0/0',
        applications_percent: '0',
        users: '0/0',
        users_percent: '0',
      },
    });
  const [generalAnalyticsState, setGeneralAnalyticsState] =
    useState<AnalyticsAllDataType>({
      applications: 0,
      users: 0,
      average: {
        applications: '',
        users: '',
      },
    });
  const [analyticsHistoryState, setAnalyticsHistoryState] =
    useState<AnalyticsAllHistoryDataType>({
      applications: [],
      users: [],
    });
  useEffect(() => {
    analyticsService.getCorrelationApplicationsData({}).then((res) => {
      if (res) {
        setPieState(Object.values(res) as number[]);
      }
    });
    analyticsService.getActualData().then((res) => {
      if (res) {
        setActualAnalyticsState(res as AnalyticsActualDataType);
      }
    });
    analyticsService.getAllData().then((res) => {
      if (res) {
        setGeneralAnalyticsState(res as AnalyticsAllDataType);
      }
    });

    analyticsService
      .getHistoryData({
        fillEmptyMonth: true,
      })
      .then((res) => {
        console.log('getHistoryData', res);
        if (res) {
          setAnalyticsHistoryState(res as AnalyticsAllHistoryDataType);
        }
      });
  }, []);
  return (
    <DashboardStyled
      style={{
        gap: '1em',
      }}
    >
      <h2>Dashboard</h2>
      <div
        className="row"
        style={{
          width: '100%',
          gap: '4em',
          maxWidth: 796,
          justifyContent: 'center',
          flexWrap: 'wrap',
          alignItems: 'center',
        }}
      >
        <StatisticActualBar data={actualAnalyticsState} />
        <div style={{ padding: '0 2em' }}>
          <Pie data={pieState} />
        </div>
      </div>
      <div className="row">
        <StatisticGeneralBar data={generalAnalyticsState} />
      </div>
      <div className="optional-statistic">
        <div className="optional-close-item">
          <LineComponent data={analyticsHistoryState} />
        </div>
      </div>
    </DashboardStyled>
  );
};

export default Dashboard;

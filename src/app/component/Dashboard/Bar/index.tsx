import React from 'react';
import { BarItemStyled, BarStyled } from '../../../styled-components/Bar';
import { AnalyticsActualDataType, AnalyticsAllDataType } from '@/types';

export const StatisticActualBar: React.FC<{
  data: AnalyticsActualDataType;
}> = ({ data }) => {
  const chooseColor = (percent: string) => {
    if (percent === '0.00') {
      return 'white';
    }
    if (percent.includes('-')) {
      return 'rgba(253, 48, 48, 1)';
    } else {
      return 'rgba(52, 182, 88, 1)';
    }
  };
  return (
    <BarStyled>
      <h3>Actual</h3>
      <BarItemStyled>
        <div className="statistic-item-main-content">
          <h6>Users:</h6>
          <span>{data.users}</span>
        </div>
        <div
          className="statistic-item-details"
          style={{ color: chooseColor(data.average.users_percent) }}
        >
          <strong>{data.average.users_percent}%</strong>
          <span>{data.average.users}</span>
        </div>
      </BarItemStyled>
      <BarItemStyled>
        <div className="statistic-item-main-content">
          <h6>Applications:</h6>
          <span>{data.applications}</span>
        </div>
        <div
          className="statistic-item-details"
          style={{ color: chooseColor(data.average.applications_percent) }}
        >
          <strong>{data.average.applications_percent}%</strong>
          <span>{data.average.applications}</span>
        </div>
      </BarItemStyled>
      <BarItemStyled>
        <div className="statistic-item-main-content">
          <h6>Grow Index:</h6>
          <span>???</span>
        </div>
        <div className="statistic-item-details">???</div>
      </BarItemStyled>
    </BarStyled>
  );
};

export const StatisticGeneralBar: React.FC<{ data: AnalyticsAllDataType }> = ({
  data,
}) => {
  return (
    <BarStyled>
      <h3>General</h3>
      <div
        className="row"
        style={{
          flexWrap: 'wrap',
          justifyContent: 'center',
        }}
      >
        <BarItemStyled style={{ width: '240px' }}>
          <div
            className="statistic-item-main-content"
            style={{ width: '100%' }}
          >
            <h6>Users:</h6>
            <span>{data.users}</span>
          </div>
        </BarItemStyled>
        <BarItemStyled style={{ width: '240px' }}>
          <div
            className="statistic-item-main-content"
            style={{ width: '100%' }}
          >
            <h6>Applications:</h6>
            <span>{data.applications}</span>
          </div>
        </BarItemStyled>
        <BarItemStyled style={{ width: '240px' }}>
          <div
            className="statistic-item-main-content"
            style={{ width: '100%' }}
          >
            <h6>Average:</h6>
            <span>
              {data.average.applications}/{data.average.users}
            </span>
          </div>
        </BarItemStyled>
      </div>
    </BarStyled>
  );
};

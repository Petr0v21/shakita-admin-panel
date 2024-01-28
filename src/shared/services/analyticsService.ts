import { getActualData } from '../../generated/query/getActualData';
import { getAllData } from '../../generated/query/getAllData';
import { getCorrelationApplicationsData } from '../../generated/query/getCorrelationApplicationsData';
import { getHistoryData } from '../../generated/query/getHistoryData';
import {
  QueryGetCorrelationApplicationsDataArgs,
  QueryGetHistoryDataArgs,
} from '../../generated/types';
import { query } from '../query';

export class AnalyticsService {
  async getActualData() {
    const res = await query(
      getActualData({
        applications: true,
        users: true,
        average: {
          applications: true,
          applications_percent: true,
          users: true,
          users_percent: true,
        },
      }),
      null,
    );
    return res;
  }

  async getAllData() {
    const res = await query(
      getAllData({
        applications: true,
        users: true,
        average: {
          applications: true,
          users: true,
        },
      }),
      null,
    );
    return res;
  }

  async getCorrelationApplicationsData(
    args: QueryGetCorrelationApplicationsDataArgs,
  ) {
    const res = await query(
      getCorrelationApplicationsData({
        applications_auth: true,
        applications_unauth: true,
      }),
      args.endOf && args.startOf ? args : null,
    );
    return res;
  }

  async getHistoryData(args: QueryGetHistoryDataArgs) {
    const res = await query(
      getHistoryData({
        applications: {
          count: true,
          month: true,
          year: true,
        },
        users: {
          count: true,
          month: true,
          year: true,
        },
      }),
      args,
    );
    return res;
  }
}

export const analyticsService = new AnalyticsService();

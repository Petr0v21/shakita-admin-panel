import { createOneApplication } from '../../generated/mutation/createOneApplication';
import { updateOneApplication } from '../../generated/mutation/updateOneApplication';
import { deleteOneApplication } from '../../generated/mutation/deleteOneApplication';
import { findApplicationsByDate } from '../../generated/query/findApplicationsByDate';
import { findOneApplication } from '../../generated/query/findOneApplication';
import { findApplications } from '../../generated/query/findApplications';
import {
  MutationCreateOneApplicationArgs,
  MutationDeleteOneApplicationArgs,
  MutationUpdateOneApplicationArgs,
  QueryFindApplicationsByDateArgs,
  QueryFindOneApplicationArgs,
  QueryFindApplicationsArgs,
} from '../../generated/types';
import { query } from '../query';
export class BookingService {
  async book(data: MutationCreateOneApplicationArgs) {
    const res = await query(
      createOneApplication({
        id: true,
        createdAt: true,
        date: true,
        email: true,
        status: true,
        place: true,
        name: true,
      }),
      data,
    );
    return res;
  }

  async find(data: QueryFindApplicationsByDateArgs) {
    const res = await query(
      findApplicationsByDate({
        id: true,
        createdAt: true,
        date: true,
        status: true,
        place: true,
      }),
      data,
    );
    return res;
  }

  async findOne(data: QueryFindOneApplicationArgs) {
    const res = await query(
      findOneApplication({
        id: true,
        createdAt: true,
        date: true,
        status: true,
        place: true,
        description: true,
        email: true,
        enable_notification: true,
        instagram: true,
        name: true,
        phone: true,
        telegram: true,
        updatedAt: true,
        user: {
          id: true,
        },
      }),
      data,
    );
    return res;
  }

  async findBy(data: QueryFindApplicationsArgs) {
    const res = await query(
      findApplications({
        id: true,
        createdAt: true,
        date: true,
        status: true,
        place: true,
        name: true,
      }),
      data,
    );
    return res;
  }

  async update(data: MutationUpdateOneApplicationArgs) {
    const res = await query(
      updateOneApplication({
        success: true,
      }),
      data,
    );
    return res;
  }

  async delete(data: MutationDeleteOneApplicationArgs) {
    const res = await query(
      deleteOneApplication({
        success: true,
      }),
      data,
    );
    return res;
  }
}

export const bookingService = new BookingService();

import { updateMe } from '../../generated/mutation/updateMe';
import { createOneUser } from '../../generated/mutation/createOneUser';
import { deleteOneUser } from '../../generated/mutation/deleteOneUser';
import { updateOneUser } from '../../generated/mutation/updateOneUser';
import { findOneUser } from '../../generated/query/findOneUser';
import { findUsers } from '../../generated/query/findUsers';
import { getMe } from '../../generated/query/getMe';
import {
  MutationUpdateMeArgs,
  MutationUpdateOneUserArgs,
  MutationDeleteOneUserArgs,
  MutationCreateOneUserArgs,
  QueryFindOneUserArgs,
  QueryFindUsersArgs,
} from '../../generated/types';
import { query } from '../query';
export class UserService {
  async getMyInfo() {
    const res = await query(
      getMe({
        id: true,
        email: true,
        name: true,
        phone: true,
        role: true,
        picture: true,
        enable_notifications: true,
        verified_email: true,
        isFullAuth: true,
        isGoogleAuth: true,
        instagram: true,
        telegram: true,
        updatedAt: true,
        createdAt: true,
        // bonusTickets: {
        //   id: true,
        //   isActive: true,
        //   payload: true,
        //   createdAt: true,
        //   updatedAt: true,
        //   asset: true,
        //   count: true,
        // },
        applications: {
          id: true,
          date: true,
          email: true,
          description: true,
          status: true,
          place: true,
          name: true,
          phone: true,
          enable_notification: true,
          instagram: true,
          telegram: true,
          createdAt: true,
          updatedAt: true,
        },
        sessions: {
          id: true,
          ip: true,
          refreshToken: true,
          userAgent: true,
          createdAt: true,
          updatedAt: true,
        },
      }),
      null,
    );
    return res;
  }

  async find(data: QueryFindUsersArgs) {
    const res = await query(
      findUsers({
        id: true,
        email: true,
        role: true,
        createdAt: true,
        instagram: true,
        name: true,
        phone: true,
        telegram: true,
        updatedAt: true,
      }),
      data,
    );
    console.log('findUsers', res);
    return res;
  }

  async findOne(data: QueryFindOneUserArgs) {
    console.log('find data', data);
    const res = await query(
      findOneUser({
        id: true,
        email: true,
        role: true,
        createdAt: true,
        enable_notifications: true,
        google_id: true,
        instagram: true,
        isFullAuth: true,
        isGoogleAuth: true,
        name: true,
        phone: true,
        picture: true,
        telegram: true,
        updatedAt: true,
        verified_email: true,
        applications: {
          id: true,
          date: true,
          place: true,
          status: true,
        },
      }),
      data,
    );
    console.log(res);
    return res;
  }

  async update(data: MutationUpdateMeArgs) {
    console.log('update data', data);
    const res = await query(
      updateMe({
        success: true,
      }),
      data,
    );
    console.log(res);
    return res;
  }

  async createOneUser(data: MutationCreateOneUserArgs) {
    console.log('create One user data', data);
    const res = await query(
      createOneUser({
        id: true,
        email: true,
        name: true,
        role: true,
        createdAt: true,
      }),
      data,
    );
    console.log(res);
    return res;
  }

  async updateOneUser(data: MutationUpdateOneUserArgs) {
    console.log('update One user data', data);
    const res = await query(
      updateOneUser({
        success: true,
      }),
      data,
    );
    console.log(res);
    return res;
  }

  async deleteOneUser(data: MutationDeleteOneUserArgs) {
    console.log('delete One user data', data);
    const res = await query(
      deleteOneUser({
        success: true,
      }),
      data,
    );
    console.log(res);
    return res;
  }
}

export const userService = new UserService();

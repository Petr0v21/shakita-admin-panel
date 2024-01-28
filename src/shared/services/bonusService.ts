import { updateBonus } from '../../generated/mutation/updateBonus';
import { updateBonusTicket } from '../../generated/mutation/updateBonusTicket';
import { deleteBonus } from '../../generated/mutation/deleteBonus';
import { deleteBonusTicket } from '../../generated/mutation/deleteBonusTicket';
import { createBonus } from '../../generated/mutation/createBonus';
import { createBonusTicket } from '../../generated/mutation/createBonusTicket';
import { activateBonus } from '../../generated/mutation/activateBonus';
import { getTicket } from '../../generated/query/getTicket';
import { findBonus } from '../../generated/query/findBonus';
import {
  MutationDeleteBonusTicketArgs,
  MutationDeleteBonusArgs,
  MutationUpdateBonusArgs,
  MutationUpdateBonusTicketArgs,
  QueryFindBonusArgs,
  QueryGetTicketArgs,
  MutationCreateBonusArgs,
  MutationActivateBonusArgs,
  MutationCreateBonusTicketArgs,
} from '../../generated/types';
import { query } from '../query';

export class BonusService {
  async getTicket(data: QueryGetTicketArgs) {
    const res = await query(
      getTicket({
        id: true,
        activeTill: true,
        code: true,
        isActive: true,
        ticketType: true,
        bonus: {
          id: true,
          asset: true,
          condition: true,
          count: true,
          description: true,
          isActive: true,
          level: true,
          payload: true,
          valueType: true,
          updatedAt: true,
          createdAt: true,
        },
        user: {
          id: true,
          email: true,
          name: true,
        },
        createdAt: true,
        updatedAt: true,
      }),
      data,
    );
    return res;
  }

  async findBonusBy(data: QueryFindBonusArgs) {
    const res = await query(
      findBonus({
        id: true,
        asset: true,
        condition: true,
        count: true,
        description: true,
        isActive: true,
        level: true,
        payload: true,
        valueType: true,
        updatedAt: true,
        createdAt: true,
      }),
      data,
    );
    return res;
  }

  async createBonus(data: MutationCreateBonusArgs) {
    const res = await query(
      createBonus({
        id: true,
        asset: true,
        condition: true,
        count: true,
        description: true,
        isActive: true,
        level: true,
        payload: true,
        valueType: true,
        createdAt: true,
        updatedAt: true,
      }),
      data,
    );
    return res;
  }

  async createBonusTicket(data: MutationCreateBonusTicketArgs) {
    const res = await query(
      createBonusTicket({
        id: true,
        activeTill: true,
        code: true,
        isActive: true,
        ticketType: true,
      }),
      data,
    );
    return res;
  }

  async updateBonus(data: MutationUpdateBonusArgs) {
    const res = await query(
      updateBonus({
        success: true,
      }),
      data,
    );
    return res;
  }

  async updateBonusTicket(data: MutationUpdateBonusTicketArgs) {
    const res = await query(
      updateBonusTicket({
        success: true,
      }),
      data,
    );
    return res;
  }

  async disActiveBonusTicket(data: MutationDeleteBonusTicketArgs) {
    const res = await query(
      deleteBonusTicket({
        success: true,
      }),
      data,
    );
    return res;
  }

  async disActiveBonus(data: MutationDeleteBonusArgs) {
    const res = await query(
      deleteBonus({
        success: true,
      }),
      data,
    );
    return res;
  }

  async activeBonusTicket(data: MutationActivateBonusArgs) {
    const res = await query(
      activateBonus({
        success: true,
      }),
      data,
    );
    return res;
  }
}

export const bonusService = new BonusService();

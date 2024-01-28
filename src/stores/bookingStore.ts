import { makeAutoObservable } from 'mobx';
import {
  BookingService,
  bookingService,
} from '../shared/services/bookingService';
import { ApplicationDBType } from '../types';
import {
  ApplicationStatus,
  MutationCreateOneApplicationArgs,
  MutationUpdateOneApplicationArgs,
  QueryFindApplicationsArgs,
} from '@/generated/types';

class BookingStore {
  body: ApplicationDBType = {
    date: '',
    email: '',
    place: '',
    name: '',
    enable_notification: true,
    id: '',
  };
  constructor(private readonly bookingService: BookingService) {
    makeAutoObservable(this);
  }

  addField(value: string | boolean, name: string) {
    this.body = { ...this.body, [name]: value };
  }

  cleanForm() {
    this.body = {
      date: this.body.date,
      email: '',
      place: '',
      name: '',
      enable_notification: true,
      id: '',
    };
  }

  async book(data: MutationCreateOneApplicationArgs) {
    try {
      const result = await this.bookingService.book(data);
      console.log(result);
      this.cleanForm();
      return result;
    } catch (err) {
      console.error('Book Error', err);
    }
  }

  async find() {
    try {
      const result = await this.bookingService.find({ date: this.body.date });
      console.log(result);
      return result;
    } catch (err) {
      console.error('find Error', err);
    }
  }

  async findBy(props: QueryFindApplicationsArgs) {
    try {
      console.log('props', props);
      const result = await this.bookingService.findBy({
        ...props,
      });
      console.log('result', result);
      return result;
    } catch (err) {
      console.error('findBy Error', err);
    }
  }

  async findOne(id: string) {
    try {
      const result = await this.bookingService.findOne({ id });
      console.log(result);
      return result;
    } catch (err) {
      console.error('findOne Error', err);
    }
  }

  async delete(id: string) {
    try {
      const result = (await this.bookingService.delete({ id })) as {
        success: boolean;
      };
      if (result && result.success) {
        return result.success;
      }
      return false;
    } catch (err) {
      console.error('findOne Error', err);
    }
  }

  async update(data: MutationUpdateOneApplicationArgs) {
    try {
      const result = (await this.bookingService.update(data)) as {
        success: boolean;
      };
      if (result && result.success) {
        return result.success;
      }
      return false;
    } catch (err) {
      console.error('findOne Error', err);
    }
  }

  async updateStatus(id: string, status: ApplicationStatus) {
    try {
      const result = (await this.bookingService.update({ status, id })) as {
        success: boolean;
      };
      if (result && result.success) {
        return result.success;
      }
      return false;
    } catch (err) {
      console.error('findOne Error', err);
    }
  }
}
export default new BookingStore(bookingService);

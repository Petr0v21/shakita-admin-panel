import { AccountDBType } from '@/types';
import { makeAutoObservable } from 'mobx';
import { UserService, userService } from '../shared/services/userService';
import {
  MutationCreateOneUserArgs,
  MutationUpdateOneUserArgs,
  QueryFindOneUserArgs,
  QueryFindUsersArgs,
  UserRole,
} from '@/generated/types';

class UserStore {
  user: AccountDBType = {
    id: '',
    email: '',
    enable_notifications: false,
    isFullAuth: false,
    role: UserRole.User,
  };
  constructor(private readonly userService: UserService) {
    makeAutoObservable(this);
  }

  addField(value: string | boolean, name: string) {
    this.user = { ...this.user, [name]: value };
  }

  cleanForm() {
    this.user = {
      id: '',
      email: '',
      enable_notifications: false,
      isFullAuth: false,
      role: UserRole.User,
    };
  }

  async handleFileUpload(event: any) {
    const file = event.target.files[0];
    const formData = new FormData();
    formData.append('file', file);

    try {
      const accessToken = (
        await JSON.parse(localStorage.getItem('tokens') as string)
      ).accessToken;
      const result = await fetch('https://shakita-core.onrender.com/file/upload', {
        method: 'POST',
        headers: {
          Authorization: `Bearer ${accessToken}`,
          // 'Content-Type': 'multipart/form-data;',
        },
        body: formData,
      })
        .then((res) => res.json())
        .then((json) => json)
        .catch((err) => console.error(err));
      return result;
    } catch (error) {
      console.error('Error:', error);
    }
  }

  async uploadImage(event: any) {
    const res:
      | {
          Location: string;
          Key: string;
        }
      | null
      | undefined = await this.handleFileUpload(event);

    if (res) {
      this.user.picture = res.Location;
    }
  }

  async getMe() {
    try {
      const result = await this.userService.getMyInfo();
      if ((result as any)?.id) {
        this.user = result as any;
        return true;
      } else {
        return false;
      }
    } catch (e) {
      console.error(e);
      return false;
    }
  }

  async find(args: QueryFindUsersArgs) {
    try {
      const result = await this.userService.find(args);

      return result;
    } catch (e) {
      console.error(e);
      return false;
    }
  }

  async findOne(args: QueryFindOneUserArgs) {
    try {
      const result = await this.userService.findOne(args);

      return result;
    } catch (e) {
      console.error(e);
      return false;
    }
  }

  async updateMe() {
    try {
      const result = await this.userService.update({
        id: this.user.id,
        name: this.user.name,
        phone: this.user.phone,
        instagram: this.user.instagram,
        password: this.user.password,
        telegram: this.user.telegram,
        enable_notifications: this.user.enable_notifications,
        picture: this.user.picture,
      });
      if ((result as any)?.success) {
        return true;
      } else {
        return false;
      }
    } catch (e) {
      console.error(e);
      return false;
    }
  }

  async create(args: MutationCreateOneUserArgs) {
    try {
      const result = await this.userService.createOneUser(args);
      return result;
    } catch (err) {
      console.error('findOne Error', err);
    }
  }

  async delete(id: string) {
    try {
      const result = (await this.userService.deleteOneUser({ id })) as {
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

  async update(args: MutationUpdateOneUserArgs) {
    try {
      const result = (await this.userService.updateOneUser(args)) as {
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
export default new UserStore(userService);

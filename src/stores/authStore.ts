import { AuthFormType } from '@/types';
import { makeAutoObservable } from 'mobx';
import { AuthService, authService } from '@services/authService';

class AuthStore {
  authFormState: AuthFormType = {
    name: '',
    email: '',
    phone: '',
    password: '',
    confirm_password: '',
    code: '',
  };
  constructor(private readonly authService: AuthService) {
    makeAutoObservable(this);
  }

  addField(value: string, name: string) {
    this.authFormState = { ...this.authFormState, [name]: value };
  }

  cleanForm() {
    this.authFormState = {
      name: '',
      email: '',
      phone: '',
      password: '',
      confirm_password: '',
      code: '',
    };
  }

  async signUp() {
    try {
      const result = await this.authService.register({
        email: this.authFormState.email,
        password: this.authFormState.password,
        phone: this.authFormState.phone,
      });
      return result;
    } catch (e) {
      throw e;
    }
  }

  async logIn() {
    try {
      const result = await this.authService.login({
        email: this.authFormState.email,
        password: this.authFormState.password,
      });

      return result;
    } catch (e) {
      throw e;
    }
  }

  async logOut(token: string) {
    try {
      const result = await this.authService.logout({
        token,
      });

      return result;
    } catch (e) {
      throw e;
    }
  }

  async googleAuth(token: string) {
    try {
      const result = await this.authService.googleAuth({
        token,
      });
      return result;
    } catch (e) {
      throw e;
    }
  }
}
export default new AuthStore(authService);

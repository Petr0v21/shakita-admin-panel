import { GraphQLError } from 'graphql';
import { toast } from 'react-toastify';

export class ErrorService {
  private errCode: number | null = null;
  private errMessage: string | null = null;
  private errMessagesStatic = [
    'Forbidden',
    'Bad Request Exception',
    'Unauthorized',
    'INTERNAL_SERVER_ERROR',
  ];

  public setError(error: any) {
    this.errCode = error.response?.statusCode;
    this.errMessage = error.response?.message;
    if (error.toString().includes('Unauthorized')) {
    }
    const message = error.response?.errors?.map((err: any) => err.message)[0];
    const currentStaticError = this.errMessagesStatic.find((errValue) =>
      error.toString().includes(errValue),
    );
    toast(message ?? currentStaticError ?? 'Error', {
      type: 'error',
    });
    // errorBounderModel.setErrorsTrue();
  }
}

export const errorService = new ErrorService();

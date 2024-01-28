import { GraphQLClient } from 'graphql-request';
import { Tokens } from '../../generated/types';

const endpoint = 'https://shakita-core.onrender.com/graphql';

export class GraphQLService {
  public graphQLClient: GraphQLClient;

  private accessToken: string = '';
  private refreshToken: string = '';

  constructor() {
    this.setTokens();

    this.graphQLClient = new GraphQLClient(endpoint, {
      headers: {
        Authorization: this.getAccessToken()
          ? `Bearer ${this.getAccessToken()}`
          : '',
      },
    });
  }

  private setTokens() {
    if (typeof localStorage !== 'undefined') {
      const tokensString = localStorage.getItem('tokens');
      if (tokensString && tokensString !== 'undefined') {
        const tokens: Tokens = JSON.parse(tokensString);
        this.accessToken = tokens.accessToken;
        this.refreshToken = tokens.refreshToken;
      }
    }
  }

  public getAccessToken() {
    this.setTokens();
    return this.accessToken;
  }

  public getRefreshToken() {
    this.setTokens();
    return this.refreshToken;
  }

  public refreshClient() {
    this.graphQLClient.setHeader(
      'Authorization',
      this.getAccessToken() ? `Bearer ${this.getAccessToken()}` : '',
    );
  }
}

export const gql = new GraphQLService();

import { Address, BankAccount, Company } from '@fena/types';
import { Auth } from 'aws-amplify';
import router from 'next/router';
import { stringify } from 'querystring';
import { ProviderApiType, UserApiType } from '../types/api';

const apiUrl = process.env.NEXT_PUBLIC_API_URL as string;
// const apiUrl = 'http://localhost:8084/';
// const providerApiUrl = 'http://localhost:8080/';
console.log({ apiUrl });

class Api {
  private readonly mainUrl: string;
  private readonly defaultHeaders: Headers;

  constructor(url: string) {
    this.mainUrl = url;
    this.defaultHeaders = new Headers();
    this.defaultHeaders.set('Content-type', 'application/json');
    if (typeof window !== 'undefined') {
      const token = window.localStorage.getItem('fenaToken');
      if (token) this.defaultHeaders.set('accesstoken', token);
    }
  }

  async renewToken() {
    const session = await Auth.currentSession();
    const accessToken = session.getAccessToken();
    const jwt = accessToken.getJwtToken();
    this.updateHeadersWithToken(jwt);
  }

  async fetcher(url: string, init: Record<string, any>) {
    const result = await fetch(url, init);
    if (!result.ok) {
      if (result.status === 401) {
        await this.renewToken();
        const retryResult = await fetch(url, init);
        if (!retryResult.ok && retryResult.status === 401) {
          throw { status: result.status };
        } else {
          return retryResult;
        }
      }
      if (result.status === 403) {
        await router.push({ pathname: '/login/suspended' });
      }
      throw { status: result.status };
    }
    return result;
  }

  updateHeadersWithToken(token: string) {
    this.defaultHeaders.set('accesstoken', token);
  }

  async getUser(): Promise<UserApiType> {
    const url = new URL(this.mainUrl + 'user/data');
    const result = await this.fetcher(url.toString(), {
      method: 'get',
      headers: this.defaultHeaders,
    });
    const data = await result.json();
    return data.data;
  }

  async getCompany() {
    const url = new URL(this.mainUrl + 'company/get');
    const result = await this.fetcher(url.toString(), {
      method: 'get',
      headers: this.defaultHeaders,
    });
    const data = await result.json();
    return data.data;
  }

  async getDashboardStats() {
    const url = new URL(this.mainUrl + 'partner/companies/list');
    const result = await this.fetcher(url.toString(), {
      method: 'GET',
      headers: this.defaultHeaders,
    });
    const data = await result.json();
    return data.data;
  }

  async createApiKey(name: { name: string }) {
    console.log('keyApiData', name);
    const url = new URL(this.mainUrl + 'partner/access-keys/create');
    const result = await this.fetcher(url.toString(), {
      method: 'POST',
      body: JSON.stringify(name),
      headers: this.defaultHeaders,
    });
    return await result.json();
  }

  async createMerchant(
    merchantData: Partial<Company> & {
      address: Partial<Address>;
      bankAccount?: Partial<BankAccount>;
      directorsInfo?: any;
      tradingAddress?: Partial<Address>;
    }
  ) {
    console.log('apiData', merchantData);
    const url = new URL(this.mainUrl + 'partner/companies/create');
    const result = await this.fetcher(url.toString(), {
      method: 'POST',
      body: JSON.stringify(merchantData),
      headers: this.defaultHeaders,
    });
    return await result.json();
  }

  async getProviders(): Promise<Array<ProviderApiType>> {
    const url = new URL(`${this.mainUrl}providers/list`);

    const result = await this.fetcher(url.toString(), {
      method: 'GET',
      headers: this.defaultHeaders,
    });
    const data = await result.json();
    return data.data;
  }

  async updateAccount(accountData: any, companyId: string, accountId: string) {
    const url = new URL(
      `${this.mainUrl}partner/companies/${companyId}/bank-accounts/${accountId}/edit`
    );
    const result = await this.fetcher(url.toString(), {
      method: 'PUT',
      headers: this.defaultHeaders,
      body: JSON.stringify(accountData),
    });
    return await result.json();
  }

  async getPaginatedTransactions(
    page: number,
    limit?: number,
    status?: string,
    customFilter?: any
  ) {
    const queryString = stringify({
      limit,
      status,
      page,
      ...customFilter,
    });
    console.log(queryString);
    const url = new URL(
      `${this.mainUrl}company/transactions/list?${queryString}`
    );
    const result = await this.fetcher(url.toString(), {
      method: 'GET',
      headers: this.defaultHeaders,
    });
    const data = await result.json();
    return data.data;
  }

  async getPaginatedMerchants(
    page: number,
    limit?: number,
    status?: string,
    customFilter?: any
  ) {
    const queryString = stringify({
      limit,
      status,
      page,
      ...customFilter,
    });
    console.log(queryString);
    const url = new URL(`${this.mainUrl}partner/companies/list?${queryString}`);
    const result = await this.fetcher(url.toString(), {
      method: 'GET',
      headers: this.defaultHeaders,
    });
    const data = await result.json();
    return data.data;
  }

  async getMerchant(id: string): Promise<Array<ProviderApiType>> {
    const url = new URL(`${this.mainUrl}partner/companies/${id}/data`);

    const result = await this.fetcher(url.toString(), {
      method: 'GET',
      headers: this.defaultHeaders,
    });
    const data = await result.json();
    return data.data;
  }

  async disableMerchant(id: string) {
    const url = new URL(this.mainUrl + `partner/companies/${id}/ban`);
    const result = await this.fetcher(url.toString(), {
      method: 'GET',
      headers: this.defaultHeaders,
    });
    return await result.json();
  }
}

export default new Api(apiUrl);

import { Auth } from 'aws-amplify';
import router from 'next/router';

// const apiUrl = process.env.NEXT_PUBLIC_API_URL as string;
const apiUrl = 'http://localhost:8084/';
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

  async getCompaniesHouseData(crn: string) {
    const url = new URL(this.mainUrl + 'ch/get');
    url.searchParams.set('q', crn);
    const result = await this.fetcher(url.toString(), {
      method: 'GET',
    });
    const data = await result.json();
    return data.data;
  }

  // async getProviders(): Promise<Array<ProviderApiType>> {
  //   const url = new URL(`${this.mainUrl}providers/list`);

  //   const result = await this.fetcher(url.toString(), {
  //     method: 'GET',
  //     headers: this.defaultHeaders,
  //   });
  //   const data = await result.json();
  //   return data.data;
  // }
}

export default new Api(apiUrl);
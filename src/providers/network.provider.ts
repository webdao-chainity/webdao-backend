import { Injectable } from '@nestjs/common';
import type fetch from 'node-fetch';

/**
 * `NetworkProvider` acts as interface for network actions.
 */
@Injectable()
export class NetworkProvider {
  /**
   * Network instance to handle request calls. Use `fetch`.
   * @private
   */
  private networkInstance: typeof fetch;

  /**
   * Constructor
   */
  public constructor() {
    (
      new Function(`return import ('node-fetch')`)() as Promise<
        typeof import('node-fetch')
      >
    ).then((module) => {
      this.networkInstance = module.default;
    });
  }

  /**
   * To make request
   * @param url
   * @param options
   * @private
   */
  public async request<T>(url: string, options: any): Promise<T> {
    const explicitUrl = `${url}`;

    const resp = await this.networkInstance(explicitUrl, options);
    let jsonData = null;

    try {
      jsonData = await resp.json();
    } catch {}

    if (!resp.ok) throw new Error(resp.statusText);
    return jsonData as T;
  }
}

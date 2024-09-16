import { NextRequest, NextResponse } from 'next/server';
// eslint-disable-next-line n/no-extraneous-import
import { Cache, CacheClass } from 'memory-cache';
import { CacheClient, CacheOptions, debug } from '@sitecore-jss/sitecore-jss';
import { GraphQLRequestClient } from '@sitecore-jss/sitecore-jss-nextjs';
import config from 'temp/config';

let cspHeader: string;

export type CSPInfo = {
  cspvalue: string;
};

const defaultQuery = /* GraphQL */ `
  query CSPQuery {
    search(
      where: {
        AND: [
          {
            name: "_templates"
            value: "E46F3AF2-39FA-4866-A157-7017C4B2A40C"
            operator: CONTAINS
          }
          {
            name: "_path"
            value: "69AC581D-7008-4339-96DE-63053D35D48A"
            operator: CONTAINS
          }
        ]
      }
    ) {
      results {
        ... on Item {
          csp: field(name: "CSP") {
            value
          }
          siteName: field(name: "SiteName") {
            value
          }
          hostName: field(name: "Hostname") {
            value
          }
        }
      }
    }
  }
`;

export class MemoryCacheClient<T> implements CacheClient<T> {
  private cache: CacheClass<string, T>;

  /**
   * Initializes a new instance of @see MemoryCacheClient using the provided @see CacheOptions
   * @param {CacheOptions} options Configuration options
   */
  constructor(public options: CacheOptions) {
    this.cache = new Cache();

    this.options.cacheTimeout = (this.options.cacheTimeout ?? 60) * 1000;

    if (this.options.cacheEnabled === undefined) {
      this.options.cacheEnabled = true;
    }
  }

  /**
   * Retrieves a value from the cache.
   * @template T The type of data being cached.
   * @param {string} key The cache key.
   * @returns The cache value as {T}, or null if the specified key is not found in the cache.
   */
  getCacheValue(key: string): T | null {
    return this.options.cacheEnabled ? this.cache.get(key) : null;
  }

  /**
   * Adds a value to the cache for the specified cache key.
   * @template T The type of data being cached.
   * @param {string} key The cache key.
   * @param {T} value The value to cache.
   * @returns The value added to the cache.
   */
  setCacheValue(key: string, value: T): T {
    return this.options.cacheEnabled
      ? this.cache.put(key, value, this.options.cacheTimeout)
      : value;
  }
}

export async function getHost(request: NextRequest) {
  return request.headers.get('host');
}

export type CSPQueryResult = {
  search: {
    results: [
      {
        csp: { value: string };
        siteName: { value: string };
        hostName: { value: string };
      },
    ];
  };
};

export class GraphQLCSPService {
  private cache: CacheClient<string>;

  constructor() {
    this.cache = this.getCacheClient();
  }

  public async fetchCsp(req: NextRequest): Promise<string> {
    const cacheKey = `csp`;
    const host = await getHost(req);

    let data = this.cache.getCacheValue(cacheKey);

    const graphQLClient = new GraphQLRequestClient(config.graphQLEndpoint, {
      apiKey: config.sitecoreApiKey,
      fetch,
    });

    if (!data) {
      const queryData = await graphQLClient.request<CSPQueryResult>(
        defaultQuery
      );

      const csp: CSPInfo[] = [];

      queryData.search.results.forEach((r) => {
        r?.hostName?.value?.split('|')?.forEach((h) => {
          if (h?.toLowerCase() === host?.toLowerCase()) {
            csp.push({
              cspvalue: r?.csp?.value,
            } as CSPInfo);
          }
        });
      });
      data = csp[0]?.cspvalue;

      // eslint-disable-next-line no-console
      console.log(data);

      if (typeof data != 'undefined' && data) {
        this.cache.setCacheValue(cacheKey, data);
      }
    }

    return data;
  }

  protected getCacheClient(): CacheClient<string> {
    return new MemoryCacheClient<string>({
      cacheEnabled: true,
      cacheTimeout: 60,
    } as CacheOptions);
  }
}

export type CSPMiddlewareConfig = {
  /**
   * function, determines if middleware should be turned off, based on cookie, header, or other considerations
   * @param {NextRequest} [req] request object from middleware handler
   * @param {NextResponse} [res] response object from middleware handler
   */
  disabled?: (req?: NextRequest, res?: NextResponse) => boolean;
};

export class CSPMiddleware {
  private cspService: GraphQLCSPService;
  constructor(protected config: CSPMiddlewareConfig) {
    this.cspService = new GraphQLCSPService();
  }

  /**
   * Gets the Next.js middleware handler with error handling
   * @returns route handler
   */
  public getHandler(): (
    req: NextRequest,
    res?: NextResponse
  ) => Promise<NextResponse> {
    return async (req, res) => {
      try {
        return await this.handler(req, res);
      } catch (error) {
        // eslint-disable-next-line no-console
        console.log('CSP middleware failed:');

        // eslint-disable-next-line no-console
        console.log(error);

        return res || NextResponse.next();
      }
    };
  }

  private handler = async (
    req: NextRequest,
    res?: NextResponse
  ): Promise<NextResponse> => {
    const createResponse = async () => {
      if (
        this.config.disabled &&
        this.config.disabled(req, NextResponse.next())
      ) {
        debug.redirects('Skipped (csp middleware is disabled)');

        return res || NextResponse.next();
      }

      return res || NextResponse.next();
    };

    cspHeader = (await this.cspService.fetchCsp(req))?.toString();

    const response = await createResponse();

    if (typeof cspHeader != 'undefined' && cspHeader) {
      response.headers.set('Content-Security-Policy', cspHeader);
    }

    return response;
  };
}

import { NextRequest, NextResponse } from 'next/server';
import { CSPMiddleware } from '../custom/csp';
import { MiddlewarePlugin } from '../index';

class CSPPlugin implements MiddlewarePlugin {
  private cspMiddleware: CSPMiddleware;
  order = 1;

  constructor() {
    this.cspMiddleware = new CSPMiddleware({
      disabled: () => false,
    });
  }

  /**
   * exec async method - to find coincidence in url.pathname and redirects of site
   * @param req<NextRequest>
   * @returns Promise<NextResponse>
   */
  async exec(req: NextRequest, res?: NextResponse): Promise<NextResponse> {
    return this.cspMiddleware.getHandler()(req, res);
  }
}

export const cspPlugin = new CSPPlugin();

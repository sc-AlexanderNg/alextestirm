import { NextRequest, NextResponse } from 'next/server';
import { MiddlewarePlugin } from '..';
import { RedirectsMiddleware } from '@sitecore-jss/sitecore-jss-nextjs/middleware';
import config from 'temp/config';
import { siteResolver } from 'lib/site-resolver';

class RedirectsPlugin implements MiddlewarePlugin {
  private redirectsMiddleware: RedirectsMiddleware;
  order = 0;

  constructor() {
    this.redirectsMiddleware = new RedirectsMiddleware({
      endpoint: config.graphQLEndpoint,
      apiKey: config.sitecoreApiKey,
      // These are all the locales you support in your application.
      // These should match those in your next.config.js (i18n.locales).
      locales: [
        'ar-ae',
        'de-de',
        'en',
        'en-ae',
        'en-au',
        'en-ca',
        'en-gb',
        'en-ie',
        'en-ls',
        'en-nz',
        'en-sg',
        'es-es',
        'es-mx',
        'it-it',
        'nl-nl',
        'pt-br',
        'tr-tr',
        'fr-ca',
        'es-co',
        'ar-sa',
        'en-sa',
        'en-in',
        'fr-fr',
        'ro-ro',
        'el-gr',
        'de-at',
        'zh-cn',
        'es-cl',
        'ar-eg',
        'en-eg',
        'en-ch',
        'fr-ch',
        'de-ch',
        'ar-kw',
        'en-kw',
        'ar-bh',
        'en-bh',
        'id-id',
        'en-id',
        'pl-pl',
        'bg-bg',
        'nn-no',
        'hu-hu',
        'es-ar',
        'en-ph',
        'sv-se',
        'en-my',
        'nl-be',
        'fr-be',
        'cs-cz',
        'da-dk',
        'th-th',
        'fr-ma',
        'sr',
        'sk-sk',
        'fi-fi',
        'en-hk',
        'zh-hk',
        'es-pe',
        'hr-hr',
        'et-ee',
        'lt-lt',
        'lv-lv',
        'uk-ua',
        'vi-vn',
        'ar-jo',
        'en-jo',
        'ar-om',
        'en-om',
        'en-cy',
        'zh-tw',
        'ko-kr',
        'en-je',
      ],
      // This function determines if a route should be excluded from RedirectsMiddleware.
      // Certain paths are ignored by default (e.g. files and Next.js API routes), but you may wish to exclude more.
      // This is an important performance consideration since Next.js Edge middleware runs on every request.
      excludeRoute: () => false,
      // This function determines if the middleware should be turned off.
      // By default it is disabled while in development mode.
      disabled: () => process.env.NODE_ENV === 'development',
      // Site resolver implementation
      siteResolver,
    });
  }

  /**
   * exec async method - to find coincidence in url.pathname and redirects of site
   * @param req<NextRequest>
   * @returns Promise<NextResponse>
   */
  async exec(req: NextRequest, res?: NextResponse): Promise<NextResponse> {
    return this.redirectsMiddleware.getHandler()(req, res);
  }
}

export const redirectsPlugin = new RedirectsPlugin();

/**
 * @param {import('next').NextConfig} nextConfig
 */
const bulkRedirects = (nextConfig = {}) => {
  return {
    ...nextConfig,
    async redirects() {
      return [
        ...(await nextConfig.redirects()),
        //Home
        { source: '/home', destination: '/', permanent: true },
        {
          source: '/([a-z]{2}-[a-z]{2})/home',
          destination: '/',
          permanent: true,
        },

        //Forced Blogs
        {
          source:
            '/blogs/2023/risk-amplified-cultivating-risk-awareness-across-the-organization',
          destination:
            '/resources/blogs-and-articles/r/risk-amplified-cultivating-risk-awareness-across-the-organization',
          permanent: true,
        },
        {
          source:
            '/blogs/2023/curing-healthcare-challenges-with-technology-based-innovation',
          destination:
            '/resources/blogs-and-articles/c/curing-healthcare-challenges-with-technology-based-innovation',
          permanent: true,
        },
        {
          source: '/blogs/2023/risk-management-and-business-resilience',
          destination:
            '/resources/landing-pages/r/risk-management-and-business-resilience',
          permanent: true,
        },
        {
          source: '/blogs/2023/what-does-a-risk-aware-organization-look-like',
          destination:
            '/resources/blogs-and-articles/w/what-does-a-risk-aware-organization-look-like',
          permanent: true,
        },
        {
          source:
            '/blogs/2023/research-reveals-how-data-is-fueling-innovation-in-insurance',
          destination:
            '/resources/blogs-and-articles/r/research-reveals-how-data-is-fueling-innovation-in-insurance',
          permanent: true,
        },

        //Resources
        {
          source: '/resources/best-practice-guides/:path*',
          destination: '/resources/whitepapers/:path*',
          permanent: true,
        },
        {
          source: '/([a-z]{2}-[a-z]{2})/resources/best-practice-guides/:path*',
          destination: '/resources/whitepapers/:path*',
          permanent: true,
        },
        {
          source: '/resources/general-articles/:path*',
          destination: '/resources/blogs-and-articles/:path*',
          permanent: true,
        },
        {
          source: '/([a-z]{2}-[a-z]{2})/resources/general-articles/:path*',
          destination: '/resources/blogs-and-articles/:path*',
          permanent: true,
        },
        {
          source: '/resources/multimedia/:path*',
          destination: '/resources/videos-and-webinars/:path*',
          permanent: true,
        },
        {
          source: '/([a-z]{2}-[a-z]{2})/resources/multimedia/:path*',
          destination: '/resources/videos-and-webinars/:path*',
          permanent: true,
        },
        {
          source: '/resources/data-sheets-and-brochures/:path*',
          destination: '/resources/solution-guides/:path*',
          permanent: true,
        },
        {
          source:
            '/([a-z]{2}-[a-z]{2})/resources/data-sheets-and-brochures/:path*',
          destination: '/resources/solution-guides/:path*',
          permanent: true,
        },
        {
          source: '/resources/infographics-and-tools/:path*',
          destination: '/resources/infographics/:path*',
          permanent: true,
        },
        {
          source:
            '/([a-z]{2}-[a-z]{2})/resources/infographics-and-tools/:path*',
          destination: '/resources/infographics/:path*',
          permanent: true,
        },
        {
          source: '/sustainability',
          destination: '/resources/landing-pages/r/rethink-sustainability',
          permanent: true,
        },
        {
          source: '/([a-z]{2}-[a-z]{2})/sustainability',
          destination: '/resources/landing-pages/r/rethink-sustainability',
          permanent: true,
        },
        {
          source: '/itad',
          destination:
            '/services/it-asset-lifecycle-management/secure-it-asset-disposition',
          permanent: true,
        },
        {
          source: '/([a-z]{2}-[a-z]{2})/itad',
          destination:
            '/services/it-asset-lifecycle-management/secure-it-asset-disposition',
          permanent: true,
        },
        {
          source: '/smartsort',
          destination:
            '/services/smart-records-cleanup-suite/smart-sort-records-management',
          permanent: true,
        },
        {
          source: '/([a-z]{2}-[a-z]{2})/smartsort',
          destination:
            '/services/smart-records-cleanup-suite/smart-sort-records-management',
          permanent: true,
        },
        {
          source: '/alm',
          destination: '/services/it-asset-lifecycle-management',
          permanent: true,
        },
        {
          source: '/([a-z]{2}-[a-z]{2})/alm',
          destination: '/services/it-asset-lifecycle-management',
          permanent: true,
        },
        {
          source: '/insights',
          destination:
            '/services/intelligent-document-processing-and-workflow-automation',
          permanent: true,
        },
        {
          source: '/([a-z]{2}-[a-z]{2})/insights',
          destination:
            '/services/intelligent-document-processing-and-workflow-automation',
          permanent: true,
        },
        {
          source: '/drms',
          destination: '/services/data-restoration-and-migration',
          permanent: true,
        },
        {
          source: '/([a-z]{2}-[a-z]{2})/drms',
          destination: '/services/data-restoration-and-migration',
          permanent: true,
        },
        {
          source: '/cleanstart',
          destination: '/services/clean-start',
          permanent: true,
        },
        {
          source: '/([a-z]{2}-[a-z]{2})/cleanstart',
          destination: '/services/clean-start',
          permanent: true,
        },
        {
          source: '/utility/legal/cookie-privacy-policy',
          destination: '/utility/legal/privacy-policy',
          permanent: true,
        },
        {
          source: '/([a-z]{2}-[a-z]{2})/utility/legal/cookie-privacy-policy',
          destination: '/utility/legal/privacy-policy',
          permanent: true,
        },
        {
          source: '/smartreveal',
          destination: '/services/smart-records-cleanup-suite/smart-reveal',
          permanent: true,
        },
        {
          source: '/([a-z]{2}-[a-z]{2})/smartreveal',
          destination: '/services/smart-records-cleanup-suite/smart-reveal',
          permanent: true,
        },
        {
          source: '/industries',
          destination: '/services',
          permanent: true,
        },
        {
          source: '/([a-z]{2}-[a-z]{2})/industries',
          destination: '/services',
          permanent: true,
        },

        ///Blogs
        {
          source: '/blogs',
          destination: '/resources',
          permanent: true,
        },
        {
          source: '/([a-z]{2}-[a-z]{2})/blogs',
          destination: '/resources',
          permanent: true,
        },
        {
          source: '/blogs/:path*',
          destination: '/resources',
          permanent: true,
        },
        {
          source: '/([a-z]{2}-[a-z]{2})/blogs/:path*',
          destination: '/resources',
          permanent: true,
        },
      ];
    },
  };
};

module.exports = bulkRedirects;

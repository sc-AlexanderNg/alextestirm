export const algoliaSendEvent = (a: string, b: string) => {
  let indexLang = `-${(
    document.querySelector('html') as HTMLElement
  ).getAttribute('data-context-lang')}`;

  if (indexLang === '-en') {
    indexLang = '';
  }

  indexLang = indexLang.replace(/\w[^-]*$/g, (a) => a.toUpperCase());

  let indexDomain;

  if (
    window.location.hostname.toLowerCase().startsWith('www.ironmountain.com')
  ) {
    indexDomain = 'prod';
  } else {
    indexDomain = 'qa';
  }

  fetch('https://insights.algolia.io/1/events', {
    method: 'POST',
    headers: {
      'x-algolia-application-id': 'MY37RXSKCD',
      'x-algolia-api-key': 'dda77a6e6a1c6d112b541ac4799a31de',
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      events: [
        {
          eventType: a,
          eventName: b,
          index: `crawler_im-${indexDomain}-sitecore-headless${indexLang}`,
          userToken: `anonymous-${Math.floor(
            100000000 + Math.random() * 900000000
          )}`,
          objectIDs: [window.location.href],
        },
      ],
    }),
  });
};

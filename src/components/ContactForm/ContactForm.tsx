/* eslint-disable sort-imports */
/* eslint-disable no-var */
/* eslint-disable @typescript-eslint/no-explicit-any */
import {
  ComponentParams,
  Field,
  ImageField,
  LinkField,
  RichText,
  //Text,
  useSitecoreContext,
  withDatasourceCheck,
} from '@sitecore-jss/sitecore-jss-nextjs';

import { algoliaSendEvent } from '../../helpers/AlgoliaEvents';
import classNames from 'classnames';
import CryptoJS from 'crypto-js';
import { getAnchorTag } from 'src/helpers/AnchorHelper';
import { motion } from 'framer-motion';
import styles from './ContactForm.module.css';
import { useEffect } from 'react';
import { useRef } from 'react';

interface ContactFormProps {
  rendering: {
    componentName: string;
    dataSource: string;
  };
  params: ComponentParams;
  fields: {
    BackgroundImage?: ImageField;
    Title: Field<string>;
    FormHTML: Field<string>;
    SuccessMessage: Field<string>;
    SuccessPage: LinkField;
  };
}

const ContactForm = (props: ContactFormProps): JSX.Element => {
  const { fields } = props;
  const BackgroundImage = fields?.BackgroundImage;
  const Title = fields?.Title;
  const FormHTML = fields?.FormHTML;
  const SuccessMessage = fields?.SuccessMessage;
  const SuccessPage = fields?.SuccessPage;
  const { sitecoreContext } = useSitecoreContext();
  const motionAttributes = !sitecoreContext.pageEditing
    ? {
        initial: { opacity: 0, y: 50 },
        whileInView: { opacity: 1, y: 0 },
        viewport: { once: true },
        transition: { duration: 0.7, ease: 'easeInOut' },
      }
    : {};

  const backgroundOption = props?.params?.Theme
    ? JSON.parse(props?.params?.Theme)?.Value?.value
    : '';

  const backgroundImage = {
    backgroundImage:
      backgroundOption === 'background-image-overlay'
        ? `linear-gradient(
          0deg,
          rgb(20 71 125 / 80%) 0%,
          rgb(20 71 125 / 80%) 100%),
          url('${BackgroundImage?.value?.src}')`
        : '',
  };

  useEffect(() => {
    // This is used to target elements with a class of "full-width" with Next.js CSS modules
    const fullWidthInputs = Array.from(
      document.querySelectorAll('.full-width')
    );

    const parentDivs = fullWidthInputs.map((input) => input.parentElement);

    parentDivs.forEach((input) => {
      const sectionElement = document.createElement('section');

      sectionElement?.classList?.add('full-width');

      sectionElement.innerHTML = input?.innerHTML as string;
      input?.parentNode?.replaceChild(sectionElement, input);
    });
  }, []);

  const initialized = useRef(false);

  useEffect(() => {
    if (!initialized.current) {
      initialized.current = true;

      if (window.location.href.indexOf('/contact/contact-form') > 1) {
        let pageCategory;

        if (!document.querySelector('html[data-context-lang="en"]')) {
          pageCategory = sessionStorage
            .getItem('prevPath')
            ?.replace(/^\/[\w-]+/, '');
        } else {
          pageCategory = sessionStorage.getItem('prevPath');
        }

        const data = {
          aoi: [
            {
              URL: '/services/it-asset-lifecycle-management',
              name: 'IT Asset Destruction',
            },
            {
              URL: '/services/it-asset-lifecycle-management/workplace-it-asset-management',
              name: 'Workplace ITAM',
            },
            {
              URL: '/services/it-asset-lifecycle-management/secure-it-asset-disposition',
              name: 'IT Asset Destruction',
            },
            {
              URL: '/services/it-asset-lifecycle-management/data-center-decommissioning',
              name: 'Hyperscale Decommissioning',
            },
            {
              URL: '/services/document-scanning-and-digital-storage',
              name: 'Document Imaging',
            },
            {
              URL: '/services/data-restoration-and-migration',
              name: 'Data Restoration and Migration Services',
            },
            {
              URL: '/services/offsite-tape-vaulting',
              name: 'Tape Storage',
            },
            {
              URL: '/services/intelligent-document-processing-and-workflow-automation',
              name: 'AI/ML Insights',
            },
            {
              URL: '/services/intelligent-document-processing-and-workflow-automation/digital-mailroom-services',
              name: 'AI/ML Insights',
            },
            {
              URL: '/services/information-governance-advisory',
              name: 'Consulting Services',
            },
            {
              URL: '/services/policy-center',
              name: 'Consulting Services',
            },
            {
              URL: '/services/retention-policy-management',
              name: 'Data Management',
            },
            {
              URL: '/services/iron-cloud-data-management',
              name: 'Data Management',
            },
            {
              URL: '/services/iron-cloud-data-management/cloud-data-backup',
              name: 'Data Management',
            },
            {
              URL: '/services/iron-cloud-data-management/cloud-storage-and-migration',
              name: 'Data Management',
            },
            {
              URL: '/services/iron-cloud-data-management/disaster-recovery',
              name: 'Data Management',
            },
            {
              URL: '/services/iron-cloud-data-management/ransomware-recovery',
              name: 'Data Management',
            },
            {
              URL: '/services/offsite-records-storage',
              name: 'Records Storage',
            },
            {
              URL: '/services/project-services',
              name: 'Consulting Services',
            },
            {
              URL: '/services/records-storage-supplies',
              name: 'Records Storage',
            },
            {
              URL: '/services/vital-records-storage',
              name: 'Records Storage',
            },
            {
              URL: '/services/reporting-and-inventory-management',
              name: 'Records Storage',
            },
            {
              URL: '/services/secure-shredding',
              name: 'Secure Shredding',
            },
            {
              URL: '/services/secure-shredding/residential-shredding',
              name: 'Secure Shredding',
            },
            {
              URL: '/services/secure-shredding/shred-container-options',
              name: 'Secure Shredding',
            },
            {
              URL: '/services/warehousing-and-logistics',
              name: 'Warehousing and Logistics',
            },
            {
              URL: '/services/clean-start',
              name: 'Records Storage',
            },
            {
              URL: '/services/smart-records-cleanup-suite',
              name: 'Records Storage',
            },
            {
              URL: '/services/smart-records-cleanup-suite/smart-reveal',
              name: 'Records Storage',
            },
            {
              URL: '/services/smart-records-cleanup-suite/smart-sort-records-management',
              name: 'Records Storage',
            },
            {
              URL: '/services/smart-records-cleanup-suite/smart-assign',
              name: 'Records Storage',
            },
            {
              URL: '/services/professional-records-and-information-management-staffing',
              name: 'Consulting Services',
            },
            {
              URL: '/data-centers',
              name: 'Data Centers',
            },
          ],
        };

        const aoiArray = data.aoi;

        if (pageCategory !== null || pageCategory !== '') {
          for (let i = 0; i < aoiArray.length; i++) {
            if (
              ((pageCategory as string) || '').toLowerCase() ===
              aoiArray[i].URL.toLowerCase()
            ) {
              document
                .querySelector(
                  `select[name=C_Area_of_Interest1] option[value="${aoiArray[i].name}"]`
                )
                ?.setAttribute('selected', 'selected');
            }
          }
        }

        if (((pageCategory as string) || '').startsWith('/data-centers')) {
          document
            .querySelector(
              `select[name=C_Area_of_Interest1] option[value="Data Centers"]`
            )
            ?.setAttribute('selected', 'selected');
        }
      }

      if (
        document.querySelector('#EmailUsForm') != null &&
        document.querySelector('.elq-form') != null
      ) {
        setRequired();

        document
          .querySelector('.elq-form')
          ?.addEventListener('submit', (event) => {
            event.preventDefault();

            document.querySelector('input[name=Page_URL]')?.remove();
            const setPageUrl = document.createElement('input');

            setPageUrl.setAttribute('type', 'hidden');
            setPageUrl.setAttribute('name', 'Page_URL');
            setPageUrl.value = window.location.href;

            document.querySelector('.elq-form')?.append(setPageUrl);
            //alert('');
            document
              .querySelector('input[type=submit]')
              ?.setAttribute('disabled', '');

            SubmitEmailForm();
          });
      } else if (
        document.querySelector('.elq-form') != null &&
        !document.querySelector('#EmailUsForm')
      ) {
        setRequired();
        setUTM();
        document
          .querySelector('.elq-form')
          ?.addEventListener('submit', (event) => {
            event.preventDefault();

            if (
              ((
                document.querySelector(
                  'select[name="C_Area_of_Interest1"]'
                ) as HTMLInputElement
              )?.value === 'Data Centers' &&
                (
                  document.querySelector(
                    'input[name="hubspotForm"]'
                  ) as HTMLInputElement
                )?.value === 'yes') ||
              ((document.querySelector('#hdnDC') as HTMLInputElement)?.value ===
                'Data Centers' &&
                (
                  document.querySelector(
                    'input[name="hubspotForm"]'
                  ) as HTMLInputElement
                )?.value === 'yes')
            ) {
              submitHubspotForm();
            } else {
              submitEloquaForm();
            }
          });

        if (
          document.querySelector('.elq-form') != null &&
          document.querySelector('#elqFormSubmissionToken') != null
        ) {
          const formElement = document.querySelector(
            '.elq-form'
          ) as HTMLFormElement;

          const formAction: string[] = formElement
            ?.getAttribute('action')
            ?.split('.') as string[];
          const eb = formAction[0]?.split('//');

          const elSiteId = eb[1].replace(/^\D+/g, '');
          const elFormId = document
            .querySelector('.elq-form')
            ?.getAttribute('id');

          (document as any).onload = handleDocumentLoad(elFormId, elSiteId);

          const siteElqFormName = (
            document.querySelector(
              'input[name="elqFormName"]'
            ) as HTMLInputElement
          )?.value;
          const siteElqSiteID = (
            document.querySelector('input[name=elqSiteID]') as HTMLInputElement
          )?.value;
          const siteAction: string = document
            .querySelector('.elq-form')
            ?.getAttribute('action') as string;

          // Au-NZ Customize
          document
            .querySelector('select[name="C_Country"]')
            ?.addEventListener('change', () => {
              if (
                document.documentElement.lang === 'en-au' ||
                document.documentElement.lang === 'en-nz'
              ) {
                if (
                  (
                    document.querySelector(
                      'select[name="C_Country"]'
                    ) as HTMLSelectElement
                  )?.value?.toLowerCase() !== 'australia' &&
                  (
                    document.querySelector(
                      'select[name="C_Country"]'
                    ) as HTMLSelectElement
                  )?.value?.toLowerCase() !== 'new zealand'
                ) {
                  (
                    document.querySelector('.elq-form') as HTMLInputElement
                  ).setAttribute(
                    'action',
                    (
                      document.querySelector(
                        '[name=USelqFormAction]'
                      ) as HTMLInputElement
                    )?.value
                  );

                  (
                    document.querySelector('.elq-form') as HTMLInputElement
                  ).setAttribute(
                    'name',
                    (
                      document.querySelector(
                        '[name=USelqFormName]'
                      ) as HTMLInputElement
                    ).value
                  );

                  (
                    document.querySelector(
                      'input[name=elqFormName]'
                    ) as HTMLInputElement
                  ).value = (
                    document.querySelector(
                      '[name=USelqFormName]'
                    ) as HTMLInputElement
                  ).value;

                  document
                    .querySelector('input[name="elqSiteID"]')
                    ?.setAttribute('name', 'elqSiteId');

                  (
                    document.querySelector(
                      'input[name="elqSiteId"]'
                    ) as HTMLInputElement
                  ).value = (
                    document.querySelector(
                      '[name=USelqSiteID]'
                    ) as HTMLInputElement
                  ).value;

                  const element1 = document.createElement('input');

                  element1.type = 'hidden';
                  element1.name = 'elqCampaignId';
                  element1.value = (
                    document.querySelector(
                      '[name=USelqCampaignId]'
                    ) as HTMLInputElement
                  ).value;

                  (
                    document.querySelector('.elq-form') as HTMLInputElement
                  ).appendChild(element1);

                  handleDocumentLoad(
                    'form100',
                    (
                      document.querySelector(
                        'input[name="elqSiteId"]'
                      ) as HTMLInputElement
                    )?.value
                  );
                } else {
                  (
                    document.querySelector('.elq-form') as HTMLInputElement
                  ).setAttribute('action', siteAction);
                  (
                    document.querySelector('.elq-form') as HTMLInputElement
                  ).setAttribute('name', siteElqFormName);
                  (
                    document.querySelector(
                      'input[name="elqFormName"]'
                    ) as HTMLInputElement
                  ).value = siteElqFormName;

                  document
                    .querySelector('#elqSiteID')
                    ?.setAttribute('name', 'elqSiteID');

                  (
                    document.querySelector(
                      'input[name="elqSiteID"]'
                    ) as HTMLInputElement
                  ).value = siteElqSiteID;
                  document
                    .querySelector("input[name='elqCampaignId']")
                    ?.remove();
                  handleDocumentLoad(
                    'form100',
                    (
                      document.querySelector(
                        'input[name="elqSiteID"]'
                      ) as HTMLInputElement
                    ).value
                  );
                }
              }
            });
        }
      }
    }

    function handleDocumentLoad(b: any, a: any) {
      getElqFormSubmissionToken(b, a);
      processLastFormField(b);
    }

    function getElqFormSubmissionToken(g: any, c: any) {
      const e = new XMLHttpRequest();
      const b = document.getElementById(g);

      if (b && (b as any).elements.namedItem('elqFormSubmissionToken')) {
        const f = (b as any).action;
        let a = getHostName(f);

        a = `https://${a}/e/formsubmittoken?elqSiteID=${c}`;

        if (a) {
          e.onreadystatechange = () => {
            if (e.readyState === 4) {
              if (e.status === 200) {
                (b as any).elements.namedItem('elqFormSubmissionToken').value =
                  e.responseText;
              } else {
                (b as any).elements.namedItem('elqFormSubmissionToken').value =
                  '';
              }
            }
          };
          e.open('GET', a, true);
          e.send();
        } else {
          (b as any).elements.namedItem('elqFormSubmissionToken').value = '';
        }
      }
    }

    function submitHubspotForm() {
      const successUrl = (
        document.querySelector('#successPage') as HTMLInputElement
      )?.value;
      const xhr = new XMLHttpRequest();
      const portalId = (
        document.querySelector('input[name="portalId"]') as HTMLInputElement
      )?.value;
      const formGuid = (
        document.querySelector('input[name="formGuid"]') as HTMLInputElement
      )?.value;
      const url = `https://api.hsforms.com/submissions/v3/integration/submit/${portalId}/${formGuid}`;

      const elements = document.querySelectorAll(
        '[data-hs-name]:checked, [data-hs-name][type=text], [data-hs-name][type=email], select[data-hs-name], textarea[data-hs-name]'
      );
      const arr = [];

      for (let i = 0; i < elements.length; i++) {
        arr.push({
          name: (elements[i] as any).dataset.hsName,
          value: (elements[i] as any).value,
        });
      }

      //console.log(arr);
      const pageTitle = document.querySelector('.font-header-h1')?.textContent;

      const data = {
        fields: arr,
        context: {
          hutk: getCookieValue('hubspotutk'),
          pageUri: window.location.href,
          pageName: pageTitle,
        },
        skipValidation: true,
      };
      const final_data = JSON.stringify(data);

      // eslint-disable-next-line no-console
      console.log(final_data);

      let countryValue = '';

      if (document.querySelector('select[name="C_Country"]')) {
        countryValue = (
          document.querySelector('[name="C_Country"]') as HTMLSelectElement
        )?.options[
          (document.querySelector('[name="C_Country"]') as HTMLSelectElement)
            ?.selectedIndex
        ]?.value;
      } else {
        countryValue = (
          document.querySelector('[name="C_Country"]') as HTMLInputElement
        ).value;
      }

      let aoiValue = '';

      if (document.querySelector('select[name="C_Area_of_Interest1"]')) {
        aoiValue = (
          document.querySelector(
            '[name="C_Area_of_Interest1"]'
          ) as HTMLSelectElement
        )?.options[
          (
            document.querySelector(
              '[name="C_Area_of_Interest1"]'
            ) as HTMLSelectElement
          ).selectedIndex
        ].value;
      } else {
        aoiValue = (
          document.querySelector(
            '[name="C_Area_of_Interest1"]'
          ) as HTMLInputElement
        ).value;
      }

      xhr.open('POST', url);
      // Sets the value of the 'Content-Type' HTTP request headers to 'application/json'
      xhr.setRequestHeader('Content-Type', 'application/json');

      xhr.onreadystatechange = () => {
        if (xhr.readyState === 4 && xhr.status === 200) {
          (window as any).dataLayer = (window as any).dataLayer || [];
          (window as any).dataLayer.push({
            event: 'formSubmission',
            formType: 'contact_form_submission_imdc',
            areaofinterest: aoiValue,
            country_form: countryValue,
          });

          if (successUrl) {
            window.location.href = successUrl;
          } else {
            (
              document.querySelector('#success-wrapper') as HTMLElement
            ).style.display = 'flex';
            (
              document.querySelector('#form-wrapper') as HTMLElement
            ).style.display = 'none';
          }
        } else if (xhr.readyState === 4 && xhr.status === 400) {
          // eslint-disable-next-line no-console
          console.log(xhr.responseText); // Returns a 400 error the submission is rejected.
        } else if (xhr.readyState === 4 && xhr.status === 403) {
          // eslint-disable-next-line no-console
          console.log(xhr.responseText); // Returns a 403 error if the portal isn't allowed to post submissions.
        } else if (xhr.readyState === 4 && xhr.status === 404) {
          // eslint-disable-next-line no-console
          console.log(xhr.responseText); //Returns a 404 error if the formGuid isn't found
        }
      };
      // Sends the request

      xhr.send(final_data);

      algoliaSendEvent('conversion', 'Contact form submission');
    }

    function setUTM() {
      if (readCookie('__utmz_original') != null) {
        const formutmCookieValue2 = readCookie('__utmz_original');
        let tempArrayValue: string[] = [];

        if (formutmCookieValue2?.split('|')) {
          tempArrayValue = formutmCookieValue2?.split('|');
        }

        for (let i = 0; i < tempArrayValue.length; i++) {
          var avs = tempArrayValue[i].replace('=', '.').split('.');

          if (avs[avs.length - 2] === 'utmccn') {
            if (
              document.querySelector('input[name="gACampaignOriginal"]') != null
            ) {
              (
                document.getElementsByName(
                  'gACampaignOriginal'
                )[0] as HTMLInputElement
              ).value = avs[avs.length - 1];
              // eslint-disable-next-line no-console
              console.log(
                `gACampaignOriginal:${
                  (
                    document.getElementsByName(
                      'gACampaignOriginal'
                    )[0] as HTMLInputElement
                  ).value
                }`
              );
            }
          }

          if (avs[avs.length - 2] === 'utmcmd') {
            if (
              document.querySelector('input[name="gAMediumOriginal"]') != null
            ) {
              (
                document.getElementsByName(
                  'gAMediumOriginal'
                )[0] as HTMLInputElement
              ).value = avs[avs.length - 1];
              // eslint-disable-next-line no-console
              console.log(
                `gAMediumOriginal: ${
                  (
                    document.getElementsByName(
                      'gAMediumOriginal'
                    )[0] as HTMLInputElement
                  ).value
                }`
              );
            }
          }

          if (avs[avs.length - 2] === 'utmcsr') {
            if (
              document.querySelector('input[name="gASourceOriginal"]') != null
            ) {
              (
                document.getElementsByName(
                  'gASourceOriginal'
                )[0] as HTMLInputElement
              ).value = avs[avs.length - 1];
              // eslint-disable-next-line no-console
              console.log(
                `gASourceOriginal: ${
                  (
                    document.getElementsByName(
                      'gASourceOriginal'
                    )[0] as HTMLInputElement
                  ).value
                }`
              );
            }
          }

          if (avs[avs.length - 2] === 'utmctr') {
            if (
              document.querySelector('input[name="gASearchTermOriginal"]') !=
              null
            ) {
              (
                document.getElementsByName(
                  'gASearchTermOriginal'
                )[0] as HTMLInputElement
              ).value = avs[avs.length - 1];
              // eslint-disable-next-line no-console
              console.log(
                `gASearchTermOriginal: ${
                  (
                    document.getElementsByName(
                      'gASearchTermOriginal'
                    )[0] as HTMLInputElement
                  ).value
                }`
              );
            }
          }
        }
      }

      if (readCookie('__utmz') != null) {
        const formutmCookieValue = readCookie('__utmz');
        let tempArrayValue: string[] = [];

        if (formutmCookieValue?.split('|')) {
          tempArrayValue = formutmCookieValue?.split('|');
        }

        for (let i = 0; i < tempArrayValue.length; i++) {
          var avsarray = tempArrayValue[i].replace('=', '.').split('.');

          if (
            avsarray[avsarray.length - 2] === 'utmccn' &&
            avsarray[avsarray.length - 1]
          ) {
            if (
              document.querySelector('input[name="gACampaignMostRecent1"]') !=
              null
            ) {
              (
                document.querySelector(
                  'input[name="gACampaignMostRecent1"]'
                ) as HTMLInputElement
              ).value = avsarray[avsarray.length - 1];
              // eslint-disable-next-line no-console
              console.log(
                `gACampaignMostRecent1: ${
                  (
                    document.getElementsByName(
                      'gACampaignMostRecent1'
                    )[0] as HTMLInputElement
                  ).value
                }`
              );
            }
          }

          if (
            avsarray[avsarray.length - 2] === 'utmcmd' &&
            avsarray[avsarray.length - 1]
          ) {
            if (
              document.querySelector('input[name="gAMediumMostRecent1"]') !=
              null
            ) {
              (
                document.querySelector(
                  'input[name="gAMediumMostRecent1"]'
                ) as HTMLInputElement
              ).value = avsarray[avsarray.length - 1];
              // eslint-disable-next-line no-console
              console.log(
                `gAMediumMostRecent1: ${
                  (
                    document.getElementsByName(
                      'gAMediumMostRecent1'
                    )[0] as HTMLInputElement
                  ).value
                }`
              );
            }
          }

          if (
            avsarray[avsarray.length - 2] === 'utmcsr' &&
            avsarray[avsarray.length - 1]
          ) {
            if (
              document.querySelector('input[name="gASourceMostRecent1"]') !=
              null
            ) {
              (
                document.querySelector(
                  'input[name="gASourceMostRecent1"]'
                ) as HTMLInputElement
              ).value = avsarray[avsarray.length - 1];
              // eslint-disable-next-line no-console
              console.log(
                `gASourceMostRecent1: ${
                  (
                    document.getElementsByName(
                      'gASourceMostRecent1'
                    )[0] as HTMLInputElement
                  ).value
                }`
              );
            }
          }

          if (
            avsarray[avsarray.length - 2] === 'utmctr' &&
            avsarray[avsarray.length - 1]
          ) {
            if (
              document.querySelector('input[name="gASearchTermMostRecent1"]') !=
              null
            ) {
              (
                document.querySelector(
                  'input[name="gASearchTermMostRecent1"]'
                ) as HTMLInputElement
              ).value = avsarray[avsarray.length - 1];
              // eslint-disable-next-line no-console
              console.log(
                `gASearchTermMostRecent1: ${
                  (
                    document.getElementsByName(
                      'gASearchTermMostRecent1'
                    )[0] as HTMLInputElement
                  ).value
                }`
              );
            }
          }
        }
      }
    }
  }, []);

  function setRequired() {
    document
      .querySelectorAll('[aria-required=true]')
      .forEach((input) => input.setAttribute('required', 'true'));
  }

  function SubmitEmailForm() {
    const successUrl = (
      document.querySelector('#successPage') as HTMLInputElement
    )?.value;

    const fieldElements = document.querySelectorAll(
      '#EmailUsForm input:not([type=submit], [type=radio], [type=checkbox], [name^=db_], [name^=zip]), #EmailUsForm textarea, #EmailUsForm select, #EmailUsForm input:checked'
    );
    const fieldElementsArray = Array.from(fieldElements);

    interface Fieldobj {
      name: string;
      value: string;
    }
    const Fields: Fieldobj[] = [];
    let subjectContent = '';
    let toID = '';
    let ccID = '';
    let emailBodyText = '';

    fieldElementsArray.forEach((field) => {
      const obj = {} as Fieldobj;

      obj.name = (field as HTMLInputElement).name;
      obj.value = (field as HTMLInputElement).value;

      // eslint-disable-next-line eqeqeq
      if (obj.name === 'hdnToAddress') {
        toID = obj.value;
      } else if (obj.name === 'hdnSubject') {
        subjectContent = obj.value;
      } else if (obj.name === 'hdnCCAddress' && obj.value !== '') {
        ccID = obj.value;
      } else {
        Fields.push(obj);
        emailBodyText += `${obj.name} : ${obj.value} <br />`;
      }
    });

    const secretKey = CryptoJS.enc.Utf8.parse(
      'sie2ra898a4e4133bbce2ea2315a1irm'
    );
    const iv = CryptoJS.enc.Utf8.parse('ironmountain@exp');

    const encryptData = (data: string | CryptoJS.lib.WordArray) => {
      const ciphertext = CryptoJS.AES.encrypt(data, secretKey, {
        iv,
      }).toString();

      return ciphertext;
    };

    const encryptedEmailBody = btoa(emailBodyText);
    const encryptedToId = encryptData(toID);
    const encryptedccID = encryptData(ccID);

    fetch('https://express.ironmountain.com/sbc/api/email/send', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json; charset=utf-8',
      },
      body: JSON.stringify({
        emailBody: encryptedEmailBody,
        to: encryptedToId,
        cc: encryptedccID,
        subject: subjectContent,
      }),
    }).then((response) => {
      if (response.ok) {
        if (successUrl) {
          window.location.href = successUrl;
        } else {
          // eslint-disable-next-line no-console
          console.log('Email Form submitted successfully');

          (
            document.querySelector('#success-wrapper') as HTMLElement
          ).style.display = 'flex';
          (
            document.querySelector('#form-wrapper') as HTMLElement
          ).style.display = 'none';
        }
      }

      algoliaSendEvent('conversion', 'Email form submission');
    });
  }

  function getHostName(b: any) {
    if (typeof window.URL === 'function') return new window.URL(b).hostname;

    const a = b.match(/:\/\/(www[0-9]?\.)?(.[^/:]+)/i);

    if (
      a !== null &&
      a.length > 2 &&
      typeof a[2] === 'string' &&
      a[2].length > 0
    ) {
      return a[2];
    }

    return null;
  }

  function processLastFormField(formID: any) {
    const form: any = document.getElementById(formID);
    const lastFormField = form.querySelector('#elq-FormLastRow');

    lastFormField.style.display = 'none';
  }

  function submitEloquaForm() {
    document.querySelector('input[type=submit]')?.setAttribute('disabled', '');
    const form = document.querySelector('.elq-form') as HTMLFormElement;
    const action: string = form?.getAttribute('action') as string;
    const formMethod: string = form
      ?.getAttribute('method')
      ?.toUpperCase() as string;
    /* const companyName = document
      .querySelector('.elq-form input[name=C_Company]')
      .value.toLowerCase()
      .trim(); */
    //const currentURL = window.location.host + window.location.pathname;
    //alert(currentURL);

    //document.querySelector('input[name=redirect]')?.value = currentURL;
    //(document.querySelector('input[name=url]') as HTMLInputElement).value =
    //currentURL;

    let countryValue = '';

    if (document.querySelector('select[name="C_Country"]')) {
      countryValue = (
        document.querySelector('[name="C_Country"]') as HTMLSelectElement
      )?.options[
        (document.querySelector('[name="C_Country"]') as HTMLSelectElement)
          ?.selectedIndex
      ]?.value;
    } else {
      countryValue = (
        document.querySelector('[name="C_Country"]') as HTMLInputElement
      )?.value;
    }

    let aoiValue = '';

    if (document.querySelector('select[name="C_Area_of_Interest1"]')) {
      aoiValue = (
        document.querySelector(
          '[name="C_Area_of_Interest1"]'
        ) as HTMLSelectElement
      )?.options[
        (
          document.querySelector(
            '[name="C_Area_of_Interest1"]'
          ) as HTMLSelectElement
        ).selectedIndex
      ].value;
    } else {
      aoiValue = (
        document.querySelector(
          '[name="C_Area_of_Interest1"]'
        ) as HTMLInputElement
      )?.value;
    }

    document
      .querySelector('input[name=Page_URL]')
      ?.setAttribute('value', window.location.href);

    const successUrl = (
      document.querySelector('#successPage') as HTMLInputElement
    )?.value;

    const formData = new FormData(form);

    fetch(action, {
      method: formMethod,
      body: formData,
    })
      .then((response) => response.text())
      .then((data) => {
        if (data) {
          if (successUrl) {
            window.location.href = successUrl;
          } else {
            (
              document.querySelector('#success-wrapper') as HTMLElement
            ).style.display = 'flex';
            (
              document.querySelector('#form-wrapper') as HTMLElement
            ).style.display = 'none';
          }

          (window as any).dataLayer = (window as any).dataLayer || [];
          (window as any).dataLayer.push({
            event: 'formSubmission',
            formType: 'contact_form_submission',
            areaofinterest: aoiValue,
            country_form: countryValue,
          });
          // eslint-disable-next-line no-console
          console.log('Eloqua form submitted');

          algoliaSendEvent('conversion', 'Contact form submission');
        }
      })
      // eslint-disable-next-line no-console
      .catch((error) => console.log(error))
      .finally(() => {
        document
          .querySelectorAll('input[type=submit]')
          .forEach((input) => input.removeAttribute('disabled'));
      });
  }

  function getCookieValue(name: any) {
    const regex = new RegExp(`(^| )${name}=([^;]+)`);
    const match = document.cookie.match(regex);

    if (match) {
      return match[2];
    }

    return '';
  }

  function readCookie(name: any) {
    const nameEQ = `${name}=`;
    const ca = document.cookie.split(';');

    for (let i = 0; i < ca.length; i++) {
      let c = ca[i];

      while (c.charAt(0) === ' ') c = c.substring(1, c.length);

      if (c.indexOf(nameEQ) === 0) return c.substring(nameEQ.length, c.length);
    }

    return null;
  }

  return !sitecoreContext.pageEditing && !fields ? (
    <></>
  ) : (
    <>
      {getAnchorTag(props)}
      <section
        className={classNames(
          styles['contact-lead-gen-form-container'],
          styles[`${backgroundOption}`]
        )}
        style={backgroundImage}
      >
        <div
          className={classNames(
            styles['contact-lead-gen-form'],
            'contact-lead-gen-form'
          )}
        >
          <motion.div
            {...motionAttributes}
            className={styles['content-container']}
            id="form-wrapper"
          >
            {Title && (
              <RichText field={Title} className="form-header" />
              //<Text tag="h2" field={Title} className="font-header-h4" /> //
            )}
            {FormHTML && (
              <div
                className={styles.form}
                dangerouslySetInnerHTML={{ __html: FormHTML.value }}
              />
            )}
            {SuccessPage?.value?.href &&
              SuccessPage?.value?.href?.length > 0 && (
                <input
                  value={SuccessPage?.value?.href}
                  id="successPage"
                  type="hidden"
                />
              )}
          </motion.div>
          {SuccessMessage && (
            <div
              style={{ display: 'none' }}
              className={styles['success-message']}
              id="success-wrapper"
            >
              <div className={styles['done-icon']} />
              <div
                className={styles['success-content']}
                dangerouslySetInnerHTML={{ __html: SuccessMessage.value }}
              />
            </div>
          )}
        </div>
      </section>
    </>
  );
};

export default withDatasourceCheck()<ContactFormProps>(ContactForm);

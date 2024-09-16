/* eslint-disable react/no-unescaped-entities */
import {
  CountriesProps,
  UtilityNavigationDesktopProps,
} from './UtilityNavigationProps';
import {
  Image,
  Link,
  useSitecoreContext,
} from '@sitecore-jss/sitecore-jss-nextjs';

import styles from './UtilityNavigationDesktop.module.css';

import { useEffect } from 'react';
import { useRouter } from 'next/router';

const UtilityNavigationDesktop = (
  props: UtilityNavigationDesktopProps
): JSX.Element => {
  const fields = props?.fields;
  const BuyOnlineIconDesktop = fields?.BuyOnlineIconDesktop;
  const BuyOnlineText = fields?.BuyOnlineText;
  const BuyOnlineMenuItems = fields?.BuyOnlineMenuItems;
  const BuyOnlineLink = fields?.BuyOnlineLink;
  const LoginText = fields?.LoginText;
  const LoginIconDesktop = fields?.LoginIconDesktop;
  const LoginMenuItems = fields?.LoginMenuItems;
  const LoginLink = fields?.LoginLink;
  const ContactUsIconDesktop = fields?.ContactUsIconDesktop;
  const ContactUsSecondaryIconDesktop = fields?.ContactUsSecondaryIconDesktop;
  const ContactUsText = fields?.ContactUsText;
  const ContactUsMenuItems = fields?.ContactUsMenuItems;
  const ContactUsLink = fields?.ContactUsLink;
  const ContactUsSecondaryLink = fields?.ContactUsSecondaryLink;
  const LocationIcon = fields?.LocationIcon;
  const RegionMenuItems = fields?.RegionMenuItems;
  const compName = 'utilitynavigation';
  const ECartJsURL = process.env.NEXT_PUBLIC_EXPRESS_CART_JS_URL;
  const ECartCssURL = process.env.NEXT_PUBLIC_EXPRESS_CART_CSS_URL;
  const ECartHost = process.env.NEXT_PUBLIC_EXPRESS_CART_HOSTNAME;
  const isECartHost = ECartHost ?? false;

  const { sitecoreContext } = useSitecoreContext();
  const contextLanguage = sitecoreContext.language;
  let selectedCountry!: CountriesProps;

  RegionMenuItems?.forEach((region) => {
    region?.fields?.Countries?.forEach((country) => {
      const langTotal = country.fields.LanguageList?.length || 0;
      const langtype = typeof country.fields.LanguageList;

      country?.fields?.LanguageList !== undefined &&
        langTotal > 0 &&
        langtype !== 'string' &&
        country?.fields?.LanguageList?.filter((child) => {
          if (
            child.fields?.LanguageCode?.value?.toLowerCase() ===
            contextLanguage?.toLowerCase()
          ) {
            selectedCountry = country;

            return true;
          }

          return false;
        });
    });
  });

  const router = useRouter();

  const handleOutsideClick = (event: MouseEvent) => {
    const element = document.getElementById('product-cart-section');

    if (element && !element.contains(event.target as Node)) {
      element?.classList?.add('hidden');
      document
        .querySelector('#cart-icon-section')
        ?.setAttribute('data-iscartvisible', 'false');
      document.querySelector('#cart-arrow-up')?.classList.add('hidden');
    }
  };

  useEffect(() => {
    const script = document.createElement('script');

    if (isECartHost) {
      script.src = `${ECartJsURL}`;
      script.async = true;
      document.body.appendChild(script);
      document.addEventListener('click', handleOutsideClick);
    }

    return () => {
      if (isECartHost) {
        document.body.removeChild(script);
        document.removeEventListener('click', handleOutsideClick);
      }
    };
  }, [isECartHost, ECartJsURL, router]);

  return (
    <>
      <div id="utility" className={styles['utility-navigation']}>
        <div>
          <button
            data-clickable-id={`${compName}-details`}
            data-clickable-text={
              selectedCountry
                ? selectedCountry?.fields?.Title?.value
                : 'United States'
            }
            className={styles['language-selector']}
            onClick={() => {
              props?.openUtilityNav();
            }}
          >
            <Image field={LocationIcon} />
            {selectedCountry
              ? selectedCountry?.fields?.Title?.value
              : 'United States'}
          </button>
        </div>
        {ContactUsMenuItems?.length === 0 && (
          <>
            {ContactUsLink?.value?.href ? (
              <div>
                <Link
                  data-clickable-id={`${compName}-details`}
                  data-clickable-text={ContactUsLink?.value?.text}
                  data-clickable-href={ContactUsLink?.value?.href}
                  field={ContactUsLink}
                  className={styles['contact-us']}
                  href={ContactUsLink?.value?.href}
                  onClick={() => {
                    props.clearMenu();
                  }}
                >
                  <Image field={ContactUsIconDesktop} />
                  {ContactUsLink?.value?.text}
                </Link>
              </div>
            ) : (
              <></>
            )}
          </>
        )}
        {ContactUsMenuItems?.length > 0 && (
          <>
            {ContactUsIconDesktop?.value?.src || ContactUsText?.value ? (
              <div data-menu-container>
                <button
                  data-clickable-id={`${compName}-details`}
                  data-clickable-text={ContactUsText?.value}
                  className={styles['login-account']}
                  onClick={() => {
                    window.open(
                      ContactUsLink?.value?.href,
                      ContactUsLink?.value?.target === undefined ||
                        ContactUsLink?.value?.target === ''
                        ? '_self'
                        : ContactUsLink?.value?.target
                    );
                  }}
                >
                  <div>
                    <Image
                      field={ContactUsIconDesktop}
                      className={styles['contact-us-dropdownicon']}
                    />
                  </div>
                  <div>
                    <Link
                      data-clickable-id={`${compName}-details`}
                      data-clickable-text={ContactUsLink?.value?.text}
                      data-clickable-href={ContactUsLink?.value?.href}
                      field={ContactUsLink}
                      className={styles['contact-us-dropdownlink']}
                      href={ContactUsLink?.value?.href}
                      onClick={() => props.clearMenu()}
                    >
                      {ContactUsText?.value}
                    </Link>
                  </div>
                  {/*<div>{ContactUsText?.value}</div>*/}
                </button>
                <ul role="list" data-menu>
                  {ContactUsMenuItems !== undefined &&
                    ContactUsMenuItems?.length > 0 &&
                    ContactUsMenuItems?.map((item, key) => {
                      return item?.fields?.Link?.value?.href ? (
                        <li key={key}>
                          <Link
                            field={item?.fields?.Link}
                            data-clickable-id={`${compName}-details`}
                            data-clickable-text={
                              item?.fields?.Link?.value?.text
                            }
                            data-clickable-href={
                              item?.fields?.Link?.value?.href
                            }
                          />
                        </li>
                      ) : (
                        <></>
                      );
                    })}
                </ul>
              </div>
            ) : (
              <></>
            )}
          </>
        )}
        {ContactUsSecondaryLink?.value?.href ? (
          <div>
            <Link
              data-clickable-id={`${compName}-details`}
              data-clickable-text={ContactUsSecondaryLink?.value?.text}
              data-clickable-href={ContactUsSecondaryLink?.value?.href}
              field={ContactUsSecondaryLink}
              className={styles['contact-us']}
              href={ContactUsSecondaryLink?.value?.href}
              onClick={() => {
                props.clearMenu();
              }}
            >
              <Image field={ContactUsSecondaryIconDesktop} />
              {ContactUsSecondaryLink?.value?.text}
            </Link>
          </div>
        ) : (
          <></>
        )}
        {LoginText?.value ? (
          <div data-menu-container>
            <button
              data-clickable-id={`${compName}-details`}
              data-clickable-text={LoginText?.value}
              className={styles['login-account']}
              onClick={() => {
                window.open(
                  LoginLink?.value?.href,
                  LoginLink?.value?.target === undefined ||
                    LoginLink?.value?.target === ''
                    ? '_self'
                    : LoginLink?.value?.target
                );
              }}
            >
              <div>
                <Image field={LoginIconDesktop} />
              </div>
              <div>{LoginText?.value}</div>
            </button>
            <ul role="list" data-menu>
              {LoginMenuItems !== undefined &&
                LoginMenuItems?.length > 0 &&
                LoginMenuItems?.map((item, key) => {
                  return item?.fields?.Link?.value?.href ? (
                    <li key={key}>
                      <Link
                        field={item?.fields?.Link}
                        data-clickable-id={`${compName}-details`}
                        data-clickable-text={item?.fields?.Link?.value?.text}
                        data-clickable-href={item?.fields?.Link?.value?.href}
                      />
                    </li>
                  ) : (
                    <></>
                  );
                })}
            </ul>
          </div>
        ) : (
          <></>
        )}
        {BuyOnlineIconDesktop?.value?.src || BuyOnlineText?.value ? (
          <div data-menu-container>
            <button
              data-clickable-id={`${compName}-details`}
              data-clickable-text={BuyOnlineText?.value}
              className={styles['btn-icon-utility']}
              onClick={() => {
                window.open(
                  BuyOnlineLink?.value?.href,
                  BuyOnlineLink?.value?.target === undefined ||
                    BuyOnlineLink?.value?.target === ''
                    ? '_self'
                    : BuyOnlineLink?.value?.target
                );
              }}
            >
              <Image field={BuyOnlineIconDesktop} />
              {BuyOnlineText?.value}
              <ul role="list" data-menu>
                {BuyOnlineMenuItems?.map((item, key) => {
                  return item?.fields?.Link?.value?.href ? (
                    <li key={key}>
                      <Link
                        field={item?.fields?.Link}
                        data-clickable-id={`${compName}-details`}
                        data-clickable-text={item?.fields?.Link?.value?.text}
                        data-clickable-href={item?.fields?.Link?.value?.href}
                      />
                    </li>
                  ) : (
                    <></>
                  );
                })}
              </ul>
            </button>
          </div>
        ) : (
          <></>
        )}
        {isECartHost && (
          <div
            className="imcom-cart-icon-container"
            id="imcom-cart-icon-container"
          >
            <link rel="stylesheet" href={ECartCssURL} />
            <input type="hidden" id="hdnHostname" value={ECartHost} />
            <input type="hidden" id="hdnCartData" value="" />
            <div id="dynamic-cart-icon"></div>
            <div id="modal-parent-div"></div>
          </div>
        )}
      </div>
    </>
  );
};

export default UtilityNavigationDesktop;

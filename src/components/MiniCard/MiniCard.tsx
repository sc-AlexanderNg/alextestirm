import {
  Link as JssLink,
  LinkField,
  Text,
  TextField,
  useSitecoreContext,
} from '@sitecore-jss/sitecore-jss-nextjs';
import { ComponentWithContextProps } from '../../lib/component-props';
import classNames from 'classnames';
import { getAbsoluteUrl } from '../../helpers/GetAbsoluteUrl';
import { getAnchorTag } from 'src/helpers/AnchorHelper';
import { getVisibility } from '../../helpers/GetVisibilityHelper';
import { motion } from 'framer-motion';
import styles from './MiniCard.module.css';

export type TargetItem = {
  path: string;
  url: { path: string };
  pageTitle?: { jsonValue: TextField };
  shortTitle?: { jsonValue: TextField };
  shortDescription?: { jsonValue: TextField };
  metaPageTitle?: { jsonValue: TextField };
  metaPageDescription?: { jsonValue: TextField };
  searchResultType?: {
    jsonValue: {
      fields: {
        Value?: {
          value?: string;
        };
        Color?: {
          fields: {
            Value: {
              value?: string;
            };
          };
        };
      };
    };
  };
  openGraphDescription?: { jsonValue: TextField };
  externalLink?: {
    jsonValue: LinkField;
  };
  title: string;
};

export type MiniCardsProps = ComponentWithContextProps & {
  fields: {
    data: {
      fields: {
        railVariation: {
          value: string;
        };
        headline: { jsonValue: TextField };
        serviceSelection: {
          targetItems: TargetItem[] | undefined;
        };
      };
    };
  };
};

const MiniCard = (props: MiniCardsProps): JSX.Element => {
  const fields = props?.fields?.data?.fields;
  const railVariation = fields?.railVariation;
  const headline = fields?.headline;
  const serviceSelection = fields?.serviceSelection;
  // For ServicesIndustries Collection and ResourceBodyContent, needs to get same component name.
  const compName = 'minicard';
  const { sitecoreContext } = useSitecoreContext();
  const contextSite = sitecoreContext.site?.name;
  //Default hostname ironmountain.com for links in minicard
  const defaultSolutionsItem = '/sitecore/content/ironmountain/Solutions';
  let hostname = 'https://ironmountain.com';

  if (process.env.NEXT_PUBLIC_HOSTNAME_MINICARD) {
    hostname = process.env.NEXT_PUBLIC_HOSTNAME_MINICARD;
  }

  const motionAttributes = !sitecoreContext.pageEditing
    ? {
        initial: { opacity: 0, y: 50 },
        whileInView: { opacity: 1, y: 0 },
        viewport: { once: true },
        transition: { duration: 0.7, ease: 'easeInOut' },
      }
    : {};

  const devicetype = getVisibility(props);

  return !sitecoreContext.pageEditing && !fields ? (
    <></>
  ) : (
    <>
      {getAnchorTag(props)}
      <div
        className={styles['mini-card-container'] + devicetype}
        data-tabid={props?.params?.tabid}
        data-is-mini-card="true"
      >
        <motion.section
          {...motionAttributes}
          className={classNames(
            styles['mini-card'],
            styles[`${railVariation?.value?.toLowerCase()}`]
          )}
        >
          <Text
            tag="h2"
            field={headline?.jsonValue}
            className={classNames('font-header-h3', styles.headline)}
            id={compName}
          />
          <div className={styles.cards}>
            {serviceSelection?.targetItems &&
              serviceSelection?.targetItems?.map((card, index) => {
                const pageTitle = card?.pageTitle;
                const shortTitle = card?.shortTitle;
                const metaPageTitle = card?.metaPageTitle;
                const metaPageDescription = card?.metaPageDescription;
                const openGraphDescription = card?.openGraphDescription;
                const shortDescription = card?.shortDescription;
                const externalLink = card?.externalLink;
                const searchResultType = card?.searchResultType;
                const itemPath = card?.path?.toLowerCase();
                let absoluteUrl: string | undefined;
                let externalAbsoluteUrl: string | undefined;

                if (
                  contextSite &&
                  contextSite.toLowerCase().includes('solutions') &&
                  itemPath &&
                  !itemPath.includes(defaultSolutionsItem.toLowerCase())
                ) {
                  absoluteUrl = getAbsoluteUrl(hostname, card?.url?.path);

                  if (externalLink) {
                    externalAbsoluteUrl = getAbsoluteUrl(
                      hostname,
                      externalLink?.jsonValue?.value?.href
                    );
                  }
                } else {
                  absoluteUrl = card?.url?.path;
                  externalAbsoluteUrl = externalLink?.jsonValue?.value?.href;
                }

                const indicatorColor = searchResultType?.jsonValue?.fields
                  ?.Color?.fields?.Value?.value
                  ? searchResultType?.jsonValue?.fields?.Color?.fields?.Value.value
                      .toLowerCase()
                      .split(' ')
                      .join('-')
                  : null;

                const title = shortTitle?.jsonValue?.value
                  ? shortTitle
                  : pageTitle?.jsonValue?.value
                  ? pageTitle
                  : metaPageTitle;
                const description = shortDescription?.jsonValue?.value
                  ? shortDescription
                  : metaPageDescription?.jsonValue?.value
                  ? metaPageDescription
                  : openGraphDescription;

                return externalLink ? (
                  <JssLink
                    data-clickable-id={`${compName}-details`}
                    data-clickable-text={title?.jsonValue?.value}
                    data-clickable-href={externalAbsoluteUrl}
                    field={externalLink?.jsonValue}
                    className={styles.card}
                    key={index}
                    data-theme={indicatorColor}
                  >
                    <Text
                      tag="h3"
                      className={classNames(
                        'btn-tertiary',
                        'font-header-h5',
                        styles.title
                      )}
                      field={title?.jsonValue}
                    />
                    <Text
                      tag="p"
                      field={description?.jsonValue}
                      className={classNames('font-body-sm', styles.description)}
                    />
                  </JssLink>
                ) : (
                  <a
                    data-clickable-id={`${compName}-details`}
                    data-clickable-text={title?.jsonValue?.value}
                    data-clickable-href={absoluteUrl}
                    href={absoluteUrl}
                    className={styles.card}
                    key={index}
                    data-theme={indicatorColor}
                  >
                    <Text
                      tag="h3"
                      className={classNames(
                        'btn-tertiary',
                        'font-header-h5',
                        styles.title
                      )}
                      field={title?.jsonValue}
                    />
                    <Text
                      tag="p"
                      field={description?.jsonValue}
                      className={classNames('font-body-sm', styles.description)}
                    />
                  </a>
                );
              })}
          </div>
        </motion.section>
      </div>
    </>
  );
};

export default MiniCard;

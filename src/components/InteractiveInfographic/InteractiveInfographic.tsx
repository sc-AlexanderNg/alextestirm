import { CSSProperties, useState } from 'react';
import {
  ComponentParams,
  ComponentRendering,
  ImageField,
  Image as JssImage,
  Link as JssLink,
  LinkField,
  RichText,
  RichTextField,
  Text,
  TextField,
  useSitecoreContext,
  withDatasourceCheck,
} from '@sitecore-jss/sitecore-jss-nextjs';
import Tile from 'components/Tile/Tile';
import classNames from 'classnames';
import ellipsis from '../../assets/icons/ellipse.svg';
import { getAnchorTag } from 'src/helpers/AnchorHelper';
import { getTheme } from '../../helpers/ThemeHelper';
import { motion } from 'framer-motion';
import styles from './InteractiveInfographic.module.css';
import { useI18n } from 'next-localization';

type FeaturedServicesTargetItem = {
  name: string;
  url: {
    path: string;
  };
  shortTitle: { value: string };
  pageTitle: { value: string };
  metaPageTitle: { value: string };
};

export interface FeaturedServiceItems {
  targetItems: FeaturedServicesTargetItem[];
}

interface TabsTargetItem {
  headline?: { jsonValue: TextField };
  description?: { jsonValue: RichTextField };
  color: {
    targetItem: {
      value: {
        jsonValue: {
          value: string;
        };
      };
    };
  };
  cTA: { jsonValue: LinkField };
  image: { jsonValue: ImageField };
  icon_5ffaa3d4466a44f9b03ec2ffca49e1d1: { jsonValue: ImageField };
  featuredServices: FeaturedServiceItems;
}

export interface Tabs {
  targetItems: TabsTargetItem[];
}

interface InteractiveInfographicProps {
  rendering: ComponentRendering;
  params: ComponentParams;
  fields: {
    data: {
      fields: {
        tabs: Tabs;
        headline?: { jsonValue: RichTextField };
        subtitle?: { jsonValue: TextField };
        description?: { jsonValue: RichTextField };
        defaultCardHeadline?: { jsonValue: RichTextField };
        disableAnimation: { value: boolean };
      };
    };
  };
}

const InteractiveInfographic = (
  props: InteractiveInfographicProps
): JSX.Element => {
  const { fields } = props;
  const tabs = fields?.data?.fields?.tabs;
  const headline = fields?.data?.fields?.headline;
  const subtitle = fields?.data?.fields?.subtitle;
  const description = fields?.data?.fields?.description;
  const defaultCardHeadline = fields?.data?.fields?.defaultCardHeadline;
  const disableAnimation = fields?.data?.fields?.disableAnimation;
  const { sitecoreContext } = useSitecoreContext();
  const motionAttributesHeader = !sitecoreContext.pageEditing
    ? {
        initial: { opacity: 0 },
        whileInView: { opacity: 1 },
        viewport: { once: true },
        transition: { duration: 0.7, ease: 'easeInOut' },
      }
    : {};
  const theme = getTheme(props.params);

  const [selectedIndex, setSelectedIndex] = useState(null as unknown);
  const selectedTab = tabs?.targetItems?.find(
    /* eslint-disable */
    // @ts-ignore
    (tab, index: number) => selectedIndex === index
    /* eslint-enable */
  ) as TabsTargetItem;

  const { t } = useI18n() || {};
  const featuredServicesDictionary = t
    ? t('featured-services')
    : 'Featured Services';
  const selectPhaseDictionary = t ? t('select-phase') : 'Select a phase';
  const compName = props?.rendering?.componentName?.toLowerCase();

  return (
    <>
      {getAnchorTag(props)}
      <div
        className={styles['interactive-infographic-container']}
        data-mountains={theme}
      >
        <motion.section
          {...motionAttributesHeader}
          className={styles['interactive-infographic']}
        >
          {theme === 'diamonds' && (
            <Tile
              size="58px"
              border={'purple'}
              radius="8.43px"
              className={styles['tile-1']}
            />
          )}
          {theme === 'diamonds' && (
            <Tile
              size="110px"
              border={'light-blue'}
              radius="10px"
              className={styles['tile-2']}
            />
          )}
          {theme === 'diamonds' && (
            <Tile
              size="58px"
              gradient="green"
              radius="8.43px"
              className={styles['tile-3']}
            />
          )}
          {theme === 'diamonds' && (
            <Tile
              size="110px"
              border={'orange'}
              radius="10px"
              className={styles['tile-4']}
            />
          )}
          <RichText
            data-rte
            className={styles['main-headline']}
            field={headline?.jsonValue}
          />
          {subtitle?.jsonValue.value ? (
            <Text
              tag="div"
              className={styles['select-phase']}
              field={subtitle?.jsonValue}
            />
          ) : (
            <div className={styles['select-phase']}>
              {selectPhaseDictionary}
            </div>
          )}

          <ul className={styles.tabs} role="list">
            {tabs?.targetItems?.map((tab, index: number) => {
              return (
                <Text
                  key={index}
                  field={tab?.headline?.jsonValue}
                  tag="li"
                  data-color={tab?.color?.targetItem?.value?.jsonValue?.value}
                  data-selected={selectedIndex === index}
                  onClick={() => {
                    setSelectedIndex(index);
                  }}
                  data-clickable-action={index === selectedIndex}
                  data-clickable-id={`${compName}-details`}
                  data-clickable-text={tab?.headline?.jsonValue?.value}
                />
              );
            })}
          </ul>
          <div className={styles['tab-content']}>
            {!disableAnimation?.value ? (
              <div>
                <div className={styles['image-container']}>
                  <img
                    className={styles.ellipsis}
                    src={ellipsis?.src}
                    style={
                      {
                        '--index': selectedIndex,
                      } as CSSProperties
                    }
                    alt=""
                  />
                  <div className={styles.circle}></div>
                  {selectedTab ? (
                    <JssImage
                      className={styles.image}
                      field={selectedTab?.image?.jsonValue}
                    />
                  ) : null}
                  <div
                    className={styles.diamonds}
                    data-selected-index={selectedIndex}
                    style={
                      {
                        '--index': selectedIndex,
                      } as CSSProperties
                    }
                  >
                    {tabs?.targetItems?.map((tab, index: number) => {
                      return (
                        <div key={index} className={styles['tile-container']}>
                          <Tile
                            gradient={
                              tab?.color?.targetItem?.value?.jsonValue?.value
                            }
                            size="30px"
                            radius="3.65px"
                            className={styles.tile}
                            content={
                              selectedIndex !== null ? (
                                <JssImage
                                  className={styles.icon}
                                  field={
                                    tab?.icon_5ffaa3d4466a44f9b03ec2ffca49e1d1
                                      ?.jsonValue
                                  }
                                />
                              ) : null
                            }
                            onClick={() => setSelectedIndex(index)}
                          />
                        </div>
                      );
                    })}
                  </div>
                </div>
              </div>
            ) : null}
            <div>
              <div className={styles['panel-content']}>
                {selectedTab ? (
                  <>
                    <Text tag="h3" field={selectedTab?.headline?.jsonValue} />
                    <RichText
                      data-rte
                      className={classNames('font-list', styles.description)}
                      field={selectedTab?.description?.jsonValue}
                    />
                    {selectedTab?.cTA?.jsonValue?.value?.href ? (
                      <JssLink
                        className={'btn-tertiary'}
                        field={selectedTab.cTA.jsonValue}
                        data-clickable-id={`${compName}-details`}
                        data-clickable-text={
                          selectedTab.cTA.jsonValue.value.text
                        }
                        data-clickable-href={
                          selectedTab.cTA.jsonValue.value.href
                        }
                      />
                    ) : null}
                  </>
                ) : (
                  <>
                    <RichText
                      data-rte
                      className={styles['default-card-headline']}
                      field={
                        defaultCardHeadline?.jsonValue.value
                          ? defaultCardHeadline.jsonValue
                          : headline?.jsonValue
                      }
                    />
                    <RichText
                      data-rte
                      className={classNames('font-list', styles.description)}
                      field={description?.jsonValue}
                    />
                  </>
                )}
              </div>
            </div>
            <div className={styles['featured-services']}>
              {selectedTab ? (
                <ul role="list">
                  <h4>
                    {selectedTab.featuredServices?.targetItems?.length
                      ? featuredServicesDictionary
                      : null}
                  </h4>
                  {selectedTab.featuredServices?.targetItems?.map(
                    (service, index: number) => {
                      const title = service?.pageTitle?.value
                        ? service?.pageTitle?.value
                        : service?.shortTitle?.value
                        ? service?.shortTitle?.value
                        : service?.metaPageTitle?.value;

                      return (
                        <li key={index}>
                          <a
                            href={service?.url?.path}
                            data-clickable-id={`${compName}-details`}
                            data-clickable-text={title}
                            data-clickable-href={service?.url?.path}
                          >
                            {title}
                          </a>
                        </li>
                      );
                    }
                  )}
                </ul>
              ) : null}
            </div>
          </div>
        </motion.section>
      </div>
    </>
  );
};

export default withDatasourceCheck()<InteractiveInfographicProps>(
  InteractiveInfographic
);

/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable react/no-unescaped-entities */
import {
  ComponentParams,
  ComponentRendering,
  LinkField,
  Placeholder,
  RichText,
  RichTextField,
} from '@sitecore-jss/sitecore-jss-nextjs';
import { ComponentWithContextProps } from 'lib/component-props';
import MiniCard from 'components/MiniCard/MiniCard';
import { TargetItem } from 'components/MiniCard/MiniCard';
import { algoliaSendEvent } from '../../helpers/AlgoliaEvents';
import classNames from 'classnames';
import styles from './ResourceBodyContent.module.css';
import { useI18n } from 'next-localization';

export type ResourceBodyContentProps = ComponentWithContextProps & {
  rendering: ComponentRendering;
  params: ComponentParams;
  fields: {
    data: {
      fields: {
        ungatedContent?: {
          jsonValue: RichTextField;
        };
        gatedContent?: { jsonValue: RichTextField };
        hideTrailingDownloadButton?: {
          value: boolean;
        };
        isPremium?: {
          value: boolean;
        };
        resourceDownload?: { jsonValue: LinkField };
        relatedPages: {
          targetItems: TargetItem[];
        };
      };
    };
  };
};

const ResourceBodyContent = (props: ResourceBodyContentProps): JSX.Element => {
  const downloadUrl =
    props?.fields?.data?.fields?.resourceDownload?.jsonValue?.value?.href;
  const compName = props?.rendering?.componentName?.toLowerCase();

  const { t } = useI18n() || {};

  const downloadLabel = t ? t('resource-download-header') : 'Download Resource';

  const ExclusivePreviewLabel = t
    ? t('exclusive-preview-header')
    : 'Exclusive Preview';

  const featuredPagesLabel = t
    ? t('resource-featured-services')
    : 'Featured services';

  const Premium = props?.fields?.data?.fields?.isPremium?.value;

  const miniCard = {
    data: {
      fields: {
        headline: {
          jsonValue: {
            value:
              props?.fields?.data?.fields?.relatedPages?.targetItems.length > 0
                ? featuredPagesLabel
                : '',
          },
        },
        railVariation: {
          value: 'Right',
        },
        serviceSelection: {
          targetItems: props?.fields?.data?.fields?.relatedPages?.targetItems,
        },
      },
    },
  };

  return (
    <>
      <div id="resource-ungated-content">
        <div
          data-proportions="70-30"
          data-nested="false"
          className={styles['two-column']}
        >
          <div>
            {Premium && (
              <h2 className="font-header-h2">{ExclusivePreviewLabel}</h2>
            )}
            <RichText
              data-rte
              className={classNames(
                'font-list',
                styles['resource-body-content']
              )}
              field={props?.fields?.data?.fields?.ungatedContent?.jsonValue}
            />
            <Placeholder
              name="resource-ungated-bottom"
              rendering={props.rendering}
            />
          </div>

          <div>
            <MiniCard {...props} fields={miniCard}></MiniCard>
            <Placeholder
              name="resource-ungated-right-rail"
              rendering={props.rendering}
            />
          </div>
        </div>
        <div>
          <Placeholder
            name="resource-ungated-bottom-fullwidth"
            rendering={props.rendering}
          />
        </div>
      </div>

      <a
        id="resource-gated-content-anchor"
        className={styles['resource-gated-content-anchor']}
      >
        &nbsp;
      </a>
      <div id="resource-gated-content">
        <Placeholder name="resource-gated-top" rendering={props.rendering} />
        <div className={styles['full-width']}>
          {props?.fields?.data?.fields?.gatedContent && (
            <RichText
              data-rte
              className={classNames(
                'font-list',
                styles['resource-body-content']
              )}
              field={props?.fields?.data?.fields?.gatedContent?.jsonValue}
            />
          )}
        </div>
        <Placeholder name="resource-gated-bottom" rendering={props.rendering} />
        <div className={styles['full-width']}>
          {downloadUrl &&
            props?.fields?.data?.fields?.hideTrailingDownloadButton?.value !==
              true && (
              <a
                data-clickable-id={`${compName}-details`}
                data-clickable-text={downloadLabel}
                data-clickable-href={downloadUrl}
                className={`btn-download`}
                href={downloadUrl}
                onClick={() => {
                  algoliaSendEvent('click', 'Body downloads');
                }}
                target="_blank"
              >
                {downloadLabel}
              </a>
            )}
        </div>
      </div>

      <Placeholder
        name="resource-ungated-after-download"
        rendering={props.rendering}
      />
    </>
  );
};

export default ResourceBodyContent;

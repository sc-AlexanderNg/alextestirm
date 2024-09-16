/* eslint-disable @typescript-eslint/no-explicit-any */
import { Hit as AlgoliaHit, SearchClient } from 'instantsearch.js';
import {
  Configure,
  InfiniteHits,
  InstantSearch,
  RefinementList,
} from 'react-instantsearch-hooks-web';
import {
  TextField,
  useSitecoreContext,
  withDatasourceCheck,
} from '@sitecore-jss/sitecore-jss-nextjs';
import { ComponentWithContextProps } from '../../lib/component-props';
import { SendEventForHits } from 'instantsearch.js/es/lib/utils';
import adjustDateToStandard from 'src/utils/adjustDateToStandard';
import algoliasearch from 'algoliasearch/lite';
import classNames from 'classnames';
import formatUtcDateString from 'src/utils/formatUtcDateString';
import { getAnchorTag } from 'src/helpers/AnchorHelper';
import { history } from 'instantsearch.js/es/lib/routers';
import { motion } from 'framer-motion';
import styles from './NewsroomCollection.module.css';
import { useI18n } from 'next-localization';

type HitResult = {
  hit: AlgoliaHit<{
    url: string;
    name?: string;
    title?: string;
    description?: string;
    content?: string;
    im_resourcedate_raw: number;
    im_resourcedate_rawend: number;
    im_eventtime?: string;
    im_eventlocation?: string;
    im_eventfeatured?: string;
    im_eventtype?: string;
    image?: string;
  }>;
  sendEvent: SendEventForHits;
};

function Hit({ hit, sendEvent }: HitResult) {
  const { sitecoreContext } = useSitecoreContext();

  const startDate = adjustDateToStandard(
    new Date(hit.im_resourcedate_raw * 1000)
  );
  const endDate = adjustDateToStandard(
    new Date(hit.im_resourcedate_rawend * 1000)
  );

  //const endMonth = months[endDate.getMonth()];

  return (
    <div className={styles.card}>
      <a
        href={hit.url}
        className={styles['card-content-link']}
        onClick={() => sendEvent('click', hit, 'Result Clicked')}
        data-insights-object-id={hit.objectID}
        data-insights-position={hit.__position}
        data-insights-query-id={hit.__queryID}
      >
        {hit.im_eventtype && (
          <span className={styles['event-type']}>{hit.im_eventtype}</span>
        )}
        {hit.title && (
          <h3
            className={classNames(
              'btn-tertiary',
              'font-header-h5',
              styles.title
            )}
          >
            {hit.title}
          </h3>
        )}
        {hit.description && (
          <p className={classNames('font-body-sm', styles.description)}>
            {hit.description}
          </p>
        )}
        {hit.im_resourcedate_raw && (
          <span className={styles['event-date']}>
            {formatUtcDateString(
              startDate.toString(),
              sitecoreContext?.language
            )}
            {/* {`${startMonth} ${startDate.getDate()}, ${startDate.getFullYear()}`} */}
            {hit.im_eventtime && <span>, {hit.im_eventtime}</span>}
            {hit.im_resourcedate_rawend && (
              <span>
                &nbsp;-&nbsp;
                {/* {`${endMonth} ${endDate.getDate()}, ${endDate.getFullYear()}`} */}
                {formatUtcDateString(
                  endDate.toString(),
                  sitecoreContext?.language
                )}
              </span>
            )}
          </span>
        )}
        {hit.im_eventlocation && (
          <span className={styles['event-location']}>
            {hit.im_eventlocation}
          </span>
        )}
        {/* {hit.im_resourcedate_raw && (
            <div className={styles['date-overlay']}>
              <span className={styles.day}>{startDate.getDate()}</span>
              <span className={styles.month}>{startMonth}</span>
            </div>
          )} */}
      </a>
    </div>
  );
}

type ResourceCollectionProps = ComponentWithContextProps & {
  fields: {
    InstanceID: TextField;
    APIKey: TextField;
    IndexName: TextField;
    DisableInsights: boolean;
  };
};

const ResourceCollection = (props: ResourceCollectionProps): JSX.Element => {
  const instanceId = props?.fields?.InstanceID?.value
    ? props?.fields?.InstanceID?.value.toString()
    : '';

  const apiKey = props?.fields?.APIKey?.value
    ? props?.fields?.APIKey?.value.toString()
    : '';

  const indexName = props?.fields?.IndexName?.value
    ? props?.fields?.IndexName?.value.toString()
    : '';

  const { t } = useI18n() || {};
  const showMoreLabel = t ? t('search-load-more') : 'Load More';
  const srTypeNewroom = t
    ? t('search-result-type-newsroom')
    : 'Iron Mountain News';
  const { sitecoreContext } = useSitecoreContext();
  const motionAttributes = !sitecoreContext.pageEditing
    ? {
        initial: { opacity: 0, y: 50 },
        whileInView: { opacity: 1, y: 0 },
        viewport: { once: true },
        transition: { duration: 0.7, ease: 'easeInOut' },
      }
    : {};
  const isEditing = sitecoreContext.pageEditing;
  const filter = `im_searchresulttype:"${srTypeNewroom}"`;

  const algoliaClient = algoliasearch(instanceId, apiKey);

  const searchClient = {
    ...algoliaClient,
    search(requests) {
      const newRequests = requests.map((request) => {
        // test for empty string and change request parameter: analytics
        if (!request?.params?.query || request.params.query.length === 0) {
          (request.params as any).analytics = false;
        }

        return request;
      });

      return algoliaClient.search(newRequests);
    },
  } as SearchClient;

  const routing = {
    router: history(),
    stateMapping: {
      stateToRoute(uiState: { [x: string]: any }) {
        const state = uiState[indexName];

        return {
          eventtype: state.refinementList?.im_eventtype,
        };
      },
      routeToState(routeState: { eventtype: any }) {
        return {
          [indexName]: {
            refinementList: {
              im_eventtype: routeState.eventtype,
            },
          },
        };
      },
    },
  };

  return isEditing ? (
    <p>Search Disabled in Experience Editor</p>
  ) : (
    <div className={styles['event-collection-container']}>
      <motion.section
        {...motionAttributes}
        className={styles['event-collection']}
      >
        {getAnchorTag(props)}
        <InstantSearch
          indexName={indexName}
          searchClient={searchClient}
          insights={props?.fields?.DisableInsights ? true : undefined}
          routing={routing}
        >
          <Configure filters={filter} />
          <div
            className={classNames(styles['filter-container'], styles.mobile)}
          >
            <RefinementList
              attribute="im_eventtype"
              className={styles['filter-list']}
            />
          </div>
          {/* Customize Refinements: https://www.algolia.com/doc/api-reference/widgets/current-refinements/react-hooks/#widget-param-classnames */}
          <InfiniteHits
            hitComponent={Hit}
            showPrevious={false}
            translations={{
              showMoreButtonText: showMoreLabel,
            }}
            className={styles.list}
          />
        </InstantSearch>
      </motion.section>
    </div>
  );
};

export default withDatasourceCheck()<ResourceCollectionProps>(
  ResourceCollection
);

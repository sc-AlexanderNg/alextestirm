import {
  ComponentParams,
  Field,
  ImageField,
  Link,
  LinkField,
  RichText,
  //TextField,
  useSitecoreContext,
  withDatasourceCheck,
} from '@sitecore-jss/sitecore-jss-nextjs';
import { getTheme } from '../../helpers/ThemeHelper';
import { getVisibility } from '../../helpers/GetVisibilityHelper';
import { motion } from 'framer-motion';
import styles from './HomePageHero.module.css';

interface HomePageHeroProps {
  rendering: {
    componentName: string;
    dataSource: string;
  };
  params: ComponentParams;
  fields: {
    PersonaImage: ImageField;
    Title: Field<string>;
    Description: Field<string>;
    Button: LinkField;
  };
}

const HomePageHero = (props: HomePageHeroProps): JSX.Element => {
  const { fields } = props;
  const PersonaImage = fields?.PersonaImage;
  const Title = fields?.Title;
  const Description = fields?.Description;
  const Button = fields?.Button;
  const { sitecoreContext } = useSitecoreContext();
  const compName = props?.rendering?.componentName?.toLowerCase();

  if (!sitecoreContext.pageEditing && !fields) return <></>;

  const backgroundStyle = {
    backgroundImage: `url('${PersonaImage?.value?.src}')`,
  };

  const motionAttributesOne = !sitecoreContext.pageEditing
    ? {
        initial: {
          opacity: 0,
          x:
            typeof document !== 'undefined' && document?.dir === 'rtl'
              ? 250
              : -250,
        },
        whileInView: { opacity: 1, x: 0 },
        viewport: { once: true },
        transition: { duration: 0.7, ease: 'easeInOut' },
      }
    : {};
  const motionAttributesTwo = !sitecoreContext.pageEditing
    ? {
        initial: { opacity: 0, y: 50 },
        whileInView: { opacity: 1, y: 0 },
        viewport: { once: true },
        transition: { duration: 0.7, ease: 'easeInOut', delay: 0.7 },
      }
    : {};
  const motionAttributesThree = !sitecoreContext.pageEditing
    ? {
        initial: { opacity: 0, y: 50 },
        whileInView: { opacity: 1, y: 0 },
        viewport: { once: true },
        transition: { duration: 0.7, ease: 'easeInOut', delay: 1.4 },
      }
    : {};
  const motionAttributesFour = !sitecoreContext.pageEditing
    ? {
        initial: { opacity: 0, y: 50 },
        whileInView: { opacity: 1, y: 0 },
        viewport: { once: true },
        transition: { duration: 0.7, ease: 'easeInOut', delay: 2.1 },
      }
    : {};

  const devicetype = getVisibility(props);

  if (props?.params?.AutoScroll === '1') {
    setTimeout(() => {
      const HeroElement = document.getElementById(
        'homePageHero'
      ) as HTMLElement;

      let stickyHeader = 100;

      if (
        document.querySelector('header[data-is-sticky="false"]') as HTMLElement
      ) {
        stickyHeader = 0;
      } else if (
        !document.querySelector('#utility') as unknown as HTMLElement
      ) {
        stickyHeader = 47;
      }

      const HeroElementPos =
        HeroElement?.offsetTop + HeroElement?.offsetHeight - stickyHeader;

      if (!(document.body.scrollTop > HeroElementPos)) {
        document?.body?.scrollTo({
          top: HeroElementPos,
          behavior: 'smooth',
        });
      }
    }, 4000);
  }

  return (
    <div className={getTheme(props.params) + devicetype}>
      <div className={styles['homepage-hero']} id="homePageHero">
        <motion.div
          {...motionAttributesOne}
          className={styles['persona-image-container']}
          style={backgroundStyle}
        />
        <div className={styles['content-container']}>
          {Title?.value && (
            <motion.h1 {...motionAttributesTwo} className="font-header-xl">
              <RichText field={Title} />
            </motion.h1>
          )}
          {Description?.value && (
            <motion.p {...motionAttributesThree} className="font-list">
              <RichText field={Description} />
            </motion.p>
          )}
          {Button?.value?.href && (
            <motion.div {...motionAttributesFour}>
              <Link
                data-clickable-id={`${compName}-details`}
                data-clickable-text={props?.fields?.Button?.value?.text}
                data-clickable-href={props?.fields?.Button?.value?.href}
                data-icon={props?.fields?.Button?.value?.class}
                className="btn-tertiary"
                field={props?.fields?.Button}
              />
            </motion.div>
          )}
        </div>
      </div>
    </div>
  );
};

export default withDatasourceCheck()<HomePageHeroProps>(HomePageHero);

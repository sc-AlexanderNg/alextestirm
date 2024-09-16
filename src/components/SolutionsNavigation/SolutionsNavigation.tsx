import {
  ComponentParams,
  ComponentRendering,
  Field,
  ImageField,
  Image as JssImage,
  Link as JssLink,
  LinkField,
  Text,
  useSitecoreContext,
  withDatasourceCheck,
} from '@sitecore-jss/sitecore-jss-nextjs';
import { getTheme } from '../../helpers/ThemeHelper';
import { getVisibility } from '../../helpers/GetVisibilityHelper';
import styles from './SolutionsNavigation.module.css';

interface ComponentProps {
  rendering: ComponentRendering;
  params: ComponentParams;
  fields: {
    Logo1: ImageField;
    Logo2: ImageField;
    LogoLink1: LinkField;
    LogoLink2: LinkField;
    PhoneText: Field<string>;
    PhoneLink: LinkField;
  };
}

const SolutionsNavigation = (props: ComponentProps): JSX.Element => {
  const { fields } = props;
  const Logo1 = fields?.Logo1;
  const Logo2 = fields?.Logo2;
  const logoLink1 = fields?.LogoLink1;
  const logoLink2 = fields?.LogoLink2;
  const PhoneLink = fields?.PhoneLink;
  const PhoneText = fields?.PhoneText;
  const { sitecoreContext } = useSitecoreContext();
  const theme = getTheme(props.params) ? getTheme(props.params) : 'dark-blue';

  const devicetype = getVisibility(props);

  return !sitecoreContext.pageEditing && !fields ? (
    <></>
  ) : (
    <div
      className={styles['solutions-navigation'] + devicetype}
      data-theme={theme}
    >
      <div className={styles['solutions-navigations-left']}>
        {Logo1?.value ? (
          logoLink1?.value?.href ? (
            <JssLink field={logoLink1}>
              <JssImage field={Logo1} className={styles['logo1-image']} />
            </JssLink>
          ) : (
            <JssImage field={Logo1} className={styles['logo1-image']} />
          )
        ) : null}
      </div>
      <div className={styles['solutions-navigations-right']}>
        {Logo2?.value?.src ? (
          logoLink2?.value?.href ? (
            <JssLink field={logoLink2}>
              <JssImage field={Logo2} className={styles['logo2-image']} />
            </JssLink>
          ) : (
            <JssImage field={Logo2} className={styles['logo2-image']} />
          )
        ) : (
          <div className={styles['solutions-navigations-phone']}>
            {PhoneText?.value && (
              <Text
                tag="h4"
                field={PhoneText}
                className={styles['solutions-navigations-phonetext']}
                style={{ display: 'inline' }}
              />
            )}
            {PhoneLink?.value && (
              <JssLink field={PhoneLink}>
                {PhoneLink?.value?.text && (
                  <span className={styles['solutions-navigations-phonenumber']}>
                    {PhoneLink?.value.text}
                  </span>
                )}
              </JssLink>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default withDatasourceCheck()<ComponentProps>(SolutionsNavigation);

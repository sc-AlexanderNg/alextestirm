import { ComponentProps } from 'lib/component-props';
import { Placeholder } from '@sitecore-jss/sitecore-jss-nextjs';
import { getAnchorTag } from 'src/helpers/AnchorHelper';
import { getVisibility } from '../../helpers/GetVisibilityHelper';
import styles from './FullWidth.module.css';

const FullWidth = (props: ComponentProps): JSX.Element => {
  const phKey = `fullwidth`;
  const params = props?.params;
  const alignment = params?.Alignment
    ? JSON.parse(params?.Alignment)?.Value?.value
    : 'start';

  const devicetype = getVisibility(props);

  return (
    <>
      {getAnchorTag(props)}
      <div
        className={styles['full-width'] + devicetype}
        data-tabid={props?.params?.tabid}
        data-align={alignment}
      >
        <Placeholder name={phKey} rendering={props.rendering} />
      </div>
    </>
  );
};

export default FullWidth;

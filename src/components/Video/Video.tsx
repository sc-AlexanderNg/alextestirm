import { ImageField, TextField } from '@sitecore-jss/sitecore-jss-nextjs';
import { ComponentProps } from 'lib/component-props';
import VideoPlayer from 'components/VideoPlayer/VideoPlayer';
import { getVisibility } from '../../helpers/GetVisibilityHelper';
import styles from './Video.module.css';

type VideoProps = ComponentProps & {
  fields: {
    YoutubeID?: TextField;
    BrightcoveID?: TextField;
    Caption?: TextField;
    ButtonText?: TextField;
    Thumbnail?: ImageField;
  };
};

const Video = (props: VideoProps): JSX.Element => {
  const devicetype = getVisibility(props);

  return (
    <div
      data-is-video
      className={styles['video-wrapper'] + devicetype}
      data-tabid={props?.params?.tabid}
    >
      <VideoPlayer {...props} />
    </div>
  );
};

export default Video;

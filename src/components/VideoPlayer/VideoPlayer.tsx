import {
  ComponentParams,
  ComponentRendering,
  ImageField,
  Text,
  TextField,
} from '@sitecore-jss/sitecore-jss-nextjs';
import { useEffect, useState } from 'react';
import VideoModal from './VideoModal';
import { createYoutubeThumbnailUrl } from 'src/helpers/URLHelper';
import { fetchBrightcoveThumbnail } from 'src/helpers/FetchHelper';
import { getVisibility } from '../../helpers/GetVisibilityHelper';
import showBackToTop from 'src/utils/showBackToTop';
import styles from './VideoPlayer.module.css';
import { useI18n } from 'next-localization';

interface VideoPlayerProps {
  rendering: ComponentRendering;
  params: ComponentParams;
  fields: {
    YoutubeID?: TextField;
    BrightcoveID?: TextField;
    Caption?: TextField;
    ButtonText?: TextField;
    Thumbnail?: ImageField;
    onClickHandler?: () => void;
  };
}

const VideoPlayer = (props: VideoPlayerProps): JSX.Element => {
  const { fields } = props;
  const YoutubeID = fields?.YoutubeID;
  const BrightcoveID = fields?.BrightcoveID;
  const Caption = fields?.Caption;
  const ButtonText = fields?.ButtonText;
  const Thumbnail = fields?.Thumbnail;
  const { t } = useI18n() || {};
  const onClickHandler = fields?.onClickHandler as () => void;
  const [thumbnailUrl, setThumbnailUrl] = useState('');
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [error, setError] = useState<Error | null>(null);
  const playButtonText = t ? t('videoplayer-playbuttontext') : 'Watch Overview';
  const compName = 'videoplayer';

  useEffect(() => {
    if (!Thumbnail?.value?.src) {
      if (YoutubeID?.value) {
        setThumbnailUrl(createYoutubeThumbnailUrl(YoutubeID.value as string));
      } else if (BrightcoveID?.value) {
        const fetchData = async () => {
          try {
            const data = await fetchBrightcoveThumbnail(
              BrightcoveID.value as string
            );

            setThumbnailUrl(data?.poster);
          } catch (err) {
            setError(err as Error);
          }
        };

        fetchData();
      }
    } else {
      setThumbnailUrl(Thumbnail?.value?.src);
    }
  }, [BrightcoveID, Thumbnail, YoutubeID]);

  const onHandleClick = () => {
    onClickHandler?.();
    setIsModalOpen(true);
  };

  const closeModal = () => {
    showBackToTop();
    setIsModalOpen(false);
  };

  const devicetype = getVisibility(props);

  return error == null && (BrightcoveID?.value || YoutubeID?.value) ? (
    <div
      className={styles.thumbnail + devicetype}
      style={{ backgroundImage: `url('${thumbnailUrl}')` }}
      onClick={onHandleClick}
    >
      <button
        data-clickable-id={`${compName}-details`}
        data-clickable-text={ButtonText?.value}
        className={styles['play-button']}
      >
        <div className={styles['play-icon']} />
        {ButtonText?.value ? <Text field={ButtonText} /> : playButtonText}
      </button>
      <Text tag="p" field={Caption} className={styles.caption} />
      <VideoModal
        isOpen={isModalOpen}
        onClose={closeModal}
        YoutubeID={YoutubeID?.value as string}
        BrightcoveID={BrightcoveID?.value as string}
      />
    </div>
  ) : (
    <></>
  );
};

export default VideoPlayer;

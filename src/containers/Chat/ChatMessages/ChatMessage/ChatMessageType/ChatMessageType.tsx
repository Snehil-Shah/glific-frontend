import { useState } from 'react';
import Viewer from 'react-viewer';
import ReactPlayer from 'react-player';
import HtmlImgFallback from 'components/UI/ImgFallback/ImgFallback';
import VideoThumbnail from 'assets/images/videothumbnail.jpeg';
import { ReactComponent as MapIcon } from 'assets/images/map.svg';
import { ReactComponent as DocumentIconDark } from 'assets/images/icons/Document/Dark.svg';
import { ReactComponent as DownloadIcon } from 'assets/images/icons/Download.svg';
import { MessagesWithLinks } from 'containers/Chat/ChatMessages/MessagesWithLinks/MessagesWithLinks';
import styles from './ChatMessageType.module.css';

export interface ChatMessageTypeProps {
  type: string;
  media?: any;
  body: string;
  location?: any;
  isSimulatedMessage?: boolean;
  isContextMessage?: boolean;
  isSender?: boolean;
}

export const ChatMessageType = ({
  type,
  media,
  body,
  location,
  isSimulatedMessage,
  isContextMessage = false,
  isSender = false,
}: ChatMessageTypeProps) => {
  const [showViewer, setShowViewer] = useState(false);
  let messageBody;
  // manage validation if there is no media
  if (type !== 'LOCATION' && !media) {
    return (
      <div className={`${isContextMessage && styles.ContentMessageMaxWidth}`}>
        <MessagesWithLinks message={body} showPreview={!isContextMessage} isSender={isSender} />
      </div>
    );
  }

  switch (type) {
    case 'IMAGE': {
      const imageStyle = isContextMessage ? styles.ContextMessageImage : styles.Image;
      messageBody = (
        <div className={`${isContextMessage && styles.ContentMessageContainer}`}>
          <div
            className={isSimulatedMessage ? styles.SimulatorImage : imageStyle}
            data-testid="imageMessage"
          >
            <HtmlImgFallback
              src={media.url}
              onClick={() => setShowViewer(true)}
              alt="message image"
            />
            <Viewer
              visible={showViewer}
              onClose={() => {
                setShowViewer(false);
              }}
              images={[{ src: media.url, alt: '' }]}
              zIndex={1501} // greater than tooltips
            />
          </div>
          <MessagesWithLinks message={media.caption || media.text} />
        </div>
      );

      break;
    }

    case 'STICKER':
      messageBody = (
        <img
          data-testid="stickerMessage"
          src={media.url}
          className={isSimulatedMessage ? styles.SimulatorSticker : styles.Image}
          aria-hidden="true"
          alt="sticker"
        />
      );
      break;

    case 'AUDIO':
      messageBody = (
        <div>
          <audio
            controls
            data-testid="audioMessage"
            controlsList="nodownload"
            className={isSimulatedMessage ? styles.SimulatorAudio : styles.Audio}
          >
            <source src={media.url} />
          </audio>
        </div>
      );
      break;

    case 'VIDEO': {
      const videoStyles = isContextMessage ? styles.ContextMessageVideo : styles.Video;
      messageBody = (
        <div className={isContextMessage ? styles.ContentMessageContainer : ''}>
          <div data-testid="videoMessage">
            <ReactPlayer
              className={isSimulatedMessage ? styles.SimulatorVideo : videoStyles}
              url={media.url}
              controls
              light={VideoThumbnail}
              config={{ file: { attributes: { controlsList: 'nodownload' } } }}
            />
          </div>
          <MessagesWithLinks message={media.caption || media.text} />
        </div>
      );
      break;
    }

    case 'DOCUMENT':
      messageBody = (
        <div data-testid="documentMessage" className={styles.Document}>
          <div>
            <DocumentIconDark className={styles.DocumentIcon} />
            {media.caption}
          </div>
          <a
            href={media.url}
            className={styles.DocumentText}
            download={media.caption}
            target="_blank"
            rel="noreferrer"
          >
            {!isContextMessage && <DownloadIcon className={styles.DownloadIcon} />}
          </a>
        </div>
      );
      break;

    case 'LOCATION':
      messageBody = (
        <a
          href={`https://maps.google.com/?q=${location?.latitude},${location?.longitude}`}
          target="_blank"
          rel="noreferrer"
          data-testid="locationMessage"
        >
          <MapIcon className={isSimulatedMessage ? styles.MapIcon : ''} />
        </a>
      );
      break;

    default:
      messageBody = <MessagesWithLinks message={body} isSender={isSender} />;
  }

  return messageBody;
};

export default ChatMessageType;

/* library package */
import { FC } from 'react'
import {
  FacebookShareButton,
  TwitterShareButton,
  LinkedinShareButton,
  WhatsappShareButton,
  EmailShareButton,
  TelegramShareButton,
} from 'react-share'
/* styles */
import styles from 'public/scss/components/SocialShare.module.scss'

type TypeSocialShare = {
  urlSite: string
}

const SocialShare: FC<TypeSocialShare> = ({
  urlSite
}) => {

  return (
    <div className={styles.socialShare}>
      <div className={styles.socialShare_item}>
        <FacebookShareButton url={urlSite}>
          <span className={`${styles.socialShare_icon} facebook`} />
        </FacebookShareButton>
      </div>
      <div className={styles.socialShare_item}>
        <TwitterShareButton url={urlSite}>
          <span className={`${styles.socialShare_icon} twitter`} />
        </TwitterShareButton>
      </div>
      <div className={styles.socialShare_item}>
        <LinkedinShareButton url={urlSite}>
          <span className={`${styles.socialShare_icon} linkedin`} />
        </LinkedinShareButton>
      </div>
      <div className={styles.socialShare_item}>
        <WhatsappShareButton url={urlSite}>
          <span className={`${styles.socialShare_icon} whatsapp`} />
        </WhatsappShareButton>
      </div>
      <div className={styles.socialShare_item}>
        <EmailShareButton url={urlSite}>
          <span className={`${styles.socialShare_icon} email`} />
        </EmailShareButton>
      </div>
      <div className={styles.socialShare_item}>
        <TelegramShareButton url={urlSite}>
          <span className={`${styles.socialShare_icon} telegram`} />
        </TelegramShareButton>
      </div>
    </div>
  )
}

export default SocialShare
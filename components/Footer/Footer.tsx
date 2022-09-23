/* library package */
import { FC } from 'react'
import {
  Copyright,
  Widget,
  SocialMediaIcons
} from '@sirclo/nexus'
/* library template */
import useWindowSize from 'lib/useWindowSize'
/* component */
import Placeholder from '../Placeholder'

import styles from 'public/scss/components/Footer.module.scss'

const socialMediaIcons = {
  facebook: <img src="/images/facebook.svg" alt="facebook" />,
  twitter: <img src="/images/twitter.svg" alt="twitter" />,
  instagram: <img src="/images/instagram.svg" alt="instagram" />,
  youtube: <img src="/images/youtube.svg" alt="youtube" />,
  tiktok: <img src="/images/tiktok.svg" alt="tiktok" />
};

const classesMediaSocial = {
  socialMediaIconContainer: styles.footer_socialContainer,
  socialMediaIcon: styles.footer_socialItem,
}

const classesPlaceholderWidgetLink = {
  placeholderList: styles.footer_placeholderWidgetLink,
}

const classesPlaceholderWidgetLogoDescription = {
  placeholderList: styles.footer_placeholderWidgetLogoDescription,
}

const Footer: FC<any> = ({ withFooter }) => {
  const size: any = useWindowSize()

  return (
    <div className={styles.footer_wrapper}>
      <div className={styles.footer_container}>
        {withFooter &&
          <>
            <Widget
              pos="footer-2"
              widgetClassName={styles.footer_logoDescription}
              loadingComponent={
                <Placeholder
                  classes={classesPlaceholderWidgetLogoDescription}
                  withList={true}
                  listMany={2}
                />
              }
              thumborSetting={{
                width: size.width < 768 ? 576 : 1200,
                format: "webp",
                quality: 85
              }}
            />
            <SocialMediaIcons
              socialMediaIcons={socialMediaIcons}
              classes={classesMediaSocial}
            />
            <Widget
              pos="footer-1"
              widgetClassName={styles.footer_link}
              loadingComponent={
                <div className={styles.footer_link}>
                  <Placeholder
                    classes={classesPlaceholderWidgetLink}
                    withList={true}
                    listMany={4}
                  />
                </div>
              }
              thumborSetting={{
                width: size.width < 768 ? 576 : 1200,
                format: "webp",
                quality: 85
              }}
            />
          </>}

        <footer className={styles.footer_copyright}>
          <Copyright>
            <Widget
              pos="copyright-and-policy"
              thumborSetting={{
                width: 1,
                format: 'webp',
                quality: 5,
              }}
            />
          </Copyright>
        </footer>
      </div>
    </div>
  );
}

export default Footer;
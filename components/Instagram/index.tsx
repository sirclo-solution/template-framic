/* library package */
import { FC } from 'react'
/* component */
import { InstagramFeed } from '@sirclo/nexus'
import Placeholder from 'components/Placeholder'
/* library template */
import styles from 'public/scss/components/Instagram.module.scss'

type TSize = {
  width: number
}

type iProps = {
  size: TSize
  i18n: any
  brand: any
}

const classesInstagramFeed = {
  containerClassName: styles.instagram_container,
  mediaClassName: styles.instagram_media,
  imageClassName: styles.instagram_image,
  ctaClassName: styles.instagram_cta,
  layoutClassName: styles.instagram_layout,
  iconClassname: styles.instagram_icon
}

const classesPlaceholderCollapsibleNav = {
  placeholderImage: `${classesInstagramFeed.mediaClassName} ${classesInstagramFeed.imageClassName}`,
}

const Instagram: FC<iProps> = ({
  size,
  i18n,
  brand
}) => {
  const postLimit = size.width < 768 ? 4 : 7

  const handleFollowButton = () => {
    window.open(brand?.socmedSetting?.socmedLink?.instagram);
  }

  return (
    <div className={classesInstagramFeed.layoutClassName}>
      <InstagramFeed
        slidesPerPage={size.width < 768 ? false : 6}
        slidesPerScroll={size.width < 768 ? false : 1}
        autoPlay={3000}
        infinite
        postLimit={postLimit}
        thumborSetting={{
          width: size.width < 768 ? 200 : 270,
          height: 250,
          quality: 75,
          format: 'webp',
        }}
        classes={classesInstagramFeed}
        loadingComponent={
          <div className={classesInstagramFeed.containerClassName}>
            <Placeholder classes={classesPlaceholderCollapsibleNav} withImage />
            <Placeholder classes={classesPlaceholderCollapsibleNav} withImage />
            <Placeholder classes={classesPlaceholderCollapsibleNav} withImage />
            <Placeholder classes={classesPlaceholderCollapsibleNav} withImage />
            {postLimit === 7 && (
              <>
                <Placeholder
                  classes={classesPlaceholderCollapsibleNav}
                  withImage
                />
                <Placeholder
                  classes={classesPlaceholderCollapsibleNav}
                  withImage
                />
                <Placeholder
                  classes={classesPlaceholderCollapsibleNav}
                  withImage
                />
              </>
            )}
          </div>
        }
      />
      <div className={classesInstagramFeed.containerClassName}>
        <div
          className={classesInstagramFeed.ctaClassName}
          onClick={handleFollowButton}
        >
          <img src="/images/instagram_black.svg" alt="instagram" className={classesInstagramFeed.iconClassname} />
          <p>{i18n.t("instagram.cta")}</p>
        </div>
      </div>
    </div>
  )
}

export default Instagram

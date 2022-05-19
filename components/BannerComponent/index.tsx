import { FC } from 'react'
import { Banner } from '@sirclo/nexus'
import Carousel from '@brainhubeu/react-carousel'
import { useSizeBanner } from 'lib/useSizeBanner'
import useWindowSize from 'lib/useWindowSize'
import Placeholder from 'components/Placeholder'

import stylesBanner from 'public/scss/components/Banner.module.scss'

type BannerPropsType = {
  dataBanners: any
  isReady: boolean
}

const classesBanner = {
  imageContainerClassName: stylesBanner.bannerCarousel_header,
  linkClassName: stylesBanner.bannerCarousel_link,
  imageClassName: stylesBanner.bannerCarousel_image,
};

const classesPlaceholderBanner = {
  placeholderImage: stylesBanner.bannerCarousel_placeholder,
};

const BannerComponent: FC<BannerPropsType> = ({
  dataBanners,
  isReady,
}) => {
  const size = useWindowSize();

  return (
    <div className={stylesBanner.bannerCarousel}>
      <Banner
        data={dataBanners}
        Carousel={Carousel}
        classes={classesBanner}
        autoPlay={isReady ? 5000 : null}
        infinite
        dots
        thumborSetting={{
          width: useSizeBanner(size.width),
          format: 'webp',
          quality: 100,
        }}
        loadingComponent={
          <Placeholder classes={classesPlaceholderBanner} withImage />
        }
        widthImage={size.width}
        lazyLoadedImage={false}
      />
    </div>
  )
}

export default BannerComponent
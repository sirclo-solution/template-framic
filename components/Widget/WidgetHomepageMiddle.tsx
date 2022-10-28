/* library package */
import { FC } from 'react'
import { Widget } from '@sirclo/nexus'
import { LazyLoadComponent } from 'react-lazy-load-image-component'
/* library template */
import useWindowSize from 'lib/useWindowSize'
/* component */
import Placeholder from 'components/Placeholder'

import styles from 'public/scss/components/WidgetHomePage.module.scss'

const classesWidget = {
  widgetContainer: styles.widget_container,
  widgetItemMiddle: styles.widget_itemBottom,
};

const classesPlaceholderCollapsibleNav = {
  placeholderImage: `${classesWidget.widgetItemMiddle} ${styles.widget_placeholder}`,
};

const WidgetHomepageMiddle: FC<{}> = () => {
  const size = useWindowSize();
  return (
    <LazyLoadComponent>
      <Widget
        pos='main-content-2'
        containerClassName={classesWidget.widgetContainer}
        widgetClassName={classesWidget.widgetItemMiddle}
        loadingComponent={
          <div className={classesWidget.widgetContainer}>
            <Placeholder classes={classesPlaceholderCollapsibleNav} withImage />
            <Placeholder classes={classesPlaceholderCollapsibleNav} withImage />
          </div>
        }
        thumborSetting={{
          width: size.width < 768 ? 576 : 1200,
          format: 'webp',
          quality: 85,
        }}
      />
    </LazyLoadComponent>
  );
};

export default WidgetHomepageMiddle;

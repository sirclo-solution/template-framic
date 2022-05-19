/* library package */
import { FC } from 'react'
import { Widget } from '@sirclo/nexus'
import { LazyLoadComponent } from 'react-lazy-load-image-component'
/* component */
import Placeholder from 'components/Placeholder'
/* library template */
import useWindowSize from 'lib/useWindowSize'

import styles from 'public/scss/components/WidgetHomePage.module.scss'


const classesWidget = {
  widgetContainer: styles.widget_container,
  widgetItemTop: styles.widget_itemTop,
};

const classesPlaceholderCollapsibleNav = {
  placeholderImage: `${classesWidget.widgetItemTop} ${styles.widget_placeholder}`,
};

const WidgetHomepageTop: FC<{}> = () => {
  const size = useWindowSize();
  return (
    <LazyLoadComponent>
      <Widget
        pos='main-content-1'
        containerClassName={classesWidget.widgetContainer}
        widgetClassName={classesWidget.widgetItemTop}
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

export default WidgetHomepageTop;

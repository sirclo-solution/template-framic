import { FC } from 'react'
import styles from 'public/scss/components/EmptyComponent.module.scss'

export type EmptyComponentPropsType = {
  classes?: {
    emptyContainer?: string;
    emptyIcon? : string;
    emptyTitle?: string;
    emptyDesc?: string;
  };
  icon?: any;
  title?: string;
  desc?: string;
  button?: React.ReactNode;
};

const EmptyComponent: FC<EmptyComponentPropsType> = ({
  classes = {},
  icon,
  title,
  desc,
  button
}) => {
  const {
    emptyContainer = styles.empty_container,
    emptyIcon = styles.empty_icon,
    emptyTitle = styles.empty_title,
    emptyDesc = styles.empty_desc
  } = classes;

  return (
    <div className={emptyContainer}>
      {icon || <span className={emptyIcon} /> }
      <h2 className={emptyTitle}>{title}</h2>
      {desc &&
        <p className={emptyDesc}>{desc}</p>
      }
      {button && button}
    </div>
  )
}

export default EmptyComponent;
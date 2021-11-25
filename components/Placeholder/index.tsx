import { FC } from 'react'
import styles from 'public/scss/components/Placeholder.module.scss'

export type PlaceholderPropsType = {
  classes?: {
    placeholderImage?: string;
    placeholderTitle?: string;
    placeholderList?: string;
  };
  withImage?: boolean;
  withTitle?: boolean;
  withList?: boolean;
  listMany?: number;
};

const Placeholder: FC<PlaceholderPropsType> = ({
  classes = {},
  withImage = false,
  withTitle = false,
  withList = false,
  listMany = 2
}) => {
  const {
    placeholderImage = "placeholder_placeholderImage",
    placeholderTitle = "placeholder_placeholderTitle",
    placeholderList = "placeholder_placeholderList"
  } = classes;

  const loopList = (length) => {
    let element = []
    for (let i = 0; i < length; i++) {
      element.push(<div className={`${styles.placeholder} ${placeholderList}`} key={i}></div>)
    }
    return <>{element}</>
  }

  return (
    <>
      {withImage && <div className={`${styles.placeholder} ${placeholderImage}`}></div>}
      {withTitle && <div className={`${styles.placeholder} ${placeholderTitle}`}></div>}
      {withList && loopList(listMany)}
    </>
  )
}

export default Placeholder;
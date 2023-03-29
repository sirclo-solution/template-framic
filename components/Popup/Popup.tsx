import { FC, ReactNode } from 'react'
import styles from 'public/scss/components/Popup.module.scss'

export type PopupPropsType = {
  title?: string
  isOpen: boolean
  setPopup: (value: boolean) => void
  withClose?: boolean
  maxWidth?: string
  children?: ReactNode
}

const Popup: FC<PopupPropsType> = ({
  title,
  isOpen,
  setPopup,
  withClose = true,
  maxWidth,
  children
}) => {

  const handleClick = (event: any) => event.target === event.currentTarget && setPopup(false)

  if (!isOpen) return <></>

  return (
    <div className={styles.popup_overlay} onClick={withClose && handleClick}>
      <div className={styles.popup_container} style={{ maxWidth: maxWidth }}>
        <div className={styles.popup_header}>
          {title &&
            <h3
              className={styles.popup_title}
              style={{ textAlign: withClose ? "left" : "center" }}
            >
              {title}
            </h3>
          }
          {withClose && <span className={styles.popup_close} onClick={() => setPopup(false)}/>}
        </div>
        <div className={styles.popup_body}>
          {children}
        </div>
      </div>
    </div>
  )
}

export default Popup
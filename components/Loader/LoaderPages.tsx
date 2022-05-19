import { useI18n } from '@sirclo/nexus'
import styles from 'public/scss/components/LoaderPages.module.scss'

const LoaderPages = () => {
  const i18n: any = useI18n();

  return (
    <div className={styles.loaderpages_wrapper}>
      <div className={styles.loaderpages_container}>
        <div className={styles.loaderpages_dotItemContainer}>
          <span className={styles.loaderpages_dotItem} />
          <span className={styles.loaderpages_dotItem} />
          <span className={styles.loaderpages_dotItem} />
        </div>
        <p className={styles.loaderpages_title}>{i18n.t("home.loading")}</p>
      </div>
    </div>
  )
}

export default LoaderPages;
/* library package */
import { FC } from 'react'
import { GetServerSideProps, InferGetServerSidePropsType } from 'next'
import { ResetPassword, useI18n } from '@sirclo/nexus'
import { toast } from 'react-toastify'
/* library template */
import { parseCookies } from 'lib/parseCookies'
import redirectIfAuthenticated from 'lib/redirectIfAuthenticated'
import { useBrand } from 'lib/useBrand'
/* component */
import Layout from 'components/Layout/Layout'
import Loader from 'components/Loader/Loader'
import Breadcrumb from 'components/Breadcrumb/Breadcrumb'
/* styles */
import styles from 'public/scss/components/ForgotPassword.module.scss'
import stylesForm from 'public/scss/components/Form.module.scss'
import stylesButton from 'public/scss/components/Button.module.scss'

const classesResetPassword = {
  inputClassName: stylesForm.form_inputLong,
  buttonClassName: `${stylesButton.btn_primaryLong} ${styles.forgotPassword_button}`,
}

const ForgotPassword: FC<any> = ({
  lng,
  lngDict,
  brand
}: InferGetServerSidePropsType<typeof getServerSideProps>) => {
  const i18n: any = useI18n()
  const linksBreadcrumb = [`${i18n.t("header.home")}`, `${i18n.t("resetPassword.title")}`]

  return (
    <Layout
      i18n={i18n}
      lng={lng}
      lngDict={lngDict}
      brand={brand}
      setSEO={{ title: i18n.t("forgotPassword.title") }}
    >
      <Breadcrumb links={linksBreadcrumb} lng={lng} />
      <div className={styles.forgotPassword_wrapper}>
        <div className={styles.forgotPassword_container}>
          <h3 className={styles.forgotPassword_title}>
            {i18n.t("resetPassword.title")}
          </h3>
          <p className={styles.forgotPassword_desc}>
            {i18n.t("resetPassword.enterEmailBody")}
          </p>
          <ResetPassword
            classes={classesResetPassword}
            onErrorMsg={(msg: string) => toast.error(msg)}
            onSuccessMsg={(msg: string) => toast.success(msg)}
            loadingComponent={<Loader color="text-light" />}
          />
        </div>
      </div>
    </Layout>
  )
}

export const getServerSideProps: GetServerSideProps = async ({
  req,
  res,
  params
}) => {
  const brand = await useBrand(req)
  const cookies = parseCookies(req)
  const defaultLanguage = brand?.settings?.defaultLanguage || params.lng || 'id'
  const { default: lngDict = {} } = await import(`locales/${defaultLanguage}.json`)

  redirectIfAuthenticated(res, cookies, 'account', defaultLanguage)

  return {
    props: {
      lng: defaultLanguage,
      lngDict,
      brand: brand || ""
    }
  }
}

export default ForgotPassword
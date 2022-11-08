/* library package */
import { FC } from 'react'
import { GetServerSideProps, InferGetServerSidePropsType } from 'next'
import { SetNewPassword, useI18n, useAuthToken } from '@sirclo/nexus'
import { toast } from 'react-toastify'
import { CheckCircle } from 'react-feather'
/* library template */
import { useBrand } from 'lib/useBrand'
/* component */
import Layout from 'components/Layout/Layout'
import Loader from 'components/Loader/Loader'
import Breadcrumb from 'components/Breadcrumb/Breadcrumb'
/* styles */
import styles from 'public/scss/components/ResetPassword.module.scss'
import stylesForm from 'public/scss/components/Form.module.scss'
import stylesButton from 'public/scss/components/Button.module.scss'
import stylesPassword from 'public/scss/components/PasswordStrength.module.scss'

const classesSetNewPassword = {
  inputContainerClassName: stylesForm.form_control,
  inputClassName: stylesForm.form_inputLong,
  buttonClassName: stylesButton.btn_primaryLong,
  passwordViewButtonClassName: styles.resetPassword_btnHideShow,
  // Password Field
  passwordStrengthBarContainerClassName: stylesPassword.passwordStrength,
  passwordStrengthBarClassName: stylesPassword.passwordStrength_bar,
  passwordStrengthLabelClassName: stylesPassword.passwordStrength_label,
  passwordCriteriaClassName: stylesPassword.passwordStrength_criteriaItem,
  passwordCriteriaListClassName: stylesPassword.passwordStrength_criteria
}

const ResetPasswordPage: FC<any> = ({
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
      setSEO={{ title: i18n.t("resetPassword.reset") }}
    >
      <Breadcrumb links={linksBreadcrumb} lng={lng} />
      <div className={styles.resetPassword_wrapper}>
        <div className={styles.resetPassword_container}>
          <h3 className={styles.resetPassword_title}>{i18n.t("resetPassword.setNew")}</h3>
          <SetNewPassword
            classes={classesSetNewPassword}
            onErrorMsg={(msg: string) => toast.error(msg)}
            onSuccessMsg={(msg: string) => toast.success(msg)}
            passwordViewIcon={<span className={styles.resetPassword_viewIcon} />}
            passwordHideIcon={<span className={styles.resetPassword_hideIcon} />}
            passwordFulfilledCriteriaIcon={<CheckCircle color="green" size={16} />}
            passwordUnfulfilledCriteriaIcon={<CheckCircle color="gray" size={16} />}
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
  params,
}) => {
  const [brand, ] = await Promise.all([
    useBrand(req),
    useAuthToken({ req, res, env: process.env }),
  ]);
  const defaultLanguage = brand?.settings?.defaultLanguage || params.lng || 'id'
  const { default: lngDict = {} } = await import(`locales/${defaultLanguage}.json`)

  return {
    props: {
      lng: defaultLanguage,
      lngDict,
      brand: brand || ""
    }
  }
}

export default ResetPasswordPage

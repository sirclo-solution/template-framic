/* library package */
import { FC, useState } from 'react'
import { GetServerSideProps, InferGetServerSidePropsType } from 'next'
import Router from 'next/router'
import { toast } from 'react-toastify'
import ReCAPTCHA from 'react-google-recaptcha'
import {
  Calendar,
  CheckCircle
} from 'react-feather'
import { Register, useI18n } from '@sirclo/nexus'
/* library template */
import redirectIfAuthenticated from 'lib/redirectIfAuthenticated'
import { parseCookies } from 'lib/parseCookies'
import { useBrand } from 'lib/useBrand'
import {
  useGoogleAuth,
  useFacebookAuth,
  useWhatsAppOTPSetting
} from 'lib/useAuthMethod'
/* component */
import Breadcrumb from 'components/Breadcrumb/Breadcrumb'
import Layout from 'components/Layout/Layout'
import Loader from 'components/Loader/Loader'
import LoginRegisterOTP from 'components/LoginRegisterOTP'
/* styles */
import styles from 'public/scss/pages/Register.module.scss'
import stylesForm from 'public/scss/components/Form.module.scss'
import stylesButton from 'public/scss/components/Button.module.scss'
import stylesPassword from 'public/scss/components/PasswordStrength.module.scss'

const classesRegister = {
  headerLabelClassName: styles.register_headerLabel,
  inputContainerClassName: stylesForm.form_control,
  buttonClassName: stylesButton.btn_primaryLong,
  verificationContainerClassName: styles.register_verificationContainer,
  labelRequiredClassName: stylesForm.form_label,
  inputClassName: stylesForm.form_inputLong,

  // Password Field
  passwordStrengthBarContainerClassName: stylesPassword.passwordStrength,
  passwordStrengthBarClassName: stylesPassword.passwordStrength_bar,
  passwordStrengthLabelClassName: stylesPassword.passwordStrength_label,
  passwordCriteriaClassName: stylesPassword.passwordStrength_criteriaItem,
  passwordCriteriaListClassName: stylesPassword.passwordStrength_criteria,
}

const RegisterPage: FC<any> = ({
  lng,
  lngDict,
  brand,
  hasOtp,
  hasGoogleAuth,
  hasFacebookAuth
}: InferGetServerSidePropsType<typeof getServerSideProps>) => {
  const i18n: any = useI18n()

  const [isVerified, setIsVerified] = useState<boolean>(false)
  const linksBreadcrumb = [`${i18n.t("header.home")}`, `${i18n.t("register.title")}`]

  return (
    <Layout
      i18n={i18n}
      lng={lng}
      lngDict={lngDict}
      brand={brand}
      setSEO={{ title: i18n.t("register.title") }}
    >
      <Breadcrumb links={linksBreadcrumb} lng={lng} />
      <div className={styles.register_wrapper}>
        <div className={styles.register_container}>
          <LoginRegisterOTP
            type="register"
            hasOtp={hasOtp}
            brand={brand}
            title={i18n.t("register.title")}
            hasGoogleAuth={hasGoogleAuth}
            hasFacebookAuth={hasFacebookAuth}
          >
            <Register
              classes={classesRegister}
              withHeaderLabel={true}
              onErrorMsg={(msg) => toast.error(msg)}
              onSuccessMsg={(msg) => toast.success(msg)}
              redirectPage={() => Router.push(`/[lng]/login`, `/${lng}/login`)}
              passwordViewIcon={<span className={styles.register_viewIcon} />}
              passwordHideIcon={<span className={styles.register_hideIcon} />}
              passwordFulfilledCriteriaIcon={<CheckCircle color="green" size={16} />}
              passwordUnfulfilledCriteriaIcon={<CheckCircle color="gray" size={16} />}
              datePickerCalendarIcon={<Calendar />}
              withVerification={true}
              isVerified={isVerified}
              loadingComponent={<Loader color="text-light" />}
              verificationComponent={
                <ReCAPTCHA
                  sitekey={process.env.NEXT_PUBLIC_SITEKEY_RECAPTCHA}
                  onChange={() => setIsVerified(true)}
                />
              }
            />
          </LoginRegisterOTP>
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
  const defaultLanguage = brand?.settings?.defaultLanguage || params.lng || 'id'
  const { default: lngDict = {} } = await import(`locales/${defaultLanguage}.json`)
  const cookies = parseCookies(req)
  const hasGoogleAuth = await useGoogleAuth(req)
  const hasFacebookAuth = await useFacebookAuth(req)
  const hasOtp = await useWhatsAppOTPSetting(req)
  redirectIfAuthenticated(res, cookies, 'account', defaultLanguage)

  return {
    props: {
      lng: defaultLanguage,
      lngDict,
      hasGoogleAuth,
      hasFacebookAuth,
      hasOtp,
      brand: brand || ""
    }
  }
}

export default RegisterPage

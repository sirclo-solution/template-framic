/* library package */
import { FC, useRef, useEffect } from 'react'
import { GetServerSideProps, InferGetServerSidePropsType } from 'next'
import { toast } from 'react-toastify'
import { Login, useI18n } from '@sirclo/nexus'
import ReCAPTCHA from 'react-google-recaptcha'
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
import LoginRegisterOTP from 'components/LoginRegisterOTP'
/* styles */
import styles from 'public/scss/pages/Login.module.scss'
import stylesButton from 'public/scss/components/Button.module.scss'
import stylesForm from 'public/scss/components/Form.module.scss'

const loginClasses = {
  containerClassName: styles.login_formContainer,
  inputContainerClassName: stylesForm.form_control,
  inputClassName: stylesForm.form_inputLong,
  buttonClassName: stylesButton.btn_primaryLong,
  footerClassName: styles.login_footer,
  forgotPasswordClass: styles.login_forgotPassword,
  disclaimerMessageContainerClassName: styles.login_disclaimer
}

const LoginPage: FC<any> = ({
  lng,
  lngDict,
  brand,
  hasGoogleAuth,
  hasOtp,
  hasFacebookAuth
}: InferGetServerSidePropsType<typeof getServerSideProps>) => {
  const i18n: any = useI18n()
  const recaptchaRef = useRef<any>()

  const linksBreadcrumb = [`${i18n.t("header.home")}`, `${i18n.t("login.title")}`]

  const getReCAPTCHAToken = async () => {
    const token = await recaptchaRef.current.executeAsync()
    recaptchaRef.current.reset()
    return token
  }

  useEffect(() => {
    document.body.classList.add("login");
  }, []);

  return (
    <Layout
      i18n={i18n}
      lng={lng}
      lngDict={lngDict}
      brand={brand}
      setSEO={{ title: i18n.t("login.login") }}
    >
      <Breadcrumb links={linksBreadcrumb} lng={lng} />
      <div className={styles.login_wrapper}>
        <div className={styles.login_container}>
          <LoginRegisterOTP
            type="login"
            getReCAPTCHAToken={getReCAPTCHAToken}
            hasOtp={hasOtp}
            brand={brand}
            title={i18n.t("login.title")}
            customLocales={{
              continue: i18n.t("whatsAppOTPInput.continue"),
              disclaimer: i18n.t("whatsAppOTPInput.disclaimer"),
              inputWhatsApp: i18n.t("whatsAppOTPInput.inputWhatsApp"),
              loginWithAnotherMethod: i18n.t("whatsAppOTPInput.loginWithAnotherMethod"),
              chooseAnyAccountToLogin: i18n.t("whatsAppOTPInput.chooseAnyAccountToLogin"),
            }}
            hasGoogleAuth={hasGoogleAuth}
            hasFacebookAuth={hasFacebookAuth}
          >
            <Login
              classes={loginClasses}
              onCompletedMsg={(msg: string) => toast.success(msg)}
              onErrorMsg={(msg: string) => toast.error(msg)}
              passwordViewIcon={<span className={styles.login_viewIcon} />}
              passwordHideIcon={<span className={styles.login_hideIcon} />}
              loadingComponent={
                <p>{i18n.t("global.loading")}</p>
              }
            />
          </LoginRegisterOTP>
        </div>
      </div>
      <ReCAPTCHA
        ref={recaptchaRef}
        sitekey={process.env.NEXT_PUBLIC_SITEKEY_RECAPTCHA_INVISIBLE}
        size='invisible'
      />
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

export default LoginPage
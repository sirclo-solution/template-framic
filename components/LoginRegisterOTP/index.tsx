/* Library Packages */
import { FC, useState } from 'react'
import { toast } from 'react-toastify'
import { IncomingMessage } from 'http'
import { useRouter } from 'next/router'
import Link from 'next/link'
import {
  SingleSignOn,
  useI18n,
  WhatsAppOTPInput
} from '@sirclo/nexus'
// styles
import styles from 'public/scss/components/LoginRegisterOTP.module.scss'
import stylesButton from 'public/scss/components/Button.module.scss'
import stylesForm from 'public/scss/components/Form.module.scss'

type LoginRegisterOTPPropsType = {
  hasOtp: IncomingMessage
  hasGoogleAuth: IncomingMessage
  hasFacebookAuth: IncomingMessage
  title?: string
  type: "login" | "register"
  brand: any
};

const classesWhatsAppOTP = {
  //form
  inputFormContainerClassName: styles.loginregister_inputFormContainer,
  formWAContainerClassName: styles.loginregister_formWAContainer,
  inputFormTitleClassName: styles.loginregister_inputFormTitle,
  inputLabelClassName: styles.loginregister_inputLabel,
  inputWANumberClassName: stylesForm.form_inputLong,
  inputFormDescriptionClassName: styles.loginregister_inputFormDescription,
  btnSubmitClassName: stylesButton.btn_primaryLong,
  inputDescriptionClassName: styles.loginregister_inputDescription,
  //confirmation
  confirmationContainerClassName: styles.loginregister_confirmationContainer,
  confirmationBackContainerClassName: styles.loginregister_confirmationBackContainer,
  confirmationBackLabelClassName: styles.loginregister_confirmationBackLabel,
  confirmationHeaderTitleClassName: styles.loginregister_confirmationHeaderTitle,
  confirmationHeaderSubtitleClassName: styles.loginregister_confirmationHeaderSubtitle,
  noWhatsAppLabelClassName: styles.loginregister_noWhatsAppLabel,
  anotherLoginMethodClassName: stylesButton.btn_textLong,
  confirmationButtonOTPClassName: stylesButton.btn_primaryLong,
  //verification
  verificationTitleClassName: styles.loginregister_verificationTitle,
  infoLabelClassName: styles.loginregister_infoLabel,
  footerLabelClassName: styles.loginregister_footerLabel,
  btnResendOTPClassName: stylesButton.btn_primaryLong,
  btnChangeMethodClassName: stylesButton.btn_textLong,
  fieldOTPInputContainerClassName: styles.loginregister_fieldOTPInputContainer,
  fieldOTPInputClassName: styles.loginregister_fieldOTPInput,
  //choose account
  accountOptionsContainerClassName: styles.loginregister_accountOptionsContainer,
  accountOptionClassName: styles.loginregister_accountOption,
  accountNameClassName: styles.loginregister_accountName,
  accountEmailClassName: styles.loginregister_accountEmail,
  selectedAccountClassName: styles.loginregister_selectedAccount,
  chooseAccountTitleClassName: styles.loginregister_chooseAccountTitle,
  chooseAccountDescriptionClassName: styles.loginregister_chooseAccountDescription,
  btnChooseAccountClassName: stylesButton.btn_primaryLong,

}

const LoginRegisterOTP: FC<LoginRegisterOTPPropsType> = ({
  type,
  brand,
  hasOtp,
  children,
  title,
  hasGoogleAuth,
  hasFacebookAuth,
}) => {
  const i18n: any = useI18n()
  const router: any = useRouter()
  const query = router?.query || {}

  const steps = {
    email: "email",
    wa: "whatsapp-input"
  }
  const [step, setStep] = useState<string>(steps.wa)

  const brandName = (brand: string): string => {
    const lower = brand?.toLowerCase()
    return brand?.charAt(0).toUpperCase() + lower?.slice(1)
  }

  const handleChangeStep = (step: string) => {
    if (step === steps.email) setStep('whatsapp-input')
    if (step === steps.wa) setStep('email')
  }

  return (
    <>
      {((step === steps.email || step === steps.wa) && title) &&
        <h3 className={`${styles.loginregister_title} ${ step === steps.email || !hasOtp  ? "" : "sso"}`}>{title}</h3>
      }

      {step === steps.email || !hasOtp ?
        children
        :
        <WhatsAppOTPInput
          brandName={brandName(brand?.name)}
          onStepChange={setStep}
          classes={classesWhatsAppOTP}
          inputPlaceholder={i18n.t("whatsAppOTPInput.inputPlaceholder")}
          onErrorMsg={(msg) => toast.error(msg)}
          loginRedirectPath="account"
          loadingComponent={<></>}
          customLocales={{
            continue: i18n.t("title.title"),
            disclaimer: i18n.t("title.disclaimer"),
            inputWhatsApp: i18n.t("title.inputWhatsApp"),
            loginWithAnotherMethod: i18n.t("title.loginWithAnotherMethod"),
            chooseAnyAccountToLogin: i18n.t("title.chooseAnyAccountToLogin"),
          }}
        />
      }

      {(step === steps.wa || type === "register") &&
        <div className={styles.loginregister_footer}>
          {type === "register" ?
            i18n.t('register.haveAccount') :
            i18n.t('login.dontHaveAccount')
          } {' '}
          <Link
            href={{
              pathname: `/[lng]/${type === "register" ? "login" : "register"}`,
              query: query,
            }}
          >
            <a>
              {type === "register" ?
                i18n.t('login.title') :
                i18n.t('login.toRegister')
              }
            </a>
          </Link>
        </div>
      }

      {(step === steps.email || step === steps.wa) &&
        <>
          {(hasGoogleAuth || hasFacebookAuth || hasOtp) &&
            <div className={styles.loginregister_ssoContainer}>
              {(hasGoogleAuth || hasFacebookAuth || hasOtp) &&
                <label className={styles.loginregister_ssoOr}>
                  {i18n.t(`${type}.or`)}
                </label>
              }
              <div className={styles.loginregister_ssoButtonContainer}>
                <SingleSignOn
                  className={styles.loginregister_ssoButton}
                  buttonText={i18n.t("login.sso")}
                  onErrorMsg={(msg: string) => toast.error(msg)}
                  loadingComponent={
                    <div className="text-center">
                      <span className="spinner-border text-dark" role="status" />
                      <p>
                        {i18n.t("global.loading")}
                      </p>
                    </div>
                  }
                />
                {hasOtp &&
                  <button
                    className={`${styles.loginregister_ssoButton} ${step}`}
                    onClick={() => handleChangeStep(step)}
                  />
                }
              </div>
            </div>
          }
        </>
      }
    </>
  )
}
export default LoginRegisterOTP

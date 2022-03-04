/* library package */
import { FC } from 'react'
import { GetServerSideProps, InferGetServerSidePropsType } from 'next'
import {
  ShipmentTracker,
  useI18n
} from '@sirclo/nexus'
/* library template */
import { useBrand } from 'lib/useBrand'
/* component */
import Layout from 'components/Layout/Layout'
import Breadcrumb from 'components/Breadcrumb/Breadcrumb'
/* styles */
import styles from 'public/scss/pages/Track.module.scss'
import stylesShipmentTracker from 'public/scss/components/ShipmentTracker.module.scss'

const classesTrackerPage = {
  shipmentHeaderTextClassName: styles.track_shipmentHeaderText,
  shipmentHeaderClassName: stylesShipmentTracker.shipmenttracker_shipmentHeader,
  shipmentBodyClassName: stylesShipmentTracker.shipmenttracker_shipmentBody,
  shipmentFooterClassName: stylesShipmentTracker.shipmenttracker_shipmentFooter,
  shipmentTrackingClassName: stylesShipmentTracker.shipmenttracker_shipmentTracking,
  shipmentTextClassName: stylesShipmentTracker.shipmenttracker_shipmentText,
  shipmentNoteClassName: stylesShipmentTracker.shipmenttracker_shipmentNote,
  shipmentListClassName: stylesShipmentTracker.shipmenttracker_shipmentList,
  shipmentListWrapperClassName: stylesShipmentTracker.shipmenttracker_shipmentListWrapper,
  shipmentCloseIconClassName: stylesShipmentTracker.shipmenttracker_shipmentCloseIcon,
  shipmentTrackButtonClassName: stylesShipmentTracker.shipmenttracker_shipmentTrackButton,
}


const TrackerPage: FC<any> = ({
  lng,
  lngDict,
  order_token
}: InferGetServerSidePropsType<typeof getServerSideProps>) => {
  const i18n: any = useI18n()
  const linksBreadcrumb = [`${i18n.t("header.home")}`, `${i18n.t("shipping.track")}`]

  return (
    <Layout
      i18n={i18n}
      lng={lng}
      lngDict={lngDict}
      setSEO={{ title: i18n.t("shipping.track") }}
    >
      <Breadcrumb links={linksBreadcrumb} lng={lng} />
      <div className={styles.track_wrapper}>
        <div className={styles.track_container}>
          <h3 className={styles.track_title}>{i18n.t("shipping.track")}</h3>
          <ShipmentTracker
            token={order_token}
            iconTracker={
              <img
                className="mr-2"
                src={"/images/motorcycle.svg"}
                alt="motorcycle"
              />
            }
            classes={classesTrackerPage}
          />
        </div>
      </div>
    </Layout>
  )
}

export const getServerSideProps: GetServerSideProps = async ({
  req,
  params
}) => {
  const brand = await useBrand(req)
  const defaultLanguage = brand?.settings?.defaultLanguage || params.lng || 'id'
  const { default: lngDict = {} } = await import(`locales/${defaultLanguage}.json`)

  return {
    props: {
      lng: defaultLanguage,
      lngDict,
      order_token: params.token
    },
  }
}

export default TrackerPage
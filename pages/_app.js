import "@brainhubeu/react-carousel/lib/style.css";
import "react-toastify/dist/ReactToastify.css";
import "public/scss/main.scss";

import { useState, useEffect } from "react";
import {
  useApollo,
  ApolloProvider,
  PackageFeatureProvider,
  Widget,
  I18n
} from "@sirclo/nexus";
import { PageTransition } from "next-page-transitions";
import { handleWebVitals } from "lib/handleWebVitals";
import MaintenanceMode from "@sirclo/nexus/lib/component/MaintenanceMode";

export const reportWebVitals = (metric) => handleWebVitals(metric);

const classesMaintenance = {
  maintenanceContainerClassName: 'maintenance__container',
  maintenanceTitleClassName: 'maintenance__title',
  maintenanceInfoClassName: 'maintenance__info',
  imageContainerClassName: 'maintenance__container--images',
  imageClassName: 'maintenance__container--images-img',
}

function MyApp({ Component, pageProps, router }) {
  const apolloClient = useApollo(pageProps.initialApolloState);
  // Temporarily using persistent layout for PDP
  const getLayout = Component.getLayout ?? ((page) => page);

  const [hash, setHash] = useState("");

  useEffect(() => {
    const routeChangeHandler = () => {
      setHash(Math.random().toString(36).substring(7));
    };

    router.events.on("routeChangeComplete", routeChangeHandler);

    return () => {
      router.events.off("routeChangeComplete", routeChangeHandler);
    };
  }, []);

  return (
    <PageTransition
      timeout={200}
      loadingDelay={100}
      classNames="page-transition"
    >
      <ApolloProvider client={apolloClient} key={router.route}>
        <PackageFeatureProvider>
          <MaintenanceMode classes={classesMaintenance}>
            <I18n lngDict={pageProps.lngDict} locale={pageProps.lng}>
              {Component.getLayout ? getLayout(<Component {...pageProps} />) : <Component {...pageProps} />}
              <Widget pos="script" hash={hash} />
            </I18n>
          </MaintenanceMode>
        </PackageFeatureProvider>
      </ApolloProvider>
    </PageTransition>
  );
}

export default MyApp;

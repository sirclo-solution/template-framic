import { FC, useState } from "react";
import { GetServerSideProps, InferGetServerSidePropsType } from "next";
import { useRouter } from "next/router";
import {
	Legal,
	LegalCategories,
	useI18n,
	useAuthToken,
} from "@sirclo/nexus";
import { useBrand } from "lib/useBrand";
import Layout from "components/Layout/Layout";
import Loader from "components/Loader/Loader";
import Breadcrumb from "components/Breadcrumb/Breadcrumb";

import styles from "public/scss/pages/Legal.module.scss";

type TDataLegal = {
	title: string;
	lastUpdate: string;
};

const classesLegal = {
	containerClassName: styles.legal_container,
};

const classesLegalCategories = {
	legalCategoriesContainerClassName: styles.legalCategories_container,
	legalCategoriesListClassName: styles.legalCategories_list,
	legalCategoriesItemClassName: styles.legalCategories_item,
	legalCategoriesItemActiveClassName: styles.legalCategories_item__active,
};

const LegalPage: FC<any> = ({
	lng,
	lngDict,
	slug,
	brand,
}: InferGetServerSidePropsType<typeof getServerSideProps>) => {
	const i18n: any = useI18n();
	const router = useRouter();
	const [data, setData] = useState<TDataLegal>();
	const linksBreadcrumb = [`${i18n.t("header.home")}`, data?.title];
	const layoutProps = {
		lng,
		lngDict,
		i18n,
		brand,
		SEO: { title: data?.title },
	};

	return (
		<Layout {...layoutProps}>
			<Breadcrumb links={linksBreadcrumb} lng={lng} />
			<div className={styles.legal_parent}>
				<div className="row">
					<div className="w-100">
						<h1 className={styles.legal_headerTitle}>
							{data?.title}
						</h1>
					</div>
					<div className="col-12 col-md-8 col-lg-8">
						<Legal
							classes={classesLegal}
							legalKey={slug.toString()}
							getData={(data: TDataLegal) => setData(data)}
							loadingComponent={
								<div className="text-center">
									<Loader color={"dark"} />
								</div>
							}
						/>
					</div>
					<div className="col-12 col-md-4 col-lg-3 offset-lg-1">
						<LegalCategories
							i18n={i18n}
							router={router}
							classes={classesLegalCategories}
						/>
					</div>
				</div>
			</div>
		</Layout>
	);
};

export const getServerSideProps: GetServerSideProps = async ({
	req,
	res,
	params,
}) => {
	const [brand, ] = await Promise.all([
		useBrand(req),
		useAuthToken({ req, res, env: process.env }),
	]);
	const defaultLanguage =
		brand?.settings?.defaultLanguage || params.lng || "id";
	const { default: lngDict = {} } = await import(
		`locales/${defaultLanguage}.json`
	);

	return {
		props: {
			lng: defaultLanguage,
			lngDict,
			slug: params.slug,
			brand: brand || ""
		},
	};
};

export default LegalPage;

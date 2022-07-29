import { getBrand } from '@sirclo/nexus'
import { ParsedUrlQuery } from 'querystring'
import { GRAPHQL_URI } from '../components/Constants'
import { IncomingMessage } from 'http'

export const useBrand = async (req: IncomingMessage) => {
  try {
    return await getBrand(GRAPHQL_URI(req))
  } catch (e) {
    console.log('Error while request brand: ', e)
  }
}

// To handle and simplify some common function on gssp
export const useBrandCommon = async (
  req: IncomingMessage,
  params: ParsedUrlQuery
) => {
  try {
    const brand = await getBrand(GRAPHQL_URI(req))
    const lng = brand?.settings?.defaultLanguage || params.lng || 'id'
    const { default: lngDict = {} } = await import(`locales/${lng}.json`)

    return {
      brand: brand || '',
      lngDict,
      lng,
    }
  } catch (err) {
    console.log('Error while request brand: ', err)
  }
}

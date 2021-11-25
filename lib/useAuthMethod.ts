import { 
  getGoogleAuth, 
  getFacebookAuth, 
  getWhatsAppOTPSetting 
} from '@sirclo/nexus'
import { GRAPHQL_URI } from './Constants'
import { IncomingMessage } from 'http'

export const useGoogleAuth = async (req: IncomingMessage) => {
  return await getGoogleAuth(GRAPHQL_URI(req))
}

export const useFacebookAuth = async (req: IncomingMessage) => {
  return await getFacebookAuth(GRAPHQL_URI(req))
}

export const useWhatsAppOTPSetting = async (req: IncomingMessage) => {
  return await getWhatsAppOTPSetting(GRAPHQL_URI(req))
}
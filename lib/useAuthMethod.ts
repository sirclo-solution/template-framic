import { 
  getGoogleAuth, 
  getFacebookAuth, 
  getWhatsAppOTPSetting 
} from '@sirclo/nexus'
import { GRAPHQL_URI } from './Constants'
import { IncomingMessage } from 'http'

export const useGoogleAuth = async (req: IncomingMessage, token: string) => {
  return await getGoogleAuth(GRAPHQL_URI(req), token)
}

export const useFacebookAuth = async (req: IncomingMessage, token: string) => {
  return await getFacebookAuth(GRAPHQL_URI(req), token)
}

export const useWhatsAppOTPSetting = async (req: IncomingMessage, token: string) => {
  return await getWhatsAppOTPSetting(GRAPHQL_URI(req), token)
}
import { getConfig } from '../lib/config/config.lib';

export const ENV_CONFIG = {
  momo: {
    baseUrl: getConfig('momo.baseUrl'),
    callBackUrl: getConfig('momo.callBackUrl'),
  },
  database: {
    harisPrd: {
      host: getConfig('database.harisPrd.host'),
      username: getConfig('database.harisPrd.username'),
      password: getConfig('database.harisPrd.password'),
      database: getConfig('database.harisPrd.database'),
    },
  },
  jwt: {
    secret: getConfig('jwt.secret'),
  },
  system: {
    port: getConfig('system.port') || 3000,
    apiVersion: getConfig('system.api_version'),
    characters: getConfig('system.characters'),
    digitals: getConfig('system.digitals'),
    expiryOtp: getConfig('system.expiryOtp'),
    numberCharactersOtp: getConfig('system.numberCharactersOtp'),
    mail: {
      sendDefault: {
        mail: getConfig('system.mail.sendDefault.mail'),
        pass: getConfig('system.mail.sendDefault.pass'),
      },
    },
  },
  source: {
    user: {
      defaultAvatar: getConfig('source.user.defaultAvatar'),
    },
    conversation: {
      defaultAvatar: getConfig('source.conversation.defaultAvatar'),
    },
    merchant: {
      lenghtMerchantCode: getConfig('source.merchant.lengthMerchantCode'),
    },
  },
  vietQR: {
    clientID: getConfig('vietQR.clientID'),
    apiKey: getConfig('vietQR.apiKey'),
    baseUrl: getConfig('vietQR.baseUrl'),
  },
};

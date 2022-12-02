const withPWA = require("next-pwa");

module.exports = withPWA({
  target: "server",
  pwa: {
    dest: "public",
    disable: process.env.NODE_ENV === "development",
  },
  assetPrefix: process.env.ASSET_PREFIX ? process.env.ASSET_PREFIX : '',
  env: {
    GRAPHQL_URI: process.env.GRAPHQL_URI ? process.env.GRAPHQL_URI : "",
    NEXT_PUBLIC_SITEKEY_RECAPTCHA: process.env.NEXT_PUBLIC_SITEKEY_RECAPTCHA ? process.env.NEXT_PUBLIC_SITEKEY_RECAPTCHA : '',
    IS_PROD: process.env.IS_PROD ? process.env.IS_PROD : '',
    CLIENT_CREDENTIAL: process.env.CLIENT_CREDENTIAL ? process.env.CLIENT_CREDENTIAL : '',
    CREDENTIAL_API_URI: process.env.CREDENTIAL_API_URI ? process.env.CREDENTIAL_API_URI : '',
  },
  headers: {
    "X-Frame-Options": "sameorigin",
  },
  future: {
    webpack5: true
  }
});

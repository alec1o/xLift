import APP from "./server/app";
import ENV from "./server/env";
import router from "./server/router";

APP.use(router)

APP.listen(ENV.PORT, ENV.HOST, () => {
    console.log(`\n${ENV.APP_NAME}\n\tHOST:${ENV.HOST}\n\tPORT:${ENV.PORT}\n\tURI: http://${ENV.HOST}:${ENV.PORT}`)
})

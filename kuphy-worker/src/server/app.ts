import express, { Express } from "express"

function GetApp() {
    //@ts-ignore
    if (global.INIT_APP) {
        //@ts-ignore
        return global.INIT_APP as Express
    }

    //@ts-ignore
    global.INIT_APP = express();

    //@ts-ignore
    return global.INIT_APP as Express
}


const APP = GetApp()

export default APP

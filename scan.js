const { customAlphabet } = require('nanoid')
const axios = require("axios")
const rateLimit = require('axios-rate-limit');
let nanoid = customAlphabet('1234567890abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ', 14) //=> "V1StGXR8_Z5jdHi6B - myT"
const http = rateLimit(axios.create(), { maxRequests: 1, perMilliseconds: 1500})
const REPORT_SERVER = "https://teeomeganet.webhook.office.com/webhookb2/e16bf9cf-ae7a-4dac-871e-8efd241ca458@6f53098e-d0c4-49ba-bd2a-af547dda8b66/IncomingWebhook/90753c4572544718a38b0cd69a298b2d/db89c35f-956e-4257-833f-3c4012ae5246"

async function checkFB(id) {
    console.log("🚀Check URL v2...", id)
    let host = (await http.head(id)).request.res.responseUrl
    return host.includes("business.facebook.com") ? `Found this link: ${id} => ${host}` : ""
}

async function main() {
    let id = nanoid()
    id = `1${id}`
    try {
        let okie = await checkFB("https://fb.me/" + id)
        if (okie) {
            reportToServer(okie)
        }
        main()
    } catch (error) {
//      reportmess("This job die....")
        //setTimeout(start, 200000);
    }
}

function start() {
    main()
}

async function reportmess(mess) {
    axios.post(REPORT_SERVER, {
        Text: mess
    });
}

async function reportToServer(id) {
    axios.post(REPORT_SERVER, {
        Text: "Found this invite link: https://fb.me/" + id
    });
}

// start program
start()

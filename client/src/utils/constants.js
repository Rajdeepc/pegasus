import { axiosGenerator, curlGenerator, javaScriptFetch, javaScriptJquery, javaScriptXHR} from './code-generators';

const bodyRequestType = [
    {
        id:"none", name:"foo", value:"none", title:"none",disabled:false
    },
    {
        id:"form-data", name:"foo", value:"form-data", title:"form-data",disabled:false
    },
    {
        id:"x-www-form-urlencoded", name:"foo", value:"x-www-form-urlencoded", title:"x-www-form-urlencoded",disabled:false
    },
    {
        id:"raw", name:"foo", value:"raw", title:"raw",disabled:false
    },
    {
        id:"binary", name:"foo", value:"binary", title:"binary",disabled:false
    }
]

const urlRegEx = /(https?:\/\/(?:www\.|(?!www))[a-zA-Z0-9][a-zA-Z0-9-]+[a-zA-Z0-9]\.[^\s]{2,}|www\.[a-zA-Z0-9][a-zA-Z0-9-]+[a-zA-Z0-9]\.[^\s]{2,}|https?:\/\/(?:www\.|(?!www))[a-zA-Z0-9]+\.[^\s]{2,}|www\.[a-zA-Z0-9]+\.[^\s]{2,})/gi;

const headerKeys = [
    'A-IM',
    'Accept',
    'Accept-Charset',
    'Accept-Encoding',
    'Accept-Language',
    'Accept-Datetime',
    'Access-Control-Request-Method',
    'Access-Control-Request-Headers',
    'Authorization',
    'Cache-Control',
    'Connection',
    'Content-Length',
    'Content-Type',
    'Cookie',
    'Date',
    'Expect',
    'Forwarded',
    'From',
    'Host',
    'If-Match',
    'If-Modified-Since',
    'If-None-Match',
    'If-Range',
    'If-Unmodified-Since',
    'Max-Forwards',
    'Origin',
    'Pragma',
    'Proxy-Authorization',
    'Range',
    'Referer',
    'TE',
    'User-Agent',
    'Upgrade',
    'Via',
    'Warning',
    'X-Requested-With',
    'X-CSRF-Token',

];

const headerValues = [
    'feed',
    'application/json',
    'utf-8',
    'gzip',
    'deflate',
    'en-US',
    `${new Date(Date.now()).toGMTString()}`,
    'no-cache',
    'keep-alive',
    'application/x-www-form-urlencoded',
    '100-continue',
    'for=192.0.2.60; proto=http; by=203.0.113.43',
    'bytes=500-999',
    'trailers, deflate',
    'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_12_6) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/67.0.3396.99 Safari/537.36',
    'h2c, HTTPS/1.3, IRC/6.9, RTA/x11, websocket',
    '1.0 fred, 1.1 example.com (Apache/1.1)',
    '199 Miscellaneous warning'
]


const filterLanguagesList = [
    {
        id:"cURL", title:"cURL", value: curlGenerator
    },
    
    {
        id:"NodeJS-Axios", title:"NodeJS-Axios", value: axiosGenerator
    },
    {
        id:"JavaScript-Fetch", title:"JavaScript-Fetch", value: javaScriptFetch
    },
    {
        id:"JavaScript-jQuery", title:"JavaScript-jQuery", value: javaScriptJquery
    },
    {
        id:"JavaScript-XHR", title:"JavaScript-XHR", value: javaScriptXHR
    }
]


export { bodyRequestType,urlRegEx,headerKeys,headerValues,filterLanguagesList }
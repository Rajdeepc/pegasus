import axios from 'axios';

const RequestMethod = { GET: 'GET' , POST: 'POST', PUT: 'PUT'}

axios.interceptors.request.use( x => {
  x.meta = x.meta || {}
  x.meta.requestStartedAt = new Date().getTime();
  return x;
})


axios.interceptors.response.use(x => {
    console.log(`Execution time for: ${x.config.url} - ${new Date().getTime() - x.config.meta.requestStartedAt} ms`)
    x.responseTime = new Date().getTime() - x.config.meta.requestStartedAt;
    return x;
},
// Handle 4xx & 5xx responses
x => {
  console.error(`Execution time for: ${x.config.url} - ${new Date().getTime() - x.config.meta.requestStartedAt} ms`)
  x.responseTime = new Date().getTime() - x.config.meta.requestStartedAt;
  return x;
}
)


const getOptions = {
  method: "GET",
  credentials: "same-origin",
  headers: {
    Accept: "application/json",
    "Content-Type": "application/json",
    Cache: "no-cache",
  },
  params: {},
  data: {},
};

const postOptions = {
  method: "POST",
  credentials: "same-origin",
  headers: {
    Accept: "application/json",
    "Content-Type": "application/json",
    "X-Requested-With": "XMLHttpRequest",
    Cache: "no-cache",
  },
  params: {},
};

const urlEncodedPostOptions = {
  headers: {
    "Content-Type": "application/x-www-form-urlencoded",
  },
};

const putOptions = {
  method: "PUT",
  credentials: "same-origin",
  headers: {
    Accept: "application/json",
    "Content-Type": "application/json",
    "X-Requested-With": "XMLHttpRequest",
    Cache: "no-cache",
  },
  params: {},
};

export default class Service {
  static getRequest(url, {}, init = getOptions) {
    try {
      return axios
        .get(url,{ validateStatus: false },init)
        .then((response) => {console.log(response);
        return response})
        .catch((err) => {
          if (err) {
            throw err;
          }
        });
    } catch (e) {
      throw e;
    }
  }

  static postRequest(url, data, init = postOptions) {
    try {
      return axios
        .post(url, data, init)
        .then((response) => response.data)
        .catch((err) => {
          throw err;
        });
    } catch (e) {
      throw e;
    }
  }

  static putRequest(url, data, init = putOptions) {
    try {
      return axios
        .put(url, data, init)
        .then((response) => response.data)
        .catch((err) => {
          throw err;
        });
    } catch (e) {
      throw e;
    }
  }

  static requestParams(
    methodType,
    apiUrl,
    payload = {},
    bearerToken,
    isApplicationJSON
  ) {
    switch (methodType) {
      case RequestMethod.GET:
        return Service.getRequest(apiUrl, {}, {
          ...getOptions,
          params: payload,
        }).catch((error) => {
          return Promise.reject(error);
        });
      case RequestMethod.POST:
        return Service.postRequest(
          apiUrl,
          payload,
          isApplicationJSON ? urlEncodedPostOptions : postOptions
        ).catch((error) => {
          return Promise.reject(error);
        });
      case RequestMethod.PUT:
        return Service.putRequest(apiUrl, payload)
        .catch((error) => {
          return Promise.reject(error);
        });
      default:
        return false;
    }
  }
}

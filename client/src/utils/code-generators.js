const axiosGenerator = (url = "", method = "", headers = {}, body = {}) => {
  return `let axios = require('axios');
         let data = '';
        
        let config = {
          method: ${JSON.stringify(method)},
          url: ${JSON.stringify(url)},
          headers: ${JSON.stringify(headers)},
          data : ${JSON.stringify(body)}
        };
        
        axios(config)
        .then(function (response) {
          console.log(JSON.stringify(response.data));
        })
        .catch(function (error) {
          console.log(error);
        });
        `;
};

const curlGenerator = (url = "", method = "", headers = {}, body = {}) => {
  return `curl --location --request ${JSON.stringify(method)} ${JSON.stringify(url)} \
  --header ${JSON.stringify(headers)} \
  --data-raw '${JSON.stringify(body)}'`;
};

const javaScriptFetch = (url = "", method = "", headers = {}, body = {}) => {
  return `let myHeaders = new Headers();
    myHeaders.append(${JSON.stringify(headers)});
    
    let raw = ${JSON.stringify(body)};
    
    let requestOptions = {
      method: ${JSON.stringify(method)},
      headers: myHeaders,
      body: raw,
      redirect: 'follow'
    };
    
    fetch(${JSON.stringify(url)}, requestOptions)
      .then(response => response.text())
      .then(result => console.log(result))
      .catch(error => console.log('error', error));`;
};

const javaScriptJquery = (url = "", method = "", headers = {}, body = {}) => {
  return `let settings = {
        "url": ${JSON.stringify(url)},
        "method": ${JSON.stringify(method)},
        "timeout": 0,
        "headers": ${JSON.stringify(headers)},
        "data": JSON.stringify(${JSON.stringify(body)}),
      };
      
      $.ajax(settings).done(function (response) {
        console.log(response);
      });`;
};

const javaScriptXHR = (url = "", method = "", headers = {}, body = {}) => {
  return `let data = JSON.stringify(${JSON.stringify(body)});

    let xhr = new XMLHttpRequest();
    xhr.withCredentials = true;
    
    xhr.addEventListener("readystatechange", function() {
      if(this.readyState === 4) {
        console.log(this.responseText);
      }
    });
    
    xhr.open(${JSON.stringify(method)}, ${JSON.stringify(url)});
    xhr.setRequestHeader(${JSON.stringify(headers)});
    
    xhr.send(data);`;
};

export {
  axiosGenerator,
  curlGenerator,
  javaScriptFetch,
  javaScriptJquery,
  javaScriptXHR,
};

const paramSerializer = (paramObj) => {
  console.log(paramObj);
  let finalURL = "";
  Object.keys(paramObj).map((item, index) => {
    finalURL +=
      (index === 0 ? "?" : item !== "" ? "&" : "") +
      item +
      (paramObj[item] ? "=" : "") +
      paramObj[item];
  });
  return finalURL;
};

function syntaxHighlight(json) {
  if (json && json.length > 0) {
    json = json
      .replace(/&/g, "&amp;")
      .replace(/</g, "&lt;")
      .replace(/>/g, "&gt;");
    return json.replace(
      /("(\\u[a-zA-Z0-9]{4}|\\[^u]|[^\\"])*"(\s*:)?|\b(true|false|null)\b|-?\d+(?:\.\d*)?(?:[eE][+\-]?\d+)?)/g,
      function (match) {
        var cls = "number";
        if (/^"/.test(match)) {
          if (/:$/.test(match)) {
            cls = "key";
          } else {
            cls = "string";
          }
        } else if (/true|false/.test(match)) {
          cls = "boolean";
        } else if (/null/.test(match)) {
          cls = "null";
        }
        return '<span class="' + cls + '">' + match + "</span>";
      }
    );
  }
}

const isEmpty = (item) => {
  if (item === Object(item)) {
    return Object.keys(item).length === 0;
  }
  if (typeof item === "string") {
    return item ? item.trim().length === 0 : true;
  }
  if (typeof item === "number") {
    return false;
  }
  return item ? item.length === 0 : true;
};

const deSerializeQueryParams = (newUrl) => {
  const regex = /[?&]([^=#]+)=([^&#]*)/g;
  let params = {};
  let match;
  while ((match = regex.exec(newUrl))) {
    params[match[1]] = match[2];
  }
  const paramObj = Object.entries(params).map((e) => ({
    key: e[0],
    value: e[1],
  }));
  return paramObj;
};

const getISODate = (dayIndex) => {
  const ISODay = new Date(
    new Date().getTime() - dayIndex * 24 * 60 * 60 * 1000
  );
  return ISODay;
};

const handleSaveToPC = (filename, jsonData) => {
  const fileData = JSON.stringify(jsonData);
  const blob = new Blob([fileData], { type: "text/plain" });
  const url = URL.createObjectURL(blob);
  const link = document.createElement("a");
  link.download = `${filename}.json`;
  link.href = url;
  link.click();
};

const renderStatusClass = (responseStatus) => {
  switch (responseStatus) {
    case 200:
      return {
        apiColor: "success",
        apiStatusMsg: "The request is OK",
      };
    case 201:
      return {
        apiColor: "success",
        apiStatusMsg: "The request is OK",
      };

    case 400:
      return {
        apiColor: "danger",
        apiStatusMsg: "The server did not understand the request",
      };

    case 401:
      return {
        apiColor: "danger",
        apiStatusMsg: "The requested page needs a username and a password",
      };

    case 403:
      return {
        apiColor: "danger",
        apiStatusMsg: "Access is forbidden to the requested page",
      };

    case 404:
      return {
        apiColor: "danger",
        apiStatusMsg: "The server can not find the requested page",
      };

    case 408:
      return {
        apiColor: "danger",
        apiStatusMsg:
          "The request took longer than the server was prepared to wait",
      };

    case 500:
      return {
        apiColor: "warning",
        apiStatusMsg:
          "The request was not completed. The server met an unexpected condition",
      };

    case 501:
      return {
        apiColor: "warning",
        apiStatusMsg:
          "The request was not completed. The server met an unexpected condition",
      };

    case 502:
      return {
        apiColor: "warning",
        apiStatusMsg:
          "The request was not completed. The server met an unexpected condition",
      };

    case 503:
      return {
        apiColor: "warning",
        apiStatusMsg:
          "The request was not completed. The server is temporarily overloading or down"
      };

    default:
      return {
        apiColor: "danger",
        apiStatusMsg:
          "Something went wrong"
      };
  }
};


const checkJSON = (m) => {

  if (typeof m == 'object') { 
     try{ m = JSON.stringify(m); }
     catch(err) { return false; } }

  if (typeof m == 'string') {
     try{ m = JSON.parse(m); }
     catch (err) { return false; } }

  if (typeof m != 'object') { return false; }
  return true;

};

export {
  checkJSON,
  renderStatusClass,
  paramSerializer,
  syntaxHighlight,
  deSerializeQueryParams,
  getISODate,
  handleSaveToPC,
  isEmpty,
};

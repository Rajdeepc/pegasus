import React, { useState, useEffect } from "react";
import moment from "moment";
import "./request.scss";
import {
  DropdownButton,
  Dropdown,
  Button,
  ButtonGroup,
  InputGroup,
  Nav,
  Tab,
  Form,
  SplitButton,
  Modal,
} from "react-bootstrap";
import HistoryComponent from "../HistoryComponent/historyComponent";
import ParamComponent from "../ParamComponent/paramComponent";
import BodyAreaComponent from "../BodyArea/bodyAreaComponent";
import ToggleSwitch from "../Toggle/toggle";
import ResponseComponent from "../ResponseComponent/responseComponent";
import DocumentationComponent from "../DocumentationComponent/DocumentationComponent";


import Service from "../../utils/service";
import {
  paramSerializer,
  deSerializeQueryParams,
  isEmpty,
  checkJSON
} from "../../utils/common";
import { startApi } from "../../assets/images";
import { connect } from "react-redux";
import {
  updateEntryWithRequest,
  updateSubscriberList
} from "../../views/DashboardComponent/dashboard.action";
import {showAllNotifications} from '../NotificationComponent/notification.action';
import { BASE_URL, API_ENDPOINTS } from "../../utils/environment";
import SaveRequestModal from "../SaveRequestModal/saveRequestModal";
import HeaderRequest from "../HeaderRequest/headerRequest";
import NotificationDrawerComponent from "../NotificationComponent/notificationComponent";
import PropTypes from "prop-types";
import ToastComponent from "../../components/Toast/toastComponent";
import useDeepCompareEffect from "use-deep-compare-effect";
import CodeSnippets from "../CodeSnippetsComponent/codeSnippets";


const matchParamUrl = /^\?([\w-]+(=[\w-]*)?(&[\w-]+(=[\w-]*)?)*)?$/

const protocols = [
  {
    name: "GET",
    value: "GET",
  },
  {
    name: "POST",
    value: "POST",
  },
];

let oldResponseArray = [];

const RequestComponent = (props) => {
  const [protocolValue, setProtoCol] = useState(protocols[0].value);
  const [url, setUrl] = useState(props.data.url ? props.data.url : "");
  const [bodyState, setBodyState] = useState({});
  const [oldJSON, setOldJSON] = useState({});
  const [responseJSON, setResponseJSON] = useState({});
  const [sendBtnClicked, setSendBtnClicked] = useState(false);
  const [paramObj, setParamObj] = useState(
    props.data.params ? deSerializeQueryParams(props.data.url) : []
  );
  const [rawJsonBody, setRawJsonBody] = useState({});
  const [show, setShow] = useState(false);

  const [showNotifications, setShowNotifications] = useState(true);
  const [toastText, setToastText] = useState("");
  const [showToast, setShowToast] = useState(false);

  const [savedResponse, setSavedResponse] = useState([]);
  const [responseDatToCompare, setResponseDataToCompare] = useState([]);
  const [showCodeModal, setShowCodeModal] = useState(false);
  const [showDocModal, setShowDocModal] = useState(false);




  // if response changes call store api and store the respone in theb db with url
  useDeepCompareEffect(() => {
    if (sendBtnClicked && !isEmpty(responseDatToCompare)) {
      console.log("fired");
      sendAndStoreResponse(url, responseDatToCompare);
    }
  }, [responseDatToCompare]);


  useEffect(() => {
    if(matchParamUrl.test(url)){
      console.log('url with query param found')
      setParamObj(deSerializeQueryParams(url))
    }
  },[url])

  // useEffect(() => {
  //   if (props.signInDetails.userSignedOn && showNotifications) {
  //     console.log(" user signed on and show notification is true calling all notifications api")
  //     props.showAllNotifications(props.signInDetails.userDetails.Du || props.signInDetails.userDetails.yu, url)
  //   }
  // }, [props.signInDetails.userSignedOn && showNotifications]);

  const handleClose = () => {
    setShow(false);
  };

  const toggleNotifications = (payload) => {
    const subscriber = props.signInDetails.userDetails && (props.signInDetails.userDetails.Du || props.signInDetails.userDetails.yu);
    props.updateSubscriberList(url, subscriber, payload);
  };

  // request object to be saved to localStorage
  const requestObj = {
    url: url,
    params: deSerializeQueryParams(url),
    body: rawJsonBody.bodyObj,
    protocol: protocolValue,
    notification: true,
    updated_time: Date.now(),
    user: "",
    headers: {},
  };

  /**
   * @method get body payload from child and pass to API call
   * @param {*} bodyPayload
   */
  const bodyPayload = (bodyPayload) => {
    if (bodyPayload) {
      setBodyState();
    }
  };
  /**
   * @method get value of protocol changing dropdown
   * @param {*} event
   * @param {*} value
   */
  const changeProtocol = (event, value) => {
    setProtoCol(value);
  };

  const sendAndStoreResponse = (url, responseObj) => {
    //  console.log(API_ENDPOINTS.saveResponse)
    const userData = sessionStorage.getItem("login");
    let subscriber = "";
    if (userData) {
      const parsedInfo = JSON.parse(userData);
      subscriber = parsedInfo && parsedInfo.Du ? parsedInfo.Du : parsedInfo.yu;
    }
    const API_URL = BASE_URL + API_ENDPOINTS.saveResponse;
    const payload = {
      url: url,
      response: responseObj,
      subscriber,
      isActive: showNotifications,
    };
    Service.requestParams("POST", API_URL, payload)
      .then((resp) => {
        setSavedResponse(resp.allSavedReponse.savedResponses);
      })
      .catch((err) => {
        //  console.log(err)
      });
  };

  useEffect(() => {
    if (savedResponse && savedResponse[0] && savedResponse[0].response) {
      setOldJSON(savedResponse[0].response);
    }
  }, [savedResponse]);

  const cleanUp = () => {
    setResponseDataToCompare([])
    setOldJSON({});
    setResponseJSON({});
  };
  /**
   * call api clicking on Send Button
   */
  const testApi = () => {
    if (url.length) {
      setSendBtnClicked(true);
      Service.requestParams(
        protocolValue,
        url,
        protocolValue === "POST" ? rawJsonBody.bodyObj : ""
      )
        .then((resp) => {
          // once response comes store the reuqest and url to the localstorage on that id
          props.updateEntryWithRequest(props.id, requestObj);
          if (resp.status === 200) {
            // if successful response set response
            setResponseDataToCompare(resp.data ? resp.data : []);
            setResponseJSON(resp);
           
          } else {
            //reset compare value
            cleanUp();
            setResponseJSON(resp ? resp : {});
           
          }
          setSendBtnClicked(false);
        })
        .catch((e) => {
          cleanUp();
          setResponseJSON({ error: e });
          setSendBtnClicked(false);
        });
    } else {
      return;
    }
  };

  /**
   * @method bindParamsValueToUrl value on save inchild component
   * @param {*} payload
   */
  const bindParamsValueToUrl = (payload) => {
    const entries = new Map(payload);
    const obj = Object.fromEntries(entries);
    const queryString = paramSerializer(obj);
    const urlWithoutQUery = url.split("?")[0];
    setUrl(`${urlWithoutQUery}${queryString}`);
  };

  /**
   *  bindHeaderParamsValue
   * @param {*} payload
   */

  const bindHeaderParamsValue = (payload) => {
    const headerPayload = payload.map((item) =>
      item.map((imer) => imer.toString())
    );
    console.log(headerPayload);
  };

  /**
   * @method get raw JSOB value from body component
   * @param {*} bodyObj
   */

  const getJSONValueBody = (bodyObj) => {
    if (typeof bodyObj === "object" && bodyObj && Object.keys(bodyObj).length) {
      setRawJsonBody({
        ...rawJsonBody,
        bodyObj,
      });
    } else {
      setRawJsonBody({});
    }
  };

  const changeSavedResponse = (evt) => {
    findOldResponse(evt.target.value);
  };

  const findOldResponse = (versionSelected) => {
    let savedJSON = {};
    for (let i = 0; i < savedResponse.length; i++) {
      if (i == versionSelected) {
        savedJSON =
          savedResponse[i] && savedResponse[i].response
            ? savedResponse[i].response
            : {};
        break;
      }
    }
    setOldJSON(savedJSON);
  };

  const handleShow = () => {
    setShow(true);
  };

  const openCodeGenerateModal = () => {
    setShowCodeModal(true);
  };


  const openDocumentationModal = () => {
    setShowDocModal(true)
  }

  const handleCloseCodeModal = () => {
    setShowCodeModal(false);
  };


  const handleCloseDocModal = () => {
    setShowDocModal(false)
  }

  return (
    <div className="api-board">
      <div>
        <NotificationDrawerComponent name={props.itemDesc.name} url={url} />
      </div>
      <div className="flexbox urlForm">
        <div className="flex1 text-center">
          <ToggleSwitch
            id="apicheckbox"
            onChange={toggleNotifications}
            disabled={!props.signInDetails.userSignedOn}
            defaultChecked={true}
          />
        </div>
        <div className="flex7">
          <InputGroup>
            <DropdownButton
              as={InputGroup.Prepend}
              variant="outline-custom"
              title={protocolValue}
              id="input-group-dropdown-1"
            >
              {(protocols || []).map((item) => {
                return (
                  <Dropdown.Item
                    key={item.value}
                    href="#"
                    onClick={(event) => changeProtocol(event, item.value)}
                  >
                    {item.name}
                  </Dropdown.Item>
                );
              })}
            </DropdownButton>
            <Form.Control
              type="text"
              placeholder="Enter request URL"
              value={url}
              onChange={(e) => setUrl(e.target.value)}
            />
          </InputGroup>
        </div>
        <div className="flex2 apiBtn">
          <ButtonGroup size="lg">
            <Button variant="primary" onClick={testApi}>
              SEND
            </Button>
            <SplitButton
              id={`dropdown-split-variants-save`}
              variant="secondary"
              title="Save"
            >
              <Dropdown.Item eventKey="1" onClick={handleShow}>
                Save As...
              </Dropdown.Item>
            </SplitButton>{" "}
          </ButtonGroup>
        </div>
      </div>

      <div className="request-param-container">
        <Tab.Container defaultActiveKey="history" id="uncontrolled-tab-example">
          <div className="flexbox">
            <div className="flex6">
              <Nav variant="pills" className="flex-row" variant="tabs">
                <Nav.Item>
                  <Nav.Link eventKey="history">HISTORY</Nav.Link>
                </Nav.Item>

                <Nav.Item>
                  <Nav.Link eventKey="params">
                    PARAMS <span className="circle"></span>
                  </Nav.Link>
                </Nav.Item>

                <Nav.Item>
                  <Nav.Link eventKey="headers">HEADERS</Nav.Link>
                </Nav.Item>

                <Nav.Item>
                  <Nav.Link eventKey="body">
                    BODY{" "}
                    {Object.keys(rawJsonBody).length !== 0 && (
                      <span className="circle"></span>
                    )}
                  </Nav.Link>
                </Nav.Item>

                <Nav.Item>
                  <Nav.Link eventKey="settings">SETTINGS</Nav.Link>
                </Nav.Item>
              </Nav>
            </div>
            <div className="flex6">
              <Nav variant="pills" className="justify-content-end extra-links">
                <Nav.Item>
                  <Nav.Link  onClick={() => openDocumentationModal(true)}>Documentation</Nav.Link>
                </Nav.Item>
                <Nav.Item>
                  <Nav.Link onClick={() => openCodeGenerateModal(true)}>
                    Code
                  </Nav.Link>
                </Nav.Item>
              </Nav>
            </div>
          </div>
          <div>
            <Tab.Content>
              <Tab.Pane eventKey="history">
                {!isEmpty(savedResponse) && checkJSON(responseJSON.data) ? (
                  <>
                    <div className="response-history">
                      <div className="version-select">
                        <label>Comparing with version: </label>
                        <select onChange={changeSavedResponse}>
                          {savedResponse &&
                            savedResponse.length &&
                            savedResponse.map((item, key) => {
                              return (
                                <option
                                  key={key}
                                  value={key}
                                >{`v${key}`}</option>
                              );
                            })}
                        </select>
                      </div>
                      <HistoryComponent
                        oldCode={oldJSON}
                        newCode={responseJSON.data}
                      />
                    </div>
                  </>
                ) : (
                  <div className="no-show">
                    <p>Nothing to Compare. Hit Send to get a response</p>
                  </div>
                )}
              </Tab.Pane>
              <Tab.Pane eventKey="params" title="">
                <div className="paramsTable">
                  <ParamComponent
                    paramObj={paramObj}
                    headerName="Query Params"
                    getParamsValue={bindParamsValueToUrl}
                  />
                </div>
              </Tab.Pane>
              <Tab.Pane eventKey="headers" title="HEADERS">
                <div className="paramsTable">
                  <HeaderRequest
                    headerName="Headers"
                    getHeaderParamsValue={bindHeaderParamsValue}
                  />
                </div>
              </Tab.Pane>
              <Tab.Pane eventKey="body" title="BODY">
                <BodyAreaComponent
                  bodyRequest={bodyPayload}
                  sendJSONValue={getJSONValueBody}
                />
              </Tab.Pane>
              <Tab.Pane
                eventKey="settings"
                title="SETTINGS"
                disabled
              ></Tab.Pane>
            </Tab.Content>
          </div>
        </Tab.Container>
      </div>
      <div className="response-wrapper">
        <div className="title">Response</div>
        <div className="get-response">
          {Object.keys(responseJSON).length !== 0 ? (
            <ResponseComponent response={responseJSON} />
          ) : (
            <>
              <div className="noResponse-wrapper flexbox">
                <div className="hitSend">
                  <img src={startApi} alt="" />
                </div>
                <p>
                  Hit Send To Launch <br></br>
                  Celebrating SpaceX &amp; NASA's mission to ISS
                </p>
              </div>
            </>
          )}
        </div>
      </div>
      {/* save to PC */}
      <div className="save-request-modal">
        <Modal show={show} onHide={handleClose} backdrop="static">
          <SaveRequestModal show={show} url={url} request={requestObj} />
        </Modal>
      </div>

      {/* Opne Generate COde Modal */}
      <div className="code-generate-modal">
        <Modal
          show={showCodeModal}
          onHide={handleCloseCodeModal}
          backdrop="static"
          size="lg"
        >
          <CodeSnippets show={showCodeModal} data={requestObj} />
        </Modal>
      </div>

      {/* Opne Documentation Modal */}
      <div className="doc-generate-modal">
        <Modal
          show={showDocModal}
          backdrop="static"
          onHide={handleCloseDocModal}
          dialogClassName="modal-90w"
        >
          <DocumentationComponent show={showDocModal} data={requestObj} />
        </Modal>
      </div>

      <ToastComponent text={toastText} show={showToast} />
    </div>
  );
};

RequestComponent.propTypes = {
  data: PropTypes.object.isRequired,
  itemDesc: PropTypes.object.isRequired,
  id: PropTypes.string.isRequired,
};

RequestComponent.defaultProps = {
  data: {},
  itemDesc: {},
  id: "",
};

const mapStateToProps = (state) => ({
  allApiEndPoints: state.DashBoardReducer.apiEndPoints,
  signInDetails: state.SignOnReducer,
});

const RequestComponentContainer = connect(mapStateToProps, {
  updateEntryWithRequest,
  updateSubscriberList,
  showAllNotifications
})(RequestComponent);

export default RequestComponentContainer;

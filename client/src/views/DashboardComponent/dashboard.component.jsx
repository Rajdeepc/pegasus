import React, { useEffect, useState } from "react";
import ProfileComponent from "../../components/ProfileComponent/profileComponent";
import { Button, Nav, Row, Col, Tab, ListGroup } from "react-bootstrap";
import RequestComponentContainer from "../../components/RequestComponent/requestComponent";
import { FiEdit2 } from "react-icons/fi";
import { IoIosCloseCircleOutline } from "react-icons/io";
import { AiOutlineSave } from "react-icons/ai";
import { IconContext } from "react-icons";
import {
  addApiEndPointAction,
  removeApiEndPointAction,
  updateTitle,
  getAllApiEndpointsDataFromdb,
} from "./dashboard.action";
import { connect } from "react-redux";
import "../../App.scss";
import "./dashboard.scss";
import SearchComponent from "../../components/SearchComponent/searchComponent";
import db from "../../redux/indexDB/index";
import FeedbackComponent from '../../components/FeedbackComponent/FeedbackComponent'

const generate = require("project-name-generator");

let count = localStorage.getItem("count") || 0;

const arrayItem = {
  gid: `apiEndPoint${count}`,
  name: generate().dashed,
  componentValue: {
    protocol: "GET",
  },
};

const LeftPanel = (props) => {
  const [key, setKey] = useState("apiEndPoint0");
  const [activeId, setActiveId] = useState(-1);
  const [arrayOfApiList, setArrayOfApiList] = useState(props.allApiEndPoints);
  const [activePanel, setActivePanel] = useState(1);

  useEffect(() => {
    if (props.allApiEndPoints.length > 0) {
      setArrayOfApiList(props.allApiEndPoints);
    }
  }, [props.allApiEndPoints]);

  useEffect(() => {
    if (props.allApiEndPoints.length) {
      setKey("apiEndPoint0");
    }
  }, [props.allApiEndPoints.length]);

  /**
   * on load add 1st item to api endpoint list and set count in localstorage
   */
  useEffect(() => {
    // get all the values of the endpoints from the database
    props.getAllApiEndpointsDataFromdb();
    // search the indexDB data base and if no items are found add first item on load
    checkItemsAndAddEndpoint();
  }, []);

  const checkItemsAndAddEndpoint = async () => {
    const updatedDbData = await db.apiList.toArray();
    if (updatedDbData < 1) {
      localStorage.setItem("count", JSON.stringify(count));
      props.addApiEndPointAction(arrayItem);
    }
  };

  /**
   * Add API endpoint
   */
  const addEndPoint = () => {
    count++;
    localStorage.setItem("count", JSON.stringify(count));
    props.addApiEndPointAction({
      gid: `apiEndPoint${count}`,
      name: generate().dashed,
      componentValue: {
        protocol: "GET",
      },
    });
  };

  const deleteItem = (itemId) => {
    props.removeApiEndPointAction(itemId);
  };

  const handleSelectApiItem = (e) => {
    setKey(e);
  };
  // get color value of protocol name

  const getColorValue = (value) => {
    switch (value) {
      case "GET":
        return "green";
      case "POST":
        return "orange";
    }
  };

  const editTitle = (index) => {
    setActiveId(index);
  };

  const saveTitle = (itemId, updatedTitle) => {
    props.updateTitle(itemId, updatedTitle);
    setActiveId(-1);
  };

  const handleChangeTitle = (value, index) => {
    const newState = arrayOfApiList.map((item, i) => {
      if (i == index) {
        return { ...item, ["name"]: value };
      }
      return item;
    });

    setArrayOfApiList(newState);
  };

  return (
    <>
      <Tab.Container
        id="left-tabs-example"
        activeKey={key}
        onSelect={handleSelectApiItem}
      >
        <div className="flex2">
          <div className="left-panel">
            <div className="alert endpoints">
              <div className="alert backBlck">
                <ProfileComponent />
              </div>
              <div className="action-dashboard">
                <Nav.Item>
                  <SearchComponent />
                </Nav.Item>
              </div>

              {/* tabs */}
              <div className="tabs-rows-endpoints">
                <ListGroup horizontal>
                  <ListGroup.Item
                    onClick={() => setActivePanel(1)}
                    className={activePanel === 1 ? "active" : ""}
                  >
                    <div>
                      <span>End Points</span>
                      <span>
                        <Button
                          className="addBtn"
                          variant="btn-light"
                          onClick={addEndPoint}
                        >
                          +
                        </Button>
                      </span>
                    </div>
                  </ListGroup.Item>
                  <ListGroup.Item
                    disabled
                    onClick={() => setActivePanel(2)}
                    className={activePanel === 2 ? "active" : ""}
                  >
                    Hyper-Runner
                  </ListGroup.Item>
                </ListGroup>
              </div>

              {activePanel === 1 && (
                <Nav variant="pills" className="flex-column">
                  {(arrayOfApiList || []).map((item, i) => {
                    return (
                      <Nav.Item key={item.id}>
                        <Nav.Link eventKey={item.gid}>
                          <div className="api-name">
                            <span>
                              <strong
                                className={
                                  "protocol-value " +
                                  getColorValue(item.componentValue.protocol)
                                }
                              >
                                {item.componentValue
                                  ? item.componentValue.protocol
                                  : ""}
                              </strong>
                            </span>
                            <span>
                              <input
                                type="text"
                                value={item.name}
                                className={
                                  "titleControl " +
                                  (activeId === i ? "border-btm" : "")
                                }
                                disabled={activeId === i ? false : true}
                                onChange={(e) =>
                                  handleChangeTitle(e.target.value, i)
                                }
                              />
                            </span>{" "}
                          </div>
                          <div className="edit-and-save">
                            {activeId !== i ? (
                              <IconContext.Provider
                                value={{ className: "mr10" }}
                              >
                                <span>
                                  <FiEdit2 onClick={() => editTitle(i)} />
                                </span>
                              </IconContext.Provider>
                            ) : (
                              <IconContext.Provider
                                value={{
                                  color: "#8BC34A",
                                }}
                              >
                                <span>
                                  {" "}
                                  <AiOutlineSave
                                    size={20}
                                    onClick={() =>
                                      saveTitle(item.gid, item.name)
                                    }
                                  />
                                </span>
                              </IconContext.Provider>
                            )}
                            {i !== 0 ? (
                              <IconContext.Provider
                                value={{
                                  color: "#D32F2F",
                                }}
                              >
                                <span>
                                  <IoIosCloseCircleOutline
                                    size={20}
                                    onClick={() => deleteItem(item.gid)}
                                  />
                                </span>
                              </IconContext.Provider>
                            ) : null}
                          </div>
                        </Nav.Link>
                      </Nav.Item>
                    );
                  })}
                </Nav>
              )}
              {activePanel === 2 && (
                <div className="hyper-runner">
                  <div className="schedule-run">
                    <label for="appt">Schedule Run:</label>
                    <input type="time" id="appt" name="appt"></input>
                    <Button>Set</Button>
                  </div>
                  <div className="hyper-body">
                    <p>Run all your API's with one-click</p>
                  </div>
                </div>
              )}
            </div>
            <div className="credits">
              Designed &amp; Developed By Rajdeep Chandra
            </div>
          </div>
        </div>
        <div className="flex8">
          <div className="right-panel">
            <Tab.Content>
              {(arrayOfApiList || []).map((item, i) => {
                // keeping the reducer value in state to trigger re render
                if (item.gid === key) {
                  return (
                    <Tab.Pane eventKey={item.gid} key={item.id}>
                      <div className="right-panel">
                        <RequestComponentContainer
                          id={key}
                          itemDesc={item}
                          data={item.componentValue}
                        />
                      </div>
                    </Tab.Pane>
                  );
                }
              })}
            </Tab.Content>
          </div>
        </div>
      </Tab.Container>
      <FeedbackComponent/>
    </>
  );
};

const mapStateToProps = (state) => {
  const { apiEndPoints = [], searchValue = "" } = state.DashBoardReducer;
  const allApiEndPoints = (apiEndPoints || []).filter((item) =>
    item.name.toLowerCase().includes(searchValue.toLowerCase())
  );
  return {
    allApiEndPoints: allApiEndPoints || state.DashBoardReducer,
  };
};

const LeftPanelContainer = connect(mapStateToProps, {
  addApiEndPointAction,
  removeApiEndPointAction,
  updateTitle,
  getAllApiEndpointsDataFromdb,
})(LeftPanel);

export default LeftPanelContainer;

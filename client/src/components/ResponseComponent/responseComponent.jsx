import React from "react";
import { Nav, Table, Tab, OverlayTrigger, Tooltip } from "react-bootstrap";
import "./response.scss";
import { cookie } from "../../assets/images";
import ReactJson from "react-json-view";
import PropTypes from "prop-types";
import { AiOutlineQuestionCircle } from "react-icons/ai";
import { renderStatusClass } from '../../utils/common';

export default function ResponseComponent({ response }) {
  

  return (
    <div className="all-reponse">
      <Tab.Container defaultActiveKey="Body">
        <div className="flexbox">
          <div className="flex6">
            <Nav variant="pills" className="flex-row" variant="tabs">
              <Nav.Item>
                <Nav.Link eventKey="Body">Body</Nav.Link>
              </Nav.Item>
              <Nav.Item>
                <Nav.Link eventKey="Cookies">Cookies</Nav.Link>
              </Nav.Item>
              <Nav.Item>
                <Nav.Link eventKey="Headers">
                  Headers{" "}
                  <span className="number">
                    ({response.headers && Object.keys(response.headers).length})
                  </span>
                </Nav.Link>
              </Nav.Item>
            </Nav>
          </div>
          <div className="flex6">
            <Nav
              variant="pills"
              className={
                "justify-content-end " + renderStatusClass(response.status).apiColor
              }
            >
              <Nav.Item>
                <Nav.Link>
                  Status:{" "}
                  <span className={"status " + renderStatusClass(response.status).apiColor}></span>
                  <span className="statusClass">
                    {response.status ? response.status : ""}{" "}
                    {response.statusText ? response.statusText : ""}
                  </span>
                  <span className="textInfo">
                    <OverlayTrigger
                      placement="top"
                      overlay={<Tooltip id={`tooltip-top`}>{renderStatusClass(response.status).apiStatusMsg}</Tooltip>}
                    >
                      <AiOutlineQuestionCircle size={15} />
                    </OverlayTrigger>
                  </span>
                </Nav.Link>
              </Nav.Item>
              <Nav.Item>
                <Nav.Link>
                  Time:
                  <span>
                    {response.responseTime ? response.responseTime : ""}ms
                  </span>
                </Nav.Link>
              </Nav.Item>
              <Nav.Item>
                <Nav.Link>
                  Size:
                  <span>
                    {response.headers ? response.headers["content-length"] : ""}
                    KB
                  </span>
                </Nav.Link>
              </Nav.Item>
            </Nav>
          </div>
        </div>
        <div>
          <Tab.Content>
            <Tab.Pane eventKey="Body">
              <div className="flexbox" id="responseContainer">
                <div className="response-panel">
                  <ReactJson
                    src={response.data}
                    enableClipboard={false}
                    name={false}
                    onEdit={false}
                    onAdd={false}
                    sortKeys={false}
                    collapsed={false}
                    displayDataTypes={false}
                    displayObjectSize={false}
                  />
                </div>
              </div>
            </Tab.Pane>
            <Tab.Pane eventKey="Cookies" disabled>
              <div className="cookie-container">
                <div className="no-cookie">
                  <img src={cookie} alt="cookie"></img>
                  <p>No cookie for you</p>
                </div>
              </div>
            </Tab.Pane>
            <Tab.Pane eventKey="Headers">
              <div className="paramsTable">
                <Table bordered className="table-param table table-bordered">
                  <thead>
                    <tr>
                      <th></th>
                      <th>KEY</th>
                      <th>VALUE</th>
                    </tr>
                  </thead>
                  <tbody>
                    {response.headers &&
                      Object.keys(response.headers).length !== 0 &&
                      Object.keys(response.headers).map((item) => {
                        return (
                          <tr key={item}>
                            <td></td>
                            <td className="keyName">{item}</td>
                            <td>{response.headers[item]}</td>
                          </tr>
                        );
                      })}
                  </tbody>
                </Table>
              </div>
            </Tab.Pane>
          </Tab.Content>
        </div>
      </Tab.Container>
    </div>
  );
}

ResponseComponent.propTypes = {
  response: PropTypes.object.isRequired,
};

ResponseComponent.defaultProps = {
  response: {},
};

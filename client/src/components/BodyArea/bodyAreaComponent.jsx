import React, { useState } from "react";
import "./bodyArea.scss";
import { Tab, Nav } from "react-bootstrap";
import { bodyRequestType } from "../../utils/constants";
import TableComponent from "../ParamComponent/paramComponent";
import JSONInput from "react-json-editor-ajrm";
import locale from "react-json-editor-ajrm/locale/en";

export default function BodyAreaComponent(props) {
  const [isBodyRaw, setBodyRaw] = useState(false);
  const [dropValue, setDropValue] = useState("");
  const [valueOfCheckbox, setValueOfCheckBox] = useState("none");
  const [valueOfJSONBox, setValueOfJSONBox] = useState();

  const changeTypeHandler = (e) => {
    setValueOfCheckBox(e.currentTarget.value);
    if (e.currentTarget.value === "raw") {
      setBodyRaw(true);
    } else {
      setBodyRaw(false);
    }
  };

  const onChangeBodyTypeRaw = (evt) => {
    setDropValue(evt.target.value);
  };

  const handleBodyChange = (evt) => {
    console.log(evt.jsObject)
    props.sendJSONValue(evt.jsObject)
  };


  return (
    <div className="body-area">
      <Tab.Container id="left-tabs-example" defaultActiveKey="first">
        <Nav className="flex-row body-type-option">
          {bodyRequestType.map((type) => {
            return (
              <Nav.Item key={type.value}>
                <input
                  type="radio"
                  name={type.name}
                  value={type.value}
                  checked={valueOfCheckbox === type.value}
                  onChange={changeTypeHandler}
                />{" "}
                <label htmlFor={type.title}>{type.title}</label>
              </Nav.Item>
            );
          })}
          {isBodyRaw && (
            <Nav.Item className="raw-options">
              <select
                className="rawTypeDropdown"
                name="rawType"
                onChange={onChangeBodyTypeRaw}
              >
                <option value="Text" disabled>
                  Text
                </option>
                <option value="JavaScript" disabled>
                  JavaScript
                </option>
                <option value="JSON" selected>
                  JSON
                </option>
                <option value="HTML" disabled>
                  HTML
                </option>
                <option value="XML" disabled>
                  XML
                </option>
              </select>
            </Nav.Item>
          )}
        </Nav>
        <Tab.Content>
          {valueOfCheckbox === "none" && (
            <div>
              <div className="no-show">
                <p>This request does not have a body</p>
              </div>
            </div>
          )}
          {valueOfCheckbox === "form-data" && (
            <div>
              <div className="paramsTable">
                <TableComponent headerName="Form-data" />
              </div>
            </div>
          )}
          {valueOfCheckbox === "x-www-form-urlencoded" && (
            <div>
              <div className="paramsTable">
                <TableComponent headerName="x-www-form-urlencoded" />
              </div>
            </div>
          )}
          {valueOfCheckbox === "raw" && (
             <div style={{ maxWidth: "1400px", maxHeight: "100%" }}>
              <JSONInput
                id="jsonEditor"
                placeholder={valueOfJSONBox}
                onChange={handleBodyChange}
                locale={locale}
                height="300px"
                width="100%"
                theme="dark_vscode_tribute"
                colors={{
                  default:'#000',
                  symbol:'#000',
                  string: "#cb4b16",
                  number:'#00796B',
                  colon:'blue',
                  keys:'#002b36',
                  keys_whiteSpace:'',
                  primitive:'#940094',
                  error:'#D32F2F',
                  background:'#fff',
                  background_warning:''

              
                }}
              />
            </div>
          )}
          {valueOfCheckbox === "binary" && (
            <div>
              <div className="no-show">
                <input type="file" />
              </div>
            </div>
          )}
        </Tab.Content>
      </Tab.Container>
    </div>
  );
}

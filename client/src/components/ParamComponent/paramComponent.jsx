import React, { useState, useEffect } from "react";
import { Button, Table } from "react-bootstrap";
import { FiPlusSquare } from "react-icons/fi";
import { FaRegSave } from "react-icons/fa";
import { TiDeleteOutline } from "react-icons/ti";
import "./table.scss";
import PropTypes from "prop-types";

export default function ParamComponent(props) {
  const [rows, setRows] = useState(
    props.paramObj && props.paramObj.length > 0
      ? props.paramObj
      : [{ key: "", value: "" }]
  );
  const [enableSaveButton, setEnableSaveButton] = useState(false);

  // console.log(props.paramObj);

  /**
   * enable save button is one of param key exists
   */
  useEffect(() => {
    if (rows.length > -1) {
      const validatingRows = rows.some(
        (item) => item.key !== "" && item.key !== undefined
      );
      // console.log(validatingRows)
      if (validatingRows) {
        setEnableSaveButton(true);
      } else {
        setEnableSaveButton(false);
      }
    }
  }, [rows]);

  const handleAddRow = () => {
    const eachRowItem = {
      key: "",
      value: "",
    };
    setRows([...rows, eachRowItem]);
  };

  const handleRemoveRow = (obj) => {
    setRows(rows.filter((item) => item.key !== obj.key));
  };

  const handleChange = (e, idx) => {
    const tempArray = [];
    const { name, value } = e.target;
    const tempRows = [...rows];
    tempRows[idx] = {
      ...rows[idx],
      [name]: value,
    };
    // console.log(tempRows);
    tempRows.map((item) => {
      tempArray.push(Object.values(item));
    });
    //  console.log(tempArray);
    props.getParamsValue(tempArray);
    setRows(tempRows);
  };

  // const saveParams = () => {
  //   if (rows && rows.length > 0) {
  //   }
  // };

  return (
    <>
      <div className="flexbox title">
        <div className="flex6">
          <div className="">{props.headerName}</div>
        </div>
        <div className="flex6 text-right">
          <div className="">
            <Button
              className="addmore"
              variant="outline-light"
              onClick={handleAddRow}
            >
              <FiPlusSquare /> Add More
            </Button>
            {/* <Button
              disabled={!enableSaveButton}
              className="addmore"
              variant="outline-light"
              onClick={saveParams}
            >
              <FaRegSave /> Save
            </Button> */}
          </div>
        </div>
      </div>
      <div>
        <Table bordered className="table-param">
          <thead>
            <tr>
              <th></th>
              <th>KEY</th>
              <th>VALUE</th>
              <th>DESCRIPTION</th>
              <th></th>
            </tr>
          </thead>
          <tbody>
            {(rows || []).map((item, idx) => {
              return (
                <tr id="addr0" key={idx}>
                  <td></td>
                  <td>
                    <input
                      type="text"
                      name="key"
                      value={rows[idx].key}
                      onChange={(event) => handleChange(event, idx)}
                    />
                  </td>
                  <td>
                    <input
                      type="text"
                      name="value"
                      value={rows[idx].value}
                      onChange={(event) => handleChange(event, idx)}
                    />
                  </td>
                  <td>
                    <input
                      type="text"
                      name="description"
                      value={rows[idx].description}
                      onChange={(event) => handleChange(event, idx)}
                    />
                  </td>
                  <td className="deleteCol">
                    {/* {idx !== 0 && (
                      <TiDeleteOutline
                        size={20}
                        onClick={() => handleRemoveRow(rows[idx])}
                      />
                    )} */}
                  </td>
                </tr>
              );
            })}
          </tbody>
        </Table>
      </div>
    </>
  );
}

ParamComponent.defaultProps = {
  headerName: "",
};

ParamComponent.propTypes = {
  headerName: PropTypes.string,
};

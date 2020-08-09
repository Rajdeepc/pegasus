import React, { useState, useEffect } from "react";
import { Button, Table } from "react-bootstrap";
import { FiPlusSquare } from "react-icons/fi";
import { FaRegSave } from "react-icons/fa";
import { TiDeleteOutline } from "react-icons/ti";
import { Typeahead } from "react-bootstrap-typeahead"; // ES2015
import "react-bootstrap-typeahead/css/Typeahead.css";
import { headerKeys,headerValues } from '../../utils/constants' 
import PropTypes from 'prop-types';

export default function HeaderRequest(props) {
    const [selected, setSelected] = useState([]);

  const [rows, setRows] = useState(
    props.paramObj && props.paramObj.length > 0
      ? props.paramObj
      : [{ key: [], value: [] }]
  );
  const [enableSaveButton, setEnableSaveButton] = useState(false);

  // console.log(props.paramObj);

  /**
   * enable save button is one of param key exists
   */
  useEffect(() => {
    if (rows.length > -1) {
     // debugger;
      const validatingRows = rows.some(
        (item) => item.key.length > 0
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
      key: [],
      value: [],
    };
    setRows([...rows, eachRowItem]);
  };

  const handleRemoveRow = (obj) => {
    setRows(rows.filter((item) => item.key !== obj.key));
  };

  const handleChange = (selected, idx, name) => {
    const value = selected;
    const tempRows = [...rows];
    tempRows[idx] = {
      ...rows[idx],
      [name]: value,
    };
    console.log(tempRows);
    setRows(tempRows);
  };

  const saveParams = () => {
    const tempArray = [];
    if (rows && rows.length > 0) {
      rows.map((item) => {
        tempArray.push(Object.values(item));
      });
      props.getHeaderParamsValue(tempArray);
    }
  };

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
            <Button
              disabled={!enableSaveButton}
              className="addmore"
              variant="outline-light"
              onClick={saveParams}
            >
              <FaRegSave /> Save
            </Button>
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
                    <Typeahead
                      id="header-key"
                      labelKey="key"
                      onChange={(selected) => handleChange(selected, idx ,'key')}
                      options={headerKeys}
                      placeholder="KEY"
                      selected={rows[idx].key}
                    />
                  </td>
                  <td>
                    <Typeahead
                      id="header-value"
                      labelKey="value"
                      onChange={(selected) => handleChange(selected, idx, 'value')}
                      options={headerValues}
                      placeholder="VALUE"
                      selected={rows[idx].value}
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
                    <TiDeleteOutline
                      size={20}
                      onClick={() => handleRemoveRow(rows[idx])}
                    />
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

HeaderRequest.defaultProps = {
  headerName: ''
}

HeaderRequest.propTypes = {
  headerName: PropTypes.string
}

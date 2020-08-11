import React, { useState } from "react";
import { Modal, Button, Table } from "react-bootstrap";
import { connect } from "react-redux";
import moment from 'moment';

const DocumentationComponent = (props) => {

  // creating isActive property to the existing array
  const allApiListOfArray =
    props.allApiEndPoints &&
    props.allApiEndPoints.apiEndPoints &&
    props.allApiEndPoints.apiEndPoints.map((obj) => ({
      ...obj,
      isChecked: false,
    }));

  const [checkedRow, setCheckedRow] = useState(allApiListOfArray);



  const handleCheckBox = (event) => {
      console.log(event.target.value, event.target.checked);
      const tempArray = [...checkedRow]
      tempArray.filter((apiItem) => {
      if (apiItem.gid === event.target.value){
        apiItem.isChecked = event.target.checked;
      }
        
    });
    console.log(tempArray)
    setCheckedRow(tempArray);
  };

  return (
    <div>
      <Modal.Header closeButton className="generate-code-modal-header">
        <Modal.Title>GENERATE DOCUMENTATION</Modal.Title>
      </Modal.Header>
      <Modal.Body className="save-modal-body">
        <Table bordered strip hover responsive>
          <thead>
            <tr>
              <th></th>
              <th>API</th>
              <th>Protocol</th>
              <th>Request Payload</th>
              <th>Headers(If Any)</th>
              <th>Response Structure</th>
              <th>Last Updated</th>
            </tr>
          </thead>
          <tbody>
            {checkedRow.map((item, i) => {
              if (item.componentValue.url && item.componentValue.updated_time) {
                return (
                  <tr key={item.gid}>
                    <td>
                      <input
                        type="checkbox"
                        id={item.gid}
                        name={item.name}
                        value={item.gid}
                        onChange={handleCheckBox}
                      />
                    </td>
                    <td>{item.componentValue.url}</td>
                    <td>{item.componentValue.protocol}</td>
                    <td>
                      {JSON.stringify(item.componentValue.params) ||
                        JSON.stringify(item.componentValue.body)}
                    </td>
                    <td>{JSON.stringify(item.componentValue.headers)}</td>
                    <td></td>
                    <td>{moment(item.componentValue.updated_time).format('MM/DD/YYYY, hh:mm A')}</td>
                  </tr>
                );
              }
            })}
          </tbody>
        </Table>
        <div className="text-right">
          <Button variant="success">Save To Excel</Button>
        </div>
      </Modal.Body>
    </div>
  );
};

const mapStateToProps = (state) => ({
  allApiEndPoints: state.DashBoardReducer,
});

const DocumentationComponentContainer = connect(
  mapStateToProps,
  {}
)(DocumentationComponent);

export default DocumentationComponentContainer;

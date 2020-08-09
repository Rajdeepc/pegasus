import React from "react";
import ReactDiffViewer from "react-diff-viewer";
import "./history.scss";
import PropTypes from 'prop-types';


const HistoryComponent = ({ oldCode, newCode }) => {

  return (
    <div className="history">
        <ReactDiffViewer
          oldValue={`${JSON.stringify(oldCode,undefined,4)}`}
          newValue={`${JSON.stringify(newCode,undefined,4)}`}
          splitView={true}
          showDiffOnly={false}
          leftTitle="Previous Response"
          rightTitle="Current Response"
        />
    </div>
  );
};

HistoryComponent.defaultProps = {
  oldCode:'',
  newCode:''
}


HistoryComponent.propTypes = {
  oldCode: PropTypes.string,
  newCode: PropTypes.string
}

export default HistoryComponent;

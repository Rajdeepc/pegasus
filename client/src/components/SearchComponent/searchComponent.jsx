import React, { useState,useEffect } from "react";
import { InputGroup, FormControl } from "react-bootstrap";
import { GoSearch } from "react-icons/go";
import "./search.scss";
import { useDebounce } from "use-debounce";
import { searchAction } from '../../views/DashboardComponent/dashboard.action'
import { connect } from "react-redux";


const SearchComponent = (props) => {
  const [textChange, setTextChange] = useState("");

  const debouncingInput = useDebounce(textChange, 500);

  useEffect(() => {
    if (debouncingInput) {
        props.searchAction(textChange);
    }
  }, [debouncingInput]);



  const onTextChange = (e) => {
    setTextChange(e.target.value);
  };

  return (
    <div className="search">
      <InputGroup>
        <FormControl
          placeholder="Filter"
          aria-label="Filter"
          aria-describedby="basic-filter"
          onChange={onTextChange}
        />
        <InputGroup.Prepend>
          <GoSearch />
        </InputGroup.Prepend>
      </InputGroup>
    </div>
  );
}

const mapStateToProps = (state) => ({

})

const SearchBarComponentContainer = connect(mapStateToProps,{
    searchAction
})(SearchComponent)



export default SearchBarComponentContainer

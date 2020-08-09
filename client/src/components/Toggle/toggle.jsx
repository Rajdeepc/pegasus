import React,{useState} from "react";
import PropTypes from "prop-types";
import './toggle.scss';

const ToggleSwitch = (props) => {

    const [checked, setChecked] = useState(props.defaultChecked)

  const onChange = e => {
    setChecked(e.target.checked)
    if (typeof props.onChange === "function") props.onChange(e.target.checked);
  };
    return (
      <div
        className={"toggle-switch" + (props.Small ? " small-switch" : "")}
      >
        <input
          type="checkbox"
          name={props.Name}
          className="toggle-switch-checkbox"
          id={props.id}
          checked={props.currentValue}
          defaultChecked={checked}
          onChange={onChange}
          disabled={props.disabled}
        />
        {props.id ? (
          <label className="toggle-switch-label" htmlFor={props.id}>
            <span
              className={
                props.disabled
                  ? "toggle-switch-inner toggle-switch-disabled"
                  : "toggle-switch-inner"
              }
              data-yes={props.Text[0]}
              data-no={props.Text[1]}
            />
            <span
              className={
                props.disabled
                  ? "toggle-switch-switch toggle-switch-disabled"
                  : "toggle-switch-switch"
              }
            />
          </label>
        ) : null}
      </div>
    );

}
// Set text for rendering.
ToggleSwitch.defaultProps = {
    Text: ["On", "Off"]
  };


ToggleSwitch.propTypes = {
  id: PropTypes.string.isRequired,
  Text: PropTypes.arrayOf(PropTypes.string).isRequired,
  Name: PropTypes.string,
  onChange: PropTypes.func,
  defaultChecked: PropTypes.bool,
  Small: PropTypes.bool,
  currentValue: PropTypes.bool,
  disabled: PropTypes.bool
};

export default ToggleSwitch;
import React from "react";
import Checkbox from "../Checkbox/Checkbox";

export default ({ options, ...props }) => (
  <div
    className="ant-checkbox-group"
    
  >
    {options.map(label => (
      <Checkbox
        key={label}
        label={label}
        disabled={props.disabled}
        handleChange={props.handleChange}
        value={props[label]}
        
      />
    ))}
  </div>
);
import React from "react";
import { DistrictMap } from "react-nepal-map";

const Maper = (props) => {

  return (
    <div>
      <DistrictMap
        hoverColor="red"
        stroke="#000"
        strokeWidth={1}
        onMapClick={props.handleClick}
      />
    </div>
  );
};

export default Maper;

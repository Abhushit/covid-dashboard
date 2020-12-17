import { makeStyles } from "@material-ui/core";
import React from "react";
import { DistrictMap } from "react-nepal-map";

const useStyles = makeStyles((theme) => ({
  map: {
    margin: theme.spacing(5),
    position: "relative",
  },
}));

const Maper = (props) => {
  const classes = useStyles();
  return (
    <div className={classes.map}>
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

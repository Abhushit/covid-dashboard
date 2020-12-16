import { makeStyles } from "@material-ui/core";
import React, { useState, useEffect } from "react";
import Api from "../../Api";
import TableCustom from "./../../materialUI/TableCustom";

const drawerWidth = 330;

const useStyles = makeStyles((theme) => ({
  root: {
    width: `calc(100% - ${drawerWidth}px)`,
    margin: theme.spacing(2),
    marginTop: "80px",
    float: "right",
  },
  header: {
    color: "#fff",
    padding: `${theme.spacing(2)}px 0`,
  },
}));

const Hospital = () => {
  const classes = useStyles();
  const [hospital, setHospital] = useState("");

  const columns = [
    { key: "name", name: "Hospital Name" },
    { key: "phone", name: "Phone No." },
    { key: "address", name: "Address" },
    { key: "state", name: "State" },
    { key: "contact_person", name: "Contact Person" },
    { key: "notes", name: "Notes" },
  ];

  useEffect(() => {
    new Promise((resolve, reject) => {
      Api.getHospitals()
        .then((res) => {
          setHospital(res);
        })
        .catch((err) => {
          reject(err);
        });
    });
  }, []);


  return (
    <div className={classes.root}>
      <h1 className={classes.header}>Hospitals</h1>
      <TableCustom columns={columns} rows={hospital && hospital.data.data} />
    </div>
  );
};

export default Hospital;

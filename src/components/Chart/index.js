import { makeStyles } from "@material-ui/core";
import React, { useEffect, useState } from "react";
import { Bar, Line } from "react-chartjs-2";
import Api from "../Api";

const useStyles = makeStyles(theme => ({
    root:{
        backgroundColor: "#fff",
        padding: theme.spacing(1),
    }
}))

const Chartss = () => {
    const classes = useStyles()
  const [country, setCountry] = useState([]);
  useEffect(() => {
    new Promise((resolve, reject) => {
      Api.getAllContinent()
        .then((res) => {
          setCountry(res);
        })
        .catch((err) => {
          reject(err);
        });
    });
  }, []);

  return (
    <div className={classes.root}>
      <Bar
        data={{
          labels: country && country.data && country.data.map((con) => con.continent),
          datasets: [
            {
              data: country && country.data && country.data.map((cases) => cases.cases),
              backgroundColor: [
                "rgba(0,0,255,0.5)",
                "rgba(0,255,0,0.5)",
                "rgba(255,0,0,0.5)",
                "red",
                "pink",
                "purple",
                "black"
              ],
            },
          ],
        }}
        options={{
          legend: { display: false },
          title: {
            display: true,
            text: `Total Cases in ${country && country.data && country.data.map(
              (con) => con.continent
            )}`,
          },
        }}
      />
    </div>
  );
};

export default Chartss;

import { Card, Grid, makeStyles, Paper } from "@material-ui/core";
import React, { useEffect, useState } from "react";
import Api from "../../Api";
import Chartss from "../../Chart";
import Maper from "../../Map";
import Accordionss from "../../materialUI/Accordion";
import Cards from "../../materialUI/Cards";
import TableCustom from "../../materialUI/TableCustom";

const drawerWidth = 330;

const useStyles = makeStyles((theme) => ({
  root: {
    width: `calc(100% - ${drawerWidth}px)`,
    margin: theme.spacing(2),
    marginTop: "80px",
    float: "right",
  },
  detailBox: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-evenly",
  },
  red: {
    color: "red",
  },
  green: {
    color: "#11d411",
  },
  purple: {
    color: "purple",
  },
  paperContainer: {
    padding: theme.spacing(3),
    backgroundColor: theme.palette.primary.light,
    color: "#fff",
  },
  gap: {
    margin: `${theme.spacing(3)}px 0`,
    position: "relative",
  },
  header: {
    color: "#fff",
    padding: `${theme.spacing(2)}px 0`,
  },
  cardMap: {
    padding: theme.spacing(3),
    display: "inline-block",
    flexDirection: "column",
    position: "absolute",
    top: "0",
    right: "65px",
    backgroundColor: theme.palette.primary.light,
    color: "#fff",
  },
}));

const columns = [
  { key: "country", name: "Country" },
  { key: "todayCases", name: "Today Cases" },
];

const Dashboard = (props) => {
  const classes = useStyles();
  let [rows, setRows] = useState("");
  let [all, setAll] = useState("");
  let [district, setDistrict] = useState("");
  let [detail, setDetail] = useState("");
  let [faq, setFaq] = useState("");

  useEffect((data) => {
    new Promise((resolve, reject) => {
      Api.getCountries()
        .then((res) => {
          setRows(res);
        })
        .catch((err) => {
          reject(err);
        });
    });

    new Promise((resolve, reject) => {
      Api.getAll()
        .then((res) => {
          setAll(res);
        })
        .catch((err) => {
          reject(err);
        });
    });

    new Promise((resolve, reject) => {
      Api.getFaqs()
        .then((res) => {
          setFaq(res);
        })
        .catch((err) => {
          reject(err);
        });
    });

  }, []);

  const handleClick = (dis) => {
    // console.log("data >>", data);
    new Promise((resolve, reject) => {
      Api.getDistrict(dis.name)
        .then((resp) => {
          setDistrict(resp);
        })
        .catch((err) => {
          reject(err);
        });
    });

    new Promise((resolve, reject) => {
      const d = district && district.data.map((item) => item.id);
      Api.getDistrictDetail(...d)
        .then((val) => {
          setDetail(val);
        })
        .catch((err) => {
          reject(err);
        });
    });
  };
console.log('faq >>', faq)
  return (
    <div className={classes.root}>
      <h1 className={classes.header}>Corona Tracker</h1>

      <Grid container spacing={1}>
        <Grid item sm={8}>
          <div className={classes.detailBox}>
            <Cards
              title="Coronavirus Cases Today"
              cases={all && all.data.todayCases}
              total={all && all.data.cases}
              caseCondition="total cases"
              colorClass={classes.red}
            />
            <Cards
              title="Recovered Today"
              cases={all && all.data.todayRecovered}
              total={all && all.data.recovered}
              caseCondition="total recovered"
              colorClass={classes.green}
            />
            <Cards
              title="Deaths Today"
              cases={all && all.data.todayDeaths}
              total={all && all.data.deaths}
              caseCondition="total deaths"
              colorClass={classes.red}
            />
          </div>
          <div className={classes.gap}>
            <h2 className={classes.header}>
              Covid-19 Nepal Case - Click to view District Detail
            </h2>
            <Maper className={classes.gap} handleClick={handleClick} />
            {detail &&
              detail.data &&
              (detail.data.length === 77 ? (
                <Card className={classes.cardMap}>
                  Click the district you want to know about
                </Card>
              ) : (
                <Card className={classes.cardMap}>
                  <p>
                    District:{" "}
                    <span>{detail && detail.data && detail.data.title}</span>
                  </p>
                  <p>
                    Total Cases:{" "}
                    <span className={classes.purple}>
                      {detail && detail.data && detail.data.covid_summary.cases}
                    </span>
                  </p>
                  <p>
                    Active:{" "}
                    <span className={classes.green}>
                      {detail &&
                        detail.data &&
                        detail.data.covid_summary.active}
                    </span>
                  </p>
                  <p>
                    Recovered:{" "}
                    <span className={classes.green}>
                      {detail &&
                        detail.data &&
                        detail.data.covid_summary.recovered}
                    </span>
                  </p>
                  <p>
                    Death:{" "}
                    <span className={classes.red}>
                      {detail && detail.data && detail.data.covid_summary.death}
                    </span>
                  </p>
                </Card>
              ))}
          </div>
          <h2 className={classes.header}>Frequently Asked Questions</h2>
          <Accordionss faq={faq && faq.data && faq.data.data} />
        </Grid>
        <Grid item sm={4}>
          <Paper className={classes.paperContainer}>
            <h2 className={classes.header}>Today's Cases</h2>
            <TableCustom columns={columns} rows={rows && rows.data} />
            <h2 className={classes.header}>Continent Chart</h2>
            <Chartss />
          </Paper>
        </Grid>
      </Grid>
    </div>
  );
};

export default Dashboard;

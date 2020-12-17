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
    color: "#22ad22",
  },
  purple: {
    color: "purple",
  },
  paperContainer: {
    padding: theme.spacing(3),
    backgroundColor: theme.palette.primary.light,
    color: theme.palette.textColor,
  },
  paperNepal: {
    padding: theme.spacing(3),
    marginTop: theme.spacing(2),
    backgroundColor: theme.palette.primary.light,
    color: theme.palette.primary.main,
    fontSize: "14px"
  },
  bold: {
    fontWeight: "700",
    color: theme.palette.primary.dark,
  },
  gap: {
    margin: `${theme.spacing(3)}px 0`,
    position: "relative",
  },

  header: {
    color: theme.palette.textColor,
    padding: `${theme.spacing(2)}px 0`,
  },
  cardMap: {
    padding: theme.spacing(2),
    display: "inline-block",
    flexDirection: "column",
    position: "absolute",
    top: "30%",
    right: "65px",
    fontSize: "13px",
    backgroundColor: theme.palette.primary.light,
    color: theme.palette.textColor,
    borderBottom: `3px solid ${theme.palette.primary.main}`,
  },
}));

const columns = [
  { key: "country", name: "Country" },
  { key: "active", name: "Active Cases" },
];

const Dashboard = (props) => {
  const classes = useStyles();
  let [rows, setRows] = useState("");
  let [all, setAll] = useState("");
  let [district, setDistrict] = useState("");
  let [detail, setDetail] = useState("");
  let [faq, setFaq] = useState("");
  let [nepal, setNepal] = useState("");

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

    new Promise((resolve, reject) => {
      Api.getNepal()
        .then((res) => {
          setNepal(res);
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
  console.log("nepal >>", nepal);
  return (
    <div className={classes.root}>
      {/* box section */}
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

            {/* map section */}
            <Maper handleClick={handleClick} />
            {detail.data &&
              (detail.data.length === 77 ? (
                <Card className={classes.cardMap}>
                  Click the district you want to know about
                </Card>
              ) : (
                <Card className={classes.cardMap}>
                  <h2>{detail && detail.data && detail.data.title}</h2>
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

          {/* FAQ section */}
          <h2 className={classes.header}>Frequently Asked Questions</h2>
          <Accordionss faq={faq && faq.data && faq.data.data} />
        </Grid>
        <Grid item sm={4}>
          <Paper className={classes.paperContainer}>
            <h2 className={classes.header}>Active Cases</h2>
            <TableCustom columns={columns} rows={rows && rows.data} />
            <h2 className={classes.header}>Continent Chart</h2>
            <Chartss />
          </Paper>

          {/* Nepal section */}
          <Paper mt={2} className={classes.paperNepal}>
            <h2 className={classes.header}>Nepal</h2>
            <Grid container>
              <Grid item sm={6}>
                <p>
                  In Isolation : <span className={classes.bold}>{nepal && nepal.data.in_isolation}</span>
                </p>
                <p>
                  Total Deaths : <span className={classes.bold}>{nepal && nepal.data.deaths}</span>
                </p>
                <p>
                  Quarantined : <span className={classes.bold}>{nepal && nepal.data.quarantined}</span>
                </p>
                <p>
                  Recovered : <span className={classes.bold}>{nepal && nepal.data.recovered}</span>
                </p>
              </Grid>
              <Grid item sm={6}>
                <p>
                  Total Tested : <span className={classes.bold}>{nepal && nepal.data.tested_total}</span>
                </p>
                <p>
                  Tested Positive : <span className={classes.bold}>{nepal && nepal.data.tested_positive}</span>
                </p>
                <p>
                  Tested Negative : <span className={classes.bold}>{nepal && nepal.data.tested_negative}</span>
                </p>
                <p>
                  Tested RDT : <span className={classes.bold}>{nepal && nepal.data.tested_rdt}</span>
                </p>
              </Grid>
            </Grid>
          </Paper>
        </Grid>
      </Grid>
    </div>
  );
};

export default Dashboard;

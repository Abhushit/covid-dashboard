import { Button, Card, makeStyles } from "@material-ui/core";
import React from "react";
import { Link } from "react-router-dom";

const useStyles = makeStyles((theme) => ({
  root: {
    backgroundColor: theme.palette.primary.light,
    color: theme.palette.textColor,
    margin: theme.spacing(2),
  },
  myImg: {
    width: "100%",
    overflow: "hidden",
  },
  img: {
    width: "500px",
  },
  content: {
    padding: theme.spacing(2),
  },
  head: {
    marginBottom: theme.spacing(2),
  },
  btn: {
    marginTop: theme.spacing(1)
  }
}));

const News = (props) => {
  const classes = useStyles();
  return (
    <div>
      <a href={props.link} title={props.title}>
        <Card className={classes.root}>
          <div className={classes.myImg}>
            <img src={props.image} alt={props.alt} className={classes.img} />
          </div>
          <div className={classes.content}>
            <h2 className={classes.head}>{props.title}</h2>
            <p>{props.summary}</p>
            <Button className={classes.btn} variant="contained" color="primary">
              Read more
            </Button>
          </div>
        </Card>
      </a>
    </div>
  );
};

export default News;

import { Card, Grid, makeStyles } from "@material-ui/core";
import React from "react";

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
    width: "100%",
  },
  content: {
    padding: theme.spacing(2),
  },
  head: {
    marginBottom: theme.spacing(2),
  },
 span:{
     textDecoration:"underline"
 }
}));

const Myth = (props) => {
  const classes = useStyles();
  return (
    <div>
      <a href={props.link} title={props.title}>
        <Card className={classes.root}>
          <Grid container spacing={1}>
            <Grid item sm={4} justify="center">
              <div className={classes.myImg}>
                <img
                  src={props.image}
                  alt={props.alt}
                  className={classes.img}
                />
              </div>
            </Grid>
            <Grid item sm={8}>
            <div className={classes.content}>
            <h2 className={classes.head}><span className={classes.span}>Myth: </span> {props.title}</h2>
            <p><span className={classes.span}>Reality: </span> {props.summary}</p>
          </div>
            </Grid>
          </Grid>

          
        </Card>
      </a>
    </div>
  );
};

export default Myth;

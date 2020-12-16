import { Grid, makeStyles } from "@material-ui/core";
import React, { useEffect, useState } from "react";
import Api from "../../Api";
import News from "../../NewsCard";
import Myth from '../../MythCard'

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
const Blog = () => {
  const classes = useStyles();
  const [news, setNews] = useState("");
  const [myth, setMyth] = useState("");

  useEffect(() => {
    new Promise((resolve, reject) => {
      Api.getNews()
        .then((res) => {
          setNews(res);
        })
        .catch((err) => {
          reject(err);
        });
    });

    new Promise((resolve, reject) => {
      Api.getMyths()
        .then((res) => {
          setMyth(res);
        })
        .catch((err) => {
          reject(err);
        });
    });
  }, []);
  return (
    <div className={classes.root}>
      <Grid container spacing={1}>
        <Grid item sm={7}>
          <h1 className={classes.header}>Our Blogs</h1>
          <Grid container>
            {news &&
              news.data.data &&
              news.data.data.map((item, i) => (
                <Grid item sm={6}>
                  <News
                    image={item.image_url}
                    alt={item.title}
                    title={item.title}
                    summary={item.summary}
                    link={item.url}
                  />
                </Grid>
              ))}
          </Grid>
        </Grid>
        <Grid item sm={5}>
          <h1 className={classes.header}>Covid-19 Myths</h1>
          {myth &&
            myth.data.data &&
            myth.data.data.map((item, i) => (
              <Myth
                key={i}
                image={item.image_url}
                alt={item.myth}
                title={item.myth}
                summary={item.reality}
                link={item.source_url}
              />
            ))}
        </Grid>
      </Grid>
    </div>
  );
};

export default Blog;

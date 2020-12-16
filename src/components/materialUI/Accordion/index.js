import {
  AccordionDetails,
  AccordionSummary,
  makeStyles,
  Typography,
  Accordion,
  Grid,
} from "@material-ui/core";
import { ExpandMore } from "@material-ui/icons";
import React from "react";

const useStyles = makeStyles((theme) => ({
  root: {
    background: theme.palette.primary.light,
    color: "#fff",
    '& .MuiSvgIcon-root': {
        color: '#fff',
    }
  },
  margin: {
    margin: theme.spacing(1),
  },
}));

const Accordionss = ({ faq }) => {
  const classes = useStyles();
  return (
    <div>
      <Grid container>
        {faq &&
          faq.map(
            (items, i) =>
              i < 10 && (
                <Grid item sm={6}>
                  <div className={classes.margin}>
                    <Accordion className={classes.root}>
                      <AccordionSummary expandIcon={<ExpandMore />}>
                        <Typography>{items.question}</Typography>
                      </AccordionSummary>
                      <AccordionDetails>
                        <Typography>{items.answer}</Typography>
                      </AccordionDetails>
                    </Accordion>
                  </div>
                </Grid>
              )
          )}
      </Grid>
    </div>
  );
};

export default Accordionss;

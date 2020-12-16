import { Card, makeStyles } from '@material-ui/core'
import React from 'react'

const useStyles = makeStyles(theme => ({
    root:{
        padding: theme.spacing(5),
        backgroundColor: theme.palette.primary.light,
        color: "#fff",
        margin: theme.spacing(2)
    },
    

}))

const MyCards = (props) => {
    const classes = useStyles();
    return (
        <Card className={classes.root}>
            <p>{props.title}</p>
            <h2 className={props.colorClass}>+{props.cases}</h2>
            <p>{props.total} {props.caseCondition}</p>
        </Card>
    )
}

export default MyCards

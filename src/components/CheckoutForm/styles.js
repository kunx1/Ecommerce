import {makeStyles} from "@material-ui/core/styles";

export default makeStyles ((theme) => ({
    AppBar: {
        position: "relative",
    },
    layout: {
        width: "auto",
        marginLeft: theme.spacing(2),
        marginRigth: theme.spacing(2),
        [theme.breakpoints.up(600 + theme.spacing(2) * 2)]: {
            width: 600,
            marginLeft: "25%", //esto le modifique yo
            marginRigth: "auto",
            
        },
    },
    paper: {
        marginLeft: theme.spacing(3),
        marginRigth: theme.spacing(3),
        padding: theme.spacing(2),
        [theme.breakpoints.up(600 + theme.spacing(3) * 2)]: {
            marginTop: theme.spacing(6),
            marginBottom: theme.spacing(6),
            padding: theme.spacing(3),
        },
    },
    stepper: {
        padding: theme.spacing(3,0,5),
    },
    buttons: {
        display:"flex",
        justifyContent: "flex-end",
    },
    button: {
        marginTop: theme.spacing(3),
        marginLeft: theme.spacing(1),
    },
}));
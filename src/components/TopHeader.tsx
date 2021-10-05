import * as React from 'react';
import Toolbar from "@mui/material/Toolbar";
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import NotificationsIcon from '@mui/icons-material/Notifications';
import HelpIcon from '@mui/icons-material/Help';
import {AppBar} from "@mui/material";
import {makeStyles} from "@material-ui/core/styles";

const useStyles = makeStyles({
    header: {
        background: '#fff',
        color: 'rgba(0, 0, 0, 0.54) !important',
        alignItems: 'flex-end',
        borderBottom: '1px solid rgba(0, 0, 0, 0.12)',
        boxShadow: 'unset !important',
    },
});

export default function TopHeader() {
    const classes = useStyles();

    return (
        <div id="topheader">
            <AppBar className={classes.header}>
                <Toolbar>
                    <HelpIcon/>
                    <NotificationsIcon/>
                    <AccountCircleIcon/>
                </Toolbar>
            </AppBar>
        </div>
    );
}
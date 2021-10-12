import * as React from 'react';
import Toolbar from "@mui/material/Toolbar";
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import NotificationsIcon from '@mui/icons-material/Notifications';
import HelpIcon from '@mui/icons-material/Help';
import {AppBar} from "@mui/material";
import {Link} from "react-router-dom";
import {styled} from '@mui/material/styles';

const AppBarStyled = styled(AppBar)({
    background: '#fff',
    color: 'rgba(0, 0, 0, 0.54) !important',
    alignItems: 'flex-end',
    borderBottom: '1px solid rgba(0, 0, 0, 0.12)',
    boxShadow: 'unset !important',
});

export default function TopHeader() {
    return (
        <div id="topheader">
            <AppBarStyled>
                <Toolbar>
                    <HelpIcon/>
                    <NotificationsIcon/>
                    <Link to={"/login"}><AccountCircleIcon/></Link>
                </Toolbar>
            </AppBarStyled>
        </div>
    );
}
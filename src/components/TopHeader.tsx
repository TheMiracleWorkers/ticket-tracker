import * as React from 'react';

import {AccountCircle, Notifications, Help} from '@mui/icons-material';
import {Toolbar, AppBar, styled} from '@mui/material';
import {Link} from "react-router-dom";

const AppBarStyled = styled(AppBar)({
    background: '#fff',
    color: 'rgba(0, 0, 0, 0.54) !important',
    alignItems: 'flex-end',
    borderBottom: '1px solid rgba(0, 0, 0, 0.12)',
    boxShadow: 'unset !important',
});

export default function TopHeader() {
    return (
        <div id="top-header">
            <AppBarStyled>
                <Toolbar>
                    <Help/>
                    <Notifications/>
                    <Link to={"/login"}><AccountCircle/></Link>
                </Toolbar>
            </AppBarStyled>
        </div>
    );
}
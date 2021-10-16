import * as React from 'react';

import {AccountCircle, Notifications, Help, Logout} from '@mui/icons-material';
import {Toolbar, AppBar, styled} from '@mui/material';
import {Link} from "react-router-dom";

import PropTypes from 'prop-types';

// Add styling to header bar
const AppBarStyled = styled(AppBar)({
    background: '#fff',
    color: 'rgba(0, 0, 0, 0.54) !important',
    alignItems: 'flex-end',
    borderBottom: '1px solid rgba(0, 0, 0, 0.12)',
    boxShadow: 'unset !important',
});

export default function TopHeader(props: { logged_in: boolean; handle_logout: React.MouseEventHandler<HTMLLIElement>; }) {
    return (
        <div id="top-header">
            <AppBarStyled>
                <Toolbar>
                    {props.logged_in ? (
                        <li onClick={props.handle_logout}
                            style={{marginRight: 16, cursor: "pointer", listStyle: "none"}}><Logout/></li>
                    ) : ("")}
                    <Link to={"/"} style={{marginRight: 16}}><Help/></Link>
                    <Link to={"/"} style={{marginRight: 16}}><Notifications/></Link>
                    <Link to={"/"}><AccountCircle/></Link>
                </Toolbar>
            </AppBarStyled>
        </div>
    );
}

// Add prop types
TopHeader.propTypes = {
    logged_in: PropTypes.bool.isRequired,
    handle_logout: PropTypes.func.isRequired
};
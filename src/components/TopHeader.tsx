import * as React from 'react';

import { AccountCircle, Notifications, Help, Logout } from '@mui/icons-material';
import { Toolbar, AppBar, Button } from '@mui/material';
import { Link, useLocation } from "react-router-dom";

import PropTypes from 'prop-types';
import { makeStyles } from "@mui/styles";
import SearchInput from './SearchInput';

// Add styling to header bar

const useStyles = makeStyles({
    appBarStyled: {

        background: '#fff',
        color: 'rgba(0, 0, 0, 0.54) !important',
        alignItems: 'flex-end',
        borderBottom: '1px solid rgba(0, 0, 0, 0.12)',
        boxShadow: 'unset !important',
        width: '100%'

    },
    container_input_button: {

        display: 'flex',
        width: '70%',
        justifyContent: 'space-between',
        flexDirection: 'row',
    },


    toolbar: {
        width: '80%',

    },
    icons: {
        marginLeft: 'auto',
    },
});

TopHeader.propTypes = {
    logged_in: PropTypes.bool.isRequired,
    handle_logout: PropTypes.func.isRequired,
    searchText: PropTypes.string,
    setSearchText: PropTypes.func,
};
interface TopHeaderProps {
    logged_in: boolean;
    handle_logout: React.MouseEventHandler<HTMLLIElement>;
    searchText: string;
    setSearchText: any;
}

export default function TopHeader(props: TopHeaderProps) {
    const location = useLocation();
    const classes = useStyles();

    const renderElementen = () => {
        switch (location.pathname) {
            case "/tickets": return (
                <div className={classes.container_input_button}>
                    <Button component={Link} to={"/add-ticket"} variant="outlined" size="medium">+ Add ticket</Button>
                    < SearchInput type={'input'} placeholder={" Search..."} label={"search"} name={"search"} value={props.searchText} onChange={(e) => props.setSearchText(e.target.value)}
                    />
                </div>)

            case "/users": return (
                <div className={classes.container_input_button}>
                    <Button component={Link} to={"/add-ticket"} variant="outlined" size="medium">+ Add user</Button>
                    < SearchInput type={'input'} placeholder={" Search..."} label={"search"} name={"search"} value={props.searchText} onChange={(e) => props.setSearchText(e.target.value)}
                    />
                </div>)
            default: return null;
        }
    }


    return (
        <div id="top-header">
            <h1> Hallo Test </h1>
            <AppBar className={classes.appBarStyled}>
                <Toolbar>
                    {props.logged_in ? (
                        <li onClick={props.handle_logout}
                            style={{ marginRight: 16, cursor: "pointer", listStyle: "none" }}><Logout /></li>
                    ) : ("")}

                    {renderElementen()}

                    <div className={classes.icons}>
                        <Link to={"/"} style={{ marginRight: 16 }}><Help /></Link>
                        <Link to={"/"} style={{ marginRight: 16 }}><Notifications /></Link>
                        <Link to={"/"}><AccountCircle /></Link>
                    </div>
                </Toolbar>

            </AppBar>
        </div>
    );
}

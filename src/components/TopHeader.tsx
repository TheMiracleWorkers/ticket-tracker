import * as React from 'react';

import {AccountCircle, Notifications, Help, Logout} from '@mui/icons-material';
import {Toolbar, AppBar, Button} from '@mui/material';
import {Link, useLocation} from "react-router-dom";

import PropTypes from 'prop-types';
import SearchInput from './SearchInput';

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

    let buttonText = "";
    switch (location.pathname) {
        case "/tickets":
            buttonText = "+ Add ticket"
            break;
        case "/users":
            buttonText = "+ Add user"
            break;
        default:
            buttonText = "";
            break;
    }

    return (
        <div id="top-header">
            <AppBar className={'app-bar'}>
                <Toolbar>
                    {buttonText ? (
                        <Button component={Link} to={"/add-ticket"} variant="outlined"
                                size="medium">{buttonText}</Button>
                    ) : ("")}
                </Toolbar>
                <Toolbar>
                    {buttonText ? (
                        <SearchInput type={'input'} placeholder={" Search..."} label={"search"} name={"search"}
                                     value={props.searchText}
                                     onChange={(e) => props.setSearchText(e.target.value)}/>
                    ) : ("")}

                    {props.logged_in ? (
                        <li onClick={props.handle_logout}
                            style={{marginRight: 16, cursor: "pointer", listStyle: "none"}}><Logout/></li>
                    ) : ("")}

                    <Link to={"/"} style={{marginRight: 16}}><Help/></Link>
                    <Link to={"/"} style={{marginRight: 16}}><Notifications/></Link>
                    <Link to={"/"}><AccountCircle/></Link>
                </Toolbar>

            </AppBar>
        </div>
    );
}

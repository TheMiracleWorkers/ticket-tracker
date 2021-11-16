import React, { useEffect, useState } from "react";
import {TableBody, TableRow, TableCell, Typography} from '@mui/material';
import useTable from "../components/UseTable";
import { TransportUsers } from "../transportation/TransportUsers";
import User, { UserInterface } from "../domainObjects/User";
import {AxiosResponse} from "axios";
import moment from "moment";

const transportLayer = new TransportUsers();
// Header information of the table, key is the name of the 
// property to sort by when the header is clicked 
const headCells = [
    { id: 'username', label: 'Name' },
    { id: 'email', label: 'Email' },
    { id: 'groups', label: 'Roles' },
    { id: 'last_login', label: 'Last Login' },
    { id: 'date_joined', label: 'Created' }
]

export default function Users(props: any) {

    const [users, setUsers] = useState<User[]>([]);
    const [filterFn, setFilterFn] = useState({ fn: (items: any) => { return users; } })
    const { TblContainer, TblHead, TblPagination, recordsAfterPagingAndSorting } = useTable(users, headCells, filterFn);
    const [searchText, setSearchText] = React.useState('');
    const [userState, setUserState] = useState<UserInterface>();

    useEffect(() => {
        fetchAllUsers();
    }, []);

    useEffect(() => {
        handleSearch(props.searchTextInput);
    }, [props]);

    function fetchAllUsers() {
        transportLayer
            .getAllUsersPromise()
            .then((response: any) => {
                const allUsers: User[] = response.data.map(
                    (responseElement: any) => new User(responseElement)
                );
                setUsers(allUsers);
                setFilterFn({
                    fn: (allUsers) => {
                        return allUsers;
                    },
                });
            })
            .catch((response: AxiosResponse) => {
                // Handle error
            });
    }

    const handleSearch = (text: any): void => {

        setSearchText(text)
        setFilterFn({
            fn: items => {
                if (text === "") return items;
                else return items.filter((x: { name: string; }) => x.name.toLowerCase().includes(text))
            }
        })
        setSearchText("");
    };

    return (

        <React.Fragment>

            <Typography variant="h1">Users</Typography>
            <TblContainer>
                <TblHead />
                <TableBody>
                    {
                        recordsAfterPagingAndSorting().map(item =>
                        (<TableRow key={item.id}>
                            <TableCell>{item.username} </TableCell>
                            <TableCell>{item.email} </TableCell>
                            <TableCell>{item.groups} </TableCell>
                            <TableCell>{moment(item.last_login).format('DD-MM-YYYY HH:mm')} </TableCell>
                            <TableCell>{moment(item.date_joined).format('DD-MM-YYYY HH:mm')} </TableCell>
                        </TableRow>))
                    }

                </TableBody>
            </TblContainer>
            <TblPagination />
        </React.Fragment>
    )

}
export { }


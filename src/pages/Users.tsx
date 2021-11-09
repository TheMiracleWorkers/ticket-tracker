import React, { useEffect, useState } from "react";
import {TableBody, TableRow, TableCell, Typography} from '@mui/material';
import useTable from "../components/UseTable";
import { TransportUsers } from "../transportation/TransportUsers";
import User, { UserInterface } from "../domainObjects/User";
import {AxiosResponse} from "axios";

const transportLayer = new TransportUsers();
// Header information of the table, key is the name of the 
// property to sort by when the header is clicked 
const headCells = [
    { id: 'name', label: 'Name' },
    { id: 'role', label: 'Role' },
    { id: 'projects', label: 'Projects' },
    { id: 'dateOfBirth', label: 'Date of birth' },
    { id: 'created', label: 'Created' }
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
                            <TableCell>{item.name} </TableCell>
                            <TableCell>{item.role} </TableCell>
                            <TableCell>{item.projects} </TableCell>
                            < TableCell > {item.dateOfBirth} </TableCell>
                            <TableCell>{item.created} </TableCell>
                        </TableRow>))
                    }

                </TableBody>
            </TblContainer>
            <TblPagination />
        </React.Fragment>
    )

}
export { }


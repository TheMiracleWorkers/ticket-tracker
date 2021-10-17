import React, { useState } from "react";
import {TableBody, TableRow, TableCell, Paper, Divider, Grid, Button, Typography} from '@mui/material';
import useTable from "../components/UseTable";
import SearchInput from "../components/SearchInput";


// Header information of the table, key is the name of the 
// property to sort by when the header is clicked 
const headCells = [
    { id: 'name', label: 'Name' },
    { id: 'role', label: 'Role' },
    { id: 'projects', label: 'Projects' },
    { id: 'dateOfBirth', label: 'Date of birth' },
    { id: 'created', label: 'Created' }
]

// initial set of rows, simulating data from the database
const list = [
    {
        id: "1",
        name: "Martijn, Victor",
        role: "Adminstrator",
        projects: " Fontys, Rijksoverheid",
        dateOfBirth: "18-09-1999",
        created: " 18-09-2019"
    },
    {
        id: "2",
        name: "Janssen, Geert",
        role: "Project Manager",
        projects: " Nationale Politie, Fontys",
        dateOfBirth: "18-0923-08-2000",
        created: "2-9-2021"
    },
    {
        id: "3",
        name: "VanHaren, Ellen",
        role: "Member",
        projects: " Fontys,",
        dateOfBirth: "13-05-2000",
        created: " 12-04-2021"
    }]

export default function Users() {

    const [users] = useState(list);
    const [filterFn, setFilterFn] = useState({ fn: (items: any) => { return users; } })
    const { TblContainer, TblHead, TblPagination, recordsAfterPagingAndSorting } = useTable(users, headCells, filterFn);
    const [searchText, setSearchText] = React.useState('');

    const handleSearch = (e: React.ChangeEvent<HTMLInputElement>): void => {
        let target = e.target;
        console.log("event", e);
        console.log("target value", target.value);
        setSearchText(target.value)
        setFilterFn({
            fn: items => {
                if (target.value === "") {
                    console.log("target value is null", items);
                    return items;
                }
                else {

                    return items.filter((x: { name: string; }) => x.name.toLowerCase().includes(target.value))
                }
            }

        })
    };

    return (

        <Paper>

            <Typography variant="h1">Users</Typography>

            <Grid container>
                <Button variant="outlined" size="medium">+ Create user</Button>
                <Grid item sm={6} style={{border: '1px solid #fff'}}/>
                <SearchInput placeholder={" Search..."} label={"search"} name={"search"} value={searchText} onChange={(e) => handleSearch(e)} />
            </Grid>

            <TblContainer>
                <TblHead />
                <Divider />
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
        </Paper>
    )

}
export { }

import React, { useEffect, useState } from "react";
import { TableBody, TableRow, TableCell, Divider, Grid, Button, Typography } from '@mui/material';
import useTable from "../components/UseTable";

import SearchInput from "../components/SearchInput";
import { TransportLayer } from "../transportation/TransportLayer";
import Ticket from "../domainObjects/Ticket";
import { AxiosResponse } from "axios";
import moment from "moment";
import { Link } from "react-router-dom";



// Table header information, id is the name of the 
// property to sort by when the header is clicked 
const headCells = [
    { id: 'id', label: ' Number' },
    { id: 'title', label: 'Title' },
    { id: 'description', label: 'Description' },
    { id: 'dueDate', label: 'Due' },
    { id: 'createDate', label: 'Created' },
    { id: 'updateDate', label: 'Updated' },

]


const transportLayer = new TransportLayer();

export default function Tickets() {

    const [tickets, setTickets] = useState<Ticket[]>([]);
    const [filterFn, setFilterFn] = useState({ fn: (items: any) => { return tickets } })
    const { TblContainer, TblHead, TblPagination, recordsAfterPagingAndSorting } = useTable(tickets, headCells, filterFn);
    // const classes = useStyles();
    const [searchText, setSearchText] = React.useState('');

    useEffect(() => {

        fetchAllTicket()

    }, []);

    function fetchAllTicket() {
        transportLayer
            .getAllTicketsPromise()
            .then((response: any) => {
                const allTickets: Ticket[] = response.data.map((responseElement: any) => new Ticket(responseElement));
                setTickets(allTickets);
                setFilterFn({ fn: (allTickets) => { return allTickets } })
            })
            .catch((response: AxiosResponse) => {
                // Handle error
                console.log(response);
            });

    }


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

                    return items.filter((x: { title: string; }) => x.title.toLowerCase().includes(target.value))
                }
            }

        })
    };

    return (

        <React.Fragment>

            <Typography variant="h1">Tickets</Typography>

            <Grid container >
                <Button component={Link} to={"/add-ticket"} variant="outlined" size="medium">+ New submit</Button> 
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
                            <TableCell>{item.id} </TableCell>
                            <TableCell>{item.title} </TableCell>
                            <TableCell>{item.description} </TableCell>
                            <TableCell>{moment(item.dueDate).format('DD-MM-YYYY')} </TableCell>
                            <TableCell>{moment(item.createDate).format('DD-MM-YYYY')} </TableCell>
                            <TableCell>{moment(item.updateDate).format('DD-MM-YYYY')} </TableCell>
                        </TableRow>)
                        )
                    }
                </TableBody>
            </TblContainer>
            <TblPagination />

        </React.Fragment>
    )

}
export { }

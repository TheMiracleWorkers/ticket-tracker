import React, {useEffect, useState} from "react";
import {TableBody, TableCell, TableRow, Typography, CircularProgress} from "@mui/material";
import useTable from "../components/UseTable";
import {TransportLayer} from "../transportation/TransportLayer";
import Ticket, {TicketInterface} from "../domainObjects/Ticket";
import {AxiosResponse} from "axios";
import moment from "moment";
import ViewTicket from "../components/viewTicket/ViewTicket";
import EditTicket from "./EditTicket";

// Table header information, id is the name of the
// property to sort by when the header is clicked
const headCells = [
    {id: "id", label: " Number"},
    {id: "title", label: "Title"},
    {id: "description", label: "Description"},
    {id: "project_name", label: "Project"},
    {id: "dueDate", label: "Due"},
    {id: "createDate", label: "Created"},
    {id: "updateDate", label: "Updated"},
    {id: "status", label: "Status"},
];
const maxCaracteresToDisplay = 200;
const transportLayer = new TransportLayer();

export default function Tickets(props: any) {
    const [tickets, setTickets] = useState<Ticket[]>([]);
    const [loading, setLoading] = useState(true);
    const [filterFn, setFilterFn] = useState({
        fn: (items: any) => {
            return tickets;
        },
    });
    const {
        TblContainer,
        TblHead,
        TblPagination,
        recordsAfterPagingAndSorting,
        resetPage
    } = useTable(tickets, headCells, filterFn);
    const [, setSearchText] = useState("");

    const [ticketToUpdate, setTicketToUpdate] = useState<TicketInterface>();

    const [modalOpen, setModalOpen] = useState(false);
    const [modalEditTicketOpen, setModalEditTicketOpen] = useState(false);

    function fetchAllTicket() {
        transportLayer
            .getAllTicketsPromise()
            .then((response: any) => {
                const allTickets: Ticket[] = response.data.map(
                    (responseElement: any) => new Ticket(responseElement)
                );
                setTickets(allTickets);
                setFilterFn({
                    fn: (allTickets) => {
                        return allTickets;
                    },
                });
                setLoading(false)
            })
            .catch((response: AxiosResponse) => {
                // Handle error
                setLoading(false)
            });
    }

    const handleSearch = (text: any): void => {
        resetPage();
        setSearchText(text);
        setFilterFn({
            fn: (items) => {
                if (text === "") return items;
                else
                    return items.filter((x: {
                            title: string,
                            description: string,
                            dueDate: Date,
                            createdDate: Date,
                            updatedDate: Date
                        }) =>
                            x.title.toLowerCase().includes(text)
                            || x.description.toLowerCase().includes(text)
                            || moment(x.dueDate).format("DD-MM-YYYY").includes(text)
                            || moment(x.createdDate).format("DD-MM-YYYY").includes(text)
                            || moment(x.updatedDate).format("DD-MM-YYYY").includes(text)
                    );
            },
        });
    };

    function handleClickEvent(ticketId: number | string) {
        const id = ticketId as number;

        transportLayer
            .getTicketByIdPromise(id as number)
            .then((response: AxiosResponse) => {
                const ticket: Ticket = new Ticket(response.data);
                setTicketToUpdate(ticket);

                // Open modal
                setModalOpen(true);
            })
            .catch((response: AxiosResponse) => {
                // Handle error.
                console.log(response);
            });
    }

    function onModalClose() {
        fetchAllTicket();
        setModalOpen(false);
    }

    function displayCountCaracteres(text: string, count: number) {
        return (text.length > count) ? text.substring(0, count) : text
    }

    function onEditTicket() {
        setModalOpen(false);
        setModalEditTicketOpen(true);
    }

    function onModalEditTicketClose() {
        fetchAllTicket();
        setModalEditTicketOpen(false);
    }

    useEffect(fetchAllTicket, []);

    useEffect(() => {
        handleSearch(props.searchTextInput);
    }, [props]);


    return (
        <React.Fragment>
            {modalOpen ? (
                <ViewTicket
                    ticket={ticketToUpdate}
                    modalIsOpen={modalOpen}
                    onClose={onModalClose}
                    onEdit={onEditTicket}
                />
            ) : ("")}
            {modalEditTicketOpen ? (
                <EditTicket
                    onClose={onModalEditTicketClose}
                    ticket={ticketToUpdate}
                />
            ) : ("")}
            <Typography variant="h1">Tickets</Typography>
            <TblContainer>
                <TblHead/>
                <TableBody>
                    { tickets.length > 0 ? (
                        recordsAfterPagingAndSorting().map((item) => (
                        <TableRow key={item.id} onClick={() => handleClickEvent(item.id)}>
                            <TableCell>{item.id} </TableCell>
                            <TableCell>{item.title} </TableCell>
                            <TableCell>
                                {displayCountCaracteres(item.description as string, maxCaracteresToDisplay)}
                            </TableCell>
                            <TableCell>{item.project_name} </TableCell>
                            <TableCell>
                                {moment((item.dueDate), ("DD-MM-YYYY")).isValid() ? moment(item.dueDate).format("DD-MM-YYYY") : " "}
                            </TableCell>
                            <TableCell>
                                {moment((item.createdDate), ("DD-MM-YYYY")).isValid() ? moment(item.createdDate).format("DD-MM-YYYY") : " "}
                            </TableCell>
                            <TableCell>
                                {moment((item.updatedDate), ("DD-MM-YYYY")).isValid() ? moment(item.updatedDate).format("DD-MM-YYYY") : " "}
                            </TableCell>
                            <TableCell>{item.status} </TableCell>
                        </TableRow>))
                    ) : (
                        <TableRow>
                            <TableCell colSpan={100}>
                            {loading ? (
                                <CircularProgress/>
                            ) : (
                                "No data found"
                            )}
                            </TableCell>
                        </TableRow>
                    )}
                </TableBody>
            </TblContainer>
            <TblPagination/>
        </React.Fragment>
    );
}
export {};

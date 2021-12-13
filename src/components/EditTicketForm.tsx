import * as React from 'react';
import {useEffect, useState} from 'react';
import Grid from '@mui/material/Grid';
import TextField from '@mui/material/TextField';
import * as yup from "yup";
import {useFormik} from "formik";
import Button from "@mui/material/Button";
import {MenuItem, Stack} from "@mui/material";
import Ticket, {TicketInterface} from '../domainObjects/Ticket';
import {TransportLayer} from '../transportation/TransportLayer';
import {DateTimePicker, LocalizationProvider} from '@mui/lab';
import AdapterDateFns from '@mui/lab/AdapterDateFns';
import Project from "../domainObjects/Project";
import User from '../domainObjects/User';
import {TransportUsers} from '../transportation/TransportUsers';


const validationSchema = yup.object({
    title: yup
        .string()
        .min(10, 'Ticket title should be of minimum 8 characters length')
        .required('Ticket title is required'),
    description: yup
        .string()
        .required('Ticket description is required')
});


export default function EditTicketForm(props: {
    onClose: Function;
    ticket: TicketInterface | undefined
}) {
    const [projects, setProjects] = useState<Project[]>([]);
    const [users, setUsers] = useState<User[]>([]);
    const transportLayer = new TransportLayer();
    const transportUser = new TransportUsers();
    const ticket = props.ticket;
    const priorities = [
        {
            label: 'LOW',
            value: 1,
        },
        {
            label: 'MEDIUM',
            value: 2,
        },
        {
            label: 'HIGH',
            value: 3,
        }
    ];

    const status = [
        {
            label: 'Unassigned',
            value: 1,
        },
        {
            label: 'Open',
            value: 2,
        },
        {
            label: 'In Progress',
            value: 3,
        },
        {
            label: 'Resolved',
            value: 4,
        },
        {
            label: 'Done',
            value: 5,
        },
        {
            label: 'Re-opened',
            value: 6,
        }
    ];

    function getAllProjects() {
        transportLayer.getAllProjectPromise().then((response: any) => {
            const allProjects: Project[] = response.data.map(
                (responseElement: any) => new Project(responseElement)
            );
            setProjects(allProjects);
        })
    }

    function getAllUsers() {
        transportUser
            .getAllUsersPromise()
            .then((response: any) => {
                const allUsers: User[] = response.data.map(
                    (responseElement: any) => new User(responseElement)
                );
                setUsers(allUsers);
            })
    }

    useEffect(() => {
        getAllProjects();
    }, []);

    useEffect(() => {
        getAllUsers();
    }, []);

    const formik = useFormik({
        initialValues: {
            title: ticket?.title,
            description: ticket?.description,
            dueDate: ticket?.dueDate,
            createdDate: ticket?.createdDate,
            updatedDate: ticket?.updatedDate,
            status: ticket?.status,
            assignedUserId: ticket?.assignedUserId,
            priority: ticket?.priority,
            project: ticket ? ticket.project : "",
        },
        validationSchema: validationSchema,
        onSubmit: (values) => {
            const updateTicket = new Ticket({
                'id': ticket?.id,
                'title': values.title,
                'description': values.description,
                'due_date': values.dueDate && new Date(values.dueDate),
                'created_at': ticket?.createdDate,
                'updated_at': ticket?.updatedDate,
                'status': values.status,
                'priority': values.priority,
                'project': values.project,
                'assigned_user': values.assignedUserId
            });

            transportLayer.updateTicketPromise(updateTicket)
                .then(res => {
                    props.onClose();
                }).catch(err => {
                // TODO: Show error
            });
        },
    });

    return (
        <React.Fragment>

            <form onSubmit={formik.handleSubmit}>
                <Grid container spacing={3}>
                    <Grid item xs={12} sm={4}>
                        <TextField
                            required
                            id="title"
                            name="title"
                            label="Title"
                            fullWidth
                            variant="standard"
                            value={formik.values.title}
                            onChange={formik.handleChange}
                            error={formik.touched.title && Boolean(formik.errors.title)}
                            helperText={formik.touched.title && formik.errors.title}
                        />
                    </Grid>
                    <Grid item xs={12} sm={4}>
                        <TextField
                            select
                            required
                            id="project"
                            name="project"
                            label="Project"
                            fullWidth
                            variant="standard"
                            value={formik.values.project}
                            onChange={event => formik.setFieldValue("project", (event.target.value))}
                            onBlur={formik.handleBlur}
                        >
                            {projects.map((option) => (
                                <MenuItem key={option.id} value={option.id}>
                                    {option.name}
                                </MenuItem>
                            ))}
                        </TextField>
                    </Grid>
                    <Grid item xs={12} sm={4}>
                        <TextField
                            select
                            required
                            id="status"
                            name="status"
                            label="Status"
                            fullWidth
                            variant="standard"
                            value={formik.values.status}
                            onChange={event => formik.setFieldValue("status", (event.target.value))}
                            onBlur={formik.handleBlur}
                        >
                            {status.map((option) => (
                                <MenuItem key={option.value} value={option.label}>
                                    {option.label}
                                </MenuItem>
                            ))}
                        </TextField>

                    </Grid>
                    <Grid item xs={12} sm={4}>
                        <TextField
                            required
                            id="category"
                            name="category"
                            label="Category"
                            fullWidth
                            variant="standard"
                            disabled
                        />
                    </Grid>
                    <Grid item xs={12} sm={3}>
                        <LocalizationProvider dateAdapter={AdapterDateFns}>
                            <DateTimePicker
                                label="Due Date"
                                value={formik.values.dueDate}
                                inputFormat="dd-MM-yyyy HH:mm"
                                onChange={value => formik.setFieldValue("dueDate", value)}
                                minDate={formik.initialValues.createdDate}
                                renderInput={(params) => <TextField
                                    id="due_date"
                                    name="due_date"
                                    label="Due Date"
                                    fullWidth
                                    variant="standard"
                                    {...params}
                                />}
                            />
                        </LocalizationProvider>
                    </Grid>
                    <Grid item xs={12} sm={1}>
                        <TextField
                            select
                            required
                            id="priority"
                            name="priority"
                            label="Priority"
                            fullWidth
                            variant="standard"
                            value={formik.values.priority}
                            onChange={event => formik.setFieldValue("priority", (event.target.value))}
                            onBlur={formik.handleBlur}
                        >
                            {priorities.map((option) => (
                                <MenuItem key={option.label} value={option.value}>
                                    {option.value}
                                </MenuItem>
                            ))}
                        </TextField>
                    </Grid>
                    <Grid item xs={12} sm={4}>
                        <TextField
                            select
                            required
                            id="assigned"
                            name="assigned"
                            label="Assigned"
                            fullWidth
                            variant="standard"
                            value={formik.values.assignedUserId}
                            onChange={event => formik.setFieldValue("assignedUserId", (event.target.value))}
                            onBlur={formik.handleBlur}
                        >
                            {users.map((user) => (
                                <MenuItem key={user.id} value={user.id}>
                                    {user.username}
                                </MenuItem>
                            ))}
                        </TextField>
                    </Grid>
                    <Grid item xs={12} sm={12}>
                        <TextField
                            required
                            id="description"
                            name="description"
                            label="Description"
                            fullWidth
                            variant="standard"
                            multiline
                            rows={8}
                            value={formik.values.description}
                            onChange={formik.handleChange}
                            error={formik.touched.description && Boolean(formik.errors.description)}
                            helperText={formik.touched.description && formik.errors.description}
                        />
                    </Grid>

                    <Grid item xs={12}>
                        <Stack spacing={2} direction="row">
                            <Button color="primary" variant="contained" type="submit">
                                Submit
                            </Button>
                            <Button color="primary" variant="outlined" onClick={() => props.onClose()}>
                                Cancel
                            </Button>
                        </Stack>
                    </Grid>
                </Grid>
            </form>

        </React.Fragment>
    );
}
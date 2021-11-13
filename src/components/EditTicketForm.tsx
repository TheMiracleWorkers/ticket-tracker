import * as React from 'react';
import Grid from '@mui/material/Grid';
import TextField from '@mui/material/TextField';
import * as yup from "yup";
import { useFormik } from "formik";
import Button from "@mui/material/Button";
import { Stack } from "@mui/material";
import Ticket, { TicketInterface } from '../domainObjects/Ticket';
import { TransportLayer } from '../transportation/TransportLayer';
import { DateTimePicker, LocalizationProvider } from '@mui/lab';
import AdapterDateFns from '@mui/lab/AdapterDateFns';


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
    const transportLayer = new TransportLayer();
    const ticket = props.ticket;

    const formik = useFormik({
        initialValues: {
            title: ticket?.title,
            description: ticket?.description,
            dueDate: ticket?.dueDate,
            createdDate: ticket?.createdDate,
            updatedDate: ticket?.updatedDate,
            assigned: "",
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
            });
            
            transportLayer.updateTicketPromise(updateTicket)
                .then(res => {                 
                    props.onClose();
                    window.location.reload();
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
                            required
                            id="project"
                            name="project"
                            label="Project"
                            fullWidth
                            variant="standard"
                            disabled

                        />
                    </Grid>
                    <Grid item xs={12} sm={4}>
                        <TextField
                            required
                            id="status"
                            name="status"
                            label="Status"
                            fullWidth
                            variant="standard"
                            disabled
                        />
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
                        <LocalizationProvider dateAdapter={AdapterDateFns} >
                            <DateTimePicker
                                label="Due Date"
                                value={formik.values.dueDate}
                                inputFormat="dd-MM-yyyy HH:mm"
                                onChange={value => formik.setFieldValue("dueDate", value)}

                                renderInput={(params) => <TextField
                                    required
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
                            required
                            id="priority"
                            name="priority"
                            label="Priority"
                            fullWidth
                            variant="standard"
                            disabled
                        />
                    </Grid>
                    <Grid item xs={12} sm={4}>
                        <TextField
                            required
                            id="assigned"
                            name="assigned"
                            label="Assigned"
                            fullWidth
                            variant="standard"
                            value={formik.values.assigned}
                            onChange={formik.handleChange}
                            disabled
                        />
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
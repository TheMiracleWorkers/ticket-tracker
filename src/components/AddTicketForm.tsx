import * as React from 'react';
import Grid from '@mui/material/Grid';
import TextField from '@mui/material/TextField';
import * as yup from "yup";
import {useFormik} from "formik";
import Button from "@mui/material/Button";
import {MenuItem, Stack} from "@mui/material";
import Ticket from '../domainObjects/Ticket';
import {TransportLayer} from '../transportation/TransportLayer';
import { useHistory } from "react-router-dom";
import { DateTimePicker, LocalizationProvider } from '@mui/lab';
import AdapterDateFns from '@mui/lab/AdapterDateFns';

const validationSchema = yup.object({
    title: yup
        .string()
        .min(10, 'Ticket title should be of minimum 8 characters length')
        .required('Ticket title is required'),
    description: yup
        .string()
        .required('Ticket description is required'), 
    dueDate: yup
        .date()
        .required('dueDate must be a `date` type'),
});


export default function AddTicketForm(props: {
    onClose: Function;
}) {
    const transportLayer = new TransportLayer();
    const history = useHistory();
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
    const formik = useFormik({
        initialValues: {
            title: '',
            description: '',
            dueDate: null,
            priority: ''
        },
        validationSchema: validationSchema,
        onSubmit: (values) => {
            const newTicket = new Ticket({
                'title': values.title,
                'description': values.description,
                'due_date': values.dueDate && new Date(values.dueDate),
                'priority': values.priority
            });
            transportLayer.postTicket(newTicket).catch(err => {
                // TODO: Show error
            }).then(res =>{
                history.push('/tickets');
                props.onClose();
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
                                minDate={new Date()}
                                maxDate={new Date()}
                                renderInput={(params) => <TextField                                    
                                    id="due_date"
                                    name="due_date"
                                    label="Due Date"
                                    fullWidth
                                    variant="standard"
                                    onChange={formik.handleChange}
                                    onBlur={formik.handleBlur}
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
                            required
                            id="assigned"
                            name="assigned"
                            label="Assigned"
                            fullWidth
                            variant="standard"
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
import * as React from 'react';
import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';
import TextField from '@mui/material/TextField';
import * as yup from "yup";
import {useFormik} from "formik";
import axios from "axios";
import Button from "@mui/material/Button";
import {Stack} from "@mui/material";

const validationSchema = yup.object({
    title: yup
        .string()
        .min(10, 'Ticket title should be of minimum 8 characters length')
        .required('Ticket title is required'),
    description: yup
        .string()
        .required('Ticket description is required')
});

export default function AddTicketForm() {
    const formik = useFormik({
        initialValues: {
            title: '',
            description: '',
        },
        validationSchema: validationSchema,
        onSubmit: (values) => {
            alert(JSON.stringify(values, null, 2));
            axios.post('https://derekmeuwissen.pythonanywhere.com/tickets/', values).then(res => {
                console.log(res)
            }).catch(err => {
                console.log(err)
            })
        },
    });

    return (
        <React.Fragment>
            <form onSubmit={formik.handleSubmit}>
            <Typography variant="h6" gutterBottom>
                Add Ticket
            </Typography>
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
                    <TextField
                        required
                        id="due_date"
                        name="due_date"
                        label="Due Date"
                        fullWidth
                        variant="standard"
                        disabled
                    />
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
                        <Button color="primary" variant="outlined">
                            Cancel
                        </Button>
                    </Stack>
                </Grid>
            </Grid>
            </form>
        </React.Fragment>
    );
}
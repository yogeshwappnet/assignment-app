import React, { useEffect, useState } from "react";
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as Yup from 'yup';
import { Box, Button, FormControl, Grid, TextField, Typography } from "@mui/material";
import IEmployeeData from "../types/Employee";
import EmployeeService from "../services/EmployeeService";
import useNotification from "../hooks/useNotification";
import { useNavigate, useParams } from "react-router-dom";

type AddEmployeeForm = {
    name: string;
    email: string;
    phoneNumber: string;
    city: string;
    zipCode: string;
    addressLine1: string,
    addressLine2: string,
    dateOfEmployment: string,
    dateOfBirth: string,
};


const AddEmployee: React.FC = () => {
    const { id } = useParams();

    const initialEmployeeState = {
        id: null,
        name: '',
        email: '',
        phoneNumber: '',
        homeAddress: {
            city: '',
            ZIPCode: '',
            addressLine1: '',
            addressLine2: '',
        },
        dateOfEmployment: '',
        dateOfBirth: '',
    };

    const [currentEmployee, setCurrentEmployee] = useState<IEmployeeData>(initialEmployeeState);

    const navigate = useNavigate();

    const { setNotification, showLoading } = useNotification();

    const validationSchema = Yup.object().shape({
        name: Yup.string().required('Name is required'),
        email: Yup.string()
            .required('Email is required')
            .email('Email is invalid'),
        phoneNumber: Yup.string()
            .required('Phone Number is required'),
        city: Yup.string()
            .required('City is required'),
        zipCode: Yup.string()
            .required('Zipcode is required'),
        addressLine1: Yup.string()
            .required('Address Line 1 is required'),
        addressLine2: Yup.string()
            .required('Address Line 2 is required'),
        dateOfEmployment: Yup.string()
            .required('Date of employment is required'),
        dateOfBirth: Yup.string()
            .required('Date of birth is required')
    });

    const getEmployee = (id: string) => {
        EmployeeService.get(id)
            .then((response: any) => {
                setCurrentEmployee(response.data);
                setValue("name", response.data.name);
                setValue("email", response.data.email);
                setValue("phoneNumber", response.data.phoneNumber);
                setValue("city", response.data.homeAddress.city);
                setValue("zipCode", response.data.homeAddress.ZIPCode);
                setValue("addressLine1", response.data.homeAddress.addressLine1);
                setValue("addressLine2", response.data.homeAddress.addressLine2);
                setValue("dateOfEmployment", response.data.name);
                setValue("dateOfBirth", response.data.name);
                console.log(response.data);
            })
            .catch((e: Error) => {
                console.log(e);
            });
    };

    useEffect(() => {
        if (id)
            getEmployee(id);
    }, [id]);

    const {
        register,
        handleSubmit,
        reset,
        setValue,
        formState: { errors }
    } = useForm<AddEmployeeForm>({
        resolver: yupResolver(validationSchema)
    });


    const onSubmit = (data: AddEmployeeForm) => {
        showLoading(true);
        const payload: IEmployeeData = {
            name: data.name,
            email: data.email,
            phoneNumber: data.phoneNumber,
            homeAddress: {
                ZIPCode: data.zipCode,
                city: data.city,
                addressLine1: data.addressLine1,
                addressLine2: data.addressLine2
            },
            dateOfEmployment: data.dateOfEmployment,
            dateOfBirth: data.dateOfBirth,
        };
        if (id) {
        } else{
            EmployeeService.update(id, payload)
            .then((response: any) => {
                showLoading(false);
                setNotification("Employee Updated Successfully", "success");
                reset();
                navigate('/');
            }, (err) => {
                showLoading(false);
                setNotification(err?.response?.data?.message?.[0] ?? "SOMETHING WENT WRONG", "error");
            });
        }
        EmployeeService.create(payload)
            .then((response: any) => {
                showLoading(false);
                setNotification("Employee Added Successfully", "success");
                reset();
                navigate('/');
            }, (err) => {
                showLoading(false);
                setNotification(err?.response?.data?.message?.[0] ?? "SOMETHING WENT WRONG", "error");
            });
    };

    return (
        <>
            <Typography
                align="center"
                color="success.light"
                variant="h4"
                component="h2"
                gutterBottom
            >
                {currentEmployee ? 'Edit' : 'Add'} Employee
            </Typography>

            <Box component="form" onSubmit={handleSubmit(onSubmit)}>
                <FormControl fullWidth >
                    <Grid
                        container
                        rowSpacing={{ xs: 2, sm: 2, md: 4, lg: 6 }}
                        columnSpacing={{ xs: 2, sm: 2, md: 4, lg: 6 }}
                        sx={{ alignContent: "center" }}
                    >
                        <Grid item xs={12} sm={12} md={6} lg={3}>
                            <TextField
                                error={errors.name ? true : false}
                                label="Name"
                                {...register('name')}
                                type="text"
                                required
                                margin="normal"
                                sx={{ backgroundColor: "#fff", width: "100%" }}
                                helperText={errors.name?.message}
                            />
                        </Grid>

                        <Grid item xs={12} sm={12} md={6} lg={3}>
                            <TextField
                                error={errors.email ? true : false}
                                label="Email"
                                {...register('email')}
                                type="text"
                                required
                                margin="normal"
                                sx={{ backgroundColor: "#fff", width: "100%" }}
                                helperText={errors.email?.message}
                            />
                        </Grid>

                        <Grid item xs={12} sm={12} md={6} lg={3}>
                            <TextField
                                error={errors.phoneNumber ? true : false}
                                label="Phone number"
                                {...register('phoneNumber')}
                                type="text"
                                required
                                margin="normal"
                                sx={{ backgroundColor: "#fff", width: "100%" }}
                                helperText={errors.phoneNumber?.message}
                            />
                        </Grid>

                        <Grid item xs={12} sm={12} md={6} lg={3}>
                            <TextField
                                error={errors.zipCode ? true : false}
                                label="Zip code"
                                {...register('zipCode')}
                                type="text"
                                required
                                margin="normal"
                                sx={{ backgroundColor: "#fff", width: "100%" }}
                                helperText={errors.zipCode?.message}
                            />
                        </Grid>

                        <Grid item xs={12} sm={12} md={6} lg={3}>
                            <TextField
                                error={errors.city ? true : false}
                                label="City"
                                {...register('city')}
                                type="text"
                                required
                                margin="normal"
                                sx={{ backgroundColor: "#fff", width: "100%" }}
                                helperText={errors.city?.message}
                            />
                        </Grid>

                        <Grid item xs={12} sm={12} md={6} lg={3}>
                            <TextField
                                error={errors.addressLine1 ? true : false}
                                label="Address Line 1"
                                {...register('addressLine1')}
                                type="text"
                                required
                                margin="normal"
                                sx={{ backgroundColor: "#fff", width: "100%" }}
                                helperText={errors.addressLine1?.message}
                            />
                        </Grid>

                        <Grid item xs={12} sm={12} md={6} lg={3}>
                            <TextField
                                error={errors.addressLine1 ? true : false}
                                label="Address Line 2"
                                {...register('addressLine2')}
                                type="text"
                                required
                                margin="normal"
                                sx={{ backgroundColor: "#fff", width: "100%" }}
                                helperText={errors.addressLine2?.message}
                            />
                        </Grid>


                        <Grid item xs={12} sm={12} md={6} lg={3}>
                            <TextField
                                error={errors.dateOfEmployment ? true : false}
                                label="Date of Employment"
                                {...register('dateOfEmployment')}
                                type="date"
                                required
                                margin="normal"
                                sx={{ backgroundColor: "#fff", width: "100%" }}
                                helperText={errors.dateOfEmployment?.message}
                            />
                        </Grid>

                        <Grid item xs={12} sm={12} md={6} lg={3}>
                            <TextField
                                error={errors.dateOfBirth ? true : false}
                                label="Date of Birth"
                                {...register('dateOfBirth')}
                                type="date"
                                required
                                margin="normal"
                                sx={{ backgroundColor: "#fff", width: "100%" }}
                                helperText={errors.dateOfBirth?.message}
                            />
                        </Grid>


                        <Grid item xs={12} md={12} lg={2}>
                            <Button
                                type="submit"
                                variant="contained"
                                size="large"
                                sx={{ marginTop: "18px", width: "100%", p: "12px" }}
                            >
                                Save
                            </Button>
                        </Grid>
                    </Grid>

                </FormControl>
            </Box>
        </>

    );
};

export default AddEmployee;
import { Grid, Paper, Typography } from "@mui/material";
import { DataGrid } from "@mui/x-data-grid";
import React, { useEffect, useState } from "react";
import EmployeeService from "../services/EmployeeService";

const DeletedEmployees: React.FC = () => {
    const [tableData, setTableData] = useState([]);

    const [paginationModel, setPaginationModel] = React.useState({
        page: 0,
        pageSize: 5,
    });


    useEffect(() => {
        getDeletedEmployees(paginationModel.page, paginationModel.pageSize);
    }, [paginationModel]);

    const getDeletedEmployees = (pageNumber, limit) => {
        EmployeeService.getDeletedEmployees(pageNumber, limit)
            .then((response: any) => {
                setTableData(response.data);
                console.log(response.data);
            }, (e: Error) => {
                console.log(e);
            }
            );
    }

    const columns = [
        { field: "id", headerName: "ID", flex: 0.5 },
        { field: "name", headerName: "Name", flex: 1 },
        { field: "email", headerName: "Email", flex: 1 },
        { field: "phoneNumber", headerName: "Phone No.", flex: 1 },
        { field: "dateOfBirth", headerName: "DOB", flex: 0.5 },
    ];

    const paperStyle = { p: { xs: 2, sm: 2, md: 4 }, borderRadius: 3 };

    return (
        <>
            <Grid
                container
                rowSpacing={{ xs: 2, sm: 2, md: 4 }}
                columnSpacing={{ xs: 2, sm: 2, md: 4 }}
            >

                <Grid item xs={12}>
                    <Paper elevation={2} sx={paperStyle}>
                        <Typography
                            align="center"
                            color="primary"
                            variant="h4"
                            component="h2"
                            gutterBottom
                        >
                          Deleted Employees
                        </Typography>

                        <div style={{ height: 300, marginTop: "30px" }}>
                            <DataGrid
                                rows={tableData}
                                columns={columns}
                                getRowId={(row) => row.id + row.value}
                                sx={{ backgroundColor: "#fff", overflowY: "scroll" }}
                                paginationModel={paginationModel}
                                paginationMode="server"
                                onPaginationModelChange={setPaginationModel}
                            />
                        </div>
                    </Paper>
                </Grid>
            </Grid>
        </>

    );
};

export default DeletedEmployees;
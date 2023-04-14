import { Grid, Paper, Typography } from "@mui/material";
import { DataGrid } from "@mui/x-data-grid";
import React, { useEffect, useState } from "react";
import EmployeeService from "../services/EmployeeService";
import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";
import useNotification from "../hooks/useNotification";
import { useNavigate } from "react-router-dom";


const Employees: React.FC = () => {
    const navigate = useNavigate();

    const [tableData, setTableData] = useState([]);

    const [paginationModel, setPaginationModel] = React.useState({
        page: 0,
        pageSize: 5,
    });

    const { setNotification, showLoading } = useNotification();

    useEffect(() => {
        getEmployees(paginationModel.page, paginationModel.pageSize);
    }, [paginationModel]);

    const getEmployees = (pageNumber, limit) => {
        EmployeeService.getEmployees(pageNumber, limit)
            .then((response: any) => {
                setTableData(response.data);
                console.log(response.data);
            }, (e: Error) => {
                console.log(e);
            }
            );
    }

    const iconSize = {
        fontSize: { xs: "80px", md: "100px", lg: "120px" },
    };

    const editEmployee  = (id) => {
        navigate(`/edit/${id}`);
    }

    const deleteEmployee  = (id) => {
        EmployeeService.remove(id)
        .then((response: any) => {
            setNotification("Employee Deleted Successfully", "success");
            getEmployees(1, paginationModel.pageSize)
        }, (err) => {
            showLoading(false);
            setNotification(err?.response?.data?.message?.[0] ?? "SOMETHING WENT WRONG", "error");
        });
    }

    const columns = [
        { field: "id", headerName: "ID", flex: 0.5 },
        { field: "name", headerName: "Name", flex: 1 },
        { field: "email", headerName: "Email", flex: 1 },
        { field: "phoneNumber", headerName: "Phone No.", flex: 1 },
        { field: "dateOfBirth", headerName: "DOB", flex: 0.5 },
        {
            field: "edit",
            headerName: "Edit",
            sortable: false,
            width: 140,
            disableClickEventBubbling: true,
            renderCell: (params) => {
                return (
                    <div className="d-flex justify-content-between align-items-center" style={{ cursor: "pointer" }}>
                        <EditIcon color="error" sx={iconSize} onClick={() => {
                        editEmployee(params.row.id)
                    }} />
                    </div>
                );
            }
        },
        {
            field: "delete",
            headerName: "Delete",
            sortable: false,
            width: 140,
            disableClickEventBubbling: true,
            renderCell: (params) => {
                return (
                    <div className="d-flex justify-content-between align-items-center" style={{ cursor: "pointer" }}>
                        <DeleteIcon color="error" sx={iconSize}  onClick={() => {
                        deleteEmployee(params.row.id)
                    }}/>
                    </div>
                );
            }
        }
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
                            Employees
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

export default Employees;
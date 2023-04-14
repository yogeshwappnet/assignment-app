import { AppBar, Toolbar, Typography, Button, LinearProgress } from "@mui/material";
import React from "react";
import useNotification from "../hooks/useNotification";
import { NavLink } from "react-router-dom";


const Header: React.FC = () => {
    const { loading } = useNotification();

    return (
        <AppBar>
            <Toolbar>
                <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
                    Employee Management
                </Typography>

                <Button
                    component={NavLink}
                    to={"/"}
                    variant="contained"
                    color="info"
                    sx={{ display: { xs: "none", md: "flex" }, mx: "5px" }}
                >
                    View Employees
                </Button>
                <Button
                    component={NavLink}
                    to={"/add"}
                    variant="contained"
                    color="info"
                    sx={{ display: { xs: "none", md: "flex" }, mx: "5px" }}
                >
                    Add Employees
                </Button>
                <Button
                    component={NavLink}
                    to={"/deleted"}
                    variant="contained"
                    color="info"
                    sx={{ display: { xs: "none", md: "flex" }, mx: "5px" }}
                >
                    View Deleted Employees
                </Button>

            </Toolbar>
            {loading && <LinearProgress />}
        </AppBar>
    );
};

export default Header;
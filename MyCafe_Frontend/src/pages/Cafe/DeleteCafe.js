import {Button, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, FormControl, FormLabel, Grid, TextField, IconButton,Typography,} from "@mui/material";
import { useContext, useEffect, useMemo, useState } from "react";
import DeleteForeverTwoTone from "@mui/icons-material/DeleteForeverTwoTone";
import { useApiData } from "../../custom-hooks/useApiData";

const DeleteCafe = ({ cafeData }) => {
    let apiData = useApiData();
    const [open, setOpen] = useState(false);
    const handleClickOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };


    function onSubmit(data) {
        const response = apiData.deleteCafe(cafeData?.id);
        console.log("deleted------------->", response);
    }

    return (
        <>
            <IconButton color="inherit" size="small" onClick={handleClickOpen}>
                <DeleteForeverTwoTone fontSize="small" />
            </IconButton>
            <Dialog open={open} onClose={handleClose} fullWidth>
                <DialogTitle>Confirm Delete</DialogTitle>
                <DialogContent>
                    <Typography>Are you sure want to delete the Cafe?</Typography>
                </DialogContent>
                <DialogActions style={{ display: "flex", justifyContent: "space-between", padding: 20 }}>
                    <Button type="button" variant="contained" color="secondary" onClick={handleClose}>
                        Cancel
                    </Button>
                    <Button type="button" variant="contained" color="primary" onClick={onSubmit}>
                        Confirm
                    </Button>
                </DialogActions>
            </Dialog>
        </>
    );
};

export default DeleteCafe;

import {Button, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, FormControl, FormLabel, Grid, TextField, IconButton} from "@mui/material";
import EditTwoTone from "@mui/icons-material/EditTwoTone";
import { useContext, useEffect, useMemo, useState } from "react";
import { useForm } from "react-hook-form";
import { useApiData } from "../../custom-hooks/useApiData";
import { Context } from "../../context/store";

const EditCafe = ({ cafeData }) => {
    let apiData = useApiData();
    const { state, dispatch } = useContext(Context);
    const [open, setOpen] = useState(false);
   

    const { register, handleSubmit, reset, errors } = useForm({
        defaultValues: useMemo(() => {
            console.log("User has changed");
            return cafeData;
        }, [cafeData]),
    });

    const handleClickOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
        reset();
    };

    function onSubmit(data) {  
        const update = apiData.updateCafe(cafeData.id, data)
        .then(() => {
            alert('Cafe updated successfully!');
            
        })
        .catch((error) => {
            console.log(error);
            alert(error);
        });
          console.log("updated------------->", update);
    }

    return (
        <>
            <IconButton color="inherit" size="small" onClick={handleClickOpen}>
                <EditTwoTone fontSize="small" />
            </IconButton>
            <Dialog open={open} onClose={handleClose} fullWidth>
                <DialogTitle>Edit Cafe</DialogTitle>
                <DialogContent>
                    <form id="formCafe" onSubmit={handleSubmit(onSubmit)} onReset={reset} noValidate autoComplete="off">
                        <TextField
                            variant="outlined"
                            margin="normal"
                            required
                            fullWidth
                            id="name"
                            label="Name"
                            name="name"
                            autoComplete="name"
                            autoFocus
                            {...register("name")}
                        />
                        <TextField
                            variant="outlined"
                            margin="normal"
                            //type="email"
                            required
                            fullWidth
                            id=""
                            label="Description"
                            name="description"
                            autoComplete="description"
                            autoFocus
                            {...register("description")}
                        />
                        <TextField
                            variant="outlined"
                            margin="normal"
                            required
                            fullWidth
                            id=""
                            label="Logo"
                            name="logo"
                            autoComplete="logo"
                            autoFocus
                            {...register("logo")}
                        />
                        <TextField
                            variant="outlined"
                            margin="normal"
                            required
                            fullWidth
                            id=""
                            label="Location"
                            name="location"
                            autoComplete="location"
                            autoFocus
                            {...register("location")}
                        />
                        
                        <Grid display={"flex"} justifyContent={"space-between"} mt={2} mb={1}>
                            <Button type="button" variant="contained" color="secondary" onClick={handleClose}>
                                Cancel
                            </Button>
                            <Button type="submit" variant="contained" color="primary">
                                Update
                            </Button>
                        </Grid>
                    </form>
                </DialogContent>
            </Dialog>
        </>
    );
};

export default EditCafe;

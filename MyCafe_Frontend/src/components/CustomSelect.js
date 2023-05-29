import { MenuItem, Select, InputLabel , Box, FormControl} from '@mui/material';
import { useState } from "react";
import { Controller } from "react-hook-form";

function CustomSelect({ name, label, options, defaultValue, control }) {
  return (
    
    <Box sx={{ minWidth: 120 , mt: 2, mb:1 }}>
        <FormControl fullWidth>
            <InputLabel>{label + " *"}</InputLabel>
            <Controller
                name={name}
                control={control}
                defaultValue={defaultValue}
                render = {({field}) => (
                    <Select
                        fullWidth
                        label={label +" *"} 
                        value={field.value}
                        onChange={(e) => field.onChange(e.target.value)}
                        name={name}
                        defaultValue={defaultValue|| ''}
                    >
                        {/* <MenuItem value="">--Select--</MenuItem> */}
                        {options && options.length > 0 ? (
                            options.map((option) => (
                                <MenuItem key={option.value} value={option.value}>
                                    {option.label}
                                </MenuItem>
                            ))
                        ) :
                        (
                                <MenuItem value="">No options available</MenuItem>
                        )} 
                        
                    </Select>
                )}
                
            />
        </FormControl>
    </Box>

  );
}

 export default CustomSelect;


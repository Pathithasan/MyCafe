
import { useState } from "react";
import { Controller } from "react-hook-form";
import dayjs from "dayjs";
import localizedFormat from "dayjs/plugin/localizedFormat";
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import { TextField, FormControl } from "@mui/material";

dayjs.extend(localizedFormat);

function DatePickerField({ name, control, defaultValue, label }) {
  const [value, setValue] = useState(defaultValue);

  return (
    <FormControl sx={{ minWidth: 120 , mb:1 }} fullWidth>
        <Controller
        name={name}
        control={control}
        defaultValue={defaultValue}
        render={({ field }) => (
            <LocalizationProvider dateAdapter={AdapterDayjs} >
            <DatePicker
                // fullWidth
                sx={{mt:"1rem"}}
                label={label + " *"}
                value={value}
            
                onChange={(newValue) => {
                    const formattedDate = newValue.format("YYYY-MM-DD");
                    setValue(formattedDate);
                    field.onChange(formattedDate);
                }}
                inputFormat="YYYY-MM-DD"
                renderInput={(params) => (
                <TextField {...params} margin="normal" variant="outlined" />
                )}
            />
            </LocalizationProvider>
        )}
        />
        <></>
    </FormControl>
  );
}

export default DatePickerField;

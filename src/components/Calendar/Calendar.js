import React from 'react'
import {CalendarPicker, LocalizationProvider} from '@mui/lab';
import AdapterDateFns from '@mui/lab/AdapterDateFns';
import Grid from '@mui/material/Grid';
import {ThemeProvider, createTheme, styled} from "@mui/material";
import {orange} from "@mui/material/colors";

const theme = createTheme()

const StyledCalendar = styled(CalendarPicker)(({theme}) => ({
  ...theme,
  color: orange[400],
  '.MuiPickersDay-root:hover': {
    backgroundColor: orange[100] + '!important'
  },
  '.Mui-selected': {
    backgroundColor: orange[400] + '!important'
  },
  '.MuiPickersDay-today': {
    border: `1px solid ${orange[200]} !important`
  }
}))

export default function Calendar(props) {
  return (
    <LocalizationProvider dateAdapter={AdapterDateFns}>
      <Grid container spacing={3}>
        <Grid item xs={12} md={12}>
          <StyledCalendar date={props.value} onChange={(newDate) => props.onChange(newDate)}/>
        </Grid>
      </Grid>
    </LocalizationProvider>
  )
}
import React from 'react';
import { TextField } from '@mui/material';

export default function FormInput({ name, label, value, onChange, type = 'text', ...rest }) {
  return (
    <TextField
      fullWidth
      name={name}
      label={label}
      value={value}
      onChange={onChange}
      type={type}
      variant="outlined"
      margin="normal"
      {...rest}
    />
  );
}

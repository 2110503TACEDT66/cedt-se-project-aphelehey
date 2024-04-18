"use client"
import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import {
  TextField,
  Button,
  Grid,
  Typography,
  FormControlLabel,
  Checkbox,
} from '@mui/material'; // Material-UI components

interface Address {
  firstName: string;
  lastName: string;
  addressLine1: string;
  addressLine2: string; // Optional
  city: string;
  state: string;
  postalCode: string;
  country: string;
  isDefault: boolean;
}

const AddressForm: React.FC = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<Address>();
  const [submitted, setSubmitted] = useState(false);

  const onSubmit = (data: Address) => {
    setSubmitted(true);
    // Simulate form submission (replace with your actual logic)
    console.log('Submitted address data:', data);
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <Grid container spacing={2}>
        <Grid item xs={6}>
          <TextField
            {...register('firstName', { required: true })}
            error={!!errors.firstName}
            helperText={errors.firstName?.message}
            label="First Name"
            fullWidth
            autoFocus
            style={{ marginRight: 10 }} // Inline style for margin
          />
        </Grid>
        <Grid item xs={6}>
          <TextField
            {...register('lastName', { required: true })}
            error={!!errors.lastName}
            helperText={errors.lastName?.message}
            label="Last Name"
            fullWidth
            style={{ marginBottom: 15 }} // Inline style for margin
          />
        </Grid>
        <Grid item xs={12}>
          <TextField
            {...register('addressLine1', { required: true })}
            error={!!errors.addressLine1}
            helperText={errors.addressLine1?.message}
            label="Address Line 1"
            fullWidth
          />
        </Grid>
        <Grid item xs={12}>
          <TextField
            {...register('addressLine2')} // Optional field, no validation
            label="Address Line 2 (Optional)"
            fullWidth
          />
        </Grid>
        <Grid item xs={6}>
          <TextField
            {...register('city', { required: true })}
            error={!!errors.city}
            helperText={errors.city?.message}
            label="City"
            fullWidth
          />
        </Grid>
        <Grid item xs={3}>
          <TextField
            {...register('state', { required: true })}
            error={!!errors.state}
            helperText={errors.state?.message}
            label="State"
            fullWidth
          />
        </Grid>
        <Grid item xs={3}>
          <TextField
            {...register('postalCode', { required: true })}
            error={!!errors.postalCode}
            helperText={errors.postalCode?.message}
            label="Postal Code"
            fullWidth
          />
        </Grid>
        <Grid item xs={12}>
          <TextField
            {...register('country', { required: true })}
            error={!!errors.country}
            helperText={errors.country?.message}
            label="Country"
            fullWidth
          />
        </Grid>
        <Grid item xs={12}>
          <FormControlLabel
            control={<Checkbox {...register('isDefault')} />}
            label="Set as Default Address"
            style={{ marginBottom: 15 }} // Inline style for margin
          />
        </Grid>
        <Grid item xs={12}>
          {submitted ? (
            <Typography variant="body1" style={{ color: 'green' }}>
              Address submitted successfully!
            </Typography>
          ) : (
            <Button variant="contained" type="submit">
              Add Address
            </Button>
          )}
        </Grid>
      </Grid>
    </form>
  );
};

export default AddressForm;

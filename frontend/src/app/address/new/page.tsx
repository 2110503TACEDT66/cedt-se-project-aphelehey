'use client'
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
  address: string ;
  district: string ;
  province: string ;
  postalcode: string ;
  region: string ;
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
    <form onSubmit={handleSubmit(onSubmit)} style={{ backgroundColor: 'white' }}>
      <Grid container spacing={2}>
        <Grid item xs={12}>
          <TextField
            {...register('address', { required: true })}
            error={!!errors.address}
            helperText={errors.address?.message}
            label="Address"
            fullWidth
          />
        </Grid>
        <Grid item xs={6}>
          <TextField
            {...register('district', { required: true })}
            error={!!errors.district}
            helperText={errors.district?.message}
            label="District"
            fullWidth
          />
        </Grid>
        <Grid item xs={3}>
          <TextField
            {...register('province', { required: true })}
            error={!!errors.province}
            helperText={errors.province?.message}
            label="Province"
            fullWidth
          />
        </Grid>
        <Grid item xs={3}>
          <TextField
            {...register('postalcode', { required: true })}
            error={!!errors.postalcode}
            helperText={errors.postalcode?.message}
            label="Postal Code"
            fullWidth
          />
        </Grid>
        <Grid item xs={12}>
          <TextField
            {...register('region', { required: true })}
            error={!!errors.region}
            helperText={errors.region?.message}
            label="Region"
            fullWidth
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

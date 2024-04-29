"use client"
import React, { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import {
  TextField,
  Button,
  Grid,
  Typography,
  FormControlLabel,
  Checkbox,
} from '@mui/material'; // Material-UI components
import createNewAddress from '@/libs/newUserAddresses'; // Assuming this imports the backend function
import { authOptions } from '@/app/api/auth/[...nextauth]/route';
import { getServerSession } from 'next-auth';
import { useSession } from 'next-auth/react';

interface UserAddress {
  address: string;
  district: string;
  province: string;
  postalcode: string;
  region: string;
}

const AddressForm: React.FC =  () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<UserAddress>();
  const [submitted, setSubmitted] = useState(false);
  const [userToken, setUserToken] = useState<string | null>(null); // State to store user token
  const { data: session } = useSession();
  const token = session?.user.token;
  
  const onSubmit =  (data: UserAddress) => {
    setSubmitted(true);

    try {
      const response =  createNewAddress(data, token); // Pass userToken if available
      console.log('Address created successfully:', response);

      // Handle successful submission (e.g., clear form, show success message)
      // You can customize this based on your backend response and UI requirements
      setSubmitted(false); // Reset form state for new submissions
    } catch (error) {
      console.error('Error creating address:', error);

      // Handle errors appropriately (e.g., display an error message to the user)
      // You can add error handling logic here, such as setting an error state
      // to display an error message to the user.
    }
  };

  return (
    <form className=' p-10' onSubmit={handleSubmit(onSubmit)} style={{ backgroundColor: 'white' }}>
      <Grid container spacing={2}>
        <Grid item xs={12}>
          <TextField data-testid="add"
            {...register('address', { required: true })}
            error={!!errors.address}
            helperText={errors.address?.message}
            label="Address"
            fullWidth
          />
        </Grid>
        <Grid item xs={6}>
          <TextField data-testid="dis"
            {...register('district', { required: true })}
            error={!!errors.district}
            helperText={errors.district?.message}
            label="District"
            fullWidth
          />
        </Grid>
        <Grid item xs={3}>
          <TextField data-testid="pro"
            {...register('province', { required: true })}
            error={!!errors.province}
            helperText={errors.province?.message}
            label="Province"
            fullWidth
          />
        </Grid>
        <Grid item xs={3}>
          <TextField data-testid="pos"
            {...register('postalcode', { required: true })}
            error={!!errors.postalcode}
            helperText={errors.postalcode?.message}
            label="Postal Code"
            fullWidth
          />
        </Grid>
        <Grid item xs={12}>
          <TextField data-testid="reg"
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
            <Button variant="contained" type="submit" >
              Add Address
            </Button>
          )}
        </Grid>
      </Grid>
    </form>
  );
};

export default AddressForm;

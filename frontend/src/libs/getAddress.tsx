import axios from 'axios';

interface Address {
  address: string;
  district: string;
  province: string;
  postalcode: string;
  region: string;
}

// Assuming your backend API endpoint for fetching addresses
const ADDRESS_API_URL = '/api/v1/user/addresses';

export const getAddress = async (token: string): Promise<Address[] | undefined> => {
  try {
    const response = await axios.get(ADDRESS_API_URL, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    if (response.status === 200) {
      // Assuming your backend returns an array of addresses
      return response.data as Address[];
    } else {
      console.error('Error fetching user addresses:', response.statusText);
      return undefined; // Handle errors gracefully (e.g., display error message to user)
    }
  } catch (error) {
    console.error('Error fetching user addresses:', error);
    return undefined; // Handle errors gracefully
  }
};

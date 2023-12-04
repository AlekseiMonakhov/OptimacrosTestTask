import { program } from 'commander';
import dotenv from 'dotenv';    
import axios, { AxiosError } from 'axios';

dotenv.config();

const apiUri = process.env.API_URI;

program.version('1.0.0');

const getAuthHeader = (username: string, password: string) => {
  const token = Buffer.from(`${username}:${password}`).toString('base64');
  return { Authorization: `Basic ${token}` };
};

const handleError = (error: unknown) => {
  if (axios.isAxiosError(error)) {
    console.error('Error making request:', error.response?.data || error.message);
  } else if (error instanceof Error) {
    console.error('Error:', error.message);
  } else {
    console.error('An unknown error occurred');
  }
};

program
  .command('list-cars <username> <password>')
  .description('List all cars')
  .action(async (username, password) => {
    try {
      const headers = getAuthHeader(username, password);
      const response = await axios.get(`${apiUri}/cars`, { headers });
      console.log('Cars:', response.data);
    } catch (error) {
      handleError(error);
    }
  });

program
  .command('list-cars-by-brand <brand> <username> <password>')
  .description('List cars by brand')
  .action(async (brand, username, password) => {
    try {
      const headers = getAuthHeader(username, password);
      const response = await axios.get(`${apiUri}/cars/brand/${brand}`, { headers });
      console.log(`Cars by brand ${brand}:`, response.data);
    } catch (error) {
      handleError(error);
    }
  });

program
  .command('add-car <brand> <name> <yearOfManufacture> <price> <username> <password>')
  .description('Add a new car')
  .action(async (brand, name, yearOfManufacture, price, username, password) => {
    try {
      const headers = getAuthHeader(username, password);
      const response = await axios.post(`${apiUri}/cars`, { brand, name, yearOfManufacture, price }, { headers });
      console.log('Car added:', response.data);
    } catch (error) {
      handleError(error);
    }
  });

program
  .command('update-car <id> <brand> <name> <yearOfManufacture> <price> <username> <password>')
  .description('Update an existing car')
  .action(async (id, brand, name, yearOfManufacture, price, username, password) => {
    try {
      const headers = getAuthHeader(username, password);
      const response = await axios.put(`${apiUri}/cars/${id}`, { brand, name, yearOfManufacture, price }, { headers });
      console.log('Car updated:', response.data);
    } catch (error) {
      handleError(error);
    }
  });

program
  .command('delete-car <id> <username> <password>')
  .description('Delete a car')
  .action(async (id, username, password) => {
    try {
      const headers = getAuthHeader(username, password);
      await axios.delete(`${apiUri}/cars/${id}`, { headers });
      console.log('Car deleted');
    } catch (error) {
      handleError(error);
    }
  });

program.parse(process.argv);

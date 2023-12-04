import { Router } from 'express';
import CarController from '../controllers/carController';

const carsRouter = Router();

carsRouter.get('/cars', CarController.getAllCars);
carsRouter.get('/cars/brand/:brand', CarController.getCarByBrand);
carsRouter.post('/cars', CarController.addCar);
carsRouter.put('/cars/:id', CarController.updateCar);
carsRouter.delete('/cars/:id', CarController.deleteCar);

export default carsRouter;

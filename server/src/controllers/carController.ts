import { Request, Response } from 'express';
import CarService from '../services/carService';

class CarController {
  async getAllCars(req: Request, res: Response) {
    const cars = await CarService.getAllCars();
    res.json(cars);
  }

  async getCarByBrand(req: Request, res: Response) {
    const cars = await CarService.getCarByBrand(req.params.brand);
    res.json(cars);
  }

  async addCar(req: Request, res: Response) {
    const car = await CarService.addCar(req.body);
    res.status(201).json(car);
  }

  async updateCar(req: Request, res: Response) {
    const car = await CarService.updateCar(req.params.id, req.body);
    res.json(car);
  }

  async deleteCar(req: Request, res: Response) {
    await CarService.deleteCar(req.params.id);
    res.status(204).send();
  }
}

export default new CarController();

import { CarModel, ICar } from '../models/carModel';

class CarService {
  async getAllCars(): Promise<ICar[]> {
    return await CarModel.find({});
  }

  async getCarByBrand(brand: string): Promise<ICar[]> {
    return await CarModel.find({ brand });
  }

  async addCar(carData: ICar): Promise<ICar> {
    const car = new CarModel(carData);
    return await car.save();
  }

  async updateCar(id: string, carData: Partial<ICar>): Promise<ICar | null> { 
    return await CarModel.findByIdAndUpdate(id, carData, { new: true });
  }

  async deleteCar(id: string): Promise<ICar | null> {
    const carToDelete = await CarModel.findById(id);
    if (carToDelete) {
      await CarModel.deleteOne({ _id: id });
    }
    return carToDelete;
  }
}

export default new CarService();

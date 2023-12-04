import mongoose from 'mongoose';
import { MongoMemoryServer } from 'mongodb-memory-server';
import CarService from './carService'; 
import { CarModel, ICar } from '../models/carModel';

describe('CarService', () => {
  let mongoServer: MongoMemoryServer;

  beforeAll(async () => {
    mongoServer = await MongoMemoryServer.create();
    const uri = mongoServer.getUri();
    await mongoose.connect(uri);
  });

  afterAll(async () => {
    await mongoose.disconnect();
    await mongoServer.stop();
  });

  beforeEach(async () => {
    await CarModel.deleteMany({});
  });

  describe('getAllCars', () => {
    it('should return an empty array if no cars are present', async () => {
      const cars = await CarService.getAllCars();
      expect(cars).toEqual([]);
    });

    it('should return all cars', async () => {
      const car1: ICar = new CarModel({ brand: 'Toyota', name: 'Corolla', yearOfManufacture: 2020, price: 20000 });
      const car2: ICar = new CarModel({ brand: 'Honda', name: 'Civic', yearOfManufacture: 2019, price: 18000 });
      await car1.save();
      await car2.save();

      const cars = await CarService.getAllCars();
      expect(cars.length).toBe(2);
    });
  });

  describe('getCarByBrand', () => {
    it('should return an empty array if no cars with the brand are present', async () => {
      const cars = await CarService.getCarByBrand('Tesla');
      expect(cars).toEqual([]);
    });

    it('should return cars with the specified brand', async () => {
      const car1: ICar = new CarModel({ brand: 'Tesla', name: 'Model S', yearOfManufacture: 2021, price: 50000 });
      await car1.save();

      const cars = await CarService.getCarByBrand('Tesla');
      expect(cars.length).toBe(1);
      expect(cars[0].brand).toBe('Tesla');
    });
  });

  describe('addCar', () => {
    it('should add a new car', async () => {
      const newCarData = { brand: 'Ford', name: 'Mustang', yearOfManufacture: 2022, price: 35000 };
      const newCar: ICar = new CarModel(newCarData);
      const savedCar = await CarService.addCar(newCar);
  
      expect(savedCar._id).toBeDefined();
      expect(savedCar.brand).toBe(newCar.brand);
      expect(savedCar.name).toBe(newCar.name);
      expect(savedCar.yearOfManufacture).toBe(newCar.yearOfManufacture);
      expect(savedCar.price).toBe(newCar.price);
    });
  });

  describe('updateCar', () => {
    it('should return null if the car does not exist', async () => {
      const updatedCar = await CarService.updateCar(new mongoose.Types.ObjectId().toString(), { name: 'Updated Name' });
      expect(updatedCar).toBeNull();
    });

    it('should update the car details', async () => {
        const car: ICar = new CarModel({ brand: 'BMW', name: 'X5', yearOfManufacture: 2021, price: 60000 });
        await car.save();
    
        const updatedCar = await CarService.updateCar(car._id.toString(), { name: 'X6' });
        
        if (updatedCar) {
          expect(updatedCar.name).toBe('X6');
        } else {
          fail('Updated car is null');
        }
      });
    });

  describe('deleteCar', () => {
    it('should return null if the car does not exist', async () => {
      const deletedCar = await CarService.deleteCar(new mongoose.Types.ObjectId().toString());
      expect(deletedCar).toBeNull();
    });

    it('should delete the car', async () => {
        const car: ICar = new CarModel({ brand: 'Audi', name: 'A4', yearOfManufacture: 2022, price: 40000 });
        await car.save();
    
        const deletedCar = await CarService.deleteCar(car._id.toString());
        
        if (deletedCar) {
          expect(deletedCar._id).toEqual(car._id);
        } else {
          fail('Deleted car is null');
        }
    
        const foundCar = await CarModel.findById(car._id);
        expect(foundCar).toBeNull();
      });
    });
});

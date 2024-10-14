export interface Manufacturer {
  name: string;
  founded: string;
  headquarters: string;
}

export interface FuelEfficiency {
  city: string;
  highway: string;
}

export interface CarDetailsType {
  id: number;
  name: string;
  manufacturer: Manufacturer;
  details: {
    type: string;
    engine: string;
    horsepower: number;
    torque: string;
    transmission: string;
    drivetrain: string;
    fuelEfficiency: FuelEfficiency;
    cargoSpace: string;
    towingCapacity: string;
    price: string;
    safetyRating: string;
    technology: string[];
  };
  images: string[];
  reviews: {
    user: string;
    rating: number;
    comment: string;
    date: string;
  }[];
}

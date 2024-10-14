import { CarDetailsType } from "./detail-data-type";

const DetailSpecs: React.FC<{ car: CarDetailsType }> = ({ car }) => {
  return (
    <div className="flex flex-col items-start pb-8">
      <h1 className="text-2xl text-black font-semibold mb-4 ">
        {car.name} {car.manufacturer.name} {car.manufacturer.founded}
      </h1>
      <h3 className="text-black mb-3">{car.manufacturer.headquarters}</h3>
      <div className="text-black font-semibold text-2xl mb-6">
        {car.details.price}
      </div>
      <div
        className="flex sm:flex-col md:flex-row lg:flex-row xl:flex-row 2xl:flex-row"
      >
        <div className="flex flex-col text-black items-start mr-4 text-left">
          <h3 className="text-2xl font-semibold">Details</h3>
          <p>Type: {car.details.type}</p>
          <p>Engine: {car.details.engine}</p>
          <p>Horsepower: {car.details.horsepower}</p>
          <p>Torque: {car.details.torque}</p>
          <p>Transmission: {car.details.transmission}</p>
        </div>

        <div className="flex flex-col text-black items-start">
          <h4 className="mt-2 font-semibold">Technology Features:</h4>
          <ul className=" list-inside list-none text-left">
            {car.details.technology.map((feature, index) => (
              <li key={index}>{feature}</li>
            ))}
          </ul>
        </div>
      </div>
      <div className="flex w-full justify-between mt-4">
        <div className="text-black cursor-pointer mt-4 font-bold">
          See more...
        </div>
        <button className=" buy-button mt-2 fill-gray-400">Buy</button>
      </div>
    </div>
  );
};

export default DetailSpecs;

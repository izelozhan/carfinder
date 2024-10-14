import { Suspense } from "react";
import LineChart from "../chart/line-chart";
import { CarDetailsType } from "./detail-data-type";

const DetailBottomSection: React.FC<{
  car: CarDetailsType;
  renderChart: boolean;
}> = ({ car, renderChart }) => {
  return (
    <div
      className="flex
          mt-6
          flex-col md:flex-row lg:flex-row xl:flex-row 2xl:flex-row
          ml-auto mr-auto items-stretch"
    >
      <div
        className="flex flex-col text-black items-start sm:mr-0
            md:mr-4
            lg:mr-4
            xl:mr-4
            2xl:mr-4   
            sm:w-full
            md:w-1/2
            lg:w-1/2
            xl:w-1/2
            2xl:w-1/2
            rounded-3xl"
      >
        <div className="text-white text-center uppercase w-full mb-2">
          Price Changes
        </div>
        <div className="bg-white rounded-3xl w-full mb-4">
          {renderChart && (
            <Suspense fallback={<div>Loading Chart...</div>}>
              <LineChart />
            </Suspense>
          )}
        </div>
      </div>
      <div
        className="flex flex-col text-black items-start 
            sm:w-full
            md:w-1/2
            lg:w-1/2
            xl:w-1/2
            2xl:w-1/2
            rounded-3xl"
      >
        <div className="text-white text-center uppercase w-full mb-2">
          Reviews
        </div>

        {car.reviews.map((review, index) => (
          <div
            key={index}
            className="shadow-md rounded-3xl flex flex-col bg-white w-full pl-6 pr-4 pt-4 pb-5 mb-3"
          >
            <div className="flex flex-row justify-between">
              <div className="text-base text-left">
                <div className="text-gray-500 text-sm">
                  {new Date(review.date).toLocaleDateString()}
                </div>
                <div className="font-semibold">{review.user}</div>
              </div>
              <div className="text-yellow-500 text-base">
                {"★".repeat(review.rating) + "☆".repeat(5 - review.rating)}
              </div>
            </div>
            <div className="text-left flex text-sm">{review.comment}</div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default DetailBottomSection;

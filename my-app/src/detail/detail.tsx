import React, { useEffect, useState } from "react";
import { CarDetailsType } from "./detail-data-type";
import { useNavigate, useParams } from "react-router-dom";
import env from "../environment";
import "./detail.css";
import { FaArrowLeft } from "react-icons/fa6";
import { FaArrowRight } from "react-icons/fa6";
import toast from "react-simple-toasts";
import DetailSpecs from "./details-specs";
import DetailBottomSection from "./bottom-section";

const Details: React.FC = () => {
  const [car, setCar] = useState<CarDetailsType | null>(null);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const navigate = useNavigate();
  const { name } = useParams();
  const [renderChart, setRenderChart] = useState(false);
  
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(`${env.apiUrl}/details/${name}`, {
          method: "GET",
          headers: {
            "content-type": "application/json",
          },
        });
        const data: CarDetailsType = await response.json();
        setCar(data); // Assuming you only want the first car
        setTimeout(() => {
          setRenderChart(true);
        }, 300);
      } catch (ex) {
        toast("An error occured while fetching car details.", 2000000);
        console.log(ex);
      }
    };

    fetchData();
  }, [name]);

  if (!car) {
    return <div>Loading...</div>;
  }

  const handleImageChange = (index: number) => {
    setCurrentImageIndex(index);
  };

  return (
    <div className="flex flex-col">
      <div>
        <button onClick={() => navigate(-1)} className="mb-5 startOverButton">
          Didn't like it? Start over
        </button>
      </div>

      <div className="ml-4 mr-4">
        {/* top section */}
        <div
          className="bg-white 
          flex
          xs:flex-col
          sm:flex-col
          md:flex-row
          lg:flex-row
          xl:flex-row
          2xl:flex-row
        
        
          ml-auto mr-auto rounded-3xl pt-6 pl-10 pr-10"
        >
          {/* left side image  */}
          <div
            className="flex flex-col
            md:mr-14
            lg:mr-14
            xl:mr-14
            2xl:mr-14
          "
          >
            <div className="mb-3 ">
              <div
                style={{
                  backgroundImage: `url(${car.images[currentImageIndex]})`,
                }}
                className="w-full h-[325px] bg-contain bg-center bg-no-repeat"
              ></div>
            </div>
            <div className="flex justify-between pb-6">
              <div className="flex items-center cursor-pointer">
                <FaArrowLeft
                  onClick={() =>
                    setCurrentImageIndex(
                      currentImageIndex == 0
                        ? car.images.length - 1
                        : currentImageIndex - 1
                    )
                  }
                  style={{ color: "black" }}
                />
              </div>

              <div className="flex flex-row ml-2 mr-2 ">
                {car.images.map((image, index) => (
                  <img
                    key={index}
                    src={image}
                    alt={car.name}
                    className="w-24 h-16 object-cover cursor-pointer rounded-2xl"
                    onClick={() => handleImageChange(index)}
                  />
                ))}
              </div>
              <div className="flex items-center cursor-pointer">
                <FaArrowRight
                  onClick={() =>
                    setCurrentImageIndex(
                      currentImageIndex == car.images.length - 1
                        ? 0
                        : currentImageIndex + 1
                    )
                  }
                  style={{ color: "black" }}
                />
              </div>
            </div>
          </div>

          {/* right side contents */}
          <DetailSpecs car={car}/>
        </div>
        {/* bottom section */}
        <DetailBottomSection car={car} renderChart={renderChart} />
      </div>
    </div>
  );
};

export default Details;

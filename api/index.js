const express = require("express");
const http = require("http");
const cors = require("cors");
const app = express();
app.use(express.json());
app.use(cors());


//returns mock data when user searches for a car
app.get("/search", (req, res) => {
  const response = [
    {
      description: "Toyota Tacoma TRD Off Road Double Cab RWD",
      id: 0,
      name: "Toyota Tacoma TRD Off Road Double Cab RWD",
      bodyType: ["Tacoma"],
      image:
        "https://vehicle-images.dealerinspire.com/918b-110007412/5TFCZ5ANXLX218095/44a0a527c8dfba6659ca6be1f1d28161.jpg",
      year: 2023,
    },
    {
      description: "Chevrolet Silverado 1500 LT Crew Cab RWD",
      id: 1,
      name: "Chevrolet Silverado 1500 LT Crew Cab RWD",
      bodyType: ["Silverado"],
      image:
        "https://vehicle-images.dealerinspire.com/7eda-110007045/1GCPWCED7MZ264490/e26f391167b51203fea86cad4d8aceaf.jpg",
      year: 2012,
    },
    {
      description: "Nissan Frontier SV Crew Cab LB RWD",
      id: 2,
      name: "Nissan Frontier SV Crew Cab LB RWD",
      bodyType: ["Frontier"],
      image:
        "https://vehicle-images.dealerinspire.com/2a55-110005806/1N6ED1EK8RN624491/3cf735fed25bdc5f2184f97a54c9f855.jpg",
      year: 2022,
    },
  ];
  res.status(200).json(response);
});

//returns mock details
app.get("/details/:carName", (req, res) => {
  res.status(200).json({
    id: 1,
    name: "Range Rover",
    manufacturer: {
      name: "Land Rover",
      founded: "2023",
      headquarters: "Katy, TX (25 Miles Away)",
    },
    details: {
      type: "Luxury SUV",
      engine: "3.0L Inline-6 Turbocharged",
      horsepower: 395,
      torque: "406 lb-ft",
      transmission: "8-Speed Automatic",
      drivetrain: "AWD",
      fuelEfficiency: {
        city: "18 mpg",
        highway: "24 mpg",
      },
      cargoSpace: "34.5 cubic feet",
      towingCapacity: "8,200 lbs",
      price: "$92,000",
      safetyRating: "5 stars",
      technology: [
        "Touch Pro Duo infotainment system",
        "Adaptive cruise control",
        "Lane departure warning",
        "360-degree camera system",
        "Blind-spot monitoring",
      ],
    },
    images: [
      "https://images.dealer.com/ddc/vehicles/2025/Land%20Rover/Range%20Rover%20Sport/SUV/color/Fuji%20White-1AA-218,219,217-640-en_US.jpg",
      "https://pictures.dealer.com/l/landroverlarchmontnewrochellelr/1400/8f6c0846bac020547bc8abe5083be821x.jpg",
      "https://pictures.dealer.com/l/landroverlarchmontnewrochellelr/1441/5ce32074cd489850a886a2801efb1c72x.jpg",
    ],
    reviews: [
      {
        user: "John Doe",
        rating: 5,
        comment: "Absolutely stunning vehicle with unmatched luxury!",
        date: "2023-09-01",
      },
      {
        user: "Jane Smith",
        rating: 4,
        comment: "Great performance but a bit pricey.",
        date: "2023-09-15",
      },
      {
        user: "Emily Johnson",
        rating: 5,
        comment: "The comfort and features are worth every penny.",
        date: "2023-09-20",
      },
    ],
  });
});

//returns found car name given the reviews
app.post("/find", (req,res) => {
  res.status(200).json({
    foundCarName: 'range-rover',
  })
});

//empty endpoint
app.get("/", (req, res) => {
  res.json({ message: "API is working!" });
});

const server = http.createServer(app);
const PORT = process.env.PORT || 3000;
server.listen(PORT, () => {
  console.log(`api running on http://localhost:${PORT}`);
});
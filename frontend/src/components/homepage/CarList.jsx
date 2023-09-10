import axios from "axios";
import { useEffect, useState } from "react";

export const CarList = () => {
  const [cars, setCars] = useState([]);
  useEffect(() => {
    axios.get(import.meta.env.VITE_BACKEND_URL + "/cars").then(({ data }) => {
      console.log(data);
      setCars(data.data);
    });
  }, []);

  console.log(cars);

  return (
    <>
      <section className="bg-blue-50 ">
        <div className="py-8 px-4 mx-auto max-w-screen-xl lg:py-16 lg:px-6 ">
          <div className="mx-auto max-w-screen-sm text-center mb-8 lg:mb-16">
            <h2 className="mb-4 text-4xl tracking-tight font-extrabold text-gray-900">
              Our Cars
            </h2>
            <p className="font-light text-gray-500 lg:mb-16 sm:text-xl">
              Explore the whole collection of cars and choose the right one for
              you
            </p>
          </div>
          <div className="grid gap-8 mb-6 lg:mb-16 md:grid-cols-2">
            {cars.map((car, index) => {
              return (
                <div
                  key={index}
                  className="items-center bg-gray-50 rounded-lg shadow sm:flex"
                >
                  <a href="#">
                    <img
                      className="w-full rounded-lg sm:rounded-none sm:rounded-l-lg"
                      src="https://flowbite.s3.amazonaws.com/blocks/marketing-ui/avatars/sofia-mcguire.png"
                      alt="Sofia Avatar"
                    />
                  </a>
                  <div className="p-5">
                    <h2 className="text-2xl font-bold tracking-tight text-gray-900 mb-2">
                      <a href="#">{car.name}</a>
                    </h2>
                    <span className="bg-blue-100 py-1 px-2 text-xs uppercase rounded font-bold text-black">
                      {car.manufacture}
                    </span>
                    <br />
                    <span className="text-gray-500">Model: {car.model}</span>
                    <p className="mt-3 mb-4 font-semibold text-gray-500">
                      {car.description}
                    </p>
                    <h2 className="text-xl font-bold tracking-tight text-gray-900">
                      Rs.{car.price}
                    </h2>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>
    </>
  );
};

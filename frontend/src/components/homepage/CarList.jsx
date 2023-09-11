import axios from "axios";
import { useEffect, useState } from "react";

export const CarList = () => {
  const [cars, setCars] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [filteredCars, setFilteredCars] = useState([]);

  useEffect(() => {
    //get cars form the server
    axios.get(import.meta.env.VITE_BACKEND_URL + "/cars").then(({ data }) => {
      setCars(data.data);
      setFilteredCars(data.data);
    });
  }, []);

  useEffect(() => {
    //DEBOUNCING - filters the list on each key press but skips filtering if the time difference is less than 200 milli seconds
    const timer = setTimeout(() => {
      if (searchTerm.length === 0) {
        return;
      }
      handleSearch();
    }, 200);

    if (searchTerm.length === 0) {
      setFilteredCars(cars);
    }
    return () => clearTimeout(timer);
  }, [searchTerm]);

  //handle search
  const handleSearch = () => {
    let filtered = cars.filter(function (car) {
      return (
        car.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        car.manufacture.toLowerCase().includes(searchTerm.toLowerCase()) ||
        car.model.toString().includes(searchTerm.toLowerCase())
      );
    });
    setFilteredCars(filtered);
  };

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

          <div className="flex items-center mb-12 w-2/3 mx-auto">
            <div className="relative w-full">
              <input
                type="text"
                id="simple-search"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 
                focus:border-blue-500 block w-full pl-10 p-2.5 "
                placeholder="Search car name..."
                required
              />
            </div>
            <button
              onClick={handleSearch}
              className="p-2.5 ml-2 text-sm font-medium text-white bg-blue-700 rounded-lg border border-blue-700
               hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300"
            >
              <svg
                className="w-4 h-4"
                aria-hidden="true"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 20 20"
              >
                <path
                  stroke="currentColor"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="m19 19-4-4m0-7A7 7 0 1 1 1 8a7 7 0 0 1 14 0Z"
                />
              </svg>
              <span className="sr-only">Search</span>
            </button>
          </div>

          <div className="grid gap-8 mb-6 lg:mb-16 md:grid-cols-2">
            {filteredCars.map((car, index) => {
              return (
                <div
                  key={index}
                  className="items-center bg-gray-50 rounded-lg shadow sm:flex"
                >
                  <a href="#">
                    <img
                      className="w-full rounded-lg sm:rounded-none sm:rounded-l-lg"
                      src={
                        car.secondaryImages[0]
                          ? `${import.meta.env.VITE_BACKEND_URL}/uploads/${
                              car.secondaryImages[0]
                            }`
                          : "../../../public/img/placeholder.png"
                      }
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

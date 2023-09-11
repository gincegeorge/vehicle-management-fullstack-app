import { Link, useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { useEffect, useState } from "react";
import axios from "axios";
import Cookies from "universal-cookie";
import Swal from "sweetalert2";

function Dashboard() {
  const cookies = new Cookies();
  const Navigate = useNavigate();
  const isLoggedIn = useSelector((store) => store.user.isLoggedIn);

  const [cars, setCars] = useState([]);
  const [refreshCars, setRefreshCars] = useState(false);

  if (isLoggedIn === false) {
    Navigate("/login");
  }

  useEffect(() => {
    //verify user start
    const cookie = cookies.get("jwt-user");

    (async function verifyUser() {
      try {
        const { data } = await axios.post(
          import.meta.env.VITE_BACKEND_URL + "/auth/verify",
          {
            cookie: cookie,
          }
        );
        if (!data.isVerified) {
          cookies.remove("jwt-user");
          Navigate("/login");
        }
      } catch (error) {
        if (!error.response.data.isVerified) {
          cookies.remove("jwt-user");
          Navigate("/login");
        }
      }
      //verify user end
    })();
  }, []);

  useEffect(() => {
    //get car details
    axios.get(import.meta.env.VITE_BACKEND_URL + "/cars").then(({ data }) => {
      setCars(data.data);
    });
  }, [refreshCars]);

  //handleDelete
  const handleDelete = (e) => {
    Swal.fire({
      title: "Do you want to delete this car?",
      showCancelButton: true,
    }).then((result) => {
      if (result.isConfirmed) {
        axios
          .delete(
            import.meta.env.VITE_BACKEND_URL + `/cars/delete/${e.target.id}`
          )
          .then(({ data }) => {
            if (data.success) {
              setRefreshCars(!refreshCars);
              Swal.fire(`Deleted`);
            }
          });
      }
    });
  };

  return (
    <div>
      <section className="bg-gray-50">
        <div className="flex flex-col items-center px-6 py-28 min-h-screen mx-auto ">
          <h1 className=" text-2xl">Admin Dashboard</h1>
          <div className="m-4">

            <Link
              className="py-1 px-2 block text-white rounded bg-primary-700"
              to="cars/add"
            >
              Add new car
            </Link>
          </div>

          <div className="relative overflow-x-auto shadow-md sm:rounded-lg w-[80%] mt-5">
            <table className="w-full text-sm text-left text-gray-500 ">
              <thead className="text-xs text-gray-700 uppercase bg-gray-50 ">
                <tr>
                  <th scope="col" className="px-6 py-3">
                    Car name
                  </th>
                  <th scope="col" className="px-6 py-3">
                    Manufature
                  </th>
                  <th scope="col" className="px-6 py-3">
                    Model
                  </th>
                  <th scope="col" className="px-6 py-3">
                    Price
                  </th>
                  <th scope="col" className="px-6 py-3">
                    Action
                  </th>
                </tr>
              </thead>
              <tbody>
                {cars.map((car, index) => {
                  return (
                    <tr className="bg-white border-b" key={index}>
                      <th
                        scope="row"
                        className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap "
                      >
                        {car.name}
                      </th>
                      <td className="px-6 py-4">{car.manufacture}</td>
                      <td className="px-6 py-4">{car.model}</td>
                      <td className="px-6 py-4">Rs {car.price}</td>
                      <td className="px-6 py-4">
                        <Link
                          to={`/dashboard/cars/edit/${car._id}`}
                          className="font-medium text-blue-600 hover:underline mr-4"
                        >
                          Edit
                        </Link>
                        <Link
                          id={car._id}
                          onClick={handleDelete}
                          className="font-medium text-red-600 hover:underline"
                        >
                          Delete
                        </Link>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </div>
      </section>
    </div>
  );
}

export default Dashboard;

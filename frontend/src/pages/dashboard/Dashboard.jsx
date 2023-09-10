import { Link, useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { useEffect } from "react";
import axios from "axios";
import Cookies from "universal-cookie";

function Dashboard() {
  const cookies = new Cookies();
  const Navigate = useNavigate();
  const isLoggedIn = useSelector((store) => store.user.isLoggedIn);

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

  return (
    <div>
      <section className="bg-gray-50">
        <div className="flex flex-col items-center justify-center px-6 py-8 mx-auto md:h-screen lg:py-0">
          <h1 className=" text-2xl">user Dashboard</h1>
          <div className="m-4">
            <Link
              className="block py-2 pr-4 pl-3 text-white rounded bg-primary-700 lg:bg-transparent lg:text-primary-700 lg:p-0"
              to="cars/add"
            >
              Add new car
            </Link>
            <Link
              className="block py-2 pr-4 pl-3 text-white rounded bg-primary-700 lg:bg-transparent lg:text-primary-700 lg:p-0"
              to="cars/edit/:id"
            >
              Edit car
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}

export default Dashboard;

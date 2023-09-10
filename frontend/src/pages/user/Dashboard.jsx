import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { useEffect } from "react";
import axios from "axios";
import Cookies from "universal-cookie";

function Dashboard() {
  const cookies = new Cookies();
  const Navigate = useNavigate();
  const isLoggedIn = useSelector((store) => store.user.isLoggedIn);

  if (isLoggedIn === false) {
    Navigate("user/login");
  }

  useEffect(() => {
    const cookie = cookies.get("jwt-user");

    (async function verifyUser() {
      try {
        const { data } = await axios.post(
          import.meta.env.VITE_BACKEND_URL + "verify",
          {
            cookie: cookie,
          }
        );
        if (!data.isVerified) {
          cookies.remove("jwt-user");
          Navigate("/login");
        }
      } catch (error) {
        console.log("you have an error: ", error.message);
      }
    })();
  }, []);

  return (
    <div>
      <section className="bg-gray-50">
        <div className="flex flex-col items-center justify-center px-6 py-8 mx-auto md:h-screen lg:py-0">
          <h1 className=" text-2xl">user Dashboard</h1>
        </div>
      </section>
    </div>
  );
}

export default Dashboard;

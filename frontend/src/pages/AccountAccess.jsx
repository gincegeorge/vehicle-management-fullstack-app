import { Link } from "react-router-dom";

export const AccountAccess = () => {
  return (
    <div className="flex items-stretch relative">
      <div className=" flex bg-green-50 w-1/2 justify-center items-center px-[5%] text-center py-[15%]">
        <div>
          <span className="bg-green-600 py-1 px-2 text-xs uppercase rounded font-medium text-white">
            Login
          </span>
          <h1 className="font-medium text-3xl pt-3 pb-5">
            Existing<span className="text-green-800"> user?</span>
          </h1>
          <p className="mb-10">
            We are the market–leading car management platform.
          </p>
          <Link
            to="/login"
            className="text-white cursor-pointer bg-green-600 hover:bg-green-700 font-medium rounded-lg text-sm px-8 py-4 focus:outline-none"
          >
            Log in
          </Link>
        </div>
      </div>
      <div className="flex bg-blue-50 w-1/2 justify-center items-center px-[5%] text-center py-[15%]">
        <div>
          <span className="bg-blue-600 py-1 px-2 text-xs uppercase rounded font-medium text-white">
            Signup
          </span>
          <h1 className="font-medium text-3xl pt-3 pb-5">
            New<span className="text-blue-800"> user?</span>
          </h1>
          <p className="mb-10">
            We are the market–leading car management platform.
          </p>
          <Link
            to="/signup/"
            className="border-2 border-black cursor-pointer font-medium rounded-lg text-sm px-8 py-4 focus:outline-none"
          >
            Signup
          </Link>
        </div>
      </div>
    </div>
  );
};

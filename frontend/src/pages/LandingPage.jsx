import { CarList } from "../components/homepage/CarList";

const LandingPage = () => {

  return (
    <>
      <div className=" bg-green-50 w-full  justify-center items-center px-[5%] text-center py-[8%]">
        <div>
          <span className="bg-green-600 py-1 px-2 text-xs uppercase rounded font-medium text-white">
            business
          </span>
          <h1 className="font-medium text-3xl pt-3 pb-5">
            Welcome to <span className="text-green-800">Carwaala</span>
          </h1>
          <p className="mb-10">
            We are the market–leading technical interview platform to identify
            and hire developers with the right skills.
          </p>
        </div>
      </div>
      <CarList/>
    </>
  );
};

export default LandingPage;

import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
// import Cookies from "universal-cookie";
import { useFormik } from "formik";
import { useRef, useState } from "react";
import { toast } from "react-toastify";
import { carSchema } from "../../schemas/index";

const initialValues = {
  name: "",
  description: "",
  manufacture: "",
  price: null,
  model: null,
};

export const AddCar = () => {
  const Navigate = useNavigate();

  const {
    values,
    errors,
    handleBlur,
    touched,
    handleChange,
    handleSubmit,
    setValues,
  } = useFormik({
    initialValues,
    validationSchema: carSchema,
    onSubmit: async (values, action) => {
      console.log("values", values);
      try {
        const { data } = await axios.post(
          import.meta.env.VITE_BACKEND_URL + "api/update-profile",
          {
            ...values,
          }
        );

        console.log(data);

        if (data.updated === true) {
          action.resetForm();
          toast.success("Profile updated", {
            position: "bottom-center",
            autoClose: 600,
            hideProgressBar: true,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: "light",
          });
          Navigate("/dashboard");
        }
      } catch (err) {
        console.log(err.response.data);
        toast.warn("No changes to update", {
          position: "bottom-center",
          autoClose: 600,
          hideProgressBar: true,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "light",
        });
      }
    },
  });

  return (
    <section className="bg-gray-50 ">
      <div className="flex flex-col items-center justify-center px-6 py-16 mx-auto">
        <div className="w-full bg-white rounded-lg shadow max-w-screen-md">
          <div className="p-6 space-y-4 md:space-y-6 sm:p-8">
            <h1 className="text-xl font-bold leading-tight tracking-tight text-gray-900 md:text-2xl">
              Add car
            </h1>
            <form
              onSubmit={handleSubmit}
              className="space-y-4 md:space-y-6 border p-3 rounded-lg border-slate-300"
            >
              <div>
                <label className="block mb-2 text-sm font-medium text-gray-900">
                  Car name
                </label>
                <input
                  type="text"
                  name="name"
                  id="name"
                  className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5"
                  placeholder="Swift"
                  value={values?.name}
                  onChange={handleChange}
                  onBlur={handleBlur}
                />
                {errors.name && touched.name ? (
                  <p className="text-red-500 mt-1 text-sm"> {errors.name}</p>
                ) : null}
              </div>
              <div>
                <label className="block mb-2 text-sm font-medium text-gray-900">
                  Manufacture
                </label>
                <input
                  type="text"
                  name="Manufacture"
                  id="Manufacture"
                  className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5"
                  placeholder="Suzuki"
                  value={values?.manufacture}
                  onChange={handleChange}
                  onBlur={handleBlur}
                />
                {errors.manufacture && touched.manufacture ? (
                  <p className="text-red-500 mt-1 text-sm">
                    {" "}
                    {errors.manufacture}
                  </p>
                ) : null}
              </div>
              <div>
                <label className="block mb-2 text-sm font-medium text-gray-900">
                  Description
                </label>
                <textarea
                  type="text"
                  name="description"
                  id="description"
                  className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5"
                  placeholder="Car description"
                  value={values?.description}
                  onChange={handleChange}
                  onBlur={handleBlur}
                />
                {errors.description && touched.description ? (
                  <p className="text-red-500 mt-1 text-sm">
                    {" "}
                    {errors.description}
                  </p>
                ) : null}
              </div>

              <div>
                <label className="block mb-2 text-sm font-medium text-gray-900">
                  Model
                </label>
                <input
                  type="text"
                  name="Model"
                  id="Model"
                  className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5"
                  placeholder="2023"
                  value={values?.model}
                  onChange={handleChange}
                  onBlur={handleBlur}
                />
                {errors.model && touched.model ? (
                  <p className="text-red-500 mt-1 text-sm"> {errors.model}</p>
                ) : null}
              </div>

              <div>
                <label className="block mb-2 text-sm font-medium text-gray-900">
                  Price
                </label>
                <input
                  type="text"
                  name="price"
                  id="price"
                  className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5"
                  placeholder="100000"
                  value={values?.price}
                  onChange={handleChange}
                  onBlur={handleBlur}
                />
                {errors.price && touched.price ? (
                  <p className="text-red-500 mt-1 text-sm"> {errors.price}</p>
                ) : null}
              </div>

              <div className="flex flex-row">
                <button
                  type="submit"
                  className="w-full text-white bg-primary-600 hover:bg-primary-700 focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center"
                >
                  Save changes
                </button>
                <Link
                  to="/dashboard"
                  className="w-full border border-slate-300 ml-2 focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center"
                >
                  Cancel
                </Link>
              </div>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
};

{
  /* <div className="flex flex-row border p-3 rounded-lg border-slate-300">
  <img
    src={
      image
        ? `${import.meta.env.VITE_BACKEND_URL}uploads/${image}`
        : "../../public/img/placeholder.png"
    }
    alt=""
    className="w-20 h-20 mr-5 rounded-full aspect-square"
  />
  <span className="inline-block">
    <form onSubmit={handleImage} className="flex mt-8">
      <input
        type="file"
        accept="image/*"
        ref={ref}
        onChange="{(e) => setFile(e.target.files[0])}"
        className="block mb-2 text-sm font-medium text-gray-900 mr-3"
      ></input>
      <button
        className=" text-white bg-primary-600 hover:bg-primary-700 focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-1.5 text-center"
        type="submit"
      >
        Change featured image
      </button>
    </form>
  </span>
</div>; */
}

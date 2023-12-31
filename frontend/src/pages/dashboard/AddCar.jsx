import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { useFormik } from "formik";
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

  const { values, errors, handleBlur, touched, handleChange, handleSubmit } =
    useFormik({
      initialValues,
      validationSchema: carSchema,
      onSubmit: async (values, action) => {
        try {
          const { data } = await axios.post(
            import.meta.env.VITE_BACKEND_URL + "/cars/add",
            {
              ...values,
            }
          );

          if (data.created) {
            action.resetForm();
            Navigate(`/dashboard/cars/edit/${data.data._id}`);
          }
        } catch (err) {
          console.log(err.response.data);
          toast.warn("Something went wrong, please try again later", {
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
                <select
                  id="manufacture"
                  value={values?.manufacture}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5"
                >
                  <option value="" label="Select" />
                  <option value="Suzuki" label="Suzuki" />
                  <option value="Hundai" label="Hundai" />
                  <option value="Honda" label="Honda" />
                  <option value="Mahindra" label="Mahindra" />
                  <option value="Toyota" label="Toyota" />
                </select>
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
                <select
                  id="model"
                  value={values?.model}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5"
                >
                  <option value="" label="Select" />
                  <option value="2023" label="2023" />
                  <option value="2022" label="2022" />
                  <option value="2021" label="2021" />
                  <option value="2020" label="2020" />
                  <option value="2019" label="2019" />
                  <option value="2018" label="2018" />
                  <option value="2017" label="2017" />
                </select>
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

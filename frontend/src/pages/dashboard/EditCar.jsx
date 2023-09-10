import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
// import Cookies from "universal-cookie";
import { useFormik } from "formik";
import { useEffect, useRef, useState } from "react";
import { toast } from "react-toastify";
import { carSchema } from "../../schemas/index";
import { useParams } from "react-router-dom";

export const EditCar = () => {
  const [file, setFile] = useState();
  const [image, setImage] = useState();
  const Navigate = useNavigate();
  const { id } = useParams();
  const ref = useRef();

  useEffect(() => {
    (async function () {
      let { data } = await axios.get(
        import.meta.env.VITE_BACKEND_URL + `/cars/view/${id}`
      );

      console.log(data);

      if (data.status) {
        setValues({
          name: data.data.name,
          description: data.data.description,
          manufacture: data.data.manufacture,
          price: data.data.price,
          model: data.data.model,
        });
        setImage(data?.data?.profileImg);
      }
    })();
  }, []);

  //upload car featured image
  const handleImage = async (event) => {
    event.preventDefault();
    if (file) {
      const formData = new FormData();
      formData.append("image", file);

      axios({
        method: "post",
        url:
          import.meta.env.VITE_BACKEND_URL + `/cars/edit/featuredImage/${id}`,
        data: formData,
        headers: { "Content-Type": "multipart/form-data" },
      })
        .then(function ({ data }) {
          //handle success
          console.log(data);
          setFile(null);
          setImage(data.filename);
          ref.current.value = "";
        })
        .catch(function ({ data }) {
          //handle error
          console.log(data);
        });
    }
  };

  //upload car details
  const {
    values,
    errors,
    handleBlur,
    touched,
    handleChange,
    handleSubmit,
    setValues,
  } = useFormik({
    validationSchema: carSchema,
    onSubmit: async (values, action) => {
      console.log(values);

      try {
        const { data } = await axios.put(
          import.meta.env.VITE_BACKEND_URL + `/cars/edit/${id}`,
          {
            ...values,
          }
        );

        if (data.created) {
          action.resetForm();
          Navigate("/dashboard");
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
            <h1 className="text-3xl font-bold leading-tight tracking-tight text-gray-900 md:text-3xl">
              Car details
            </h1>
            <div className="border p-3 rounded-lg border-slate-300">
              <h3 className="text-xl font-medium leading-tight py-2 tracking-tight text-gray-900 md:text-xl">
                Featured Image
              </h3>
              <div className="flex flex-row ">
                <img
                  src={
                    image
                      ? `${import.meta.env.VITE_BACKEND_URL}uploads/${image}`
                      : "../../../public/img/placeholder.png"
                  }
                  alt=""
                  className="w-20 h-20 mr-5 rounded-full aspect-square"
                />
                <span className="inline-block">
                  <form
                    onSubmit={handleImage}
                    className="flex mt-8"
                    encType="multipart/form"
                  >
                    <input
                      type="file"
                      accept="image/*"
                      ref={ref}
                      onChange={(e) => setFile(e.target.files[0])}
                      className="block mb-2 text-sm font-medium text-gray-900 mr-3"
                    ></input>
                    <button
                      className=" text-white bg-primary-600 hover:bg-primary-700 focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-1.5 text-center"
                      type="submit"
                    >
                      Change image
                    </button>
                  </form>
                </span>
              </div>
            </div>
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
                  name="manufacture"
                  id="manufacture"
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

import { useFormik } from "formik";
import { forgotPasswordSchema } from "../../schemas";
import axios from "axios";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";

const initialValues = {
  email: "",
  password: "",
};

function ForgotPassword() {
  const Navigate = useNavigate();

  const { values, errors, handleBlur, touched, handleChange, handleSubmit } =
    useFormik({
      initialValues,
      validationSchema: forgotPasswordSchema,
      onSubmit: async (values) => {

        try {
          const { data } = await axios.post(
            import.meta.env.VITE_BACKEND_URL + "/auth/forgot-password",
            {
              ...values,
            }
          );

          toast.success(data.message, {
            position: "bottom-center",
            autoClose: 1000,
            hideProgressBar: true,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: "light",
          });

          Navigate('/');
        } catch (err) {
          const error = err.response.data.error;
          if (error.email) {
            errors.email = error.email;
          }
        }
      },
    });

  return (
    <div>
      <section className="bg-gray-50 ">
        <div className="flex flex-col items-center justify-center px-6 py-8 mx-auto md:h-screen lg:py-0">
          <div className="w-full bg-white rounded-lg shadow md:mt-0 sm:max-w-md xl:p-0 ">
            <div className="p-6 space-y-4 md:space-y-6 sm:p-8">
              <h1 className="text-xl font-bold leading-tight tracking-tight text-gray-900 md:text-2xl ">
                Reset password
              </h1>
              <form className="space-y-4 md:space-y-6" onSubmit={handleSubmit}>
                <div>
                  <label className="block mb-2 text-sm font-medium text-gray-900 ">
                    Your email
                  </label>
                  <input
                    type="email"
                    name="email"
                    id="email"
                    className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5"
                    placeholder="name@company.com"
                    value={values.email}
                    onChange={handleChange}
                    onBlur={handleBlur}
                  />
                  {errors.email && touched.email ? (
                    <p className="text-red-500 mt-1 text-sm"> {errors.email}</p>
                  ) : null}
                </div>
                <button
                  type="submit"
                  className="w-full text-white bg-primary-600 hover:bg-primary-700 focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center "
                >
                  Reset password
                </button>
              </form>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}

export default ForgotPassword;

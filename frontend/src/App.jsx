import "./App.css";
import Header from "./components/header/Header";
import Footer from "./components/footer/Footer.jsx";
import { createBrowserRouter, RouterProvider, Outlet } from "react-router-dom";
import Error from "./components/Error.jsx";
import Signup from "./pages/auth/Signup.jsx";
import LandingPage from "./pages/LandingPage";
import Login from "./pages/auth/Login.jsx";
import Dashboard from "./pages/dashboard/Dashboard";
import { Provider } from "react-redux";
import store from "./utils/store.js";
import { AddCar } from "./pages/dashboard/AddCar";
import ForgotPassword from "./pages/auth/ForgotPassword";
import { EditCar } from "./pages/dashboard/EditCar";

function App() {
  //app layout
  const AppLayout = () => {
    return (
      <Provider store={store}>
        <Header />
        <Outlet />
        <Footer />
      </Provider>
    );
  };

  //app router
  const appRouter = createBrowserRouter([
    {
      path: "/",
      element: <AppLayout />,
      errorElement: <Error />,
      children: [
        { path: "/", element: <LandingPage /> },
        {
          path: "/signup",
          element: <Signup />,
        },
        {
          path: "/login",
          element: <Login />,
        },
        {
          path: "/forgot-password",
          element: <ForgotPassword />,
        },
        {
          path: "/dashboard",
          element: <Dashboard />,
        },
        {
          path: "/dashboard/cars/add",
          element: <AddCar />,
        },
        {
          path: "/dashboard/cars/edit/:id",
          element: <EditCar />,
        },
      ],
    },
  ]);

  return <RouterProvider router={appRouter} />;
}

export default App;

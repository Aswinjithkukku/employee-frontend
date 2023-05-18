import { HomePage, LoginPage } from "../pages";
import SignupPage from "../pages/SignupPage";
import MainLayout from "./MainLayout";
import PrivateRoute from "./PrivateRoute";

const ThemeRoutes = [
  {
    path: "",
    element: (
      <PrivateRoute>
        <MainLayout />
      </PrivateRoute>
    ),
    children: [{ path: "", element: <HomePage /> }],
  },
  { path: "/login", element: <LoginPage /> },
  { path: "/signup", element: <SignupPage /> },
];

export default ThemeRoutes;

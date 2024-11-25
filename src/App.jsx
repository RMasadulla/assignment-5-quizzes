import {
  Route,
  RouterProvider,
  createBrowserRouter,
  createRoutesFromElements,
} from "react-router-dom";

import HomePage from "../src/pages/HomePage";
import LoginPage from "../src/pages/LoginPage";
import RegistrationPage from "../src/pages/RegistrationPage";
import ResultPage from "../src/pages/ResultPage";
import LeaderboardPage from "./pages/LeaderboardPage";
import QuizPage from "./pages/QuizPage";

import Admin from "../src/routes/Admin";
import PrivateRoutes from "../src/routes/PrivateRoutes";

import Dashboard from "../src/pages/admin/Dashboard";
import QuizSetEntryPage from "../src/pages/admin/QuizSetEntryPage";
import QuizSetPage from "../src/pages/admin/QuizSetPage";

import ErrorPage from "../src/pages/ErrorPage";
import NotFoundPage from "../src/pages/NotFoundPage";

import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import AuthProvider from "./providers/AuthProvider";

const router = createBrowserRouter(
  createRoutesFromElements(
    <>
      <Route errorElement={<ErrorPage />}>
        <Route path="/login" element={<LoginPage />} />
        <Route path="/register" element={<RegistrationPage />} />
        <Route path="/" element={<HomePage />} />

        <Route element={<PrivateRoutes />}>
          <Route path="/result/:id" element={<ResultPage />} />
          <Route path="/quiz/:id" element={<QuizPage />} />
          <Route path="/leaderboard/:id" element={<LeaderboardPage />} />
        </Route>

        <Route element={<Admin />} errorElement={<ErrorPage />}>
          <Route path="/admin/dashboard" element={<Dashboard />} />
          <Route
            path="/admin/dashboard/quiz_set_entry/:id"
            element={<QuizSetEntryPage />}
          />
          <Route path="/admin/dashboard/quiz_set" element={<QuizSetPage />} />
        </Route>
      </Route>

      <Route path="*" element={<NotFoundPage />} />
    </>
  )
);

export default function App() {
  return (
    <>
      <AuthProvider>
        <RouterProvider router={router} />
      </AuthProvider>
      <ToastContainer />
    </>
  );
}

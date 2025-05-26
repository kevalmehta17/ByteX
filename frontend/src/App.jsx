import { Navigate, Route, Routes } from "react-router";
import { HomePage } from "./pages/HomePage.jsx";
import { LoginPage } from "./pages/LoginPage.jsx";
import { SignupPage } from "./pages/SignupPage.jsx";
import { ChatPage } from "./pages/ChatPage.jsx";
import { CallPage } from "./pages/CallPage.jsx";
import { OnboardingPage } from "./pages/OnboardingPage.jsx";
import { NotificationsPage } from "./pages/NotificationsPage";
import { axiosInstance } from "./lib/axios.js";
import { Toaster } from "react-hot-toast";
import { useQuery } from "@tanstack/react-query";

const App = () => {
  const {
    data: authData,
    isLoading,
    error,
  } = useQuery({
    queryKey: ["authUser"],
    queryFn: async () => {
      const data = await axiosInstance.get("/auth/me");
      return data;
    },
    retry: false,
  });
  const authUser = authData?.user;
  console.log(authData);
  console.log(isLoading);
  console.log(error);
  return (
    <div className="min-h-screen p-6" data-theme="night">
      <Routes>
        <Route
          path="/"
          element={authUser ? <HomePage /> : <Navigate to={"/login"} />}
        />
        <Route
          path="/login"
          element={!authUser ? <LoginPage /> : <Navigate to={"/"} />}
        />
        <Route
          path="/signup"
          element={!authUser ? <SignupPage /> : <Navigate to={"/"} />}
        />
        <Route
          path="/notification"
          element={
            authUser ? <NotificationsPage /> : <Navigate to={"/login"} />
          }
        />
        <Route
          path="/call"
          element={authUser ? <CallPage /> : <Navigate to={"login"} />}
        />
        <Route
          path="/chat"
          element={authUser ? <ChatPage /> : <Navigate to={"login"} />}
        />
        <Route
          path="/onboarding"
          element={authUser ? <OnboardingPage /> : <Navigate to={"login"} />}
        />
      </Routes>
      <Toaster />
    </div>
  );
};

export default App;

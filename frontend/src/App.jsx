import { Route, Routes } from "react-router";
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
  const { data, isLoading, error } = useQuery({
    queryKey: ["todos"],
    queryFn: async () => {
      const data = await axiosInstance.get("/auth/me");
      return data;
    },
    retry: false,
  });
  console.log(data);
  console.log(isLoading);
  console.log(error);
  return (
    <div className="min-h-screen p-6" data-theme="night">
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/signup" element={<SignupPage />} />
        <Route path="/notification" element={<NotificationsPage />} />
        <Route path="/call" element={<CallPage />} />
        <Route path="/chat" element={<ChatPage />} />
        <Route path="/onboarding" element={<OnboardingPage />} />
      </Routes>
      <Toaster />
    </div>
  );
};

export default App;

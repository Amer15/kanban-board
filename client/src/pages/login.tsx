import { useState } from "react";
import LoginForm from "../components/login/login-form";
import RegisterForm from "../components/login/register-form";

const LoginPage = () => {
  const [activeTab, setActiveTab] = useState<"login" | "register">("login");

  const selectTabHandler = (tab: "login" | "register") => setActiveTab(tab);

  return (
    <section className="min-h-screen flex justify-center items-center">
      <div className="bg-white shadow-lg border border-gray-200 w-[90%] md:w-96 mx-auto rounded-md py-6 px-4">
        {activeTab === "login" ? (
          <LoginForm tabChangeHandler={selectTabHandler} />
        ) : (
          <RegisterForm tabChangeHandler={selectTabHandler} />
        )}
      </div>
    </section>
  );
};

export default LoginPage;

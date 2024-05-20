import React, { useState } from "react";
// import { Auth, AuthSession } from "@supabase/auth-ui-react";
import supabase from "../../../utils/supabase";
import { useNavigate } from "react-router-dom";
import { EyeIcon, EyeOffIcon } from "../icons";

interface LoginDetailsProps {
  toggleView: () => void;
  onLogin: () => void;
}

const LoginDetails: React.FC<LoginDetailsProps> = ({ toggleView, onLogin }) => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const navigate = useNavigate();

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      const { data, error } = await supabase.auth.signInWithPassword({
        email: username,
        password,
      });

      if (error) {
        setErrorMessage(error.message);
      } else {
        const { session } = data;
        if (session) {
          // localStorage.setItem("supabaseSession", JSON.stringify(session));

          const uuid = session.user.id;
          localStorage.setItem("userId", uuid);

          if (uuid) {
            const { data: namesData, error: namesError } = await supabase
              .from("names")
              .select("name")
              .eq("user_id", uuid)
              .single();

            if (namesError) {
              console.error("Error retrieving full name:", namesError.message);
            } else {
              const fullName = namesData?.name || "";
              localStorage.setItem("fullName", fullName);
            }
            onLogin();
          }
          navigate("/");
        }
      }
    } catch (error) {
      setErrorMessage("An error occurred. Please try again.");
    }
  };

  return (
    <div className="flex flex-col">
      <span className="text-4xl font-semibold text-center text-textBase mt-[30%]">
        Welcome Back!
      </span>
      <form onSubmit={handleLogin} className="mt-[10%]">
        <div className="space-y-[10px]">
          <div className="flex flex-col space-y-[2px]">
            <span className="text-textBase">Email</span>
            <div className="bg-surface1 w-full h-[40px] rounded-lg flex ring-overlay0 ring-opacity-90 ring-1">
              <input
                className="w-full ml-2 bg-transparent outline-none placeholder-textPlaceholder text-textBase placeholder-opacity-30"
                type="text"
                placeholder="email"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
              />
            </div>
          </div>
          <div className="flex flex-col space-y-[2px]">
            <span className="text-textBase">Password</span>
            <div className="bg-surface1 w-full h-[40px] rounded-lg flex ring-overlay0 ring-opacity-90 ring-1">
              <input
                className="w-full ml-2 bg-transparent outline-none placeholder-textPlaceholder text-textBase placeholder-opacity-30"
                type={showPassword ? "text" : "password"}
                placeholder="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="mr-2"
              >
                {showPassword ? (
                  <div className="h-5 w-5 fill-textBase">
                    <EyeIcon />
                  </div>
                ) : (
                  <div className="h-5 w-5 fill-textBase">
                    <EyeOffIcon />
                  </div>
                )}
              </button>
            </div>
          </div>
        </div>
        {errorMessage && (
          <div className="mt-2 text-rose-700">{errorMessage}</div>
        )}
        <button
          type="submit"
          className="w-full h-[40px] bg-accent rounded-lg text-white font-bold my-[20px] hover:bg-blue-400 hover:scale-[101%]"
        >
          Sign in
        </button>
      </form>
      <div className="flex justify-center my-[10px]">
        <span className="text-textBase">New user?</span>
        <button
          className="ml-[10px] underline text-textBase"
          onClick={toggleView}
        >
          Create an Account
        </button>
      </div>
    </div>
  );
};

export default LoginDetails;

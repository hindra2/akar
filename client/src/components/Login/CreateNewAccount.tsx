import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import supabase from "../../../utils/supabase";
import { EyeIcon, EyeOffIcon } from "../icons";

interface CreateNewAccountProps {
  toggleView: () => void;
  onLogin: () => void;
}

const CreateNewAccount: React.FC<CreateNewAccountProps> = ({ toggleView, onLogin }) => {
  const [fullName, setFullName] = useState("");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    // Password validation
    const passwordRegex = /^(?=.*[A-Z])(?=.*\d).{8,}$/;
    if (!passwordRegex.test(password)) {
      setErrorMessage(
        "Password must be at least 8 characters long, contain at least one uppercase letter and one number"
      );
      return;
    }

    try {
      const { data, error } = await supabase.auth.signUp({
        email: username,
        password,
        options: {
          data: {
            full_name: fullName,
          },
        },
      });

      if (error) {
        setErrorMessage(error.message);
      } else {
        localStorage.setItem("user", JSON.stringify(data));
        onLogin();
        navigate("/");
      }
    } catch (error) {
      setErrorMessage("An error occurred. Please try again.");
    }
  };

  return (
    <div className="flex flex-col">
      <span className="text-4xl font-semibold text-center text-textBase mt-[30%]">
        Create an Account
      </span>
      <div className="mt-[10%]">
        <form onSubmit={handleSubmit}>
          <div className="space-y-[10px]">
            <div className="flex flex-col space-y-[2px]">
              <span className="text-textBase">Full Name</span>
              <div className="bg-surface1 w-full h-[40px] rounded-lg flex ring-overlay0 ring-opacity-90 ring-1">
                <input
                  className="w-full ml-2 bg-transparent outline-none placeholder-textPlaceholder text-textBase placeholder-opacity-30"
                  type="text"
                  placeholder="full name"
                  value={fullName}
                  onChange={(e) => setFullName(e.target.value)}
                />
              </div>
            </div>
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
            <div className="flex flex-col space-y-[2px] mb-[10px]">
              <span className="text-textBase">Password</span>
              <div className="bg-surface1 w-full h-[40px] rounded-lg flex ring-overlay0 ring-opacity-90 ring-1 items-center">
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
            Sign up
          </button>
        </form>
        <div className="flex justify-center my-[10px]">
          <span className="text-textBase">Already have an account?</span>
          <button
            className="ml-[10px] underline text-textBase"
            onClick={toggleView}
          >
            Login
          </button>
        </div>
      </div>
    </div>
  );
};

export default CreateNewAccount;

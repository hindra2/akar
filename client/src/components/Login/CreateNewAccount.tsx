import React from "react";

interface CreateNewAccountProps {
  toggleView: () => void;
}

const CreateNewAccount: React.FC<CreateNewAccountProps> = ({ toggleView }) => {
  return (
    <div className="flex flex-col">
      <span className="text-4xl font-semibold text-center text-textBase mt-[30%]">
        Create an Account
      </span>
      <div className="mt-[10%]">
        <div className="space-y-[10px]">
          <div className="flex flex-col space-y-[2px]">
            <span className="text-textBase">Username or Email</span>
            <div className="bg-surface1 w-full h-[40px] rounded-lg flex ring-overlay0 ring-opacity-90 ring-1">
              <input
                className="w-full ml-2 bg-transparent outline-none placeholder-textPlaceholder text-textBase"
                type="text"
                placeholder="username"
              />
            </div>
          </div>

          <div className="flex flex-col space-y-[2px]">
            <span className="text-textBase">Password</span>
            <div className="bg-surface1 w-full h-[40px] rounded-lg flex ring-overlay0 ring-opacity-90 ring-1">
              <input
                className="w-full ml-2 bg-transparent outline-none placeholder-textPlaceholder text-textBase"
                type="password"
                placeholder="password"
              />
            </div>
            <div className="flex justify-end w-full">
              <a
                href="/reset-password"
                className="text-sm underline text-textBase text-opacity-40 mr-[10px]"
              >
                Forgot password?
              </a>
            </div>
          </div>
        </div>
        <button className="w-full h-[40px] bg-surface2 rounded-lg text-textBase my-[20px] hover:bg-overlay0 hover:scale-[101%]">
          Sign up
        </button>
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

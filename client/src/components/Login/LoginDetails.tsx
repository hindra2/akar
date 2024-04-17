import React from "react";
import {
  GoogleLoginResponse,
  GoogleLoginResponseOffline,
  GoogleLogin,
} from "react-google-login";

const clientId =
  "829992565671-gfloojh9o98odo3g1mnkfki9hje2mpmn.apps.googleusercontent.com";

const LoginDetails = () => {
  const onSuccess = (
    response: GoogleLoginResponse | GoogleLoginResponseOffline
  ) => {
    // "response" is now explicitly typed.
    if ("profileObj" in response) {
      console.log("Login Success:", response.profileObj);
      // Perform actions with the response object
    }
  };

  interface ErrorResponse {
    error: string;
    details?: string; // Use optional fields for information that might not always be there
    // Add other fields you expect in the error response
  }

  const onFailure = (response: ErrorResponse) => {
    console.error("Login Failed:", response);
  };

  return (
    <div className="flex flex-col">
      <span className="text-4xl font-semibold text-center text-textBase mt-[30%]">
        Welcome Back!
      </span>
      <div className="px-[100px] mt-[10%]">
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
          Sign in
        </button>

        <div className="flex space-x-[20px] justify-center items-center my-[20px]">
          <hr className="bg-surface1 h-[1px] border-0 w-[30%]" />
          <span className="text-textBase text-opacity-40">or</span>
          <hr className="bg-surface1 h-[1px] border-0 w-[30%]" />
        </div>

        <GoogleLogin
          clientId={clientId}
          onSuccess={onSuccess}
          onFailure={onFailure}
          cookiePolicy={"single_host_origin"}
          render={(renderProps) => (
            <button
              onClick={renderProps.onClick}
              disabled={renderProps.disabled}
              className="w-full h-[40px] flex items-center justify-center ring-overlay0 ring-opacity-90 ring-1 rounded-lg space-x-[5px] hover:bg-overlay0 hover:scale-[101%]"
            >
              <img
                src={"/googleLogo.png"}
                alt="Google sign-in"
                height={20}
                width={20}
              />
              <span className="text-textBase">Sign in with Google</span>
            </button>
          )}
        />
        <div className="flex justify-center my-[30px]">
          <span className="text-textBase">New user?</span>
          <a
            href="/reset-password"
            className="ml-[10px] underline text-textBase  mr-[10px]"
          >
            Create an Account
          </a>
        </div>
      </div>
    </div>
  );
};

export default LoginDetails;

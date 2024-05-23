import { EyeIcon, EyeOffIcon } from "../icons";
import { useState } from "react";
import supabase from "../../../utils/supabase";

const AccountSettings = () => {
  const [currentPassword, setCurrentPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [repeatNewPassword, setRepeatNewPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);

  const handleChangePassword = async (e: { preventDefault: () => void }) => {
    e.preventDefault();

    if (newPassword !== repeatNewPassword) {
      alert("New passwords do not match");
      return;
    }

    const { data, error } = await supabase.auth.updateUser({
      password: newPassword,
    });

    if (error) {
      console.error("Error updating password:", error.message);
      alert("Error updating password:");
    } else {
      console.log("Password updated successfully for:", data);
      alert("Password updated successfully");
      setCurrentPassword("");
      setNewPassword("");
      setRepeatNewPassword("");
    }
  };
  return (
    <div className="mb-[60px]">
      <span className="text-5xl font-bold text-textBase">Account</span>
      <hr className="border-t border-textBase w-[700px] mt-[10px]" />
      <div className="w-[700px] mb-[20px]">
        <div className="text-textBase mt-[20px] flex flex-col space-y-[15px]">
          <div className="ring-1 ring-accent ring-opacity-70 p-[10px] rounded-lg ml-[2px] bg-accent bg-opacity-5 space-y-[13px]">
            <span className="text-xl font-bold">Change your display name</span>
            <div className="flex flex-col space-y-[4px]">
              <span className="text-textBase">Display name</span>
              <div className="bg-surface1 w-full h-[40px] rounded-lg flex ring-overlay0 ring-opacity-90 ring-1">
                <input className="w-full ml-2 bg-transparent outline-none placeholder-textPlaceholder text-textBase placeholder-opacity-30" type="text" placeholder="name" />
              </div>
            </div>
            <div className="mt-[15px] flex justify-end space-x-[15px]">
              <button className="rounded-lg bg-surface0 hover:bg-overlay0 hover:scale-[101%] px-[10px] py-[5px] text-textBase">Cancel</button>
              <button className="rounded-lg bg-accent hover:scale-[101%] px-[10px] py-[5px] text-white hover:bg-blue-400">Set new name</button>
            </div>
          </div>

          <div className="ring-1 ring-accent ring-opacity-70 p-[10px] rounded-lg ml-[2px] bg-accent bg-opacity-5">
            <span className="text-xl font-bold">Change your password</span>
            <form onSubmit={handleChangePassword}>
              <div>
                <span className="text-textBase mt-[15px] flex flex-col space-y-[13px]">Current password</span>
                <div className="bg-surface1 h-[40px] rounded-lg flex ring-overlay0 ring-opacity-90 ring-1 ml-[2px]">
                  <input
                    className="w-full ml-2 bg-transparent outline-none placeholder-textPlaceholder text-textBase placeholder-opacity-30"
                    type={showPassword ? "text" : "password"}
                    placeholder="password"
                    value={currentPassword}
                    onChange={(e) => setCurrentPassword(e.target.value)}
                  />
                  <button type="button" onClick={() => setShowPassword(!showPassword)} className="mr-2">
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
              <div>
                <span className="text-textBase mt-[20px] flex flex-col space-y-[30px]">New password</span>
                <div className="bg-surface1 h-[40px] rounded-lg flex ring-overlay0 ring-opacity-90 ring-1 ml-[2px]">
                  <input
                    className="w-full ml-2 bg-transparent outline-none placeholder-textPlaceholder text-textBase placeholder-opacity-30"
                    type={showPassword ? "text" : "password"}
                    placeholder="password"
                    value={newPassword}
                    onChange={(e) => setNewPassword(e.target.value)}
                  />
                  <button type="button" onClick={() => setShowPassword(!showPassword)} className="mr-2">
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
              <div>
                <span className="text-textBase mt-[20px] flex flex-col space-y-[30px]">Repeat new password</span>
                <div className="bg-surface1 h-[40px] rounded-lg flex ring-overlay0 ring-opacity-90 ring-1 ml-[2px]">
                  <input
                    className="w-full ml-2 bg-transparent outline-none placeholder-textPlaceholder text-textBase placeholder-opacity-30"
                    type={showPassword ? "text" : "password"}
                    placeholder="password"
                    value={repeatNewPassword}
                    onChange={(e) => setRepeatNewPassword(e.target.value)}
                  />
                  <button type="button" onClick={() => setShowPassword(!showPassword)} className="mr-2">
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
              <div className="mt-[15px] flex justify-end space-x-[15px]">
                <button className="rounded-lg bg-surface0 hover:bg-overlay0 hover:scale-[101%] px-[10px] py-[5px] text-textBase">Cancel</button>
                <button className="rounded-lg bg-accent hover:scale-[101%] px-[10px] py-[5px] text-white hover:bg-blue-400">Set new password</button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AccountSettings;

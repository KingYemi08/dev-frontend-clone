import { useEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";
import { useGlobal } from "../context/globalContext";
import { ToastContainer, toast } from "react-toastify";
import axios from "axios";

export default function Settings() {
  const [isActive, setIsActive] = useState("profile");
  const [confirmPassword, setConfirmPassword] = useState("");
  const fileInputRef = useRef(null);
  const [loading, setLoading] = useState(false);
  const [passLoading, setPassLoading] = useState(false);
  const {
    currentUser,
    token,
    currentUserId,
    regForm,
    updateUserInfo,
    setRegForm,
    regChange,
    setPassForm,
    changePassword,
    previewImage,
    previewImageName,
    passForm,
    passChange,
    singleUser,
    setPreviewImage,
    getUserById,
  } = useGlobal();

  useEffect(() => {
    if (currentUserId) {
      getUserById(currentUserId);
    }
  }, []);

  useEffect(() => {
    if (singleUser) {
      setRegForm({
        username: singleUser.username,
        email: singleUser.email,
        bio: singleUser.bio,
        avatar: singleUser.avatar,
      });
    }
  }, [singleUser]);

  const handleSubmit = async () => {
    if (!regForm.username || !regForm.email)
      return toast.warning("Please Fill all Fields", { autoClose: 2000 });

    try {
      setLoading(true);
      await updateUserInfo();
      toast.success("Profile Updated", { autoClose: 2000 });
      setPreviewImage("")
      setLoading(false);
    } catch (error) {
      setLoading(false);
      toast.error("An Error OCcured", { autoClose: 2000 });
    }
  };

  const handleChangePassword = async (e) => {
    e.preventDefault();
    if (!passForm.oldPassword || !passForm.newPassword || !confirmPassword)
      return toast.warn("Please Fill all Fields", { autoClose: 2000 });
    if (confirmPassword !== passForm.newPassword)
      return toast.error("Mismatched Password", { autoClose: 2000 });
    try {
      setPassLoading(true);
      await changePassword();
      toast.success("Password Changed Successfully", { autoClose: 2000 });
      setPassLoading(false);
      setPassForm({
        oldPassword: "",
        newPassword: "",
      });
      setConfirmPassword("");
      setPassLoading(false);
    } catch (error) {
      setPassLoading(false);
      toast.error("Invalid Password", { autoClose: 2000 });
    }
  };

  if (!token)
    return (
      <div className="min-h-[85vh] flex flex-col items-center justify-center">
        <p className="text-gray-600 font-semibold">
          User must be logged in to access profile
        </p>
        <Link to={"/login"}>
          <button className="bg-blue-500 mt-3 cursor-pointer px-4 py-2 text-white font-semibold rounded-md hover:bg-blue-700">
            Login
          </button>
        </Link>
      </div>
    );

  return (
    <div className="lg:flex lg:space-x-2.5 lg:pt-4">
      <div className="lg:w-[22%] lg:block hidden">
        <div
          onClick={() => {
            setIsActive("profile");
          }}
          className={`flex ne cursor-pointer px-2 py-2 items-center transition-all rounded justify-between ${
            isActive === "profile" ? "bg-white" : "hover:bg-blue-100"
          }`}
        >
          <h2 className={`${isActive === "profile" ? "font-semibold" : ""}`}>
            🙂 Profile
          </h2>
        </div>
        <div
          onClick={() => {
            setIsActive("customization");
          }}
          className={`flex ne ${
            isActive === "customization"
              ? "font-semibold bg-white"
              : "hover:bg-blue-100"
          } cursor-pointer pe- ps-2 py-2 hover:bg-blue-100 items-center transition-all rounded justify-between`}
        >
          <h2>🔩 Customization</h2>
        </div>
        <div
          onClick={() => {
            setIsActive("notification");
          }}
          className={`flex ne cursor-pointer px-2 py-2 items-center transition-all rounded justify-between ${
            isActive === "notification" ? "bg-white" : "hover:bg-blue-100"
          }`}
        >
          <h2
            className={`${isActive === "notification" ? "font-semibold" : ""}`}
          >
            📫 Notification
          </h2>
        </div>
        <div
          onClick={() => {
            setIsActive("account");
          }}
          className={`flex ne cursor-pointer px-2 py-2 items-center transition-all rounded justify-between ${
            isActive === "account" ? "bg-white" : "hover:bg-blue-100"
          }`}
        >
          <h2 className={`${isActive === "account" ? "font-semibold" : ""}`}>
            🥬 Account
          </h2>
        </div>
        <div
          onClick={() => {
            setIsActive("organization");
          }}
          className={`flex ne cursor-pointer px-2 py-2 items-center transition-all rounded justify-between ${
            isActive === "organization" ? "bg-white" : "hover:bg-blue-100"
          }`}
        >
          <h2
            className={`${isActive === "organization" ? "font-semibold" : ""}`}
          >
            🏨 Organization
          </h2>
        </div>
        <div
          onClick={() => {
            setIsActive("extensions");
          }}
          className={`flex ne cursor-pointer px-2 py-2 items-center transition-all rounded justify-between ${
            isActive === "extensions" ? "bg-white" : "hover:bg-blue-100"
          }`}
        >
          <h2 className={`${isActive === "extensions" ? "font-semibold" : ""}`}>
            🔦 Extensions
          </h2>
        </div>
      </div>
      <div className="lg:w-[78%] relative top-2 lg:top-0">
        <Link to={`/user/${currentUserId}`} className="">
          <h2 className="text-blue-600 lg:text-3xl text-xl font-bold">
            @{currentUser && currentUser.email}
          </h2>
        </Link>
        {isActive === "profile" ? (
          <div>
            <form
              action=""
              onSubmit={(e) => {
                e.preventDefault();
              }}
            >
              <div className="border mt-5 lg:w-[65%] bg-white border-gray-200 rounded-md p-6">
                <h2 className="text-2xl font-bold">User</h2>
                <div className="pt-6">
                  <div className="flex flex-col pb-5">
                    <label htmlFor="" className="mb-1.5 font-semibold">
                      Username
                    </label>
                    <input
                      type="text"
                      name="username"
                      value={regForm.username}
                      onChange={regChange}
                      className="lg:min-w-135 rounded-md border focus:outline-blue-700 focus:outline-2 border-gray-300 ps-1.5 py-2 outline-0 placeholder:text-sm placeholder:text-gray-600"
                    />
                  </div>
                  <div className="flex flex-col pb-5">
                    <label htmlFor="" className="mb-1.5 font-semibold">
                      Email
                    </label>
                    <input
                      type="text"
                      name="email"
                      value={regForm.email}
                      onChange={regChange}
                      className="lg:min-w-135 rounded-md border border-gray-300 focus:outline-blue-700 focus:outline-2 ps-1.5 py-2 outline-0 placeholder:text-sm placeholder:text-gray-600"
                    />
                  </div>
                  <div className="flex flex-col pb-5">
                    <label htmlFor="" className="mb-1.5 font-semibold">
                      Bio
                    </label>
                    <textarea
                      type="text"
                      name="bio"
                      value={regForm.bio}
                      onChange={regChange}
                      className="lg:min-w-135 rounded-md border border-gray-300 focus:outline-blue-700 focus:outline-2 ps-1.5 py-2 outline-0 placeholder:text-sm placeholder:text-gray-600"
                    ></textarea>
                  </div>
                  <div>
                    <label htmlFor="" className="font-semibold">
                      Profile Image
                    </label>
                    <div className="flex space-x-3 pt-2 items-center">
                      <div>
                        {previewImage ? (
                          <div>
                            <img
                              className="h-13 w-15 rounded-full"
                              src={previewImage}
                              alt=""
                            />
                          </div>
                        ) : currentUser && currentUser.avatar ? (
                          <div>
                            <img
                              className="h-13 w-15 rounded-full"
                              src={currentUser.avatar}
                              alt=""
                            />
                          </div>
                        ) : (
                          <div
                            className="p-1 h-13 w-13 rounded-full"
                            style={{
                              backgroundColor:
                                currentUser && currentUser.color
                                  ? currentUser.color
                                  : "white",
                            }}
                          >
                            <div className="w-full h-full rounded-full flex items-center justify-center capitalize font-bold lg:text-2xl text-white">
                              <p>
                                {currentUser && currentUser.username.charAt(0)}
                              </p>
                            </div>
                          </div>
                        )}
                      </div>
                      <div className="rounded-md border w-full flex space-x-1.5 items-center border-gray-200 p-3">
                        <input
                          type="file"
                          className="hidden"
                          onChange={regChange}
                          accept="image/*"
                          name="avatar"
                          ref={fileInputRef}
                        />
                        <button
                          onClick={() => {
                            fileInputRef.current.click();
                          }}
                          className="bg-[#efefef] lg:px-4 px-2 lg:text-md text-sm py-2 rounded-md cursor-pointer transition-all font-semibold hover:bg-gray-300"
                        >
                          Choose File
                        </button>
                        <p className="text-gray-600 lg:text-md text-sm">
                          {previewImageName
                            ? previewImageName
                            : "No file chosen"}
                        </p>
                      </div>
                    </div>
                  </div>
                  <button
                    onClick={handleSubmit}
                    disabled={loading}
                    className={` mt-5  transition-all ${
                      loading
                        ? "bg-blue-400 cursor-not-allowed"
                        : "bg-[#3b49df] hover:bg-blue-800 cursor-pointer"
                    }  w-full rounded-md text-white py-2 font-semibold`}
                  >
                    {loading ? "Loading..." : "Save Profile Information"}
                  </button>
                </div>
              </div>
            </form>
            <form action="" onSubmit={handleChangePassword}>
              <div className="border mt-5 lg:w-[65%] bg-white border-gray-200 rounded-md p-6">
                <h2 className="text-2xl font-bold">Change Password</h2>
                <div className="pt-6">
                  <div className="flex flex-col pb-5">
                    <label htmlFor="" className="mb-1.5 font-semibold">
                      Old Password
                    </label>
                    <input
                      type="password"
                      name="oldPassword"
                      value={passForm.oldPassword}
                      onChange={passChange}
                      className="lg:min-w-135 rounded-md border focus:outline-blue-700 focus:outline-2 border-gray-300 ps-1.5 py-2 outline-0 placeholder:text-sm placeholder:text-gray-600"
                    />
                  </div>
                  <div className="flex flex-col pb-5">
                    <label htmlFor="" className="mb-1.5 font-semibold">
                      New Password
                    </label>
                    <input
                      type="password"
                      name="newPassword"
                      value={passForm.newPassword}
                      onChange={passChange}
                      className="lg:min-w-135 rounded-md border border-gray-300 focus:outline-blue-700 focus:outline-2 ps-1.5 py-2 outline-0 placeholder:text-sm placeholder:text-gray-600"
                    />
                  </div>
                  <div className="flex flex-col pb-5">
                    <label htmlFor="" className="mb-1.5 font-semibold">
                      Confirm Password
                    </label>
                    <input
                      type="password"
                      value={confirmPassword}
                      onChange={(e) => {
                        setConfirmPassword(e.target.value);
                      }}
                      className="lg:min-w-135 rounded-md border border-gray-300 focus:outline-blue-700 focus:outline-2 ps-1.5 py-2 outline-0 placeholder:text-sm placeholder:text-gray-600"
                    />
                  </div>
                  <button
                    disabled={passLoading}
                    className={` mt-5  transition-all ${
                      passLoading
                        ? "bg-blue-400 cursor-not-allowed"
                        : "bg-[#3b49df] hover:bg-blue-800 cursor-pointer"
                    }  w-full rounded-md text-white py-2 font-semibold`}
                  >
                    {passLoading ? "Loading..." : "Change Password"}
                  </button>
                </div>
              </div>
            </form>
          </div>
        ) : (
          <div className="flex border border-gray-200 bg-white py-25 rounded-md mt-4.5 items-center justify-center">
            <h2 className="text-gray-600 animate-pulse">
              Oga commot from here....
            </h2>
          </div>
        )}
      </div>
      <ToastContainer />
    </div>
  );
}

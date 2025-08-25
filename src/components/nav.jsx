import { useEffect, useRef, useState } from "react";
import { FiSearch } from "react-icons/fi";
import { Link } from "react-router-dom";
import { FiMenu } from "react-icons/fi";
import { FaXTwitter } from "react-icons/fa6";
import { FaFacebookSquare } from "react-icons/fa";
import { FaGithub } from "react-icons/fa6";
import { AiFillInstagram } from "react-icons/ai";
import { LuTwitch } from "react-icons/lu";
import { SiMcdonalds } from "react-icons/si";
import { PiButterflyFill } from "react-icons/pi";
import { HiXMark } from "react-icons/hi2";
import { useGlobal } from "../context/globalContext";
import { RiNotification3Line } from "react-icons/ri";
import { toast, ToastContainer } from "react-toastify";

const Navbar = () => {
  const {
    path,
    navigate,
    dropDown,
    token,
    currentUser,
    setDropDown,
    logoutUser,
    currentUserId,
    getAllPosts,
  } = useGlobal();
  const [isBlue, setIsBlue] = useState(false);
  const [navDropDown, setNavDropDown] = useState(false);
  const dropdownRef = useRef(null);
  const navRef = useRef(null);
  const [display, setDisplay] = useState(false);
  const array = [
    {
      emo: "🏠",
      text: "Home",
    },
    {
      emo: "🔩",
      text: "Settings",
    },
    {
      emo: "🎙️",
      text: "Podcasts",
    },
    {
      emo: "📽️",
      text: "Videos",
    },
    {
      emo: "🏷️",
      text: "Tags",
    },
    {
      emo: "🎓",
      text: "DEV Education Tracks",
    },
    {
      emo: "🏆",
      text: "DEV Challenges",
    },
    {
      emo: "💡",
      text: "DEV Help",
    },
    {
      emo: "💓",
      text: "Advertise on DEV",
    },
    {
      emo: "✨",
      text: "DEV Showcase",
    },
    {
      emo: "😎",
      text: "About",
    },
    {
      emo: "🎺",
      text: "Contact",
    },
    {
      emo: "🐘",
      text: "Free Postgres Database",
    },
    {
      emo: "🤔",
      text: "Software comparisons",
    },
    {
      emo: "🛍️",
      text: "Forem Shop",
    },
  ];
  useEffect(() => {
    setDropDown(false);
    setDisplay(false);
  }, [navigate]);
  useEffect(() => {
    function handleClickOutside(event) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setDropDown(false);
      }
    }
    if (dropDown) {
      document.addEventListener("mousedown", handleClickOutside);
    }

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [dropDown]);

  useEffect(() => {
    function handleClickOutside(event) {
      if (navRef.current && !navRef.current.contains(event.target)) {
        setNavDropDown(false);
      }
    }
    if (navDropDown) {
      document.addEventListener("mousedown", handleClickOutside);
    }

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [navDropDown]);
  const handleLogout = async () => {
    try {
      await logoutUser();
      localStorage.removeItem("token");
      localStorage.setItem("actives", "discover")
      toast.success("Logout Sucessful", { autoClose: 1500 });
      await getAllPosts()
      setTimeout(() => {
        navigate("/");
      }, 2000);
    } catch (error) {
      toast.error("An Error Occured", { autoClose: 1500 });
    }
  };
  return (
    <>
      <ToastContainer />
      <div
        className={`fixed hidden lg:block w-[96%] ml-[4%] z-20 ${
          path === "/register" || path === "/login" || path === "/new"
            ? "lg:hidden"
            : ""
        }`}
      >
        <div className="flex justify-between items-center px-3 py-3  bg-white shadow-sm w-full">
          <div className="flex space-x-2.5 w-[65%]">
            <Link to={"/"}>
              <div>
                <img
                  src="https://media2.dev.to/dynamic/image/quality=100/https://dev-to-uploads.s3.amazonaws.com/uploads/logos/resized_logo_UQww2soKuUsjaOGNB38o.png"
                  className="h-10 w-12 rounded"
                  alt=""
                />
              </div>
            </Link>
            <div
              onFocus={() => {
                setIsBlue(true);
              }}
              onBlur={() => {
                setIsBlue(false);
              }}
              className={`border rounded-md  focus:border-2 space-x-3  flex items-center justify-between lg:w-full ${
                isBlue
                  ? "border-blue-700 border-2"
                  : "border-gray-300 hover:border-gray-400"
              }`}
            >
              <div className="w-[85%] flex space-x-1">
                <div className="py-2 px-2 hover:text-blue-800 hover:bg-blue-100 cursor-pointer transition-all rounded">
                  <FiSearch size={22} />
                </div>
                <div className="w-full">
                  <input
                    type="text"
                    className="w-full py-1.5 outline-0 placeholder:text-md placeholder:font-semibold"
                    placeholder="Search..."
                  />
                </div>
              </div>
              <div className="w-[15%] mt-1.5 pe-1">
                <span className="text-[11px] text-gray-600 flex">
                  Powered by Algolia
                </span>
              </div>
            </div>
          </div>
          {token ? (
            <div
              className={`flex space-x-2.5 w-[30%] items-center justify-end`}
            >
              <Link
                to={"/new"}
                className="border rounded-md border-blue-600 transition-all text-blue-600 hover:bg-blue-600 hover:text-white hover:underline py-1.5 px-3 font-semibold"
              >
                Create Post
              </Link>
              <div className="py-2 px-2 hover:text-blue-800 relative hover:bg-blue-100 cursor-pointer transition-all rounded">
                <RiNotification3Line size={24} />
                <div className="rounded-full text-white h-3 w-3 absolute top-1 right-1 bg-red-500 p-2 flex items-center justify-center text-[10px] font-semibold">
                  1
                </div>
              </div>
              <div
                ref={dropdownRef}
                onClick={() => {
                  setDropDown((prev) => !prev);
                  setNavDropDown((prev) => !prev);
                }}
                className="rounded-full cursor-pointer hover:bg-blue-100 transition-all p-1"
              >
                {currentUser && currentUser.avatar ? (
                  <div className="rounded-full h-9 w-9">
                    <img
                      className="rounded-full h-full w-full"
                      src={currentUser && currentUser.avatar}
                      alt=""
                    />
                  </div>
                ) : (
                  <div
                    className="h-9 w-9 rounded-full"
                    style={{
                      backgroundColor:
                        currentUser && currentUser.color
                          ? currentUser.color
                          : "white",
                    }}
                  >
                    <div className="w-full h-full rounded-full flex items-center justify-center capitalize font-bold lg:text-2xl text-white">
                      <p>{currentUser && currentUser.username.charAt(0)}</p>
                    </div>
                  </div>
                )}
                {dropDown && (
                  <div className="py-2 px-1.5 min-w-77 bg-white absolute top-15 right-4.5 rounded-md border border-gray-200 shadow-xl">
                    <div className="pb-2 border-b mb-1.5 border-gray-300">
                      <Link to={`/user/${currentUserId}`}>
                        <div className="rounded-md border-blue-800 text-gray-600 cursor-pointer transition-all hover:text-blue-800 hover:bg-blue-100 hover:underline py-1.5 px-4">
                          <h2 className="font-semibold">
                            {currentUser ? currentUser.username : ""}
                          </h2>
                          <p className="text-sm">
                            {currentUser ? currentUser.email : ""}
                          </p>
                        </div>
                      </Link>
                    </div>
                    <div className="space-y w-full text-gray-600 border-b pb-2 border-gray-300">
                      <Link to={"/dashboard"}>
                        <div className="w-full px-4 py-2 cursor-pointer rounded-md transition-all hover:bg-blue-100 hover:underline  hover:text-blue-800">
                          Dashboard
                        </div>
                      </Link>
                      <Link to={"/new"}>
                        <div className="w-full px-4 py-2 cursor-pointer rounded-md transition-all hover:bg-blue-100 hover:underline  hover:text-blue-800">
                          Create Post
                        </div>
                      </Link>
                      <div className="w-full px-4 py-2 cursor-pointer rounded-md transition-all hover:bg-blue-100 hover:underline  hover:text-blue-800">
                        <Link>Reading List</Link>
                      </div>
                      <Link to={"/settings"}>
                        <div className="w-full px-4 py-2 cursor-pointer rounded-md transition-all hover:bg-blue-100 hover:underline  hover:text-blue-800">
                          Settings
                        </div>
                      </Link>
                    </div>
                    <div className="pt-2 text-gray-600">
                      <div
                        onClick={handleLogout}
                        className="w-full px-4 py-2 cursor-pointer rounded-md transition-all hover:bg-blue-100 hover:underline  hover:text-blue-800"
                      >
                        Sign Out
                      </div>
                    </div>
                  </div>
                )}
              </div>
            </div>
          ) : (
            <div className="flex space-x-2.5 w-[30%] items-center justify-end">
              <Link
                to={"/login"}
                className="py-2 px-3 rounded-md transition-all hover:bg-blue-100 hover:text-blue-800 hover:underline"
              >
                Log in
              </Link>
              <Link
                to={"/register"}
                className="border rounded-md border-blue-600 transition-all text-blue-600 hover:bg-blue-600 hover:text-white hover:underline py-1.5 px-3 font-semibold"
              >
                Create Account
              </Link>
            </div>
          )}
        </div>
      </div>
      <div
        className={`mr-0 w-full lg:hidden flex items-center fixed justify-between shadow-sm z-20 top-0 bg-white  p-3 ${
          path === "/register" || path === "/login" || path === "/new"
            ? "hidden"
            : ""
        }`}
      >
        <div className="flex items-center space-x-2">
          <div
            onClick={() => {
              setDisplay(true);
            }}
            className="p-2 hover:text-blue-800 hover:bg-blue-100 cursor-pointer transition-all rounded"
          >
            <FiMenu size={24} />
          </div>
          <Link to={"/"}>
            <div>
              <img
                src="https://media2.dev.to/dynamic/image/quality=100/https://dev-to-uploads.s3.amazonaws.com/uploads/logos/resized_logo_UQww2soKuUsjaOGNB38o.png"
                className="h-10 w-12 rounded"
                alt=""
              />
            </div>
          </Link>
        </div>

        {token ? (
          <div className="flex space-x-2.5 w-[30%] items-center justify-end">
            <div className="py-2 px-2 hover:text-blue-800 hover:bg-blue-100 cursor-pointer transition-all rounded">
              <FiSearch size={22} />
            </div>
            <div className="py-2 px-2 hover:text-blue-800 relative hover:bg-blue-100 cursor-pointer transition-all rounded">
              <RiNotification3Line size={24} />
              <div className="rounded-full text-white h-3 w-3 absolute top-1 right-1 bg-red-500 p-2 flex items-center justify-center text-[10px] font-semibold">
                1
              </div>
            </div>
            <div
              ref={navRef}
              onClick={() => {
                setNavDropDown((prev) => !prev);
              }}
              className="rounded-full cursor-pointer hover:bg-blue-100 transition-all p-1"
            >
              {currentUser && currentUser.avatar ? (
                <div className="rounded-full h-9 w-9">
                  <img
                    className="rounded-full h-full w-full"
                    src={currentUser && currentUser.avatar}
                    alt=""
                  />
                </div>
              ) : (
                <div
                  className="h-9 w-9 rounded-full"
                  style={{
                    backgroundColor:
                      currentUser && currentUser.color
                        ? currentUser.color
                        : "white",
                  }}
                >
                  <div className="w-full h-full rounded-full flex items-center justify-center capitalize font-bold lg:text-2xl text-white">
                    <p>{currentUser && currentUser.username.charAt(0)}</p>
                  </div>
                </div>
              )}
              {navDropDown && (
                <div className="py-2 px-1.5 min-w-77 lg:hidden bg-white absolute top-15 right-4.5 rounded-md border border-gray-200 shadow-xl">
                  <Link to={`/user/${currentUserId}`}>
                    <div className="pb-2 border-b mb-1.5 border-gray-300">
                      <div className="rounded-md border-blue-800 text-gray-600 cursor-pointer transition-all hover:text-blue-800 hover:bg-blue-100 hover:underline py-1.5 px-4">
                        <h2 className="font-semibold">
                          {currentUser ? currentUser.username : ""}
                        </h2>
                        <p className="text-sm">
                          {currentUser ? currentUser.email : ""}
                        </p>
                      </div>
                    </div>
                  </Link>
                  <div className="space-y w-full text-gray-600 border-b pb-2 border-gray-300">
                    <Link to={"/dashboard"}>
                      <div className="w-full px-4 py-2 cursor-pointer rounded-md transition-all hover:bg-blue-100 hover:underline  hover:text-blue-800">
                        Dashboard
                      </div>
                    </Link>
                    <Link to={"/new"}>
                      <div className="w-full px-4 py-2 cursor-pointer rounded-md transition-all hover:bg-blue-100 hover:underline  hover:text-blue-800">
                        Create Post
                      </div>
                    </Link>
                    <div className="w-full px-4 py-2 cursor-pointer rounded-md transition-all hover:bg-blue-100 hover:underline  hover:text-blue-800">
                      <Link>Reading List</Link>
                    </div>
                    <Link to={"/settings"}>
                      <div className="w-full px-4 py-2 cursor-pointer rounded-md transition-all hover:bg-blue-100 hover:underline  hover:text-blue-800">
                        Settings
                      </div>
                    </Link>
                  </div>
                  <div className="pt-2 text-gray-600">
                    <div
                      onClick={handleLogout}
                      className="w-full px-4 py-2 cursor-pointer rounded-md transition-all hover:bg-blue-100 hover:underline  hover:text-blue-800"
                    >
                      Sign Out
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>
        ) : (
          <div>
            <Link
              to={"/register"}
              className="border rounded-md border-blue-800 transition-all text-blue-800 hover:bg-blue-800 hover:text-white hover:underline py-1.5 px-3 font-semibold"
            >
              Create Account
            </Link>
          </div>
        )}
      </div>
      <div
        className={`fixed h-screen z-150 top-0 w-full lg:hidden  bg-[#00000049] ${
          display ? "block" : "hidden"
        }`}
      ></div>
      <div
        className={`bg-white w-[45%] fixed z-220 h-screen top-0 lg:hidden px-2 py-1 overflow-y-scroll -left-[100%] transition-all ${
          display ? "left-0" : ""
        }`}
      >
        <div className=" flex justify-between items-center py-2 px-3">
          <h2 className="font-bold md:text-xl text-[13px]">DEV Comunity</h2>
          <div
            onClick={() => {
              setDisplay(false);
            }}
            className="py-1 px-2 rounded hover:bg-blue-100 cursor-pointer hover:text-blue-800"
          >
            <HiXMark className="md:text-[15px] text-[13px]" />
          </div>
        </div>
        <div className="py-1.5">
          <div className="bg-gray-100 font-semibold transition-all hover:bg-gray-300 space-x-2 items-center rounded-md py-2 px-3 cursor-pointer flex">
            <div>
              <FiSearch size={22} />
            </div>
            <p className="text-sm">Search...</p>
          </div>
        </div>
        <div className="py-3">
          <div className="flex flex-col">
            {array.map((a, index) => {
              return (
                <Link
                  to={index === 0 ? "/" : "/settings"}
                  key={index}
                  className="py-2 flex space-x-2 w-full px-3  text-[11px] rounded-md transition-all hover:bg-blue-100  myStyle hover:text-blue-800"
                >
                  <p>{a.emo}</p>
                  <span>{a.text}</span>
                </Link>
              );
            })}
          </div>
        </div>
        <div className="py-3">
          <h3 className="font-bold pb-1.5 text-xl px-3">other</h3>
          <div className="flex flex-col text-[11px]">
            <Link className="py-2 flex space-x-2 w-full px-3 rounded-md transition-all hover:bg-blue-100  myStyle hover:text-blue-800">
              <p>👍</p>
              <span>Code of Conduct</span>
            </Link>
            <Link className="py-2 flex space-x-2 w-full px-3 rounded-md transition-all hover:bg-blue-100  myStyle hover:text-blue-800">
              <p>🤓</p>
              <span>Privacy Policy</span>
            </Link>
            <Link className="py-2 flex space-x-2 w-full px-3 rounded-md transition-all hover:bg-blue-100  myStyle hover:text-blue-800">
              <p>👀</p>
              <span>Terms of Use</span>
            </Link>
          </div>
        </div>
        <div className="py-2 text-[13px] text-gray-700">
          <div className="grid grid-cols-3 space-x-1">
            <div className="hover:bg-blue-100 px-3 py-1.5 rounded transition-all hover:text-blue-800">
              <FaXTwitter />
            </div>
            <div className="hover:bg-blue-100 px-3 py-1.5 rounded transition-all hover:text-blue-800">
              <FaFacebookSquare />
            </div>
            <div className="hover:bg-blue-100 px-3 py-1.5 rounded transition-all hover:text-blue-800">
              <FaGithub />
            </div>
            <div className="hover:bg-blue-100 px-3 py-1.5 rounded transition-all hover:text-blue-800">
              <AiFillInstagram />
            </div>
            <div className="hover:bg-blue-100 px-3 py-1.5 rounded transition-all hover:text-blue-800">
              <LuTwitch />
            </div>
            <div className="hover:bg-blue-100 px-3 py-1.5 rounded transition-all hover:text-blue-800">
              <SiMcdonalds />
            </div>
            <div className="hover:bg-blue-100 px-3 py-1.5 rounded transition-all hover:text-blue-800">
              <PiButterflyFill />
            </div>
          </div>
        </div>
      </div>
    </>
  );
};
export default Navbar;

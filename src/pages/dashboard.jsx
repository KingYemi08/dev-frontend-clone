import { useEffect, useState } from "react";
import { MdOutlineDoubleArrow } from "react-icons/md";
import DashboardMain from "../components/dashboardMain";
import { useGlobal } from "../context/globalContext";

export default function Dashboard() {
  const [isActive, setIsActive] = useState(() => {
    const active = localStorage.getItem("active");
    return active;
  });
  const {
    userPost,
    userFollowers,
    userFollowing,
    path,
    currentUser,
    navigate,
  } = useGlobal();
  return (
    <div className="py-4.5 px-1">
      <div>
        <h2 className="font-bold flex space-x-2 text-3xl lg:pb-4 items-center">
          Dashboard{" "}
          {isActive === "comments" ? (
            <span className="flex items-center">
              <MdOutlineDoubleArrow size={20} className="ml-2" />
              <span className="ml-2">Comments</span>
            </span>
          ) : isActive === "followers" ? (
            <span className="flex items-center">
              <MdOutlineDoubleArrow size={20} className="ml-2" />
              <span className="ml-2">Followers</span>
            </span>
          ) : isActive === "following" ? (
            <span className="flex items-center">
              <MdOutlineDoubleArrow size={20} className="ml-2" />
              <span className="ml-2">Following</span>
            </span>
          ) : (
            ""
          )}
        </h2>
        <div className="py-2.5">
          <select
            name=""
            className="w-full ps-1 py-2.5 lg:hidden bg-white border outline-0 border-gray-200 rounded-md"
            id=""
            onChange={(e) => {
              setIsActive(e.target.value);
            }}
          >
            <option value="posts">Posts ({userPost && userPost.length})</option>
            <option value={isActive}>Series</option>
            <option value="comments">
              Comments ({currentUser && currentUser.comment.length})
            </option>
            <option value="followers">
              Followers ({userFollowers && userFollowers.length})
            </option>
            <option value="following">
              Following ({userFollowing && userFollowing.length})
            </option>
            <option value={isActive}>Following Organisation (0)</option>
            <option value={isActive}>Analytics (0)</option>
            <option value={isActive}>Hidden Tags (0)</option>
          </select>
        </div>
        <div
          className={`${
            isActive === "posts" ? "grid" : "hidden"
          } lg:grid-cols-3 md:grid-cols-2 grid-cols-1 gap-4`}
        >
          <div className="bg-white rounded-md border border-gray-200 py-6 px-6 ">
            <h2 className="text-3xl font-bold">
              {userPost && userPost.length}
            </h2>
            <p className="text-gray-600 pt-1">Total Posts</p>
          </div>
          <div className="bg-white rounded-md border border-gray-200 py-6 px-6 ">
            <h2 className="text-3xl font-bold">
              {currentUser && currentUser.comment.length}
            </h2>
            <p className="text-gray-600 pt-1">Total Comments</p>
          </div>
          <div className="bg-white rounded-md border border-gray-200 py-6 px-6 ">
            <h2 className="text-3xl font-bold">
              {userFollowers && userFollowers.length}
            </h2>
            <p className="text-gray-600 pt-1">Total Followers</p>
          </div>
        </div>
        <div className="py-3 lg:flex lg:space-x-4">
          <div className="lg:w-[22%] lg:block hidden">
            <div
              onClick={() => {
                localStorage.setItem("active", "posts");
                setIsActive("posts");
              }}
              className={`flex ne cursor-pointer px-2 py-2 items-center transition-all rounded justify-between ${
                isActive === "posts" ? "bg-white" : "hover:bg-blue-100"
              }`}
            >
              <h2 className={`${isActive === "posts" ? "font-semibold" : ""}`}>
                Posts
              </h2>
              <div className="bg-[#d4d4d4] text-gray-600 rounded-md px-1">
                <span>{userPost.length}</span>
              </div>
            </div>
            <div
              className={`flex ne cursor-pointer pe- ps-2 py-2 hover:bg-blue-100 items-center transition-all rounded justify-between`}
            >
              <h2>Series</h2>
              <div></div>
            </div>
            <div
              onClick={() => {
                localStorage.setItem("active", "comments");
                setIsActive("comments");
              }}
              className={`flex ne cursor-pointer px-2 py-2 items-center transition-all rounded justify-between ${
                isActive === "comments" ? "bg-white" : "hover:bg-blue-100"
              }`}
            >
              <h2
                className={`${isActive === "comments" ? "font-semibold" : ""}`}
              >
                Comments
              </h2>
              <div className="bg-[#d4d4d4] text-gray-600 rounded-md px-1">
                <span>{currentUser && currentUser.comment.length}</span>
              </div>
            </div>
            <div
              onClick={() => {
                localStorage.setItem("active", "followers");
                setIsActive("followers");
              }}
              className={`flex ne cursor-pointer px-2 py-2 items-center transition-all rounded justify-between ${
                isActive === "followers" ? "bg-white" : "hover:bg-blue-100"
              }`}
            >
              <h2
                className={`${isActive === "followers" ? "font-semibold" : ""}`}
              >
                Followers
              </h2>
              <div className="bg-[#d4d4d4] text-gray-600 rounded-md px-1">
                <span>{userFollowers && userFollowers.length}</span>
              </div>
            </div>
            <div
              onClick={() => {
                localStorage.setItem("active", "following");
                setIsActive("following");
              }}
              className={`flex ne cursor-pointer px-2 py-2 items-center transition-all rounded justify-between ${
                isActive === "following" ? "bg-white" : "hover:bg-blue-100"
              }`}
            >
              <h2
                className={`${isActive === "following" ? "font-semibold" : ""}`}
              >
                Following
              </h2>
              <div className="bg-[#d4d4d4] text-gray-600 rounded-md px-1">
                <span>{userFollowing && userFollowing.length}</span>
              </div>
            </div>
            <div
              className={`flex ne cursor-pointer px-2 py-2 hover:bg-blue-100 items-center transition-all rounded justify-between`}
            >
              <h2>Following organizations</h2>
              <div className="bg-[#d4d4d4] text-gray-600 rounded-md px-1">
                <span>0</span>
              </div>
            </div>
            <div
              className={`flex ne cursor-pointer pe- ps-2 py-2 hover:bg-blue-100 items-center transition-all rounded justify-between`}
            >
              <h2>Analytics</h2>
              <div></div>
            </div>
            <div
              className={`flex ne cursor-pointer px-2 py-2 hover:bg-blue-100 items-center transition-all rounded justify-between`}
            >
              <h2>Hidden Tags</h2>
              <div className="bg-[#d4d4d4] text-gray-600 rounded-md px-1">
                <span>0</span>
              </div>
            </div>
          </div>
          <div className="lg:w-[78%]">
            <DashboardMain active={isActive} />
          </div>
        </div>
      </div>
    </div>
  );
}

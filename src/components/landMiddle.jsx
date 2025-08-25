import { FaRegComment } from "react-icons/fa6";
import { GoBookmark } from "react-icons/go";
import { Link } from "react-router-dom";
import { useGlobal } from "../context/globalContext";
import { useEffect, useState } from "react";
import Loader from "./loader";

export default function LandMiddle() {
  const {
    token,
    posts,
    loading,
    error,
    getAllPosts,
    getPostsForFollowing,
    currentUser,
    getAllUsers,
    users,
  } = useGlobal();
  const [isFull, setIsFull] = useState(false);
  const [reversedPost, setReversedPost] = useState([]);
  const [active, setActive] = useState(() => {
    const active = localStorage.getItem("actives");
    if (active) return active;
    return "discover";
  });

  useEffect(() => {
    if (active === "discover") {
      getAllPosts();
    } else if (active === "following") {
      getPostsForFollowing();
    }
  }, [active]);

  useEffect(() => {
    if (active === "discover") {
      getAllPosts();
    }
  }, []);

  useEffect(() => {
    getAllUsers();
  }, []);

  // useEffect(() => {
  //   const reversedPost = posts.reverse();
  //   setReversedPost(reversedPost);
  // }, [posts]);
  if (loading) return <Loader />;
  if (error)
    return (
      <div className="min-h-[83vh] flex items-center justify-center">
        <p className="text-red-500 font-semibold text-2xl">{error}</p>
      </div>
    );
  if (
    active === "following" &&
    currentUser &&
    currentUser.following.length === 0
  )
    return (
      <div>
        <div className="flex space-x-2 pb-3">
          <p
            onClick={() => {
              localStorage.setItem("actives", "discover");
              setActive("discover");
            }}
            className={`hover:bg-white px-2.5 py-0.5 ${
              active === "discover" ? "font-bold" : ""
            } cursor-pointer hover:text-blue-800 text-xl rounded-md `}
          >
            Discover
          </p>
          <p
            onClick={() => {
              localStorage.setItem("actives", "following");
              setActive("following");
            }}
            className={`"hover:bg-white px-2.5 py-0.5 ${
              active === "following" ? "font-bold" : ""
            } cursor-pointer hover:text-blue-800 text-xl rounded-md`}
          >
            Following
          </p>
        </div>
        <div className="min-h-[70vh] flex flex-col items-center justify-center">
          <p className="text-gray-600 font-semibold">
            {currentUser.username} is not following anyone
          </p>
        </div>
      </div>
    );
  return (
    <div className="lg:py-2">
      {token ? (
        <div>
          <div className="py-2">
            <div className="bg-white rounded-md p-2.5">
              <input
                onFocus={() => {
                  setIsFull(true);
                }}
                onBlur={() => {
                  setIsFull(false);
                }}
                placeholder="What's on your mind"
                type="text"
                className="border border-gray-200 rounded ps-2 py-1.5 focus:outline-2 w-full focus:outline-blue-500"
              />
              {isFull && (
                <div className="flex justify-between pt-3 items-center">
                  <p className="text-[11px] text-gray-600">
                    <span className="font-semibold">Quick post(beta)</span>{" "}
                    showup in the feed but not notifcation or profile{" "}
                    <Link to={"/new"} className="text-blue-500">
                      {" "}
                      - Open full Editor
                    </Link>
                  </p>
                  <button className="bg-blue-600 hover:bg-blue-800 px-4 py-1 rounded transition-all cursor-pointer font-semibold text-white">
                    Post
                  </button>
                </div>
              )}
            </div>
          </div>
          <div className="flex space-x-2 pb-3">
            <p
              onClick={() => {
                localStorage.setItem("actives", "discover");
                setActive("discover");
              }}
              className={`hover:bg-white px-2.5 py-0.5 ${
                active === "discover" ? "font-bold" : ""
              } cursor-pointer hover:text-blue-800 text-xl rounded-md `}
            >
              Discover
            </p>
            <p
              onClick={() => {
                localStorage.setItem("actives", "following");
                setActive("following");
              }}
              className={`"hover:bg-white px-2.5 py-0.5 ${
                active === "following" ? "font-bold" : ""
              } cursor-pointer hover:text-blue-800 text-xl rounded-md`}
            >
              Following
            </p>
          </div>
        </div>
      ) : (
        <div className="flex space-x-2 pb-3">
          <p className="hover:bg-white px-2.5 py-0.5 font-semibold cursor-pointer hover:text-blue-800 text-xl rounded-md ">
            Latest
          </p>
          <p className="hover:bg-white px-2.5 py-0.5 font-light cursor-pointer hover:text-blue-800 text-xl rounded-md ">
            Relevant
          </p>
          <p className="hover:bg-white px-2.5 py-0.5 font-light cursor-pointer hover:text-blue-800 text-xl rounded-md ">
            Top
          </p>
        </div>
      )}
      <div className="w-full flex flex-col space-y-6">
        {posts.map((p, index) => {
          return (
            <Link
              key={index}
              to={`/${p._id}`}
              className="bg-white rounded border overflow-hidden border-gray-200"
            >
              <div className="w-full">
                <img className="w-full" src={p.image || null} alt="" />
              </div>
              <div className="py-5 px-4">
                <div className="flex space-x-2">
                  {p.userId.avatar ? (
                    <div className="h-9 w-9">
                      <img
                        className="rounded-full h-full w-full"
                        src={p.userId.avatar}
                        alt=""
                      />
                    </div>
                  ) : (
                    <div
                      className=" h-9 w-9 rounded-full"
                      style={{
                        backgroundColor: p.userId.color
                          ? p.userId.color
                          : "white",
                      }}
                    >
                      <div className="w-full h-full text-xl rounded-full flex items-center justify-center capitalize font-bold text-white">
                        <p>{p.userId.username.charAt(0)}</p>
                      </div>
                    </div>
                  )}
                  <div className="flex flex-col text-sm">
                    <span className="font-semibold text-gray-600">
                      {p.userId.username}
                    </span>
                    <span className="text-gray-600 text-[11px] mt-0.5">
                      {p.createdAt.slice(0, 10)}
                    </span>
                  </div>
                </div>
                <div className="ps-10.5 pt-2">
                  <h2 className="font-bold text-2xl">{p.title}</h2>
                  <div className="py-1.5 flex space-x-3 text-sm text-gray-600">
                    <p className="cursor-pointer">#discuss</p>
                    <p className="cursor-pointer">#jokes</p>
                    <p className="cursor-pointer">#watercooler</p>
                  </div>
                  <div className="flex justify-between items-center py-2">
                    <div className="flex justify-between space-x-12 items-center">
                      {/* <div className="hover:px-1.5 py-1 flex items-center space-x-0.5 transition-all cursor-pointer hover:bg-gray-100 rounded">
                        <div className="flex">
                          <p className="bg-gray-200 rounded-full z-4 h-7 w-7 items-center flex justify-center">
                            💖
                          </p>
                          <p className="bg-gray-200 rounded-full z-3 relative -left-2 h-7 w-7 items-center flex justify-center">
                            😎
                          </p>
                          <p className="bg-gray-200 rounded-full z-2 relative -left-4 h-7 w-7 items-center flex justify-center">
                            👀
                          </p>
                          <p className="bg-gray-200 rounded-full relative -left-6 h-7 w-7 items-center flex justify-center">
                            👍
                          </p>
                        </div>
                        <p className="text-gray-600 text-sm">12 reactions</p>
                      </div> */}
                      <div className="flex space-x-2 items-center transition-all cursor-pointer hover:bg-gray-100 px-2 py-1.5 rounded">
                        <FaRegComment />
                        <h2 className="text-sm text-gray-600">
                          {p.comment.length} comments
                        </h2>
                      </div>
                    </div>
                    <div className="flex space-x-2.5 items-center pe-4">
                      <p className="text-gray-600 text-sm">1 min read</p>
                      <div className="p-1.5 hover:bg-blue-100 rounded transition-all cursor-pointer">
                        <GoBookmark size={20} />
                      </div>
                    </div>
                  </div>
                </div>
                {p.comment.length !== 0 && (
                  <div className="flex space-x-1 py-1.5">
                    {users &&
                    users.find((u) => u._id === p.comment[0].userId) &&
                    users.find((u) => u._id === p.comment[0].userId).avatar ? (
                      <div className="h-7 w-7">
                        <img
                          className="rounded-full h-full w-full"
                          src={
                            users.find((u) => u._id === p.comment[0].userId)
                              .avatar
                          }
                          alt=""
                        />
                      </div>
                    ) : (
                      <div
                        className="lg:p-2 p-1 h-9 w-9 rounded-full"
                        style={{
                          backgroundColor:
                            users &&
                            users.find((u) => u._id === p.comment[0].userId) &&
                            users.find((u) => u._id === p.comment[0].userId)
                              .color
                              ? users.find((u) => u._id === p.comment[0].userId)
                                  .color
                              : "white",
                        }}
                      >
                        <div className="w-full h-full rounded-full flex items-center justify-center capitalize font-bold text-white">
                          <p>
                            {users &&
                              users.find(
                                (u) => u._id === p.comment[0].userId
                              ) &&
                              users
                                .find((u) => u._id === p.comment[0].userId)
                                .username.charAt(0)}
                          </p>
                        </div>
                      </div>
                    )}
                    <div className="bg-[#f6f6f6] w-full p-3.5 rounded">
                      <div className="flex space-x-3 text-sm text-gray-600">
                        <h2 className="font-semibold">
                          {users &&
                            users.find((u) => u._id === p.comment[0].userId) &&
                            users.find((u) => u._id === p.comment[0].userId)
                              .username}
                        </h2>
                        <p className="text-sm">
                          {p.comment[0].createdAt.slice(0, 10)}
                        </p>
                      </div>
                      <div className="py-2">
                        <p className="text-gray-600 text-sm">
                          {p.comment[0].content
                            ? p.comment[0].content
                            : "This is Serious"}
                        </p>
                      </div>
                    </div>
                  </div>
                )}
              </div>
            </Link>
          );
        })}
      </div>
    </div>
  );
}

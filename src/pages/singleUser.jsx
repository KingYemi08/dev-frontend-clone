import { FaRegComment } from "react-icons/fa6";
import { GoBookmark } from "react-icons/go";
import { PiDotsThreeBold } from "react-icons/pi";
import { Link, useParams } from "react-router-dom";
import { useGlobal } from "../context/globalContext";
import { useEffect, useState } from "react";
import Loader from "../components/loader";
import { ToastContainer, toast } from "react-toastify";

export default function SingleUser() {
  const array = [
    {
      title: "Skills/Languages",
      content:
        "Python (Django, FastAPI, Flask), JS/TS (React, Next.js, Node.js), REST/GraphQL APIs, scalable full-stack apps. Backend-leaning generalist.",
    },
    {
      title: "Currently learning",
      content:
        "Learning advanced TypeScript, GraphQL, and optimizing Next.js apps. Exploring tRPC and Supabase. Always sharpening backend skills with FastAPI & Django.",
    },
    {
      title: "Currently hacking on",
      content:
        "Hacking on a full-stack app using Django, FastAPI, and Next.js with tRPC. Exploring Web3 integrations and optimizing performance across frontend/backend.",
    },
    {
      title: "Available for",
      content:
        "Available for freelance projects, remote dev roles, tech writing collaborations, or just geeking out about Python, React, or Web3. Say hi if you're building something cool!",
    },
  ];
  const {
    currentUser,
    singleUser,
    getUserById,
    loading,
    userPost,
    posts,
    error,
    getPostForUser,
    followUser,
    getAllPosts,
    navigate,
  } = useGlobal();
  const { id } = useParams();
  const [postsShown, setPostsShown] = useState([]);
  const [followLoading, setFollowLoading] = useState(false);
  const [endSlice, setEndSlice] = useState(10);
  useEffect(() => {
    getUserById(id);
    getPostForUser(id);
    getAllPosts();
  }, []);
  useEffect(() => {
    getUserById(id);
    getPostForUser(id);
    getAllPosts();
  }, [id]);
  useEffect(() => {
    const post = userPost.reverse();
    const displayedPost =
      singleUser && singleUser.comment.length !== 0
        ? post.slice(0, post.length - 1)
        : post;
    setPostsShown(displayedPost);
    userPost.reverse();
  }, [userPost, singleUser]);
  async function follow() {
    setFollowLoading(true);
    await followUser(id);
    setFollowLoading(false);
    toast.success("User Followed Successfully", {
      autoClose: 2000,
    });
    getUserById(id);
  }
  if (loading) return <Loader />;
  if (!singleUser) return <Loader />;
  if (error)
    return (
      <div className="min-h-[83vh] flex items-center justify-center">
        <p className="text-red-500 font-semibold text-2xl">{error}</p>
      </div>
    );
  if (singleUser && singleUser._id !== id) return <Loader />;

  return (
    <div className="">
      <ToastContainer />
      <div className="bg-black lg:py-15 py-4"></div>
      <div className="lg:px-3 relative lg:w-[80%] w-full">
        <div className="relative w-full lg:-top-12 rounded-md border border-gray-200 lg:px-9 px-3 bg-white  ">
          <div className="lg:flex justify-center items-center">
            {singleUser && singleUser.avatar ? (
              <div className="lg:p-2 p-1 lg:h-30 lg:w-30 h-12 w-12 relative lg:-top-12 -top-7 rounded-full bg-black">
                <img
                  src={singleUser && singleUser.avatar}
                  alt="user profile"
                  className="w-full h-full rounded-full"
                />
              </div>
            ) : (
              <div
                className="lg:p-2 p-1 lg:h-30 lg:w-30 h-12 w-12 relative lg:-top-12 -top-7 rounded-full"
                style={{
                  backgroundColor:
                    singleUser && singleUser.color ? singleUser.color : "blue",
                }}
              >
                <div className="w-full h-full rounded-full flex items-center justify-center capitalize font-bold lg:text-6xl text-white">
                  <p>{singleUser && singleUser.username.charAt(0)}</p>
                </div>
              </div>
            )}
          </div>
          <div className="top-5 absolute right-2">
            <div className="flex items-center space-x-2">
              {currentUser && id === currentUser._id ? (
                <Link to={"/settings"}>
                  <button className="text-white  text-[11px] lg:text-md font-semibold bg-blue-600 hover:bg-blue-800 lg:py-1.5 lg:px-3 py-1 px-2 rounded-md cursor-pointer">
                    Edit Profile
                  </button>
                </Link>
              ) : currentUser && currentUser.following.includes(id) ? (
                <button className="border text-[11px] lg:text-md border-gray-300 hover:bg-gray-200 lg:py-1.5 lg:px-3 py-1 px-2 rounded-md shadow-sm cursor-pointer">
                  Following
                </button>
              ) : (
                <button
                  disabled={followLoading}
                  onClick={() => {
                    if (currentUser) {
                      follow();
                    } else {
                      toast.warning(
                        "You need to be logged in to follow a user",
                        {
                          autoClose: 1500,
                        }
                      );
                      setTimeout(() => {
                        navigate("/login");
                      }, 2000);
                    }
                  }}
                  className={`${
                    followLoading
                      ? "bg-blue-300 cursor-not-allowed"
                      : "bg-[#3b49df] cursor-pointer hover:bg-blue-800"
                  } rounded-md w-full  py-1.5 px-4 text-white font-semibold`}
                >
                  {followLoading ? "Following" : "Follow"}
                </button>
              )}
              <div className="flex flex-col hover:bg-gray-200 rounded-md p-1 cursor-pointer">
                <PiDotsThreeBold size={28} />
              </div>
            </div>
          </div>
          <div className="lg:flex flex-col relative lg:-top-4 items-center justify-center pb-2">
            <h2 className="font-bold lg:text-3xl text-xl capitalize ">
              {singleUser && singleUser.username}
            </h2>
            <p className="lg:text-center lg:w-[60%] text-sm lg:text-md py-2">
              {singleUser && singleUser.bio ? singleUser.bio : "No bio"}
            </p>
            <p className="lg:text-center text-sm text-gray-600 pb-4">
              Joined on{" "}
              {singleUser && singleUser.createdAt
                ? singleUser.createdAt.slice(0, 10)
                : "2025-08-20"}
            </p>
          </div>
        </div>
        <div className="flex space-x-4 relative lg:-top-8 top-3">
          <div className="lg:w-[30%] hidden lg:flex flex-col space-y-4">
            {array.map((a, index) => (
              <div
                key={index}
                className="bg-white rounded-md border border-gray-200"
              >
                <div className="px-4 py-2 border-b border-gray-200">
                  <h2 className="font-bold">{a.title}</h2>
                </div>
                <div className="py-3 text-[15px] text-gray-600 px-4">
                  <p>{a.content}</p>
                </div>
              </div>
            ))}
          </div>
          <div className="lg:w-[70%] w-full">
            {singleUser &&
              userPost.length !== 0 &&
              singleUser.comment.length !== 0 && (
                <Link to={`/${userPost[0]._id}`}>
                  <div className="bg-white rounded-md border-gray-200 border px-5 py-3.5">
                    <div className="flex space-x-2">
                      {singleUser.avatar ? (
                        <div className="h-9 w-9">
                          <img
                            className="rounded-full h-full w-full"
                            src={singleUser && singleUser.avatar}
                            alt=""
                          />
                        </div>
                      ) : (
                        <div
                          className=" h-9 w-9 rounded-full"
                          style={{
                            backgroundColor: singleUser.color
                              ? singleUser.color
                              : "blue",
                          }}
                        >
                          <div className="w-full h-full text-xl rounded-full flex items-center justify-center capitalize font-bold text-white">
                            <p>{singleUser.username.charAt(0)}</p>
                          </div>
                        </div>
                      )}
                      <div className="flex flex-col text-sm">
                        <span className="font-semibold text-gray-600">
                          {singleUser && singleUser.username}
                        </span>
                        <span className="text-gray-600 text-[11px]">
                          {userPost[0].createdAt.slice(0, 10)}
                        </span>
                      </div>
                    </div>
                    <div className="lg:ps-10.5 pt-2">
                      <h2 className="font-bold text-2xl">
                        {userPost[0].title}
                      </h2>
                      <div className="py-1.5 flex space-x-3 text-sm text-gray-600">
                        <p className="cursor-pointer">#discuss</p>
                        <p className="cursor-pointer">#jokes</p>
                        <p className="cursor-pointer">#watercooler</p>
                      </div>
                      <div className="flex justify-between items-center py-2">
                        <div className="flex justify-between space-x-12 items-center">
                          <div className="hover:px-1.5 py-1 flex items-center space-x-0.5 transition-all cursor-pointer hover:bg-gray-100 rounded">
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
                            <p className="text-gray-600 text-[10px] lg:text-sm">
                              12 reactions
                            </p>
                          </div>
                          <div className="flex space-x-2 items-center transition-all cursor-pointer hover:bg-gray-100 px-2 py-1.5 rounded">
                            <FaRegComment />
                            <h2 className="text-[10px] lg:text-sm text-gray-600">
                              {userPost[0].comment.length} comments
                            </h2>
                          </div>
                        </div>
                        <div className="flex space-x-2.5 items-center pe-4">
                          <p className="text-gray-600 text-[10px] lg:text-sm">
                            1 min read
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>
                </Link>
              )}
            {singleUser && singleUser.comment.length !== 0 && (
              <div className="py-2">
                <div className="rounded-md border bg-white border-gray-200 pt-1.5">
                  <div className="px-4 py-2 border-b border-gray-200">
                    <h2 className="font-bold text-xl">Recent Comment</h2>
                  </div>
                  {singleUser &&
                    singleUser.comment
                      .reverse()
                      .slice(0, endSlice)
                      .map((c, index) => (
                        <Link key={index} to={`/comment/${c._id}`}>
                          <div className="px-4 py-3 border-b hover:bg-gray-100 border-gray-200">
                            <h2 className="font-bold capitalize text-[16px]">
                              {posts && posts.find((p) => p._id === c.postId)
                                ? posts.find((p) => p._id === c.postId).title
                                : ""}
                            </h2>
                            <div className="flex items-center justify-between">
                              <p className="text-sm text-gray-600 pt-1">
                                {c.content.length > 30
                                  ? `${c.content.slice(0, 30)}...`
                                  : c.content}
                              </p>
                              <span className="text-gray-600 text-[13px]">
                                {c.createdAt.slice(0, 10)}
                              </span>
                            </div>
                          </div>
                        </Link>
                      ))}
                  {singleUser && singleUser.comment.length > 10 && (
                    <div
                      className="px-4 py-3 cursor-pointer"
                      onClick={() => {
                        setEndSlice(singleUser && singleUser.comment.length);
                      }}
                    >
                      <p className="text-blue-800">View all Comments</p>
                    </div>
                  )}
                </div>
              </div>
            )}
            {userPost.length === 0 ? (
              <div className="bg-white w-full rounded-md py-16 flex justify-center items-center border border-gray-200">
                <h2 className="text-gray-600 text-[17px]">
                  {singleUser && singleUser.username} has no posts yet...
                </h2>
              </div>
            ) : (
              <div
                className={`${
                  singleUser && singleUser.comment.length !== 0 ? "py-2" : ""
                } space-y-1.5`}
              >
                {postsShown.map((p, index) => (
                  <div
                    key={index}
                    className="bg-white rounded-md hover:bg-gray-50 border-gray-200 border px-5 py-3.5"
                  >
                    <Link to={`/${p._id}`}>
                      <div className="flex space-x-2">
                        <div className="h-9 w-9">
                          <img
                            className="rounded-full h-full w-full"
                            src={singleUser && singleUser.avatar}
                            alt=""
                          />
                        </div>
                        <div className="flex flex-col text-sm">
                          <span className="font-semibold text-gray-600">
                            {singleUser && singleUser.username}
                          </span>
                          <span className="text-gray-600 text-[11px]">
                            {p.createdAt.slice(0, 10)}
                          </span>
                        </div>
                      </div>
                      <div className="lg:ps-10.5 pt-2">
                        <h2 className="font-bold text-2xl">{p.title}</h2>
                        <div className="py-1.5 flex space-x-3 text-sm text-gray-600">
                          <p className="cursor-pointer">#discuss</p>
                          <p className="cursor-pointer">#jokes</p>
                          <p className="cursor-pointer">#watercooler</p>
                        </div>
                        <div className="flex justify-between items-center py-2">
                          <div className="flex justify-between space-x-12 items-center">
                            <div className="hover:px-1.5 py-1 flex items-center space-x-0.5 transition-all cursor-pointer hover:bg-gray-100 rounded">
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
                              <p className="text-gray-600 text-[10px] lg:text-sm">
                                12 reactions
                              </p>
                            </div>
                            <div className="flex space-x-2 items-center transition-all cursor-pointer hover:bg-gray-100 px-2 py-1.5 rounded">
                              <FaRegComment />
                              <h2 className="text-[10px] lg:text-sm text-gray-600">
                                {p.comment.length} comments
                              </h2>
                            </div>
                          </div>
                          <div className="flex space-x-2.5 items-center pe-4">
                            <p className="text-gray-600 text-[10px] lg:text-sm">
                              1 min read
                            </p>
                          </div>
                        </div>
                      </div>
                    </Link>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

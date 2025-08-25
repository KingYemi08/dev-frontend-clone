import { Link } from "react-router-dom";
import { FaRegComment } from "react-icons/fa6";
import { IoMdHeartEmpty } from "react-icons/io";
import { IoEyeOutline } from "react-icons/io5";
import { PiDotsThreeBold } from "react-icons/pi";
import { useEffect, useState } from "react";
import { useGlobal } from "../context/globalContext";
import Loader from "./loader";
import { ToastContainer, toast } from "react-toastify";

export default function DashboardMain({ active }) {
  const {
    loading,
    error,
    getPostForUser,
    userPost,
    setPostForm,
    navigate,
    setEditingPostId,
    setPreviewImage,
    deletePost,
    getAllPosts,
    setLoading,
    getAllFollowers,
    getAllFollowing,
    token,
    userFollowers,
    userFollowing,
    deleteComment,
    currentUserId,
    currentUser,
  } = useGlobal();
  const [posts, setPosts] = useState([]);
  useEffect(() => {
    if (token) {
      getPostForUser(currentUserId);
      getAllFollowers();
      getAllFollowing();
    }
  }, []);
  useEffect(() => {
    const post = userPost.reverse();
    setPosts(post);
  }, [userPost]);
  if (loading) return <Loader />;
  if (error)
    return (
      <div className="min-h-[83vh] flex items-center justify-center">
        <p className="text-red-500 font-semibold text-2xl">{error}</p>
      </div>
    );
  if (active === "posts")
    return (
      <div className="w-full lg:mt-5 mt-2">
        <div className="flex justify-between items-center pb-2">
          <h2 className="text-xl text-gray-600 font-bold">Posts</h2>
          <div className="flex space-x-2">
            <button className="border border-gray-300 hover:bg-gray-200 py-1.5 px-4 rounded-md shadow-sm cursor-pointer">
              Show quickie posts
            </button>
            {posts.length > 0 && (
              <select
                name=""
                id=""
                className="bg-white pe-4 ps-1 py-1.5 border border-gray-200 rounded-md"
              >
                <option value="">Recently Created</option>
              </select>
            )}
          </div>
        </div>
        {posts.length === 0 ? (
          <div className="bg-white w-full rounded-md py-9">
            <div className="w-full flex justify-center items-center py-4">
              <img
                src="https://media2.dev.to/dynamic/image/width=300,height=,fit=cover,gravity=auto,format=auto/https%3A%2F%2Fdev-to-uploads.s3.amazonaws.com%2Fi%2Fy5767q6brm62skiyywvc.png"
                alt=""
              />
            </div>
            <div className="py-5 flex flex-col items-center justify-center">
              <h3 className="text-gray-600 text-[17px] text-center">
                This is where you can manage your posts, but you haven't written
                anything yet.
              </h3>
              <Link to={"/new"} className="py-5">
                <button className="bg-[#3b49df] rounded-md text-white hover:bg-blue-800 transition-all cursor-pointer py-3 px-5 font-semibold">
                  Write your first post now
                </button>
              </Link>
            </div>
          </div>
        ) : (
          <div className="border-gray-200 bg-white w-full rounded-md border ">
            {posts.map((p) => {
              return (
                <div
                  key={p._id}
                  className="border-b border-gray-200 px-5  py-4 flex lg:items-center"
                >
                  <div className="w-[70%] flex flex-col space-y-3 lg:space-y-0 lg:flex-row lg:justify-between lg:items-center">
                    <div>
                      <h3 className="text-[#3b49df] pb-1 font-bold text-[17px] text-left">
                        <Link to={`/${p._id}`}>{p.title}</Link>{" "}
                      </h3>
                      <div className="text-gray-600 flex space-x-3 text-sm">
                        <div>
                          <span className="font-semibold text-gray-600">
                            Published:
                          </span>{" "}
                          {p.createdAt.slice(0, 10)}
                        </div>
                        <div>
                          {" "}
                          <span className="font-semibold text-gray-600">
                            Language:
                          </span>{" "}
                          English
                        </div>
                      </div>
                    </div>
                    <div className="flex items-center space-x-6">
                      <div className="flex text-gray-600 text-sm items-center space-x-1.5">
                        <IoMdHeartEmpty size={20} />
                        <p>0</p>
                      </div>
                      <div className="flex text-gray-600 text-sm items-center space-x-1.5">
                        <FaRegComment size={17} />
                        <p>{p.comment.length}</p>
                      </div>
                      <div className="flex text-gray-600 text-sm items-center space-x-1.5">
                        <IoEyeOutline size={22} />
                        <p>{"< 25"}</p>
                      </div>
                    </div>
                  </div>
                  <div className="w-[30%]">
                    <div className="flex space-x-2 justify-end  items-end text-sm text-gray-600">
                      <div className="flex items-center">
                        <p
                          onClick={() => {
                            if (
                              confirm(
                                "Are you sure you want to delete this post"
                              )
                            ) {
                              deletePost(p._id);
                              setLoading(true);
                              setTimeout(() => {
                                getAllPosts();
                                getPostForUser(currentUserId);
                              }, 2500);
                            }
                          }}
                          className="rounded-md hover:bg-gray-200 transition-all cursor-pointer px-3 py-1.5"
                        >
                          Delete
                        </p>
                        <p
                          onClick={() => {
                            setEditingPostId(p._id);
                            setPreviewImage(p.image);
                            setPostForm({
                              title: p.title,
                              content: p.content,
                              image: null,
                              isRemoved: false,
                            });
                            navigate("/new");
                          }}
                          className="rounded-md hover:bg-gray-200 transition-all cursor-pointer px-3 py-1.5"
                        >
                          Edit
                        </p>
                        <p className="rounded-md hover:bg-gray-200 transition-all cursor-pointer px-2 py-0.5">
                          <PiDotsThreeBold size={22} />
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </div>
    );
  if (active === "followers")
    return (
      <div>
        {userFollowers.length === 0 ? (
          <div className="bg-white w-full rounded-md py-16 flex justify-center items-center border border-gray-200">
            <h2 className="text-gray-600 text-[17px]">
              You don't have any followers yet...
            </h2>
          </div>
        ) : (
          <div className="grid md:grid-cols-2 grid-cols-1 gap-3 lg:grid-cols-3">
            {userFollowers.map((u) => (
              <Link key={u._id} to={`/user/${u._id}`}>
                <div className="bg-white rounded-md border border-gray-200 py-6 flex flex-col space-y-1.5 items-center justify-center">
                  {u.avatar ? (
                    <div>
                      <img
                        className="h-17 w-17 rounded-full"
                        src={u.avatar}
                        alt=""
                      />
                    </div>
                  ) : (
                    <div
                      className=" h-17 w-17 rounded-full"
                      style={{
                        backgroundColor: u.color ? u.color : "blue",
                      }}
                    >
                      <div className="w-full h-full text-4xl rounded-full flex items-center justify-center capitalize font-bold text-white">
                        <p>{u.username.charAt(0)}</p>
                      </div>
                    </div>
                  )}
                  <div className="py-2.5 text-center">
                    <h2 className="text-[#3b49df] font-bold text-xl">
                      {u.username}
                    </h2>
                    <p className="text-gray-600 py-1">@{u.email}</p>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        )}
      </div>
    );

  if (active === "comments")
    return (
      <div>
        <ToastContainer />
        {currentUser && currentUser.comment.length === 0 ? (
          <div className="bg-white w-full rounded-md py-16 flex justify-center items-center border border-gray-200">
            <h2 className="text-gray-600 text-[17px]">
              You have not commented on any post yet...
            </h2>
          </div>
        ) : (
          <div className="border-gray-200 bg-white w-full rounded-md border ">
            {currentUser &&
              currentUser.comment.map((p) => {
                return (
                  <div
                    key={p._id}
                    className="border-b border-gray-200 px-5  py-4 flex lg:items-center"
                  >
                    <div className="w-[70%] flex flex-col space-y-3 lg:space-y-0 lg:flex-row lg:justify-between lg:items-center">
                      <div>
                        <h3 className="text-[#3b49df] pb-1 font-bold text-[17px] text-left">
                          <Link to={`/comment/${p._id}`}>
                            {p.content.length > 20
                              ? `${p.content.slice(0, 20)}...`
                              : p.content}
                          </Link>{" "}
                        </h3>
                        <div className="text-gray-600 flex space-x-3 text-sm">
                          <div>
                            <span className="font-semibold text-gray-600">
                              Published:
                            </span>{" "}
                            {p.createdAt.slice(0, 10)}
                          </div>
                          <div>
                            {" "}
                            <span className="font-semibold text-gray-600">
                              Language:
                            </span>{" "}
                            English
                          </div>
                        </div>
                      </div>
                      <div className="flex items-center space-x-6">
                        <div className="flex text-gray-600 text-sm items-center space-x-1.5">
                          <IoMdHeartEmpty size={20} />
                          <p>0</p>
                        </div>
                        <div className="flex text-gray-600 text-sm items-center space-x-1.5">
                          <FaRegComment size={17} />
                          <p>0</p>
                        </div>
                        <div className="flex text-gray-600 text-sm items-center space-x-1.5">
                          <IoEyeOutline size={22} />
                          <p>{"< 25"}</p>
                        </div>
                      </div>
                    </div>
                    <div className="w-[30%]">
                      <div className="flex space-x-2 justify-end  items-end text-sm text-gray-600">
                        <div className="flex items-center">
                          <p
                            onClick={() => {
                              async function deleteUserComment() {
                                await deleteComment(p._id, p.postId);
                              }
                              if (
                                confirm(
                                  "Are you sure you want to delete this post"
                                )
                              ) {
                                deleteUserComment();
                              }
                            }}
                            className="rounded-md hover:bg-gray-200 transition-all cursor-pointer px-3 py-1.5"
                          >
                            Delete
                          </p>
                          <p className="rounded-md hover:bg-gray-200 transition-all cursor-pointer px-2 py-0.5">
                            <PiDotsThreeBold size={22} />
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>
                );
              })}
          </div>
        )}
      </div>
    );

  if (active === "following")
    return (
      <div>
        {userFollowing.length === 0 ? (
          <div className="bg-white w-full rounded-md py-16 flex justify-center items-center border border-gray-200">
            <h2 className="text-gray-600 text-[17px]">
              You are not following anyone yet...
            </h2>
          </div>
        ) : (
          <div className="grid md:grid-cols-2 grid-cols-1 gap-3 lg:grid-cols-3">
            {userFollowing.map((u) => (
              <Link key={u._id} to={`/user/${u._id}`}>
                <div className="bg-white rounded-md border border-gray-200 py-6 flex flex-col space-y-1.5 items-center justify-center">
                  {u.avatar ? (
                    <div>
                      <img
                        className="h-17 w-17 rounded-full"
                        src={u.avatar}
                        alt=""
                      />
                    </div>
                  ) : (
                    <div
                      className=" h-17 w-17 rounded-full"
                      style={{
                        backgroundColor: u.color ? u.color : "blue",
                      }}
                    >
                      <div className="w-full h-full text-4xl rounded-full flex items-center justify-center capitalize font-bold text-white">
                        <p>{u.username.charAt(0)}</p>
                      </div>
                    </div>
                  )}
                  <div className="py-2.5 text-center">
                    <h2 className="text-[#3b49df] font-bold text-xl">
                      {u.username}
                    </h2>
                    <p className="text-gray-600 py-1">@{u.email}</p>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        )}
      </div>
    );
}

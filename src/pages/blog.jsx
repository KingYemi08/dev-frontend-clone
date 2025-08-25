import { TbHeartPlus } from "react-icons/tb";
import { FaRegComment } from "react-icons/fa6";
import { GoBookmark } from "react-icons/go";
import { PiDotsThreeBold } from "react-icons/pi";
import { BiRepost } from "react-icons/bi";
import { useEffect, useRef, useState } from "react";
import { AiOutlineLink } from "react-icons/ai";
import { MdFormatListNumbered } from "react-icons/md";
import { MdFormatListBulleted } from "react-icons/md";
import { RiDoubleQuotesL } from "react-icons/ri";
import { IoMdCode } from "react-icons/io";
import { PiCodeFill } from "react-icons/pi";
import { RiFlashlightLine } from "react-icons/ri";
import { FaRegImage } from "react-icons/fa6";
import { BsThreeDotsVertical } from "react-icons/bs";
import { IoMdHeartEmpty } from "react-icons/io";
import { useGlobal } from "../context/globalContext";
import { Link, useParams } from "react-router-dom";
import Loader from "../components/loader";
import { ToastContainer, toast } from "react-toastify";
import { IoIosContact } from "react-icons/io";
//import MyRichTextEditor from "./quill";

export default function Blog() {
  const [showUnder, setShowUnder] = useState(false);
  const [commentloading, setCommentLoading] = useState(false);
  const [showPreview, setShowPreview] = useState(false);
  const fileInputRef = useRef(null);
  const [comments, setComments] = useState([]);
  const [followLoading, setFollowLoading] = useState(false);
  const [isBlue, setIsBlue] = useState(false);
  const {
    loading,
    singlePost,
    error,
    singleUser,
    getPostById,
    posts,
    getAllPosts,
    currentUser,
    followUser,
    commentForm,
    commentChange,
    addComment,
    commentPreview,
    setCommentForm,
    getCommentByPost,
    currentUserId,
    navigate,
    postComments,
  } = useGlobal();

  const { id } = useParams();

  useEffect(() => {
    getPostById(id);
    getCommentByPost(id);
  }, [id]);

  useEffect(() => {
    setCommentForm({
      content: "",
      userId: currentUserId,
      image: null,
    });
    getAllPosts();
  }, []);

  const IsUserPost =
    currentUser &&
    currentUser.post.find((a) => {
      return a._id === id;
    });

  const singleUserPost =
    posts && singlePost
      ? posts.filter((p) => {
          return singlePost.userId.post.includes(p._id);
        })
      : null;

  useEffect(() => {
    const reversedComment = postComments.reverse();
    if (reversedComment) setComments(reversedComment);
  }, [postComments]);

  const postComment = async () => {
    if (!commentForm.content)
      return toast.warning("Please enter a comment", { autoClose: 2000 });
    try {
      setCommentLoading(true);
      await addComment(id);
      toast.success("Comment added", { autoClose: 1500 });
      setCommentLoading(false);
      setCommentForm({
        content: "",
        userId: currentUserId,
        image: null,
      });
      setTimeout(() => {
        getPostById(id);
        getCommentByPost(id);
        setShowUnder(false);
        setShowPreview(false);
      }, 2000);
    } catch (error) {
      setCommentLoading(false);
      console.log(error);
      toast.error("An Error Occured", { autoClose: 2000 });
    }
  };

  async function follow() {
    setFollowLoading(true);
    await followUser(singlePost.userId._id);
    setFollowLoading(false);
    toast.success("User Followed Successfully", {
      autoClose: 2000,
    });
    getPostById(id);
  }

  if (loading) return <Loader />;
  if (!singlePost) return <Loader />;
  if (error)
    return (
      <div className="min-h-[83vh] flex items-center justify-center">
        <p className="text-red-500 font-semibold text-2xl">{error}</p>
      </div>
    );
  return (
    <div className="lg:flex lg:py-2 lg:space-x-4">
      <ToastContainer />
      <div className="w-[5%] lg:fixed hidden lg:flex flex-col text-gray-600 space-y-7 py-12 items-center">
        <div className="flex flex-col hover:text-red-500 cursor-pointer">
          <TbHeartPlus size={30} />
          <p className="mt-1.5 text-center text-sm">22</p>
        </div>
        <div className="flex flex-col hover:text-yellow-400 cursor-pointer">
          <FaRegComment size={25} />
          <p className="mt-1.5 text-center text-sm">
            {singlePost ? singlePost.comment.length : null}
          </p>
        </div>
        <div className="flex flex-col hover:text-blue-800 cursor-pointer">
          <GoBookmark size={25} />
          <p className="mt-1.5 text-center text-sm">1</p>
        </div>
        <div className="flex flex-col cursor-pointer">
          <BiRepost size={28} />
        </div>
        <div className="flex flex-col hover:bg-gray-200 rounded-full p-1 cursor-pointer">
          <PiDotsThreeBold size={28} />
        </div>
      </div>
      <div className="lg:w-[69%] lg:ml-[6%]">
        <div className="w-full bg-white rounded-md overflow-hidden">
          <div className="w-full">
            <img
              className="w-full"
              src={singlePost ? singlePost.image : null}
              alt=""
            />
          </div>
          <div className="pb-2">
            <div className="lg:px-15 px-3 py-7">
              <div className="flex space-x-2">
                {singlePost && singlePost.userId.avatar ? (
                  <Link to={`/user/${singlePost.userId._id}`}>
                    <div className="h-12 w-12">
                      <img
                        className="rounded-full h-full w-full"
                        src={singlePost ? singlePost.userId.avatar : null}
                        alt=""
                      />
                    </div>
                  </Link>
                ) : (
                  <Link to={`/user/${singlePost.userId._id}`}>
                    <div
                      className=" h-9 w-9 rounded-full"
                      style={{
                        backgroundColor: singlePost.userId.color
                          ? singlePost.userId.color
                          : "white",
                      }}
                    >
                      <div className="w-full h-full text-xl rounded-full flex items-center justify-center capitalize font-bold text-white">
                        <p>{singlePost.userId.username.charAt(0)}</p>
                      </div>
                    </div>
                  </Link>
                )}
                <div className="flex flex-col text-sm">
                  <span className="font-bold text-gray-600 mb-1">
                    {singlePost ? singlePost.userId.username : ""}
                  </span>
                  <small className="text-gray-600 text-[11px]">
                    Posted on{" "}
                    {singlePost ? singlePost.createdAt.slice(0, 10) : ""}
                  </small>
                </div>
              </div>
              <div className="py-3.5 flex space-x-9 items-center">
                <p className="flex space-x-1 text-gray-600 items-center">
                  <span className="text-2xl">💖</span> <span>15</span>
                </p>
                <p className="flex space-x-1 text-gray-600 items-center">
                  <span className="text-2xl">🦄</span> <span>15</span>
                </p>
                <p className="flex space-x-1 text-gray-600 items-center">
                  <span className="text-2xl">🤯</span> <span>15</span>
                </p>
                <p className="flex space-x-1 text-gray-600 items-center">
                  <span className="text-2xl">🙌</span> <span>15</span>
                </p>
                <p className="flex space-x-1 text-gray-600 items-center">
                  <span className="text-2xl">🔥</span> <span>15</span>
                </p>
              </div>
              <div className="py-2">
                <h2 className="text-5xl font-extrabold">
                  {singlePost ? singlePost.title : ""}
                </h2>
                <div className="py-2.5 flex space-x-3 text-sm text-gray-600">
                  <p className="cursor-pointer">#discuss</p>
                  <p className="cursor-pointer">#jokes</p>
                  <p className="cursor-pointer">#watercooler</p>
                </div>
              </div>
              <div className="py-3">
                <h2 className="font-bold text-[15px]">
                  {singlePost ? singlePost.title : ""}
                </h2>
                <div className="py-2">
                  {singlePost ? singlePost.content : ""}
                </div>
              </div>
            </div>
            <div className="py-9 lg:px-15 px-3 border-t border-gray-200">
              <div className="flex items-center justify-between">
                <h2 className="text-xl font-bold pb-4">
                  Top comments ({singlePost ? singlePost.comment.length : "0"})
                </h2>
                <button className="border border-gray-300 hover:bg-gray-200 py-1.5 px-3 rounded-md shadow-sm cursor-pointer">
                  Subscribe
                </button>
              </div>
              <div className="flex space-x-1 pt-7">
                {currentUser && currentUser.avatar ? (
                  <div className="h-9 w-9">
                    <img
                      className="rounded-full h-full w-full"
                      src={currentUser ? currentUser.avatar : ""}
                      alt=""
                    />
                  </div>
                ) : currentUser && currentUser.color ? (
                  <div
                    className="lg:p-2 p-1 h-9 w-9 rounded-full"
                    style={{
                      backgroundColor:
                        currentUser && currentUser.color
                          ? currentUser.color
                          : "blue",
                    }}
                  >
                    <div className="w-full h-full rounded-full flex items-center justify-center capitalize font-bold text-white">
                      <p>{currentUser && currentUser.username.charAt(0)}</p>
                    </div>
                  </div>
                ) : (
                  <div className="bg-blue-500 rounded-full h-9 flex items-center justify-center w-9">
                    <IoIosContact className="text-white" size={27} />
                  </div>
                )}
                {showPreview ? (
                  <div>
                    <div className="p-2 border w-full border-gray-200 rounded-md">
                      <p className="py-2.5">{commentForm.content}</p>
                      <img src={commentPreview} className="w-full" alt="" />
                    </div>
                    <div className="flex space-x-2.5 py-3">
                      <button
                        disabled={
                          !commentForm.content && !commentForm.image
                            ? true
                            : false
                        }
                        onClick={postComment}
                        className={`px-4.5 py-2 ${
                          !commentForm.content && !commentForm.image
                            ? "bg-[#8992ec] cursor-not-allowed"
                            : commentloading
                            ? "bg-[#8992ec] cursor-not-allowed"
                            : "bg-blue-700 cursor-pointer"
                        }  rounded-lg font-semibold text-white`}
                      >
                        {commentloading ? "Submitting..." : "Submit"}
                      </button>
                      <button
                        disabled={!commentForm.image ? true : false}
                        onClick={() => {
                          setShowPreview((prev) => !prev);
                        }}
                        className={`px-4.5 py-2 ${
                          !commentForm.image
                            ? "bg-[#f5f5f5] cursor-not-allowed"
                            : commentloading
                            ? "bg-[#f5f5f5] cursor-not-allowed"
                            : "bg-gray-300 cursor-pointer"
                        }  rounded-lg font-semibold text-gray-600`}
                      >
                        {showPreview ? "Continue Editing" : "Show Preview"}
                      </button>
                    </div>
                  </div>
                ) : showUnder ? (
                  <div>
                    <div
                      onFocus={() => {
                        setIsBlue(true);
                      }}
                      onBlur={() => {
                        setIsBlue(false);
                      }}
                      className={`${
                        isBlue
                          ? "border-blue-700 border-2"
                          : "border-gray-200 border"
                      }  placeholder:text-gray-600 w-full rounded-md transition-all`}
                    >
                      <input
                        type="text"
                        className="pb-28 pt-2 ps-3 w-full outline-0 placeholder:text-gray-600"
                        placeholder="Add to the discussion"
                        name="content"
                        value={commentForm.content}
                        onChange={commentChange}
                      />
                      <input
                        type="file"
                        className="hidden"
                        ref={fileInputRef}
                        accept="image/*"
                        onChange={commentChange}
                        name="image"
                      />
                      {/* <MyRichTextEditor/> */}
                      <div className="flex items-center border-t border-gray-200 justify-between">
                        <div className="flex  text-2xl   font-semibold ">
                          <p className="px-4 cursor-pointer rounded-md transition-all py-2 hover:bg-blue-100 hover:text-blue-800">
                            B
                          </p>
                          <p className="px-4 cursor-pointer rounded-md transition-all py-2 hover:bg-blue-100 hover:text-blue-800">
                            I
                          </p>
                          <p className="px-4 cursor-pointer rounded-md transition-all py-2 flex items-center justify-center hover:bg-blue-100 hover:text-blue-800">
                            <AiOutlineLink />
                          </p>
                          <p className="px-4 cursor-pointer rounded-md transition-all py-2 flex items-center justify-center hover:bg-blue-100 hover:text-blue-800">
                            <MdFormatListNumbered />
                          </p>
                          <p className="px-4 cursor-pointer rounded-md transition-all py-2 flex items-center justify-center hover:bg-blue-100 hover:text-blue-800">
                            <MdFormatListBulleted />
                          </p>
                          <p className="px-4 cursor-pointer rounded-md transition-all py-2 hover:bg-blue-100 hover:text-blue-800">
                            H
                          </p>
                          <p className="px-4 cursor-pointer rounded-md transition-all py-2 flex items-center justify-center hover:bg-blue-100 hover:text-blue-800">
                            <RiDoubleQuotesL />
                          </p>
                          <p className="px-4 cursor-pointer rounded-md transition-all py-2 flex items-center justify-center hover:bg-blue-100 hover:text-blue-800">
                            <IoMdCode />
                          </p>
                          <p className="px-4 cursor-pointer rounded-md transition-all py-2 flex items-center justify-center hover:bg-blue-100 hover:text-blue-800">
                            <PiCodeFill />
                          </p>
                          <p className="px-4 cursor-pointer rounded-md transition-all py-2 flex items-center justify-center hover:bg-blue-100 hover:text-blue-800">
                            <RiFlashlightLine />
                          </p>
                          <p
                            onClick={() => {
                              fileInputRef.current.click();
                            }}
                            className="px-4 cursor-pointer rounded-md transition-all py-2 flex items-center justify-center hover:bg-blue-100 hover:text-blue-800"
                          >
                            <FaRegImage />
                          </p>
                        </div>
                        <div className="text-2xl font-semibold">
                          <p className="px-4 cursor-pointer rounded-md transition-all py-3 flex items-center justify-center hover:bg-blue-100 hover:text-blue-800">
                            <BsThreeDotsVertical />
                          </p>
                        </div>
                      </div>
                    </div>
                    <div className="flex space-x-2.5 py-3">
                      <button
                        disabled={
                          !commentForm.content && !commentForm.image
                            ? true
                            : false
                        }
                        onClick={postComment}
                        className={`px-4.5 py-2 ${
                          !commentForm.content && !commentForm.image
                            ? "bg-[#8992ec] cursor-not-allowed"
                            : commentloading
                            ? "bg-[#8992ec] cursor-not-allowed"
                            : "bg-blue-700 cursor-pointer"
                        }  rounded-lg font-semibold text-white`}
                      >
                        {commentloading ? "Submitting..." : "Submit"}
                      </button>
                      <button
                        disabled={!commentForm.image ? true : false}
                        onClick={() => {
                          setShowPreview((prev) => !prev);
                        }}
                        className={`px-4.5 py-2 ${
                          !commentForm.image
                            ? "bg-[#f5f5f5] cursor-not-allowed"
                            : commentloading
                            ? "bg-[#f5f5f5] cursor-not-allowed"
                            : "bg-gray-300 cursor-pointer"
                        }  rounded-lg font-semibold text-gray-600`}
                      >
                        {showPreview ? "Continue Editing" : "Show Preview"}
                      </button>
                    </div>
                  </div>
                ) : (
                  <textarea
                    onFocus={() => {
                      if (currentUser) {
                        setShowUnder(true);
                      } else {
                        toast.warning("You need to be logged in to comment", {
                          autoClose: 1500,
                        });
                        setTimeout(() => {
                          navigate("/login");
                        }, 2000);
                      }
                    }}
                    placeholder="Add to the discussion"
                    className="border border-gray-200 outline-0 placeholder:text-gray-600 w-full p-2.5 rounded"
                  ></textarea>
                )}
              </div>
              {comments && (
                <div>
                  {comments.map((c) => (
                    <div key={c._id} className="flex space-x-2.5 pt-7">
                      {c.userId.avatar ? (
                        <Link to={`/user/${c.userId._id}`}>
                          <div className="h-9 w-9">
                            <img
                              className="rounded-full h-full w-full"
                              src={c.userId.avatar}
                              alt=""
                            />
                          </div>
                        </Link>
                      ) : (
                        <Link to={`/user/${c.userId._id}`}>
                          <div
                            className="lg:p-2 p-1 h-9 w-9 rounded-full"
                            style={{
                              backgroundColor: c.userId.color
                                ? c.userId.color
                                : "white",
                            }}
                          >
                            <div className="w-full h-full rounded-full flex items-center justify-center capitalize font-bold text-white">
                              <p>{c.userId.username.charAt(0)}</p>
                            </div>
                          </div>
                        </Link>
                      )}
                      <div className="flex flex-col space-y-2 w-full">
                        <div className="px-3 border pb-3 border-gray-200 rounded-md w-full">
                          <div className="flex py-1.5 justify-between items-center">
                            <div className="flex items-center space-x-2">
                              <span className="font-semibold text-[15px]">
                                {c.userId.username}
                              </span>
                              <span className="text-gray-400 font-extrabold mb-2">
                                .
                              </span>
                              {singlePost &&
                                c.userId._id === singlePost.userId._id && (
                                  <div className="flex items-center space-x-2">
                                    <span className="text-red-500 text-sm">
                                      Creator
                                    </span>
                                    <span className="text-gray-400 font-extrabold mb-2">
                                      .
                                    </span>
                                  </div>
                                )}
                              <span className="text-gray-600 text-sm">
                                {c.createdAt.slice(0, 10)}
                              </span>
                            </div>
                            <div className="p-2 transition all cursor-pointer hover:bg-gray-200 rounded-md">
                              <PiDotsThreeBold size={24} />
                            </div>
                          </div>
                          <div>
                            <h2 className="lg:text-[17px] text-[14px]">{c.content}</h2>
                          </div>
                          {c.image && (
                            <div className="flex items-center justify-center pt-3 pb-2 rounded-md overflow-hidden">
                              <img
                                className="w-1/2 rounded-md"
                                src={c.image}
                                alt=""
                              />
                            </div>
                          )}
                        </div>
                        <div className="flex space-x-3 items-center">
                          <div className="px-2.5 cursor-pointer flex space-x-2 items-center py-1.5 hover:bg-[#f5f5f5] transition-all rounded-md">
                            <IoMdHeartEmpty />
                            <p className="text-gray-600 text-sm">2 likes</p>
                          </div>
                          <div className="px-2.5 cursor-pointer py-1.5 flex space-x-2 items-center hover:bg-[#f5f5f5] transition-all rounded-md">
                            <FaRegComment />
                            <p className="text-gray-600 text-sm">Reply</p>
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
      <div className="w-[28%] lg:flex lg:flex-col space-y-4 hidden">
        <div className="bg-white border border-gray-200 rounded-md overflow-hidden pb-2">
          <div className="py-4 bg-[#341dc7] w-full"></div>
          <div className="relative -top-5 px-5 flex space-x-2 items-center">
            {singlePost.userId.avatar ? (
              <Link to={`/user/${singlePost ? singlePost.userId._id : ""}`}>
                <img
                  className="rounded-full h-12 w-12"
                  src={singlePost ? singlePost.userId.avatar : null}
                  alt=""
                />
              </Link>
            ) : (
              <Link to={`/user/${singlePost.userId._id}`}>
                <div
                  className=" h-12 w-12 rounded-full"
                  style={{
                    backgroundColor: singlePost.userId.color
                      ? singlePost.userId.color
                      : "blue",
                  }}
                >
                  <div className="w-full h-full text-2xl rounded-full flex items-center justify-center capitalize font-bold text-white">
                    <p>{singlePost.userId.username.charAt(0)}</p>
                  </div>
                </div>
              </Link>
            )}
            <h2 className="text-gray-600 text-xl relative top-3 font-bold">
              {singlePost ? singlePost.userId.username : ""}
            </h2>
          </div>
          <div className="py-1.5 px-5">
            {IsUserPost ? (
              <Link to={"/settings"}>
                <button className="bg-[#3b49df] rounded-md w-full cursor-pointer hover:bg-blue-800 py-2 px-3 text-white font-semibold">
                  Edit Profile
                </button>
              </Link>
            ) : currentUser &&
              currentUser.following.includes(
                singlePost ? singlePost.userId._id : null
              ) ? (
              <button className="border border-gray-200 rounded-md w-full cursor-pointer  py-2 px-3 font-semibold">
                Following
              </button>
            ) : (
              <button
                disabled={followLoading}
                onClick={() => {
                  if (currentUser) {
                    follow();
                  } else {
                    toast.warning("You need to be logged in to follow a user", {
                      autoClose: 1500,
                    });
                    setTimeout(() => {
                      navigate("/login");
                    }, 2000);
                  }
                }}
                className={`${
                  followLoading
                    ? "bg-blue-300 cursor-not-allowed"
                    : "bg-[#3b49df] cursor-pointer hover:bg-blue-800"
                } rounded-md w-full  py-2 text-white font-semibold`}
              >
                {followLoading ? "Following" : "Follow"}
              </button>
            )}
          </div>
          <div className="py-1.5 px-5 text-gray-600">
            <p>{singlePost ? singlePost.userId.bio : ""}</p>
          </div>
          <div className="pt-3 pb-1.5 text-gray-600 px-5">
            <h4 className="font-semibold text-[11px]">LOCATION</h4>
            <p>NY</p>
          </div>
          <div className="py-1.5 text-gray-600 px-5">
            <h4 className="font-semibold text-[11px]">Education</h4>
            <p>Mount Allison University</p>
          </div>
          <div className="py-1.5 text-gray-600 px-5">
            <h4 className="font-semibold text-[11px]">PRONOUNS</h4>
            <p>He/him</p>
          </div>
          <div className="py-1.5 text-gray-600 px-5">
            <h4 className="font-semibold text-[11px]">WORK</h4>
            <p>Co-founder at Forem</p>
          </div>
          <div className="py-1.5 text-gray-600 px-5">
            <h4 className="font-semibold text-[11px]">JOINED</h4>
            <p>
              {singleUser && singleUser.createdAt
                ? singleUser.createdAt.slice(0, 10)
                : "2025-08-20"}
            </p>
          </div>
        </div>
        <div className="bg-white border border-gray-200 rounded-md overflow-hidden">
          <div className="py-3 border-b border-gray-200">
            <h2 className="px-5 font-bold">
              More from{" "}
              <span className="text-blue-800 cursor-pointer">
                {singlePost ? singlePost.userId.username : ""}
              </span>
            </h2>
          </div>
          {singleUserPost &&
            singleUserPost.map((a, index) => (
              <Link key={index} to={`/${a._id}`}>
                <div className="border-b border-gray-200 hover:bg-gray-100 px-5 py-4 text-gray-600">
                  <h3>{a.title}</h3>
                  <div className="flex space-x-3 pt-0.5 text-sm items-center">
                    <p>#discuss</p>
                    <p>#watercooler</p>
                    <p>#jokes</p>
                  </div>
                </div>
              </Link>
            ))}
        </div>
      </div>
    </div>
  );
}

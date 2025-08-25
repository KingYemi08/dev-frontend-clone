import { HiXMark } from "react-icons/hi2";
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
import { RiSettingsLine } from "react-icons/ri";

import { Link } from "react-router-dom";
import { useGlobal } from "../context/globalContext";
import { ToastContainer, toast } from "react-toastify";

export default function AddPost() {
  const {
    navigate,
    addPost,
    postForm,
    setPostForm,
    postChange,
    previewImage,
    currentUserId,
    setPreviewImage,
    editingPostId,
    setEditingPostId,
    editPost,
  } = useGlobal();
  useEffect(() => {
    if (!editingPostId) {
      setPostForm({
        title: "",
        content: "",
        userId: currentUserId,
        image: null,
      });
    }
  }, []);
  const fileInputRef = useRef(null);
  const [loading, setLoading] = useState(false);
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!postForm.title)
      return toast.warning("Post Must have a title", { autoClose: 2000 });
    try {
      setLoading(true);
      await addPost();
      setLoading(false);
      toast.success("Post Added Successfully", { autoClose: 1500 });
      setPostForm({
        title: "",
        content: "",
        userId: currentUserId,
        image: null,
      });
      setPreviewImage("");
      setTimeout(() => {
        navigate("/");
      }, 2000);
    } catch (error) {
      setLoading(false);
      toast.error("An Error Occured", { autoClose: 2000 });
    }
  };
  const handleEdit = async (e) => {
    e.preventDefault();
    console.log(postForm); 
    if (!postForm.title)
      return toast.warning("Post Must have a title", { autoClose: 2000 });
    try {
      setLoading(true);
      await editPost(editingPostId);
      setLoading(false);
      toast.success("Post Updated Successfully", { autoClose: 1500 });
      setEditingPostId("");
      setPostForm({
        title: "",
        content: "",
        userId: currentUserId,
        image: null,
      });
      setPreviewImage("");
      setTimeout(() => {
        navigate(-1);
      }, 2000);
    } catch (error) {
      setLoading(false);
      console.log(error);
      toast.error("An Error Occured", { autoClose: 2000 });
    }
  };
  return (
    <div className="wfull lg:ps-3.5 lg:pe-2  py-2">
      <ToastContainer />
      <div className="flex items-center">
        <div className="w-2/3 justify-between items-center flex">
          <div className="flex items-center space-x-3">
            <Link to={"/"} className="hidden lg:block">
              <div>
                <img
                  src="https://media2.dev.to/dynamic/image/quality=100/https://dev-to-uploads.s3.amazonaws.com/uploads/logos/resized_logo_UQww2soKuUsjaOGNB38o.png"
                  className="h-11 w-14 rounded"
                  alt=""
                />
              </div>
            </Link>
            <h3 className="font-semibold">Create Post</h3>
          </div>
          <div className="flex items-center space-x-3">
            <h4 className="font-semibold rounded-md transition-all px-1.5 py-2 cursor-pointer hover:bg-blue-100 hover:text-blue-800">
              Edit
            </h4>
            <h4 className="rounded-md transition-all px-1.5 py-2 cursor-pointer hover:bg-blue-100 hover:text-blue-800">
              Preview
            </h4>
          </div>
        </div>
        <div className="flex items-end justify-end w-1/3 ">
          <div
            onClick={() => {
              navigate(-1);
            }}
            className="py-1 px-2 rounded hover:bg-blue-100 cursor-pointer hover:text-blue-800"
          >
            <HiXMark size={25} />
          </div>
        </div>
      </div>
      <div className="lg:ps-20 py-2 lg:flex">
        <div className="lg:w-2/3">
          <div className="bg-white rounded-md  w-full border  border-gray-200">
            <div className="lg:px-14 px-3 py-8">
              {previewImage ? (
                <div className="px-7 flex items-center space-x-12">
                  <div className="w-50 h-30">
                    <img src={previewImage} className="h-full w-full" alt="" />
                  </div>
                  <div className="flex space-x-2 items-center">
                    <button
                      onClick={() => {
                        fileInputRef.current.click();
                      }}
                      className="border rounded-md cursor-pointer  border-gray-300 shadow-sm py-1.5 px-4"
                    >
                      Change
                    </button>
                    <button
                      onClick={() => {
                        setPostForm({
                          title: postForm.title,
                          content: postForm.content,
                          userId: currentUserId,
                          images: null,
                          isRemoved: true
                        });
                        setPreviewImage(null);
                      }}
                      className="text-red-500 font-semibold hover:bg-gray-100 rounded-md px-4 py-1.5 cursor-pointer "
                    >
                      Remove
                    </button>
                  </div>
                </div>
              ) : (
                <div>
                  <button
                    onClick={() => {
                      fileInputRef.current.click();
                    }}
                    className="border rounded-md cursor-pointer lg:w-45 w-full border-gray-300 shadow-sm py-1.5 px-2.5"
                  >
                    Add a cover image
                  </button>
                </div>
              )}
              <input
                type="file"
                ref={fileInputRef}
                onChange={postChange}
                accept="image/*"
                name="image"
                className="hidden"
              />
              <div className="pt-5">
                <input
                  type="text"
                  name="title"
                  onChange={postChange}
                  value={postForm.title}
                  placeholder="New post title here..."
                  className="pb-4 lg:text-5xl ps-1 font-extrabold text-[#525252] lg:placeholder:text-5xl placeholder:text-3xl text-3xl w-full outline-0 placeholder:font-extrabold placeholder:text-[#525252]"
                />
              </div>
              <div className="pb-5 ps-1">
                <button className="text-[#525252]">Add up to 4 tags...</button>
              </div>
            </div>
            <div className="bg-[#f9f9f9] lg:px-14 py-2">
              <div className="flex items-center justify-between">
                <div className="flex  font-semibold ">
                  <p className="lg:px-4 px-2 cursor-pointer rounded-md transition-all py-2 hover:bg-blue-100 hover:text-blue-800">
                    B
                  </p>
                  <p className="lg:px-4 px-2 cursor-pointer rounded-md transition-all py-2 hover:bg-blue-100 hover:text-blue-800">
                    I
                  </p>
                  <p className="lg:px-4 px-  cursor-pointer rounded-md transition-all py-2 flex items-center justify-center hover:bg-blue-100 hover:text-blue-800">
                    <AiOutlineLink />
                  </p>
                  <p className="lg:px-4 px-2 cursor-pointer rounded-md transition-all py-2 flex items-center justify-center hover:bg-blue-100 hover:text-blue-800">
                    <MdFormatListNumbered />
                  </p>
                  <p className="plg:px-4 px-2 cursor-pointer rounded-md transition-all py-2 flex items-center justify-center hover:bg-blue-100 hover:text-blue-800">
                    <MdFormatListBulleted />
                  </p>
                  <p className="lg:px-4 px-2 cursor-pointer rounded-md transition-all py-2 hover:bg-blue-100 hover:text-blue-800">
                    H
                  </p>
                  <p className="lg:px-4 px-2 cursor-pointer rounded-md transition-all py-2 flex items-center justify-center hover:bg-blue-100 hover:text-blue-800">
                    <RiDoubleQuotesL />
                  </p>
                  <p className="lg:px-4 px-2 cursor-pointer rounded-md transition-all py-2 flex items-center justify-center hover:bg-blue-100 hover:text-blue-800">
                    <IoMdCode />
                  </p>
                  <p className="lg:px-4 px-2 cursor-pointer rounded-md transition-all py-2 flex items-center justify-center hover:bg-blue-100 hover:text-blue-800">
                    <PiCodeFill />
                  </p>
                  <p className="lg:px-4 px-2 cursor-pointer rounded-md transition-all py-2 flex items-center justify-center hover:bg-blue-100 hover:text-blue-800">
                    <RiFlashlightLine />
                  </p>
                  <p className="lg:px-4 px-2 cursor-pointer rounded-md transition-all py-2 flex items-center justify-center hover:bg-blue-100 hover:text-blue-800">
                    <FaRegImage />
                  </p>
                </div>
                <div className="text-2xl  font-semibold">
                  <p className="lg:px-4 px-2 cursor-pointer transition-all rounded-md py-3 flex items-center justify-center hover:bg-blue-100 hover:text-blue-800">
                    <BsThreeDotsVertical />
                  </p>
                </div>
              </div>
            </div>
            <div className="lg:px-14 px-4 py-6">
              <div>
                <textarea
                  type="text"
                  name="content"
                  onChange={postChange}
                  value={postForm.content}
                  className="pb-39 placeholder:text-[#525252] w-full resize-none font-sans outline-0"
                  placeholder="Write your post content here..."
                />
              </div>
            </div>
          </div>
          <div className="lg:py-5 pt-2.5 px-2.5 lg:px-0 flex items-center space-x-2">
            <button
              onClick={(e) => {
                if (editingPostId) {
                  handleEdit(e);
                } else {
                  handleSubmit(e);
                }
              }}
              disabled={loading}
              className={`${
                loading
                  ? "bg-blue-400 cursor-not-allowed"
                  : "bg-[#3b49df] hover:bg-blue-800 cursor-pointer"
              } py-2 px-5 font-semibold text-white rounded-md `}
            >
              {loading ? "Loading..." : editingPostId ? "Update" : "Publish"}
            </button>
            <button className="py-2 px-5 cursor-pointer rounded-md hover:bg-blue-100 hover:text-blue-800 transition-all">
              Save as draft
            </button>
            <button className="py-2 px-3 cursor-pointer rounded-md hover:bg-blue-100 hover:text-blue-800 transition-all">
              <RiSettingsLine size={20} />
            </button>
            <button className="py-2 px-5 text-sm cursor-pointer rounded-md hover:bg-blue-100 hover:text-blue-800 transition-all">
              Revert new changes
            </button>
          </div>
        </div>
        <div className="lg:block hidden lg:w-1/3">
          <div className="mt-auto px-5 relative top-67">
            <h2 className="font-bold text-[17px] mb-2.5">Publishing Tips</h2>
            <ul className="list-disc text-gray-600 px-6 space-y-3">
              <li>
                Ensure your post has a cover image set to make the most of the
                home feed and social media platforms.
              </li>
              <li>
                Share your post on social media platforms or with your
                co-workers or local communities.
              </li>
              <li>
                Ask people to leave questions for you in the comments. It's a
                great way to spark additional discussion describing personally
                why you wrote it or why people might find it helpful.
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}

import { FaRegComment } from "react-icons/fa6";
import { IoMdHeartEmpty } from "react-icons/io";
import { PiDotsThreeBold } from "react-icons/pi";
import { Link, useParams } from "react-router-dom";
import { useGlobal } from "../context/globalContext";
import { useEffect } from "react";
import Loader from "../components/loader";

export default function SingleComment() {
  const { id } = useParams();
  const { singleComment, getCommentById, loading, error } = useGlobal();
  useEffect(() => {
    getCommentById(id);
  }, []);
  useEffect(() => {
    getCommentById(id);
  }, [id]);
  if (loading) return <Loader />;
  if (!singleComment) return <Loader />;
  if(!singleComment.postId) return (
    <div>
      The post which this comment was made on has been deleted
    </div>
  )
  if (error)
    return (
      <div className="min-h-[83vh] flex items-center justify-center">
        <p className="text-red-500 font-semibold text-2xl">{error}</p>
      </div>
    );
  return (
    <div>
      <div className="lg:ps-4 lg:pt-4 lg:w-[78%]">
        <div className="bg-white py-7 px-6 rounded-md border border-gray-200">
          <div>
            <h2 className="text-2xl text-gray-600">
              Discussion on:{" "}
              <span className="font-bold text-black">
                {" "}
                {singleComment && singleComment.postId.title}
              </span>
            </h2>
          </div>
          <div className="pt-3 py-2">
            <Link to={singleComment && `/${singleComment.postId._id}`}>
              <button className="border text-[11px] font-semibold lg:text-[15px] border-gray-300 hover:bg-gray-100 transition-all  lg:py-1.5 lg:px-3 py-1 px-2 rounded-md shadow-sm cursor-pointer">
                View Post
              </button>
            </Link>
          </div>
        </div>
      </div>
      <div className="lg:w-[80%] z-10 relative lg:-top-4 -top-7">
        <div className="bg-white shadow-lg py-7 lg:px-10 px-2 rounded-md border border-gray-200">
          <div className="flex space-x-2.5 pt-7">
            {singleComment && singleComment.userId.avatar ? (
              <Link to={"/user/1"}>
                <div className="h-9 w-9">
                  <img
                    className="rounded-full h-full w-full"
                    src={singleComment && singleComment.userId.avatar}
                    alt=""
                  />
                </div>
              </Link>
            ) : (
              <div
                className=" h-9 w-9 rounded-full"
                style={{
                  backgroundColor:
                    singleComment && singleComment.userId.color
                      ? singleComment.userId.color
                      : "white",
                }}
              >
                <div className="w-full h-full text-xl rounded-full flex items-center justify-center capitalize font-bold text-white">
                  <p>
                    {singleComment && singleComment.userId.username.charAt(0)}
                  </p>
                </div>
              </div>
            )}
            <div className="flex flex-col space-y-2 w-full">
              <div className="px-3 border pb-3 border-gray-200 rounded-md w-full">
                <div className="flex py-1.5 justify-between items-center">
                  <p className="flex items-center space-x-2">
                    <span className="font-semibold text-[15px]">
                      {singleComment && singleComment.userId.username}
                    </span>
                    <span className="text-gray-400 font-extrabold mb-2">.</span>
                    <span className="text-gray-600 text-sm">
                      {singleComment && singleComment.createdAt.slice(0, 10)}
                    </span>
                  </p>
                  <div className="p-2 transition all cursor-pointer hover:bg-gray-200 rounded-md">
                    <PiDotsThreeBold size={24} />
                  </div>
                </div>
                <div>
                  <h2 className="lg:text-[17px] text-sm">
                    {singleComment && singleComment.content}
                  </h2>
                </div>
                {singleComment && singleComment.image && (
                  <div className="flex items-center justify-center pt-3 pb-2 rounded-md overflow-hidden">
                    <img
                      className="w-1/2 rounded-md"
                      src={singleComment.image}
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
        </div>
      </div>
    </div>
  );
}

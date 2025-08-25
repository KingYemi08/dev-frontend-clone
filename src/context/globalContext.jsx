import axios from "axios";
import { jwtDecode } from "jwt-decode";
import { createContext, useContext, useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

const GlobalContext = createContext();

export default function GlobalProvider({ children }) {
  const base_url = " https://blogproject-s48l.onrender.com/api/v1";
  const token = localStorage.getItem("token");
  const decoded = token ? jwtDecode(token) : "";
  const currentUserId = decoded.id;
  const Bearer = `Bearer ${token}`;
  const location = useLocation();
  const path = location.pathname;
  const navigate = useNavigate();
  const [dropDown, setDropDown] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [editingPostId, setEditingPostId] = useState("");
  const [singleComment, setSingleComment] = useState();
  const [userFollowing, setUserFollowing] = useState([]);
  const [userFollowers, setUserFollowers] = useState([]);
  const [postComments, setPostComments] = useState([]);
  const [users, setUsers] = useState([]);
  const [previewImage, setPreviewImage] = useState();
  const [commentPreview, setCommentPreview] = useState();
  const [posts, setPosts] = useState([]);
  const [userPost, setUserPost] = useState([]);
  const [singlePost, setSinglePost] = useState();
  const [previewImageName, setPreviewImageName] = useState();
  const [currentUser, setCurrentUser] = useState(null);
  const [singleUser, setSingleUser] = useState(null);
  const [regForm, setRegForm] = useState({
    username: "",
    email: "",
    password: "",
    bio: "",
    avatar: null,
  });
  const [postForm, setPostForm] = useState({
    title: "",
    content: "",
    userId: currentUserId,
    image: null,
  });
  const [passForm, setPassForm] = useState({
    oldPassword: "",
    newPassword: "",
  });
  const [loginForm, setLoginForm] = useState({
    email: "",
    password: "",
  });
  const [commentForm, setCommentForm] = useState({
    content: "",
    userId: currentUserId,
    image: null,
  });
  const commentChange = (e) => {
    const { name, type, value, files } = e.target;
    if (type === "file") {
      const file = files[0];
      setCommentForm({ ...commentForm, [name]: file });
      if (file) {
        setCommentPreview(URL.createObjectURL(file));
      }
    } else {
      setCommentForm({ ...commentForm, [name]: value });
    }
  };
  async function getCurrentUser() {
    const res = await axios.get(`${base_url}/user/${currentUserId}`);
    setCurrentUser(res.data.data);
  }
  const getAllPosts = async () => {
    try {
      setLoading(true);
      const res = await axios.get(`${base_url}/post`);
      setPosts(res.data.data);
      setLoading(false);
    } catch (error) {
      setLoading(false);
      setError("An Error Occured", error.message);
    }
  };
  const getPostsForFollowing = async () => {
    try {
      setLoading(true);
      const res = await axios.get(
        `${base_url}/post/following/${currentUserId}`,
        {
          headers: {
            Authorization: Bearer,
          },
        }
      );
      setPosts(res.data.data);
      setLoading(false);
    } catch (error) {
      setLoading(false);
      setError("An Error Occured", error.message);
    }
  };
  const getPostById = async (id) => {
    try {
      setLoading(true);
      const res = await axios.get(`${base_url}/post/${id}`);
      setSinglePost(res.data.data);
      setLoading(false);
    } catch (error) {
      setLoading(false);
      setError(`An Error Occured`);
    }
  };
  const getPostForUser = async (id) => {
    try {
      setLoading(true);
      const res = await axios.get(`${base_url}/post/user?userId=${id}`);
      setUserPost(res.data.data);
      setLoading(false);
    } catch (error) {
      setLoading(false);
      setError(`An Error Occured`);
    }
  };
  const getCommentByPost = async (id) => {
    try {
      setLoading(true);
      const res = await axios.get(`${base_url}/comment/post/${id}`);
      setPostComments(res.data.data);
      setLoading(false);
    } catch (error) {
      setLoading(false);
      setError(`An Error Occured`);
    }
  };
  const getAllUsers = async () => {
    try {
      setLoading(true);
      const res = await axios.get(`${base_url}/user`);
      setUsers(res.data.data);
      setLoading(false);
    } catch (error) {
      setLoading(false);
      setError(`An Error Occured`);
    }
  };
  const getCommentById = async (id) => {
    try {
      setLoading(true);
      const res = await axios.get(`${base_url}/comment/${id}`);
      setSingleComment(res.data.data);
      setLoading(false);
    } catch (error) {
      setLoading(false);
      setError(`An Error Occured`);
    }
  };
  const getAllFollowers = async () => {
    try {
      setLoading(true);
      const res = await axios.get(
        `${base_url}/user/followers/${currentUserId}`,
        {
          headers: {
            Authorization: Bearer,
          },
        }
      );
      setUserFollowers(res.data.data);
      setLoading(false);
    } catch (error) {
      setLoading(false);
      setError(`An Error Occured`);
    }
  };
  const getAllFollowing = async () => {
    try {
      setLoading(true);
      const res = await axios.get(
        `${base_url}/user/following/${currentUserId}`,
        {
          headers: {
            Authorization: Bearer,
          },
        }
      );
      setUserFollowing(res.data.data);
      setLoading(false);
    } catch (error) {
      setLoading(false);
      setError(`An Error Occured`);
    }
  };
  useEffect(() => {
    if (token) {
      getCurrentUser();
    }
  }, []);
  useEffect(() => {
    if ((!token && path === "/dashboard") || (!token && path === "/new")) {
      navigate("/");
    }
  }, [navigate]);
  const regChange = (e) => {
    const { type, name, value, files } = e.target;
    if (type === "file") {
      const file = files[0];
      setRegForm({ ...regForm, [name]: file });
      if (file) {
        setPreviewImage(URL.createObjectURL(file));
        setPreviewImageName(file.name);
      }
    } else {
      setRegForm({ ...regForm, [name]: value });
    }
  };
  const postChange = (e) => {
    const { type, name, value, files } = e.target;
    if (type === "file") {
      const file = files[0];
      setPostForm({ ...postForm, [name]: file });
      if (file) {
        setPreviewImage(URL.createObjectURL(file));
      }
    } else {
      setPostForm({ ...postForm, [name]: value });
    }
  };
  const loginChange = (e) => {
    const { name, value } = e.target;
    setLoginForm({ ...loginForm, [name]: value });
  };
  const passChange = (e) => {
    const { name, value } = e.target;
    setPassForm({ ...passForm, [name]: value });
  };
  const addUser = async () => {
    try {
      const res = await axios.post(`${base_url}/user`, regForm);
    } catch (error) {
      process.exit(1);
    }
  };
  const updateUserInfo = async () => {
    const res = await axios.put(`${base_url}/user/${currentUserId}`, regForm, {
      headers: {
        Authorization: Bearer,
        "Content-Type": "multipart/form-data",
      },
    });
  };
  useEffect(() => {
    async function getUserById() {
      const res = await axios.get(`${base_url}/user/${currentUserId}`);
      setCurrentUser(res.data.data);
    }
    if (token) {
      getUserById();
    }
  }, [updateUserInfo]);
  const loginUser = async () => {
    const res = await axios.post(`${base_url}/user/login`, loginForm);
    if (res.data.data.email === loginForm.email) {
      localStorage.setItem("token", res.data.token);
      localStorage.setItem("actives", "discover");
      toast.success("User Log in successful", { autoClose: 1500 });
      setTimeout(() => {
        navigate("/");
      }, 2000);
      setLoginForm({
        email: "",
        password: "",
      });
    } else {
      toast.error("Invalid Email or Password", { autoClose: 2000 });
    }
  };
  const logoutUser = async () => {
    const data = {
      id: currentUserId,
    };
    await axios.post(`${base_url}/user/logout`, data, {
      headers: {
        Authorization: Bearer,
      },
    });
  };
  const changePassword = async () => {
    const res = await axios.put(
      `${base_url}/user/forgetPassword/${currentUserId}`,
      passForm,
      {
        headers: {
          Authorization: Bearer,
        },
      }
    );
  };
  async function getUserById(id) {
    try {
      setLoading(true);
      const res = await axios.get(`${base_url}/user/${id}`);
      setSingleUser(res.data.data);
      setLoading(false);
    } catch (error) {
      setLoading(false);
      setError("An error occured");
    }
  }
  const addPost = async () => {
    await axios.post(`${base_url}/post`, postForm, {
      headers: {
        Authorization: Bearer,
        "Content-Type": "multipart/form-data",
      },
    });
  };
  const editPost = async (id) => {
    await axios.put(`${base_url}/post/${id}`, postForm, {
      headers: {
        Authorization: Bearer,
        "Content-Type": "multipart/form-data",
      },
    });
  };
  const deletePost = async (id) => {
    await axios.delete(`${base_url}/post/${id}?userId=${currentUserId}`, {
      headers: {
        Authorization: Bearer,
      },
    });
  };
  const deleteComment = async (id, postId) => {
    setLoading(true);
    await axios.delete(
      `${base_url}/comment/${id}?userId=${currentUserId}&postId=${postId}`,
      {
        headers: {
          Authorization: Bearer,
        },
      }
    );
    setLoading(false);
  };
  const followUser = async (id) => {
    try {
      const data = {
        userId: currentUserId,
      };
      await axios.post(`${base_url}/user/follow/${id}`, data, {
        headers: {
          Authorization: Bearer,
        },
      });
    } catch (error) {
      toast.error("An Error Occured", { autoClose: 2000 });
    }
  };
  const addComment = async (id) => {
    await axios.post(`${base_url}/comment/${id}`, commentForm, {
      headers: {
        Authorization: Bearer,
        "Content-Type": "multipart/form-data",
      },
    });
  };
  const values = {
    path,
    loginForm,
    base_url,
    previewImage,
    dropDown,
    currentUser,
    singlePost,
    regForm,
    editingPostId,
    previewImageName,
    Bearer,
    singleUser,
    currentUserId,
    postForm,
    userPost,
    token,
    passForm,
    error,
    userFollowers,
    userFollowing,
    loading,
    posts,
    commentForm,
    users,
    postComments,
    commentPreview,
    singleComment,
    getCommentById,
    deleteComment,
    getCommentByPost,
    addComment,
    commentChange,
    setCommentForm,
    getPostsForFollowing,
    followUser,
    passChange,
    editPost,
    getAllFollowers,
    getAllFollowing,
    changePassword,
    addPost,
    deletePost,
    updateUserInfo,
    getPostForUser,
    getAllPosts,
    setEditingPostId,
    setLoading,
    setPassForm,
    setPostForm,
    getPostById,
    getAllUsers,
    postChange,
    regChange,
    getCurrentUser,
    setPreviewImageName,
    setRegForm,
    setLoginForm,
    logoutUser,
    getUserById,
    addUser,
    setPreviewImage,
    setDropDown,
    loginChange,
    loginUser,
    navigate,
  };
  return (
    <GlobalContext.Provider value={values}>{children}</GlobalContext.Provider>
  );
}

export const useGlobal = () => {
  return useContext(GlobalContext);
};
